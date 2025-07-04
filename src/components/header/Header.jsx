import styles from './Header.module.css';
import imgMae from '../../assets/imgs/imgs-educadores/fotouser-emili.png';
import Logo from '../../assets/imgs/img-header/logo.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [mostrar, setMostrar] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

  const abrirModal = () => setModalAberto(true);
  const fecharModal = () => setModalAberto(false);

  const sairDaConta = () => {
    console.log('Usuário saiu da conta.');
  };

  return (
    <>
      <header className={styles.header}>
        <button onClick={() => setMostrar(!mostrar)}>
          <i className={`bi ${mostrar ? "bi-x-lg" : "bi-list"}`}></i>
        </button>

        {mostrar && (
          <div className={styles.menu}>
            <div className={styles.profileDesktop} onClick={abrirModal}>
              <img src={imgMae} alt="Foto de perfil" />
            </div>
            <nav className={styles.nav1}>
              <ul>
                <li><Link className={styles.link} to='/HomePage'>Home</Link></li>
                <li><Link to='/Instituicoes'>Instituições</Link></li>
                <li>
                  <Link to='/Cuidadores'>Saúde</Link>
                </li>
                <li>
                  <Link to='/Educadores'>Educação</Link>
                </li>
                <li><Link to='/Jogos'>Jogos</Link></li>
                <li><Link to='/RedeSocial'>Rede Social</Link></li>
                <li><Link to='/HomeLoja'>Loja</Link></li>
              </ul>
            </nav>
          </div>
        )}

        <div className={styles.logo}>
          <Link to='/HomePage'><img src={Logo} alt="Logo" /></Link>
        </div>

        <nav className={styles.nav2}>
          <ul>
            <li><Link to='/HomePage'>Home</Link></li>
            <li><Link to='/Instituicoes'>Instituições</Link></li>
            <li className={styles.profissionais}>
              <Link className={styles.proLink} >Profissionais</Link>
                <div className={styles.proModal}>
                  <li><Link to='/Cuidadores'>Saúde</Link></li>
                  <li><Link to='/Educadores'>Educadores</Link></li>
                </div>
            </li>
            <li><Link to='/Jogos'>Jogos</Link></li>
            <li><Link to='/RedeSocial'>Rede Social</Link></li>
            <li><Link to='/HomeLoja'>Loja</Link></li>
          </ul>
        </nav>

        <div className={styles.profile} onClick={abrirModal}>
          <img src={imgMae} alt="Foto de perfil" />
        </div>
      </header>

      {modalAberto && (
        <div className={styles.modalOverlay} onClick={fecharModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <img src={imgMae} alt="Foto de perfil" />
              <h2>Nome do Usuário</h2>
            </div>

            <ul className={styles.modalMenu}>
              <li><Link to='/Planos'>Planos</Link></li>
              <li onClick={sairDaConta}><Link to='/Login'>Sair da Conta</Link></li>
            </ul>

            <button className={styles.botaoFechar} onClick={fecharModal}>Fechar</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;

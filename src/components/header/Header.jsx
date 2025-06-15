import styles from './Header.module.css'
import imgMae from '../../assets/imgs/imgs-educadores/fotouser-emili.png'
import Logo from '../../assets/imgs/img-header/logo.png'
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [mostrar, setMostrar] = useState(false);

  return (
    <header className={styles.header}>
  <button onClick={() => setMostrar(!mostrar)}>
    <i className={`bi ${mostrar ? "bi-x-lg" : "bi-list"}`}></i>
  </button>

  {mostrar && (
    <div className={styles.menu}>
      <div className={styles.profileDesktop}>
        <img src={imgMae} alt="Foto de perfil" />
      </div>
      <nav className={styles.nav1}>
        <ul>
          <li><Link to='/HomePage'>Home</Link></li>
          <li><Link to='/Instituicoes'>Instituições</Link></li>
          <li><Link to='/Cuidadores'>Profissionais</Link></li>
          <li><Link to='/Perfil'>Perfil</Link></li>
          <li><Link to='/HomeLoja'>Loja</Link></li>
        </ul>
      </nav>
    </div>
  )}

  <div className={styles.logo}>
    <img src={Logo} alt="Logo" />
  </div>

  <nav className={styles.nav2}>
    <ul>
      <li><Link to='/HomePage'>Home</Link></li>
      <li><Link to='/Instituicoes'>Instituições</Link></li>
      <li><Link to='/Cuidadores'>Profissionais</Link></li>
      <li><Link to='/Perfil'>Perfil</Link></li>
      <li><Link to='/HomeLoja'>Loja</Link></li>
    </ul>
  </nav>

  <div className={styles.profile}>
    <img src={imgMae} alt="Foto de perfil" />
  </div>
</header>

  );
}

export default Header;

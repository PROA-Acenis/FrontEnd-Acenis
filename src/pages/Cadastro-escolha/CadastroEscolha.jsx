import React from 'react'
import styles from './CadastroEscolha.module.css'
import maeImage from '../../assets/imgs/imgs-login-cadastro//mae-icon.jpg'
import profissionalImage from '../../assets/imgs/imgs-login-cadastro/profissional-icon.jpg'
// import { Link, useNavigate } from 'react-router-dom'  // REMOVIDO: imports de Link e useNavigate pois não são usados mais

function PerfilCadastro() {
  return (
    <div className={styles.perfilcontainer}>
      <div className={styles.perfilheader}>
        {/* <Link to="/login" className={styles.backButton}>  REMOVIDO: Link do react-router para navegar */}
        <button className={styles.backButton}>
          <h1>Voltar</h1>
        </button>
        {/* </Link> */}
      </div>

      <div className={styles.content}>
        <div className={styles.cardMae}>
          <img src={maeImage} alt="Mãe e criança" className={styles.cardImage} />
          <h2 className={styles.cardTitle}>Sou mãe/responsável</h2>
          <p className={styles.cardText}>
            Acesso rápido para mães que buscam apoio, informações e serviços para seus filhos.
          </p>
          {/* <Link to="/cadastro/mae" className={styles.buttonMae}>  REMOVIDO: Link para cadastro mãe */}
          <button className={styles.buttonMae}>
            <p>CRIAR CONTA</p>
          </button>
          {/* </Link> */}
        </div>

        <div className={styles.cardProfissional}>
          <img src={profissionalImage} alt="Profissional de saúde" className={styles.cardImage} />
          <h2 className={styles.cardTitle}>Sou um profissional</h2>
          <p className={styles.cardText}>
            Aqui você já deixa tudo pronto para oferecer seus serviços e ajudar famílias.
          </p>
          {/* <Link to="/cadastro/profissional" className={styles.buttonProfissional}>  REMOVIDO: Link para cadastro profissional */}
          <button className={styles.buttonProfissional}>
            <p>CRIAR CONTA</p>
          </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}

export default PerfilCadastro

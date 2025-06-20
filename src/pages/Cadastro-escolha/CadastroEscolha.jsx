import React from 'react';
import styles from './CadastroEscolha.module.css';
import maeImage from '../../assets/imgs/imgs-login-cadastro/mae-icon.jpg';
import profissionalImage from '../../assets/imgs/imgs-login-cadastro/profissional-icon.jpg';
import fornecedorImage from '../../assets/imgs/imgs-login-cadastro/fundofornecedor.png';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

function PerfilCadastro() {
  return (
    <div className={styles.perfilContainer}>
      <header className={styles.perfilHeader}>
        <Link to="/" className={styles.backButton}>
          <FiArrowLeft size={20} />
          <span>Voltar</span>
        </Link>
      </header>
      <main className={styles.content}>
        <div className={styles.cardMae}>
          <div className={styles.imageWrapper}>
            <img src={maeImage} alt="Mãe e criança" className={styles.cardImageCadastro} />
          </div>
          <h2 className={styles.cardTitle}>Responsável</h2>
          <p className={styles.cardText}>
            Encontre apoio, informações e serviços para seus filhos de forma prática.
          </p>
          <Link to="/CadastroMae" className={styles.cardButton}>
            <button>Criar Conta</button>
          </Link>
        </div>
        <div className={styles.cardProfissional}>
          <div className={styles.imageWrapper}>
            <img src={profissionalImage} alt="Profissional de saúde" className={styles.cardImageCadastro} />
          </div>
          <h2 className={styles.cardTitle}>Profissional</h2>
          <p className={styles.cardText}>
            Ofereça seus serviços e conecte-se com famílias de maneira simples.
          </p>
          <Link to="/CadastroProfissionais" className={styles.cardButton}>
            <button>Criar Conta</button>
          </Link>
        </div>
        <div className={styles.cardFornecedor}>
          <div className={styles.imageWrapper}>
            <img src={fornecedorImage} alt="Fornecedor" className={styles.cardImageCadastro} />
          </div>
          <h2 className={styles.cardTitle}>Fornecedor</h2>
          <p className={styles.cardText}>
            Conecte-se com famílias e profissionais com seus produtos e serviços.
          </p>
          <Link to="/CadastroFornecedores" className={styles.cardButton}>
            <button>Criar Conta</button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default PerfilCadastro

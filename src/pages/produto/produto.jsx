import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './produto.module.css';

const Produto = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mostrarModal, setMostrarModal] = useState(false);

  const produto = location.state?.produto;

  useEffect(() => {
    window.scrollTo(0, 0);  // Scroll para o topo quando o componente monta
  }, []);

  if (!produto) {
    navigate('/');
    return null;
  }

  const handleComprarClick = () => {
    setMostrarModal(true);
  };

  const fecharModal = () => {
    setMostrarModal(false);
  };

  return (
    <div className={styles.container}>
      <p className={styles.breadcrumb}>Brinquedos &gt; {produto.nome}</p>

      <div className={styles.content}>
        <div className={styles.gallery}>
          <img src={produto.imagem} alt="Miniatura 1" className={styles.thumbnail} />
          <img src={produto.imagem} alt="Miniatura 2" className={styles.thumbnail} />
          <img src={produto.imagem} alt="Miniatura 3" className={styles.thumbnail} />
        </div>

        <div className={styles.mainImage}>
          <img src={produto.imagem} alt={`Imagem de ${produto.nome}`} />
        </div>

        <div className={styles.details}>
          <h2>{produto.nome}</h2>
          <p className={styles.description}>{produto.descricao}</p>

          <div className={styles.rating}>
            <span className={styles.stars}>{produto.estrelas}</span>
            <span className={styles.ratingNumber}>{produto.estrelas.length}.0</span>
          </div>

          <p className={styles.price}>R$ {produto.preco.toFixed(2)}</p>
          <p className={styles.installments}>ou {produto.parcela}</p>
          <p className={styles.seller}>
            <span className={styles.verificadoIcon}>✔</span> Vendido por {produto.vendedor}
          </p>

          <button className={styles.button} onClick={handleComprarClick}>
            Comprar agora
          </button>
        </div>
      </div>

      {mostrarModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button className={styles.modalClose} onClick={fecharModal}>×</button>
            <p className={styles.modalMessage}>
              ✨Atenção! <br />
              As vendas não são realizadas por nossa plataforma. Você será redirecionado com segurança para o site do vendedor.💛💙
            </p>
            <a
              href={produto.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.modalButton}
            >
              Ir para o site parceiro
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Produto;
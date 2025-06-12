import { Link } from 'react-router-dom';
import styles from './carrinho.module.css';
import Lego from '../../assets/imgs/img-loja/lego.png';
import Dino from '../../assets/imgs/img-loja/dino.png';
import Matematica from '../../assets/imgs/img-loja/matematica.png';
import Tucano from '../../assets/imgs/img-loja/tucano.png';

function Carrinho() {
  return (
    <div>
      <div className={styles.container}>
      <div className={styles.produto}>
        <img src={Lego} alt="Produto" className={styles.imagem} />
        
        <div className={styles.info}>
          <h2 className={styles.titulo}>
            Lego Jurassic World Perseguição do Dinossauro <br /> 76941 - 240 Peças
          </h2>
          <div className={styles.precoContainer}>
            <p className={styles.preco}>R$ 499,90</p>
            <p className={styles.parcela}>em até 10x R$ 49,99 sem juros</p>
          </div>

          <div className={styles.acoes}>
            <div className={styles.quantidade}>
              <label htmlFor="qtd">Qtd:</label>
              <input type="number" id="qtd" min="1" defaultValue="1" />
            </div>
            <button className={styles.excluir}>Excluir</button>
          </div>
        </div>
      </div>

      <a to="/dados">
        <button className={styles.botaoFechar}>Fechar Pedido</button>
      </a>
    </div>
      <section className={styles.productSection}>
           <h2 className={styles.sectionTitle}>Recomendados</h2>
           <div className={styles.blueLine}></div>
     
           <div className={styles.carousel}>
             <div className={styles.productCard}>
               <h4 className={styles.productTitle}>Quebra Cabeça Dino</h4>
               <img src={Dino} alt="Quebra Cabeça Dino" className={styles.productImage} />
               <p className={styles.productPrice}>R$ 89,90</p>
               <p className={styles.productInstallments}>em até 10x 8,99 <br /> sem juros</p>
             </div>
     
             <div className={styles.productCard}>
               <h4 className={styles.productTitle}>Livro Matemática</h4>
               <img src={Matematica} alt="Livro Matemática" className={styles.productImage} />
               <p className={styles.productPrice}>R$ 59,90</p>
               <p className={styles.productInstallments}>em até 10x 5,99 <br /> sem juros</p>
             </div>
     
             <div className={styles.productCard}>
               <h4 className={styles.productTitle}>Camiseta Tucano</h4>
               <img src={Tucano} alt="Camiseta Tucano" className={styles.productImage} />
               <p className={styles.productPrice}>R$ 44,90</p>
               <p className={styles.productInstallments}>em até 10x 4,49 <br /> sem juros</p>
             </div>
           </div>
         </section>
    </div>
  );
}

export default Carrinho;

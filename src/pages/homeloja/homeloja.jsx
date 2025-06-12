import Urso from '../../assets/imgs/img-loja/urso.png';
import Toys from '../../assets/imgs/img-loja/toys.png';
import { Link } from 'react-router-dom'; {/* Link removido, substituído por texto simples */}
import styles from './homeloja.module.css';
import Dino from '../../assets/imgs/img-loja/dino.png';
import Matematica from '../../assets/imgs/img-loja/matematica.png';
import Tucano from '../../assets/imgs/img-loja/tucano.png';

function HomeLoja() {
  return (
    <>
      <div className={styles.banner}>
        <div className={styles.overlay}>
          <h5 className={styles.titleSmall}>BOAS-VINDAS À LOJA ACENIS!</h5>
          <h1 className={styles.titleLarge}>
            Brinquedos e livros pensados para <br />
            crianças com síndrome de Down
          </h1>
          <h3 className={styles.titleMedium}>
            Itens que estimulam o desenvolvimento, a <br />
            criatividade e a diversão de forma inclusiva e <br />
            carinhosa.
          </h3>
        </div>

        <div className={styles.infoBox}>
          <div className={styles.infoItem}>
            <img src={Urso} alt="" className={styles.infoIcon} />
            <p>Itens selecionados para <br /> estimular o desenvolvimento</p>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.infoItem}>
            <img src={Toys} alt="" className={styles.infoIcon} />
            <p>Categorias para todas <br /> as idades e fases</p>
          </div>
        </div>
      </div>
      <div className={styles.introSection}>
        <h2 className={styles.mainTitle}>Loja Acenis</h2>
        <p className={styles.description}>
          Aqui você encontra produtos especialmente selecionados para o desenvolvimento e bem-estar dos pequenos.
        </p>
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Digite aqui o que você procura"
          />
          <button className={styles.searchButton}>Buscar</button>
        </div>
      </div>
      <div className={styles.productSection}>
        <div className={styles.filterMenu}>
          <span className={styles.filterOption}>Todos os produtos</span>
          <span className={styles.filterOption}>Brinquedos</span>
          <span className={styles.filterOption}>Livros Didáticos</span>
          <span className={styles.filterOption}>Camisetas</span>
        </div>

        <div className={styles.productGrid}>
          <a to="/produto" className={styles.productCard} style={{ textDecoration: 'none', color: 'inherit' }}> {/* Link removido, substituído por texto simples */}
            <h4 className={styles.productTitle}>Quebra Cabeça</h4>
            <img src={Dino} alt="Produto 1" className={styles.productImage} />
            <p className={styles.productPrice}>R$ 89,90</p>
            <p className={styles.productInstallments}>
              em até 10x 39,99 <br /> sem juros
            </p>
          </a>

          <a to="/produto" className={styles.productCard} style={{ textDecoration: 'none', color: 'inherit' }}>{/* Link removido, substituído por texto simples */}
            <h4 className={styles.productTitle}>Quebra Cabeça</h4>
            <img src={Matematica} alt="Produto 2" className={styles.productImage} />
            <p className={styles.productPrice}>R$ 59,90</p>
            <p className={styles.productInstallments}>
              em até 10x 39,99 <br /> sem juros
            </p>
          </a>

          <a to="/produto" className={styles.productCard} style={{ textDecoration: 'none', color: 'inherit' }}>{/* Link removido, substituído por texto simples */}
            <h4 className={styles.productTitle}>Quebra Cabeça</h4>
            <img src={Tucano} alt="Produto 3" className={styles.productImage} />
            <p className={styles.productPrice}>R$ 49,90</p>
            <p className={styles.productInstallments}>
              em até 10x 39,99 <br /> sem juros
            </p>
          </a>

          <a to="/produto" className={styles.productCard} style={{ textDecoration: 'none', color: 'inherit' }}>{/* Link removido, substituído por texto simples */}
            <h4 className={styles.productTitle}>Quebra Cabeça</h4>
            <img src={Dino} alt="Produto 1" className={styles.productImage} />
            <p className={styles.productPrice}>R$ 39,90</p>
            <p className={styles.productInstallments}>
              em até 10x 39,99 <br /> sem juros
            </p>
          </a>

          <a to="/produto" className={styles.productCard} style={{ textDecoration: 'none', color: 'inherit' }}>{/* Link removido, substituído por texto simples */}
            <h4 className={styles.productTitle}>Quebra Cabeça</h4>
            <img src={Matematica} alt="Produto 2" className={styles.productImage} />
            <p className={styles.productPrice}>R$ 69,90</p>
            <p className={styles.productInstallments}>
              em até 10x 39,99 <br /> sem juros
            </p>
          </a>

          <a to="/produto" className={styles.productCard} style={{ textDecoration: 'none', color: 'inherit' }}>{/* Link removido, substituído por texto simples */}
            <h4 className={styles.productTitle}>Quebra Cabeça</h4>
            <img src={Tucano} alt="Produto 3" className={styles.productImage} />
            <p className={styles.productPrice}>R$ 44,90</p>
            <p className={styles.productInstallments}>
              em até 10x 39,99 <br /> sem juros
            </p>
          </a>
        </div>
      </div>
    </>
  );
}

export default HomeLoja;

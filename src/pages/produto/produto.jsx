import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './produto.module.css';
import imagem1 from '../../assets/imgs/img-loja/imagem1.png';
import imagem2 from '../../assets/imgs/img-loja/imagem2.png';
import imagem3 from '../../assets/imgs/img-loja/imagem3.png';
import imagem4 from '../../assets/imgs/img-loja/imagem4.png';
import Dino from '../../assets/imgs/img-loja/dino.png';
import Matematica from '../../assets/imgs/img-loja/matematica.png';
import Tucano from '../../assets/imgs/img-loja/tucano.png';

function Produto() {
  const [imagemPrincipal, setImagemPrincipal] = useState(imagem1);
  const [ativo, setAtivo] = useState('desc');

  const imagensMiniaturas = [
    { src: imagem2, alt: 'Miniatura 1' },
    { src: imagem3, alt: 'Miniatura 2' },
    { src: imagem4, alt: 'Miniatura 3' }
  ];
  return (
    <div>
      <div className={styles.detalheContainer}>
        <div className={styles.imagensContainer}>
          <div className={styles.bolinhas}>
            {imagensMiniaturas.map((img, index) => (
              <img
                key={index}
                src={img.src}
                alt={img.alt}
                className={styles.bolinha}
                onClick={() => setImagemPrincipal(img.src)}
                style={{
                  border: imagemPrincipal === img.src ? '2px solid #00A878' : '2px solid transparent',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
          <div className={styles.imagemPrincipal}>
            <img src={imagemPrincipal} alt="Imagem principal" className={styles.imagemGrande} />
          </div>
        </div>

        <div className={styles.infoContainer}>
          <h2 className={styles.titulo}>
            QUEBRA-CABEÇA MAPA DO BRASIL - BRINQUEDO EDUCATIVO - BAEBI
          </h2>
          <p className={styles.preco}>
            Por: <span className={styles.valor}>R$ 89,90</span> <br />
            OU 10x R$ 49,99 sem juros
          </p>

          <Link to='/carrinho'>
            <button className={styles.botaoComprar}>ADICIONAR NO CARRINHO</button>
          </Link>

          <div className={styles.cepBox}>
            <label htmlFor="cep">Calcular frete:</label>
            <div className={styles.cepInputGroup}>
              <input type="text" id="cep" placeholder="Digite seu CEP" />
              <button className={styles.botaoCep}>Calcular</button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.bar}>
          <button
            className={`${styles.tab} ${ativo === 'desc' ? styles.ativo : ''}`}
            onClick={() => setAtivo('desc')}
          >
            Descrição
          </button>
          <button
            className={`${styles.tab} ${ativo === 'detalhes' ? styles.ativo : ''}`}
            onClick={() => setAtivo('detalhes')}
          >
            Detalhes
          </button>
        </div>

        <div className={styles.content}>
          {ativo === 'desc' && (
            <div className={styles.descContent}>
              <p>O jogo da Memória de 30 peças é uma atividade clássica e educativa, perfeita para estimular o raciocínio lógico, a percepção visual
                e a memória de curto prazo das crianças. Com imagens coloridas, lúdicas e de fácil associação, este jogo foi pensado para ser
                acessível, inclusivo e divertido!
              </p>
            </div>
          )}

          {ativo === 'detalhes' && (
            <div className={styles.detalhesContent}>
              <ul>
                <li>Material: Papel cartão resistente</li>
                <li>Peças: 100 peças grandes</li>
                <li>Dimensões: 40cm x 30cm</li>
                <li>Indicação: A partir de 3 anos</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <section className={styles.productSection}>
        <h2 className={styles.sectionTitle}>Não perca estas ofertas</h2>
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

export default Produto;

import styles from './Jogos.module.css'
import flor from '../../assets/imgs/imgs-jogos/flor.png'
import espiral from '../../assets/imgs/imgs-jogos/espiral.png'
import tela from '../../assets/imgs/imgs-jogos/tela.png'
import foguete from '../../assets/imgs/imgs-jogos/foguete.png'
import nuvem from '../../assets/imgs/imgs-jogos/Nuvens.png'
import Crianca from '../../assets/imgs/imgs-jogos/crianca.png'
import dino from '../../assets/imgs/imgs-jogos/dino.png'
import breaking from '../../assets/imgs/imgs-jogos/breaking.png'
import coruja from '../../assets/imgs/imgs-jogos/coruja.png'
import colorname from '../../assets/imgs/imgs-jogos/colorname.png'
import estrelas from '../../assets/imgs/imgs-jogos/estrelas.png'
import gato from '../../assets/imgs/imgs-jogos/gato.png'
import memoria from '../../assets/imgs/imgs-jogos/memoria.png'
import linguagem from '../../assets/imgs/imgs-jogos/linguagem.png'
import raciocinio from '../../assets/imgs/imgs-jogos/raciocinio.png'
import relogio from '../../assets/imgs/imgs-jogos/relogio.png'
import { useEffect, useState } from 'react';

function Jogos() {
  const itens = [
    { id: 1, titulo: 'Memória', img: memoria },
    { id: 2, titulo: 'Linguagem', img: linguagem },
    { id: 3, titulo: 'Raciocínio', img: raciocinio }
    // { id: 4, titulo: 'Atenção', img: foguete },
    // { id: 5, titulo: 'Percepção', img: foguete },
  ];

 
  const [startIndex, setStartIndex] = useState(0);
  const [itensVisiveis, setItensVisiveis] = useState(3); // padrão PC

  const handleResize = () => {
    if (window.innerWidth <= 600) {
      setItensVisiveis(1); // Celular
    } else if (window.innerWidth <= 1024) {
      setItensVisiveis(2); // Tablet
    } else {
      setItensVisiveis(3); // PC
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const proximo = () => {
    if (startIndex + itensVisiveis < itens.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const anterior = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const visiveis = itens.slice(startIndex, startIndex + itensVisiveis);


  return (
    <>
        <section className={styles.introducao}>
            <div className={styles.overlay}>
                <img className={styles.flor} src={flor} alt="Flor" />
                <img className={styles.espiral} src={espiral} alt="Espiral" />
                <h1>Participe da competição agora mesmo </h1>
                <p>Aprendizado com diversão e segurança para a família.</p>
                <button>Jogar agora</button>
            </div>
        </section>
          <section className={styles.nuvens}>
            <h2>Estamos trabalhando em jogos especiais todos os dias</h2>
            <img src={nuvem} alt="Nuvens" />
        </section>
        <section className={styles.typePlay}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={anterior} disabled={startIndex === 0}>
            {'<'}
            </button>

            <div style={{ display: 'flex', gap: '100px' }}>
            {visiveis.map((item) => (
            <div key={item.id} className={styles.carrosel}>
            <img src={item.img} style={{width: '11vw', height: '9vw'}} alt={item.titulo} />
            <h3 style={{ fontSize: '2vw', marginTop: '10px', fontWeight: 'bold' }}>{item.titulo}</h3>
            </div>
            ))}
            </div>

            <button onClick={proximo} disabled={startIndex + itensVisiveis >= itens.length}>
            {'>'}
            </button>
        </div>
        </section>
        <section className={styles.ajudar}>
          <div className={styles.img}>
            <img src={Crianca} alt="" />
          </div>
          <div className={styles.txt}>
            <h1>Como os jogos contribuem para o desenvolvimento das crianças?</h1>
            <p>Jogos estimulam o desenvolvimento e a socialização de crianças com síndrome de Down de forma divertida.</p>
            <div className={styles.btn}>
              <button>Play now</button>
              <button>See games</button>
            </div>
          </div>
        </section>

        <section className={styles.jogos2}>
            <h1>Jogos</h1>
            <div className={styles.jogoSec1}>
              <div className={styles.box1}>
                <img src={dino} className={styles.dino} alt="" />
                <button>Jogar agora</button>
              </div>
              <div className={styles.box2}>
                <h2>Breaking words</h2>
                <img src={breaking} className={styles.breaking} alt="" />
                <button>Jogar agora</button>
              </div>
              <div className={styles.box3}>
                <img src={coruja} className={styles.boni} alt="" />
                <button>Jogar agora</button>
              </div>
            </div>
            <div className={styles.jogoSec2}>
              <div className={styles.box2}>
                <h2>Color Name</h2>
                <img src={colorname} className={styles.colorname} alt="" />
                <button>Jogar agora</button>
              </div>
              <div className={styles.box4}>
                <h2>Counting stars</h2>
                <img src={estrelas} className={styles.estrelas} alt="" />
                <button>Jogar agora</button>
              </div>
              <div className={styles.box1}>
                <h2>Where is the cat?</h2>
                <img src={gato} className={styles.gato} alt="" />
                <button>Jogar agora</button>
              </div>
            </div>
        </section>
          <section className={styles.descricao}>
            <h1>Com este jogo sobre o desenvolvimento da criança</h1>
            <div className={styles.retanguloBranco}>
                <img src={tela} alt="Tela" />
                <div className={styles.jogoDescricao}>
                    <img src={relogio} alt="Foguete" />
                    <h2>Acertar o relógio</h2>
                    <p>Jogue "Acerte o Relógio" para ajudar seu filho a aprender a ver as horas. Este é um jogo básico onde você pode praticar o relógio analógico.</p>
                </div>
            </div>
        </section>
    </>
  )
}

export default Jogos;

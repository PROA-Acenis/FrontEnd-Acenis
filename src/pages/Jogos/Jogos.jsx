import styles from './Jogos.module.css'
import flor from '../../assets/imgs/imgs-jogos/flor.png'
import espiral from '../../assets/imgs/imgs-jogos/espiral.png'
import tela from '../../assets/imgs/imgs-jogos/tela.png'
import foguete from '../../assets/imgs/imgs-jogos/foguete.png'
import nuvem from '../../assets/imgs/imgs-jogos/Nuvens.png'


function Jogos() {
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
        <section className={styles.secaoJogos}>
            <h1>Jogos para auxiliar na Memória</h1>
            <div className={styles.escolhas}>
                <button className={styles.memoria}>Memória</button>
                <button className={styles.linguagem}>Linguagem</button>
                <button className={styles.raciocinio}>Raciocínio</button>
                <button className={styles.criativo}>Criativo</button>
                <button className={styles.coordenacao}>Coordenação</button>
            </div>
            <div className={styles.jogos}>
                <div className={styles.jogoMemoria}>
                    <h2>FOGUETE</h2>
                    <img src={foguete} alt="" />
                    <button>Jogar agora</button>
                </div>
                <div className={styles.jogoMemoria}>
                    <h2>DUPLA</h2>
                    <img src={foguete} alt="" />
                    <button>Jogar agora</button>
                </div>
                <div className={styles.jogoMemoria}>
                    <h2>SUMIU</h2>
                    <img src={foguete} alt="" />
                    <button>Jogar agora</button>
                </div>
                <div className={styles.jogoBreve}>
                    <h2>EM BREVE</h2>
                    <img src={foguete} alt="" />
                    <button>Em Breve</button>
                </div>
            </div>
        </section>
        <section className={styles.descricao}>
            <h1>Com este jogo sobre o desenvolvimento da criança</h1>
            <div className={styles.retanguloBranco}>
                <img src={tela} alt="Tela" />
                <div className={styles.jogoDescricao}>
                    <img src={foguete} alt="Foguete" />
                    <h2>Acertar o relógio</h2>
                    <p>Jogue "Acerte o Relógio" para ajudar seu filho a aprender a ver as horas. Este é um jogo básico onde você pode praticar o relógio analógico.</p>
                </div>
            </div>
        </section>
    </>
  )
}

export default Jogos;

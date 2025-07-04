import styles from './Footer.module.css'
import quadrado from './quadrado.png'
import logo from './logoFooter.png'

function Footer(){
    return(
        <footer>
            <div className={styles.txt}>
                <img src={logo} alt="" />
                <p>Conexão entre mães para apoio, acolhimento e troca de experiências.</p>
            </div>
            <div className={styles.contato}>
                <h1>Contato</h1>
                <p>contato@acenis.com.br</p>
                <p style={{marginTop: '10px', fontWeight: 'bold'}}>(11) 96161-6161</p>
            </div>
            <div className={styles.redes}>
                <h1>Redes sociais</h1>
                <div>
                   <i class="bi bi-instagram"></i> 
                   <i class="bi bi-linkedin"></i>
                   <i class="bi bi-github"></i>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
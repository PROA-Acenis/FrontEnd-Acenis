import { Link } from 'react-router-dom';
import Styles from './HeaderPublica.module.css'
import Logo from '../../assets/imgs/imgs-home-introducao/logo_acenis.png'


function Header() {

    return (
        <header className={Styles.header_introducao}>
            <div className={Styles.logo}>
                <Link to='/'><img src={Logo} alt="Imagem logo" /></Link>
            </div>
            <div className={Styles.container_entrar}>
              <Link to='/CadastroEscolhas'><button className={Styles.cadastro} type='button'>Cadastro</button></Link>
              <Link to='/Login'><button className={Styles.login} type='button'>Login</button></Link>
            </div>
            </header>
    )
}

export default Header;
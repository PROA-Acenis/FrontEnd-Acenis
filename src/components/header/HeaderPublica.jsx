import { Link } from 'react-router-dom';
import Styles from './HeaderPublica.module.css'
import Logo from '../../assets/imgs/img-header/logo.png';


function Header() {

    return (
        <header className={Styles.header_introducao}>
            <div className={Styles.logo}>
                <Link to='/'><img src={Logo} alt="Imagem logo" /></Link>
            </div>
            <div className={Styles.container_entrar}>
                <Link to='/HomeFornecedores'>Sou Parceiro</Link>
                <Link to='/HomeProfissional'>Sou Profissional</Link>
                <Link to='/'>Sou Responsável</Link>
              <Link to='/Login'><button className={Styles.login} type='button'>Entrar</button></Link>
            </div>
            </header>
    )
}

export default Header;
import { Link } from 'react-router-dom';
import Styles from './HeaderPublica.module.css';
import Logo from '../../assets/imgs/imgs-home-introducao/logo_acenis.png';
import { FaUserShield, FaUserTie, FaTruck, FaBars } from 'react-icons/fa';
import { useState } from 'react';

function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            <header className={Styles.header_introducao}>
                <div className={Styles.logo}>
                    <Link to='/'><img src={Logo} alt="Imagem logo" /></Link>
                </div>
                <div className={Styles.nav_container}>
                    <div className={Styles.nav_links}>
                        <Link to='/' className={Styles.nav_link}><FaUserShield /> Para responsáveis</Link>
                        <Link to='/Homeprofissionais' className={Styles.nav_link}><FaUserTie /> Para profissionais</Link>
                        <Link to='/HomeFornecedores' className={Styles.nav_link}><FaTruck /> Para fornecedores</Link> {/* Ajustado para /HomeFornecedores */}
                    </div>
                    <div className={Styles.container_entrar}>
                        <Link to='/CadastroEscolhas'><button className={Styles.cadastro} type='button'>Cadastro</button></Link>
                        <Link to='/Login'><button className={Styles.login} type='button'>Login</button></Link>
                    </div>
                </div>
                <button className={Styles.menu_button} onClick={toggleModal}>
                    <FaBars />
                </button>
            </header>

            {isModalOpen && (
                <div className={`${Styles.modal_overlay} ${Styles.active}`} onClick={toggleModal}>
                    <div className={Styles.modal_content} onClick={e => e.stopPropagation()}>
                        <button className={Styles.close_button} onClick={toggleModal}>X</button>
                        <div className={Styles.modal_nav}>
                            <Link to='/' className={Styles.nav_link} onClick={toggleModal}><FaUserShield /> Para responsáveis</Link>
                            <Link to='/profissionais' className={Styles.nav_link} onClick={toggleModal}><FaUserTie /> Para profissionais</Link>
                            <Link to='/HomeFornecedores' className={Styles.nav_link} onClick={toggleModal}><FaTruck /> Para fornecedores</Link> {/* Ajustado para /HomeFornecedores */}
                        </div>
                        <div className={Styles.modal_entrar}>
                            <Link to='/CadastroEscolhas'><button className={Styles.cadastro} type='button' onClick={toggleModal}>Cadastro</button></Link>
                            <Link to='/Login'><button className={Styles.login} type='button' onClick={toggleModal}>Login</button></Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Header

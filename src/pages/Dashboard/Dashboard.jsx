import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css'; // Vamos criar este arquivo de CSS
import { 
    FaTachometerAlt, FaUserCircle, FaCalendarAlt, FaClipboard, FaUsers, 
    FaFolder, FaChartBar, FaCog, FaSignOutAlt, FaBars, FaTimes, 
    FaSearch, FaBell, FaCheckCircle, FaClock, FaCaretUp, FaCaretDown, FaChild, 
    FaDownload, FaShareAlt, FaEdit, FaTrash, FaPlus, FaUpload,
    FaHandsHelping, FaMapMarkerAlt, FaFilePdf, FaFileImage, FaFileVideo
} from 'react-icons/fa';

function DashboardPage() {
    // --- ESTADO DA APLICAÇÃO ---
    // Controla qual seção principal está visível (ex: 'dashboard', 'profile')
    const [activeSection, setActiveSection] = useState('dashboard');
    // Controla se o menu mobile está aberto ou fechado
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    // --- DADOS (Poderiam vir de uma API no futuro) ---
    const statsData = [
        { label: 'Sessões Hoje', value: '3', icon: <FaCalendarAlt /> },
        { label: 'Clientes Ativos', value: '12', icon: <FaUsers /> },
        { label: 'Anotações', value: '24', icon: <FaClipboard /> },
        { label: 'Recursos', value: '15', icon: <FaFolder /> }
    ];

    const navItems = [
        { id: 'dashboard', label: 'Visão Geral', icon: <FaTachometerAlt /> },
        { id: 'profile', label: 'Meu Perfil', icon: <FaUserCircle /> },
        { id: 'calendar', label: 'Agenda', icon: <FaCalendarAlt /> },
        { id: 'notes', label: 'Anotações', icon: <FaClipboard /> },
        { id: 'clients', label: 'Clientes', icon: <FaUsers /> },
        { id: 'resources', label: 'Recursos', icon: <FaFolder /> },
        { id: 'stats', label: 'Estatísticas', icon: <FaChartBar /> },
    ];

    // Efeito para fechar o menu se a tela for redimensionada para desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={styles.layout}>

            {/* ===== Sidebar (Menu Lateral) ===== */}
            <aside className={`${styles.sidebar} ${isMobileMenuOpen ? styles.sidebarAtiva : ''}`}>
                <div className={styles.sidebarHeader}>
                    <div className={styles.logo}>
                        <FaHandsHelping className={styles.logoIcone} />
                        <h1>Acenis Pro</h1>
                    </div>
                    <button onClick={() => setMobileMenuOpen(false)} className={styles.botaoFecharMenu}>
                        <FaTimes />
                    </button>
                </div>
                
                <div className={styles.resumoPerfil}>
                    <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Foto do Perfil" />
                    <div>
                        <p>Dra. Ana Silva</p>
                        <span>Fonoaudióloga</span>
                    </div>
                </div>
                
                <nav className={styles.navegacao}>
                    <ul>
                        {navItems.map(item => (
                            <li key={item.id}>
                                <a 
                                    href="#" 
                                    className={activeSection === item.id ? styles.linkAtivo : ''}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveSection(item.id);
                                        setMobileMenuOpen(false); // Fecha o menu no mobile ao clicar
                                    }}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.navegacaoRodape}>
                         <a href="#">
                            <FaCog />
                            <span>Configurações</span>
                        </a>
                        <a href="#" className={styles.linkSair}>
                            <FaSignOutAlt />
                            <span>Sair</span>
                        </a>
                    </div>
                </nav>
            </aside>

            {/* ===== Conteúdo Principal ===== */}
            <div className={styles.conteudoPrincipal}>
                <header className={styles.cabecalhoPrincipal}>
                    <button onClick={() => setMobileMenuOpen(true)} className={styles.botaoMenuMobile}>
                        <FaBars />
                    </button>
                    <div className={styles.barraBusca}>
                        <FaSearch className={styles.iconeBusca} />
                        <input type="text" placeholder="Pesquisar..." />
                    </div>
                    <div className={styles.acoesCabecalho}>
                        <button className={styles.botaoNotificacao}>
                            <FaBell />
                            <span className={styles.badgeNotificacao}></span>
                        </button>
                        <div className={styles.perfilCabecalho}>
                            <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Foto do Perfil" />
                            <span className={styles.nomePerfilCabecalho}>Dra. Ana</span>
                        </div>
                    </div>
                </header>

                <main className={styles.areaConteudo}>
                    {/* Renderização Condicional da Seção Ativa */}
                    
                    {activeSection === 'dashboard' && (
                        <div>
                            <h2 className={styles.tituloSecao}>Visão Geral</h2>
                            <div className={styles.gridEstatisticas}>
                                {statsData.map(stat => (
                                    <div key={stat.label} className={styles.cartaoEstatistica}>
                                        <div className={styles.conteudoCartaoEstatistica}>
                                            <div>
                                                <p className={styles.labelEstatistica}>{stat.label}</p>
                                                <p className={styles.valorEstatistica}>{stat.value}</p>
                                            </div>
                                            <div className={`${styles.wrapperIconeEstatistica}`}>
                                                {stat.icon}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Outros componentes do dashboard podem vir aqui... */}
                        </div>
                    )}

                    {activeSection === 'profile' && (
                         <div><h2 className={styles.tituloSecao}>Meu Perfil</h2><p>Conteúdo da página de perfil...</p></div>
                    )}

                    {activeSection === 'calendar' && (
                         <div><h2 className={styles.tituloSecao}>Agenda</h2><p>Conteúdo da página de agenda...</p></div>
                    )}

                    {/* Adicione os outros 'if' condicionais para as demais seções aqui */}

                </main>
            </div>
        </div>
    );
}

export default DashboardPage;
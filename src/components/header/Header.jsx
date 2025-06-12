import styles from './Header.module.css'
import imgMae from '../../assets/imgs/imgs-educadores/fotouser-emili.png'
import Logo from '../../assets/imgs/img-header/logo.png'
import { useState } from 'react';

function Header() {
  const [mostrar, setMostrar] = useState(false);

  return (
    <header className={styles.header}>
      {!mostrar && (
        <button onClick={() => setMostrar(true)}>
          <i className="bi bi-list"></i>
        </button>
      )}

      {mostrar && (
        <>
        <button onClick={() => setMostrar(false)}>
                <i className="bi bi-x-lg"></i>
              </button>
          <div className={styles.menu}>
              <div className={styles.profileDesktop}>
                <img src={imgMae} alt="" />
              </div>
              <nav className={styles.nav1}>
                <ul>
                  <li><a href="">Home</a></li>
                  <li><a href="">Instituições</a></li>
                  <li><a href="">Profissionais</a></li>
                  <li><a href="">Rede social</a></li>
                  <li><a href="">Loja</a></li>
                </ul>
              </nav>
          </div>
        </>
      )}
    <div className={styles.logo}>
      <img src={Logo} alt="" />
    </div>
      <nav className={styles.nav2}>
        <ul>
            <li>
                <a href="">Home</a>
            </li>
            <li>
                <a href="">Instituições</a>
            </li>
            <li>
                <a href="">Profissionais</a>
            </li>
            <li>
                <a href="">Rede social</a>
            </li>
            <li>
                <a href="">Loja</a>
            </li>
        </ul>
      </nav>
      <div className={styles.profile}>
        <img src={imgMae} alt="" />
      </div>
    </header>
  );
}

export default Header;

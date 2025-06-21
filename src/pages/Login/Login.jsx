import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import styles from '../Login/Login.module.css';
import fundologin from '../../assets/imgs/imgs-login-cadastro/meninaparafundo.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function LoginAcenis() {
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Por favor, preencha o e-mail e a senha.');
      return;
    }

    const loginData = {
      email: email,
      senha: password,
    };

    try {
      const apiUrl = 'https://backend-acenis-production.up.railway.app/auth/login';

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      if (res.ok) {
        const userData = await res.json();
        console.log("LOGIN.JSX: Dados recebidos da API:", userData);
        
        if(userData.tipo === 'RESPONSAVEL') {
          localStorage.setItem("usuarioLogado", JSON.stringify(userData));
          alert(`Bem-vindo(a) de volta, ${userData.name}!`);
          navigate('/HomePage');
        }
        else if(userData.tipo === 'FORNECEDORES'){
          alert(`Bem-vindo(a) de volta, ${userData.name}!`);
          navigate(''); // -----------------------FRONT DOS FORNECEDORES--------------------------------------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        }
        else{
          alert(`Bem-vindo(a) de volta, ${userData.name}!`);
          navigate('/DashboardPage');
        }

      } else {
        const errorMessage = await res.text();
        alert(`Falha no login: ${errorMessage}`);
      }
    } catch (error) {
      alert('Erro de conexão com a API. Verifique o console.');
      console.error("Erro na chamada fetch:", error);
    }
  };

  const handleRecovery = (e) => {
    e.preventDefault();
    console.log('Recuperação de senha para:', recoveryEmail);
    setShowForgotPassword(false);
    setRecoveryEmail('');
    alert('Se este e-mail existir, você receberá as instruções de recuperação.');
  };

  return (
    <div className={styles.paginalogin}>
      <div className={styles.leftSection}>
        <img
          src={fundologin}
          alt="Criança brincando"
          className={styles.imagelogin}
        />
      </div>

      <div className={styles.rightSection}>
        <div className={styles.logologin}>
          <h1>
            <span style={{ fontFamily: 'Baloo Thambi' }} className={styles.logoAc}>Ac</span>
            <span style={{ fontFamily: 'Baloo Thambi' }} className={styles.logoEnis}>enis</span>
          </h1>
          <div className={styles.tag}>@acenisoficial</div>
        </div>
        <div className={styles.cadastro}>
          <h1>
            Não tem conta?
          </h1>
          <Link to='/CadastroEscolhas'><button>Cadastrar agora</button></Link>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>E-mail</label>
          <input
            type="email"
            placeholder='Email:'
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className={styles.label}>Senha</label>
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className={styles.showPasswordButton}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>

          <button
            type="button"
            className={styles.forgotPassword}
            onClick={() => setShowForgotPassword(true)}
          >
            Esqueci minha senha
          </button>

          <button type="submit" className={styles.loginButton}>
            ENTRAR
          </button>
        </form>
      </div>

      {showForgotPassword && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button
              className={styles.closeButton}
              onClick={() => setShowForgotPassword(false)}
              aria-label="Fechar modal"
            >
              ✕
            </button>
            <h2>Recuperar senha</h2>
            <p>Informe seu e-mail para receber as instruções de recuperação.</p>
            <form onSubmit={handleRecovery}>
              <input
                type="email"
                placeholder="Seu e-mail"
                className={styles.input}
                value={recoveryEmail}
                onChange={(e) => setRecoveryEmail(e.target.value)}
                required
              />
              <div className={styles.modalButtons}>
                <button type="submit" className={styles.loginButton}>
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginAcenis;

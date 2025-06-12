import React, { useState } from 'react'
import styles from './CadastroMae.module.css'
import fundocadastro from '../../assets/imgs/imgs-login-cadastro/fundomae.png'
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'

function CadastroMae() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    nameUser: '',
    emailUser: '',
    passwordUser: '',
    confirmarSenhaUser: '',
    tipo: 'RESPONSAVEL'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("PASSO 1: Função handleSubmit foi chamada. Dados do formulário:", formData);

    if (!formData.nameUser || !formData.emailUser || !formData.passwordUser || !formData.confirmarSenhaUser) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (formData.passwordUser !== formData.confirmarSenhaUser) {
      alert('As senhas não coincidem.');
      return;
    }

    const dadosParaAPI = {
      nameUser: formData.nameUser,
      emailUser: formData.emailUser,
      passwordUser: formData.passwordUser,
      tipo: formData.tipo
    };

    console.log("PASSO 2: Preparando para enviar estes dados para a API:", dadosParaAPI);

    try {
      const apiUrl = 'https://backend-acenis-production.up.railway.app/usuarios';

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosParaAPI),
      });
      
      console.log("PASSO 3: Resposta da API recebida com status:", res.status);

      if (res.ok) {
        alert('Cadastro realizado com sucesso!');
        setFormData({ nameUser: '', emailUser: '', passwordUser: '', confirmarSenhaUser: '', tipo: 'RESPONSAVEL' });
        navigate('/Login')
      } else {
        const errorData = await res.json();
        alert(`Erro no cadastro: ${errorData.message || `Ocorreu um erro (Status: ${res.status})`}`);
      }
    } catch (error) {
      alert('Erro de conexão com a API. Verifique o console para mais detalhes.');
      console.error("Erro na chamada fetch:", error);
    }
  };

  return (
    <div className={styles.paginaCadastro}>
      <div className={styles.leftSection}>
        <img
          src={fundocadastro}
          alt="Criança brincando"
          className={styles.imagemCadastro}
        />
      </div>

      <div className={styles.rightSection}>
        <div className={styles.headerFixo}>
          <div className={styles.logoCadastro}>
            <h1>
              <span className={styles.logoAc}>Ac</span>
              <span className={styles.logoEnis}>enis</span>
            </h1>
            <div className={styles.tag}>
              <span>@acenisoficial</span>
            </div>
          </div>

          <div className={styles.tituloSecao}>
            <h2>MÃE/RESPONSÁVEL</h2>
            <p className={styles.instrucao}>
              Crie sua conta agora.<br />
              Preencha todos os campos com atenção e revise as informações antes de concluir o cadastro.
            </p>
            <div className={styles.divisor}></div>
          </div>
        </div>

        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>Nome Completo</label>
            <input
              type="text"
              name="nameUser"
              className={styles.input}
              value={formData.nameUser}
              onChange={handleChange}
            />

            <label className={styles.label}>E-mail</label>
            <input
              type="email"
              name="emailUser"
              className={styles.input}
              value={formData.emailUser}
              onChange={handleChange}
            />

            <label className={styles.label}>Senha</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                name="passwordUser"
                className={styles.input}
                value={formData.passwordUser}
                onChange={handleChange}
              />
              <button
                type="button"
                className={styles.showPasswordButton}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>

            <label className={styles.label}>Digite a senha novamente</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmarSenhaUser"
                className={styles.input}
                value={formData.confirmarSenhaUser}
                onChange={handleChange}
              />
              <button
                type="button"
                className={styles.showPasswordButton}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>

            <p className={styles.ou}>Ou</p>

            <div className={styles.socialButtons}>
              <button type="button" className={styles.socialButton}>
                <FaGoogle className={styles.socialIcon} />
                Google
              </button>
              <button type="button" className={styles.socialButton}>
                <FaFacebook className={styles.socialIcon} />
                Facebook
              </button>
              <button type="button" className={styles.socialButton}>
                <FaApple className={styles.socialIcon} />
                Apple
              </button>
            </div>

            <button type="submit" className={styles.cadastroButton}>
              CRIAR CONTA
            </button>

            
            <Link to='/Login' className={styles.loginLink}>
              Já tenho uma conta
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadastroMae

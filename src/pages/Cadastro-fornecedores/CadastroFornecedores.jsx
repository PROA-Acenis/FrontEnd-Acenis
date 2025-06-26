import React, { useState } from 'react';
import styles from '../Cadastro-fornecedores/CadastroFornecedores.module.css';
import fundoprofissional from '../../assets/imgs/imgs-login-cadastro/fundocadastrofornecedor.png';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom'

function CadastroFornecedores() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otherCategory, setOtherCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('livros');

  const [formData, setFormData] = useState({
    nameUser: "",
    emailUser: "",
    cnpj: "",
    passwordUser: "",
    categoria: "",
    tipo: "FORNECEDOR"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'categoria') {
      setSelectedCategory(value);
      setFormData({ ...formData, [name]: value === 'outros' ? otherCategory : value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleOtherChange = (e) => {
    setOtherCategory(e.target.value);
    setFormData({ ...formData, categoria: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("PASSO 1: Função handleSubmit foi chamada. Dados do formulário:", formData);

    if (!formData.nameUser || !formData.cnpj || !formData.emailUser || !formData.passwordUser || !formData.categoria) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (formData.passwordUser !== formData.confirmarSenhaUser) {
      alert('As senhas não coincidem.');
      return;
    }

    const dadosParaAPI = {
      nameUser: formData.nameUser,
      cnpj: formData.cnpj,
      emailUser: formData.emailUser,
      passwordUser: formData.passwordUser,
      categoria: formData.categoria
    };
    
    console.log("PASSO 2: Preparando para enviar estes dados para a API:", dadosParaAPI);

    try {
      const apiUrl = 'https://backend-acenis-production.up.railway.app/usuarios';

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosParaAPI),
      });

      if (res.ok) {
        alert('Cadastro de fornecedor realizado com sucesso!');
        setFormData({ nameUser: '', cnpj: '', emailUser: '', passwordUser: '', confirmarSenhaUser: '', categoria: 'livros' });
        setOtherCategory('');
        setSelectedCategory('livros');
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
          src={fundoprofissional}
          alt="Profissional de saúde com criança"
          className={styles.imagemCadastro}
        />
      </div>

      <div className={styles.rightSection}>
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
          <h2>FORNECEDORES</h2>
          <p className={styles.instrucao}>
            Crie sua conta agora.<br />
            Preencha todos os campos com atenção e revise as informações antes de concluir o cadastro.
          </p>
          <div className={styles.divisor}></div>
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

            <label className={styles.label}>CNPJ</label>
            <input
              type="text"
              name="cnpj"
              className={styles.input}
              value={formData.cnpj}
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
                type={showPassword ? 'text' : 'password'}
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
                type={showConfirmPassword ? 'text' : 'password'}
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

            <label className={styles.label}>Categoria de empresa</label>
            <select
              name="categoria"
              className={styles.input}
              value={selectedCategory}
              onChange={handleChange}
            >
              <option value="livros">Livros</option>
              <option value="brinquedos">Brinquedos</option>
              <option value="outros">Outros (enviar para análise)</option>
            </select>
            {selectedCategory === 'outros' && (
              <input
                type="text"
                name="categoria"
                className={styles.input}
                value={otherCategory}
                onChange={handleOtherChange}
                placeholder="Especifique a categoria"
              />
            )}

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

export default CadastroFornecedores;
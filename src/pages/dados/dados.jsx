import styles from './dados.module.css';

function Dados() {
  return (
    <div>
      <div className={styles.container}>
            <h1 className={styles.title}>Dados para Entrega</h1>
            <div className={styles.topBar}></div>
      
            <form className={styles.form}>
              <div className={styles.leftColumn}>
                <label>
                  Nome
                  <input type="text" name="nome" />
                </label>
      
                <label>
                  Telefone
                  <input type="tel" name="telefone" />
                </label>
      
                <label>
                  Endereço
                  <input type="text" name="endereco" />
                </label>
      
                <label>
                  Complemento (opcional)
                  <input type="text" name="complemento" />
                </label>
      
                <label>
                  Cidade
                  <input type="text" name="cidade" />
                </label>
      
                <label>
                  Estado
                  <input type="text" name="estado" />
                </label>
              </div>
      
              <div className={styles.rightColumn}>
                <label>
                  Sobrenome
                  <input type="text" name="sobrenome" />
                </label>
      
                <label>
                  CEP
                  <input type="text" name="cep" />
                </label>
      
                <label>
                  Número da Residência
                  <input type="text" name="numero" />
                </label>
      
                <label>
                  Bairro
                  <input type="text" name="bairro" />
                </label>
              </div>
            </form>
      
            <button className={styles.button}>Avançar</button>
          </div>
    </div>
  );
}

export default Dados;

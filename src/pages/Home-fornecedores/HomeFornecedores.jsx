import React from 'react';
import styles from './HomeFornecedores.module.css';
import logofaq from '../../assets/imgs/imgs-home-fornecedores/logofaq.png';
import saibaMais from '../../assets/imgs/imgs-home-introducao/seta_saiba_mais.png'; // Assumindo que a imagem da seta está disponível
import { FaUsers, FaChartLine, FaCogs } from 'react-icons/fa';

const HomeFornecedores = () => {
  return (
    <>
      <section className={styles.infos_principais}>
        <h1>Venda seus Produtos Educativos na Acenis!</h1>
        <p>Alcance milhares de famílias que buscam recursos para crianças com Síndrome de Down.</p>
        <p className={styles.saiba_mais}>Saiba mais</p>
        <img src={saibaMais} alt="Seta de saiba mais" />
      </section>

      <div className={styles.porQueContainerFornecedores}>
        <h1 className={styles.porQueTituloFornecedores}>Por que ser um fornecedor Acenis?</h1>
        <div className={styles.porQueCardsFornecedores}>
          <div className={styles.porQueCardFornecedores}>
            <div className={styles.porQueIconeFornecedores}>
              <FaUsers />
            </div>
            <h2 className={styles.porQueCardTituloFornecedores}>Alcance Específico</h2>
            <p className={styles.porQueCardTextoFornecedores}>Conecte-se diretamente com responsáveis que buscam produtos educativos.</p>
          </div>
          <div className={styles.porQueCardFornecedores}>
            <div className={styles.porQueIconeFornecedores}>
              <FaChartLine />
            </div>
            <h2 className={styles.porQueCardTituloFornecedores}>Planos Flexíveis</h2>
            <p className={styles.porQueCardTextoFornecedores}>Escolha entre assinatura mensal ou por quantidade de produtos.</p>
          </div>
          <div className={styles.porQueCardFornecedores}>
            <div className={styles.porQueIconeFornecedores}>
              <FaCogs />
            </div>
            <h2 className={styles.porQueCardTituloFornecedores}>Fácil Gerenciamento</h2>
            <p className={styles.porQueCardTextoFornecedores}>Adicione e gerencie seus produtos em uma plataforma intuitiva.</p>
          </div>
        </div>
      </div>

      <div className={styles.planosContainerFornecedores}>
        <h1 className={styles.planosTituloFornecedores}>Escolha o plano ideal para seu negócio</h1>
        <p className={styles.planosSubtituloFornecedores}>Flexibilidade para crescer no seu ritmo</p>
        <div className={styles.planosCardsFornecedores}>
          <div className={styles.planosCardFornecedores}>
            <h2>Básico<br /><span>Pequenos fornecedores.</span></h2>
            <p className={styles.planosPrecoFornecedores}>R$ 99,99/mês</p>
            <ul className={styles.planosListaFornecedores}>
              <li><span className={styles.checkFornecedores}>✔</span> Até 10 produtos</li>
              <li><span className={styles.checkFornecedores}>✔</span> Suporte básico</li>
              <li><span className={styles.uncheckFornecedores}>✖</span> Destaque na plataforma</li>
            </ul>
            <button className={styles.planosBotaoFornecedores}>Escolher plano</button>
          </div>
          <div className={styles.planosCardFornecedores + ' ' + styles.maisVendidoFornecedores}>
            <h2>Profissional<br /><span>Para quem quer crescer.</span></h2>
            <p className={styles.planosPrecoFornecedores}>R$ 199,99/mês</p>
            <ul className={styles.planosListaFornecedores}>
              <li><span className={styles.checkFornecedores}>✔</span> Até 50 produtos</li>
              <li><span className={styles.checkFornecedores}>✔</span> Suporte dedicado</li>
              <li><span className={styles.checkFornecedores}>✔</span> Destaque semanal</li>
            </ul>
            <button className={styles.planosBotaoFornecedores}>Escolher plano</button>
          </div>
          <div className={styles.planosCardFornecedores}>
            <h2>Empresarial<br /><span>Grandes fornecedores.</span></h2>
            <p className={styles.planosPrecoFornecedores}>R$ 399,99/mês</p>
            <ul className={styles.planosListaFornecedores}>
              <li><span className={styles.checkFornecedores}>✔</span> Produtos ilimitados</li>
              <li><span className={styles.checkFornecedores}>✔</span> Suporte prioritário</li>
              <li><span className={styles.checkFornecedores}>✔</span> Destaque permanente</li>
            </ul>
            <button className={styles.planosBotaoFornecedores}>Escolher plano</button>
          </div>
        </div>
      </div>

      <div className={styles.perguntasContainerFornecedores}>
        <h2 className={styles.perguntasSubtituloFornecedores}>DÚVIDAS FREQUENTES</h2>
        <h1 className={styles.perguntasTituloFornecedores}>Perguntas comuns sobre o programa</h1>
        <div className={styles.perguntasWrapperFornecedores}>
          <img src={logofaq} alt="Ilustração FAQ" className={styles.perguntasIlustracaoFornecedores} />
          <div className={styles.perguntasListaFornecedores}>
            <div className={styles.perguntaItemFornecedores}>
              <input type="checkbox" id="pergunta1" className={styles.perguntaCheckboxFornecedores} />
              <label htmlFor="pergunta1" className={styles.perguntaLabelFornecedores}>
                Quanto tempo leva para meu cadastro ser aprovado?
                <span className={styles.perguntaSetaFornecedores}>▼</span>
                <p className={styles.perguntaRespostaFornecedores}>
                  O tempo de aprovação do cadastro pode variar, mas geralmente leva de 2 a 5 dias úteis após a submissão de todos os documentos necessários.
                </p>
              </label>
            </div>
            <div className={styles.perguntaItemFornecedores}>
              <input type="checkbox" id="pergunta2" className={styles.perguntaCheckboxFornecedores} />
              <label htmlFor="pergunta2" className={styles.perguntaLabelFornecedores}>
                Quem é responsável pelo frete dos produtos?
                <span className={styles.perguntaSetaFornecedores}>▼</span>
                <p className={styles.perguntaRespostaFornecedores}>
                  O frete referente ao envio dos produtos será de inteira responsabilidade do fornecedor, devendo este arcar com todos os custos e providenciar a entrega dentro dos prazos estipulados.
                </p>
              </label>
            </div>
            <div className={styles.perguntaItemFornecedores}>
              <input type="checkbox" id="pergunta3" className={styles.perguntaCheckboxFornecedores} />
              <label htmlFor="pergunta3" className={styles.perguntaLabelFornecedores}>
                Como funcionam as devoluções?
                <span className={styles.perguntaSetaFornecedores}>▼</span>
                <p className={styles.perguntaRespostaFornecedores}>
                  As devoluções são processadas caso o produto apresente defeito ou não atenda às especificações informadas. O fornecedor será notificado e deverá organizar a retirada ou substituição em até 7 dias.
                </p>
              </label>
            </div>
            <div className={styles.perguntaItemFornecedores}>
              <input type="checkbox" id="pergunta4" className={styles.perguntaCheckboxFornecedores} />
              <label htmlFor="pergunta4" className={styles.perguntaLabelFornecedores}>
                Posso alterar meu plano?
                <span className={styles.perguntaSetaFornecedores}>▼</span>
                <p className={styles.perguntaRespostaFornecedores}>
                  Sim, você pode alterar seu plano a qualquer momento, sujeito à aprovação e à vigência do ciclo de faturamento atual. Entre em contato para mais detalhes.
                </p>
              </label>
            </div>
          </div>
        </div>
        <p className={styles.perguntasAvisoFornecedores}>Ainda tem dúvidas? Fale conosco <span className={styles.perguntasIconeFornecedores}></span></p>
      </div>

      <div className={styles.expansaoContainerFornecedores}>
        <div className={styles.expansaoConteudoFornecedores}>
          <h1 className={styles.expansaoTituloFornecedores}>Pronto para expandir seu negócio?</h1>
          <h2 className={styles.expansaoSubtituloFornecedores}>Comece hoje mesmo.</h2>
          <p className={styles.expansaoTextoFornecedores}>
            Junte-se a centenas de fornecedores que já cresceram com a Acenis.
          </p>
          <button className={styles.expansaoBotaoFornecedores}>Cadastre-se</button>
        </div>
      </div>
    </>
  );
};

export default HomeFornecedores;
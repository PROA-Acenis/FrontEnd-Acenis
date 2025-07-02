import styles from './HomeProfissional.module.css'
import SaibaMais from '../../assets/imgs/imgs-homeProfissional/seta_saiba_mais.png'
import olho from '../../assets/imgs/imgs-homeProfissional/olho.png'
import dashboard from '../../assets/imgs/imgs-homeProfissional/dashboard.png'
import price from '../../assets/imgs/imgs-homeProfissional/price.png'
import dashboardPremium from '../../assets/imgs/imgs-homeProfissional/dashboardPremium.png'
import logofaq from '../../assets/imgs/imgs-home-fornecedores/logofaq.png';
import { FaUsers, FaChartLine, FaCogs } from 'react-icons/fa';
import { LiaEyeSolid } from "react-icons/lia";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { IoPricetags } from "react-icons/io5";


function HomeProfissional(){
    return(
        <section>
           <div className={styles.overlay}>
                <div className={styles.imgFundo}>
                </div>
                <div className={styles.saiba}>
                        <h1>Conecte-se com familías na Acenis</h1>
                        <p>Seja encontrado por responsáveis que buscam especialistas para crianças com síndrome de Down</p>
                        <p className={styles.saiba_mais}>Saiba mais</p>
                        <img src={SaibaMais} alt="Seta de saiba mais" />
                    </div>
           </div>
           <div className={styles.porQueContainerFornecedores}>
                   <h1 className={styles.porQueTituloFornecedores}>Por que ser um fornecedor Acenis?</h1>
                   <div className={styles.porQueCardsFornecedores}>
                     <div className={styles.porQueCardFornecedores}>
                       <div className={styles.porQueIconeFornecedores}>
                         <LiaEyeSolid />
                       </div>
                       <h2 className={styles.porQueCardTituloFornecedores}>Visibilidade</h2>
                       <p className={styles.porQueCardTextoFornecedores}>Seja encontrado por famílias em sua região que buscam especialistas como você.</p>
                     </div>
                     <div className={styles.porQueCardFornecedores}>
                       <div className={styles.porQueIconeFornecedores}>
                         <TbDeviceDesktopAnalytics />
                       </div>
                       <h2 className={styles.porQueCardTituloFornecedores}>Dashboard Premium</h2>
                       <p className={styles.porQueCardTextoFornecedores}>Gerencie seu trabalho de forma eficiente em uma única plataforma intuitiva.</p>
                     </div>
                     <div className={styles.porQueCardFornecedores}>
                       <div className={styles.porQueIconeFornecedores}>
                         <IoPricetags />
                       </div>
                       <h2 className={styles.porQueCardTituloFornecedores}>Planos Acessíveis</h2>
                       <p className={styles.porQueCardTextoFornecedores}>Escolha o plano ideal para sua carreira e comece a expandir seu alcance.</p>
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
           <div className={styles.dashboard}>
                <div className={styles.dash}>
                    <h1>Dashboardo Premium</h1>
                    <p>Gerencie seu trabalho de forma eficiente em única plataforma intuitiva</p>
                    <div className={styles.certific}><div className={styles.bolaazul2}><i class="bi bi-check2"></i></div><p>Calendário para agendamentos.</p></div>
                    <div className={styles.certific}><div className={styles.bolaazul2}><i class="bi bi-check2"></i></div><p>Anotações gerais para organização.</p></div>
                    <div className={styles.certific}><div className={styles.bolaazul2}><i class="bi bi-check2"></i></div><p>Anexar documentos e atividades.</p></div>
                    <div className={styles.certific}><div className={styles.bolaazul2}><i class="bi bi-check2"></i></div><p>Calendário para agendamentos.</p></div>
                </div>
                <div className={styles.imgDash}>
                    <img src={dashboardPremium} alt="" />
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
                         <li><span className={styles.checkFornecedores}>✔</span> Visibilidade básica</li>
                         <li><span className={styles.checkFornecedores}>✔</span> Perfil simples</li>
                         <li><span className={styles.uncheckFornecedores}>✖</span> Dashboard</li>
                       </ul>
                       <button className={styles.planosBotaoFornecedores}>Escolher plano</button>
                     </div>
                     <div className={styles.planosCardFornecedores + ' ' + styles.maisVendidoFornecedores}>
                       <h2>Profissional<br /><span>Para quem quer crescer.</span></h2>
                       <p className={styles.planosPrecoFornecedores}>R$ 199,99/mês</p>
                       <ul className={styles.planosListaFornecedores}>
                         <li><span className={styles.checkFornecedores}>✔</span> Visibilidade destaque</li>
                         <li><span className={styles.checkFornecedores}>✔</span> Perfil completo</li>
                         <li><span className={styles.checkFornecedores}>✔</span> Dashboard</li>
                       </ul>
                       <button className={styles.planosBotaoFornecedores}>Escolher plano</button>
                     </div>
                     <div className={styles.planosCardFornecedores}>
                       <h2>Empresarial<br /><span>Grandes fornecedores.</span></h2>
                       <p className={styles.planosPrecoFornecedores}>R$ 399,99/mês</p>
                       <ul className={styles.planosListaFornecedores}>
                         <li><span className={styles.checkFornecedores}>✔</span> Visibilidade máxima</li>
                         <li><span className={styles.checkFornecedores}>✔</span> Perfil otimizado</li>
                         <li><span className={styles.checkFornecedores}>✔</span> Dashboard</li>
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
        </section>
    )
}

export default HomeProfissional;
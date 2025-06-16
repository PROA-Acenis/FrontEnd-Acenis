import Styles from '../Home-introducao/HomeIntroducao.module.css'

import SaibaMais from '../../assets/imgs/imgs-home-introducao/seta_saiba_mais.png'
import InstiProximas from '../../assets/imgs/imgs-home-introducao/instituições.png'
import ProfiQualificados from '../../assets/imgs/imgs-home-introducao/qualificados.png'
import RedeApoio from '../../assets/imgs/imgs-home-introducao/apoio.png'
import Loja from '../../assets/imgs/imgs-home-introducao/loja.png'
import Verificacao from '../../assets/imgs/imgs-home-introducao/icone_verificado.png'
import Perfil from '../../assets/imgs/imgs-home-introducao/icone_perfil.png'
import Coracao from '../../assets/imgs/imgs-home-introducao/icone_coracao.png'
import Flor from '../../assets/imgs/imgs-home-introducao/flor_profissionais.png'
import ImgPerfil from '../../assets/imgs/imgs-home-introducao/foto_perfil.png'
import FlorRosa from '../../assets/imgs/imgs-home-introducao/flor_rosa1.png'
import FlorRosa2 from '../../assets/imgs/imgs-home-introducao/flor_rosa2.png'
import Macarrao from '../../assets/imgs/imgs-home-introducao/macarrao_rosa.png'
import Clara from '../../assets/imgs/imgs-home-introducao/clara.png'
import Circulo1 from '../../assets/imgs/imgs-home-introducao/circulo_amarelo.png'
import Circulo2 from '../../assets/imgs/imgs-home-introducao/circulo.png'
import Circulo3 from '../../assets/imgs/imgs-home-introducao/circulo2.png'
import Amarela from '../../assets/imgs/imgs-home-introducao/flor_amarela.png'

import { Link } from 'react-router-dom';

function HomeIntroducao() {
  return (
    <>
      {/* Introducao_Principal */}
      <section className={Styles.infos_principais}>
        <h1>Tudo o que você precisa para o desenvolvimento do seu filho</h1>
        <p>Encontre instituições, profissionais especializados, uma rede de apoio e produtos selecionados para crianças com Síndrome de Down.</p>
        <p className={Styles.saiba_mais}>Saiba mais</p>
        <img src={SaibaMais} alt="Seta de saiba mais" />
      </section>

      {/* Como_Ajudar */}
      <div className={Styles.container_porcentagem}>
        <h2 className={Styles.titulo_acenis}>Como a ACENIS pode ajudar</h2>
        <p className={Styles.paragrafo_acenis}>Oferecemos uma plataforma completa com recursos especializados para apoiar famílias e profissionais!</p>
        <hr />
        <div className={Styles.cards}>
          <div className={Styles.wide}>
            <img src={InstiProximas} alt="Ícone de instituições próximas" />
            <h2>Instituições Próximas</h2>
          </div>
          <div className={Styles.cards_acenis}>
            <img src={Loja} alt="Ícone de Loja" />
            <h2>Loja Acenis</h2>
          </div>
          <div className={Styles.small}>
            <h2>Jogos Acenis</h2>
          </div>
          <div className={Styles.big}>
            <img src={ProfiQualificados} alt="Ícone de profissionais qualificados" />
            <h2>Profissionais Qualificados</h2>
          </div>
          <div className={Styles.big_2}>
            <img src={RedeApoio} alt="Ícone de rede de apoio" />
            <h2>Rede de Apoio</h2>
          </div>
        </div>
      </div>

      {/* Descubra_Profissionais */}
      <section className={Styles.profissionais}>
        <img className={Styles.flor_profissionais} src={Flor} alt="Flor profissionais" />
        <h2>Descubra os melhores profissionais para seu filho</h2>
        <p>Oferecemos uma plataforma completa com recursos especializados para apoiar famílias e profissionais</p>
        <div className={Styles.container}>
          <div className={Styles.container_oferecemos}>
            <div className={Styles.card_verificacao}>
              <img src={Verificacao} alt="Ícone de verificação" />
              <p>100% dos profissionais selecionados antes de você contratá-los</p>
            </div>
            <div className={Styles.card_verificacao}>
              <img src={Perfil} alt="Ícone de perfil" />
              <p>Perfis transparentes com avaliações e qualificações oferecidas</p>
            </div>
            <div className={Styles.card_verificacao}>
              <img src={Coracao} alt="Ícone de coração" />
              <p>Equipes dedicadas de suporte para mães e profissionais</p>
            </div>
            <Link to='/CadastroEscolhas'><button type="button">Começar</button></Link>
          </div>
          <div className={Styles.feedbeck}>
            <h2>O que dizem sobre?</h2>
            <div className={Styles.comentarios}>
              <p>Os profissionais da ACENIS são dedicados e atenciosos. Com seu trabalho, as crianças mostram evoluções reais e importantes no dia a dia. 💙</p>
              <div className={Styles.usuario}>
                <img src={ImgPerfil} alt="Imagem de perfil" />
                <div className={Styles.detalhe_usuarios}>
                  <h3>Ranbeer Hooda</h3>
                  <h6>NEW DELHI</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Assistente_Virtual */}
      <section className={Styles.conteudo_acenis}>
        <div className={Styles.flores}>
          <img src={FlorRosa} alt="Imagem de uma flor rosa" />
        </div>
        <div className={Styles.flores2}>
          <img src={FlorRosa2} alt="Imagem de uma flor rosa" />
        </div>
        <div className={Styles.flores3}>
          <img src={Macarrao} alt="Imagem de um macarrão rosa" />
        </div>
        <div className={Styles.precisa_ajuda}>
          <h2>Precisa de ajuda?</h2>
          <hr />
          <p>Nossa assistente virtual está disponível 24 horas para tirar suas dúvidas!</p>
        </div>
        <div className={Styles.container_chatbot}>
          <div className={Styles.chatbot}>
            <img src={Clara} alt="Nossa mascote Clara" />
            <h3>Converse com a Clara</h3>
            <p>Nosso chatbot inteligente pode responder suas perguntas sobre instituições, profissionais, produtos e muito mais. Clique no ícone no canto inferior direito para iniciar uma conversa.</p>
            <Link to='/CadastroEscolhas'><button type="button">Iniciar conversa</button></Link>
          </div>
        </div>
      </section>

      {/* Pronto_Comecar */}
      <section className={Styles.comecar}>
        <img className={Styles.circulo1} src={Circulo1} alt="Ícone círculo amarelo" />
        <img className={Styles.circulo2} src={Circulo2} alt="Ícone círculo" />
        <img className={Styles.circulo3} src={Circulo3} alt="Ícone círculo" />
        <img className={Styles.amarela} src={Amarela} alt="Ícone flor amarela" />
        <h2 className={Styles.titulo_comecar}>Pronto para começar?</h2>
        <hr />
        <p>Junte-se à nossa comunidade e tenha acesso a todos esses recursos e muito mais. O cadastro é gratuito para famílias.</p>
        <Link to='/CadastroEscolhas'><button type="button">Cadastre-se</button></Link>
      </section>
    </>
  )
}

export default HomeIntroducao

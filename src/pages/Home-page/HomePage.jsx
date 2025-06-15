import React, { useState, useEffect } from 'react'
import styles from '../Home-page/HomePage.module.css'


import sobreNos from '../../assets/imgs/imgs-home-introducao/sobre_nos.png'
import sobreNos2 from '../../assets/imgs/imgs-home-introducao/sobre_nos2.png'
import seta from '../../assets/imgs/imgs-home-introducao/seta_saibamais.png'
import sociais from '../../assets/imgs/imgs-home-introducao/redes_sociais.png'
import educacao from '../../assets/imgs/imgs-home-introducao/educação_apoio.png'
import jogos from '../../assets/imgs/imgs-home-introducao/jogos_terapia.png'
import suporte from '../../assets/imgs/imgs-home-introducao/suporte.png'
import locaisInclusivos from '../../assets/imgs/imgs-home-introducao/locais_inclusivos.png'
import loja from '../../assets/imgs/imgs-home-introducao/loja_brinquedos.png'
import clara from '../../assets/imgs/imgs-home-introducao/clara.png'
import florRosa from '../../assets/imgs/imgs-home-introducao/flor_rosa1.png'
import florRosa2 from '../../assets/imgs/imgs-home-introducao/flor_rosa2.png'
import macarrao from '../../assets/imgs/imgs-home-introducao/macarrão_rosa.png'
import setaDireita from '../../assets/imgs/imgs-home-introducao/seta_carrossel_direita.png'
import setaEsquerda from '../../assets/imgs/imgs-home-introducao/seta_carrossel_esquerda.png'
import girl from '../../assets/imgs/imgs-home-introducao/vire_membro.png'
import flor from '../../assets/imgs/imgs-home-introducao/flor.png'
import quadrado from '../../assets/imgs/imgs-home-introducao/vire_membro_acenis.png'
import mae_filha from '../../assets/imgs/imgs-home-introducao/mae_filha.png'
import aprendendo_brincando from '../../assets/imgs/imgs-home-introducao/aprendendo_brincando.jpg'
import imagem_crianca from '../../assets/imgs/imgs-home-introducao/imagem_crianca.webp'
import video_mae_filho from '../../assets/imgs/imgs-home-introducao/video_mae_filho.mp4'
import aprendendo from '../../assets/imgs/imgs-home-introducao/aprendendo.mp4'
import se_divertindo from '../../assets/imgs/imgs-home-introducao/se_divertindo.mp4'
import video_coracao from '../../assets/imgs/imgs-home-introducao/video_coracao.mp4'

function Principal() {
  return (
    <section className={styles.infos_principais}>
      <h1><span className={styles.muda_cor}>AC</span>ENIS</h1>
      <p>Transformando desafios em conquistas!</p>
    </section>
  );
}

function ContadorAnimado({ final, sufixo = '', intervalo = 50 }) {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    const numeroFinal = parseFloat(final);
    const step = numeroFinal < 100 ? 1 : Math.ceil(numeroFinal / 100);

    const interval = setInterval(() => {
      setContador(prev => {
        const proximo = prev + step;
        if (proximo >= numeroFinal) {
          clearInterval(interval);
          return numeroFinal;
        }
        return proximo;
      });
    }, intervalo);

    return () => clearInterval(interval);
  }, [final, intervalo]);

  const formatado = final % 1 === 0 ? Math.round(contador) : contador.toFixed(1);

  return (
    <h2>{formatado}{sufixo}</h2>
  );
}

function Sobre_Nos() {
  const [mostrar, setMostrar] = useState({
    um: false,
    dois: false,
    tres: false,
  });

  useEffect(() => {
    const tempos = {
      um: 0,
      dois: 2500,
      tres: 2700,
    };

    const timeouts = [];

    Object.entries(tempos).forEach(([chave, delay]) => {
      const timeout = setTimeout(() => {
        setMostrar(prev => ({ ...prev, [chave]: true }));
      }, delay);
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <section className={styles.sobre_nos}>
      <div className={styles.sobre_acenis}>
        <h2 className={styles.titulo_acenis}>Sobre a Acenis</h2>
        <p className={styles.paragrafo_acenis}>
          A Acenis é uma plataforma voltada para mães de crianças com síndrome de Down.
        </p>
        <div className={styles.porcentagem}>
          <div className={styles.container_porcentagem}>
            {mostrar.um && <ContadorAnimado final={97} sufixo="%" intervalo={30} />}
            <p>Sorrisos diários</p>
          </div>
          <div className={styles.container_porcentagem}>
            {mostrar.dois && <ContadorAnimado final={10} sufixo="K" intervalo={90} />}
            <p>Famílias felizes</p>
          </div>
          <div className={styles.container_porcentagem}>
            {mostrar.tres && <ContadorAnimado final={4.9} sufixo="K+" intervalo={200} />}
            <p>Clientes</p>
          </div>
        </div>
        <div className={styles.saiba_mais}>
          <button type='button'>
            Saiba mais
            <span className={styles.circle}>
              <img src={seta} alt="Seta saiba mais" />
            </span>
          </button>
        </div>
      </div>
      <div className={styles.imagens}>
        <img src={sobreNos} alt="Imagem criança com síndrome de Down" />
        <img src={sobreNos2} alt="Imagem criança com síndrome de Down" className={styles.sobre_nos2} />
      </div>
    </section>
  );
}

function Acenis_Oferece() {
  return (
    <section className={styles.acenis_conteudo}>
      <div className={styles.descubra_container}>
        <div className={styles.descubra}>
          <h2><span className={styles.mudar_cor}>Descubra</span> o que a <br /> Acenis oferece</h2>
        </div>
        <div className={styles.paragrafo_explicacao}>
          <p>Bem-vindo à Acenis, onde apoiamos seu <br /> crescimento com cuidado e inovação.</p>
        </div>
        <div className={styles.carrossel_mobile}>
          <p>Deslize para o lado e descubra mais!</p>
        </div>
      </div>
      <div className={styles.card_container}>
        <div className={styles.conteudo}>
          <img src={sociais} alt="Imagem redes sociais" />
          <h3>Redes sociais</h3>
          <p>Apoie outras mães.</p>
          <button type='button'>Saiba mais</button>
        </div>
        <div className={styles.conteudo_2}>
          <img src={educacao} alt="Imagem educação e apoio" />
          <h3>Educação e apoio</h3>
          <p>Educadores qualificados.</p>
          <button type='button'>Saiba mais</button>
        </div>
        <div className={styles.conteudo_3}>
          <img src={jogos} alt="Imagem jogos e terapia" />
          <h3>Jogos e terapia</h3>
          <p>Aprender e se divertir.</p>
          <button type='button'>Saiba mais</button>
        </div>
      </div>
      <div className={styles.card_container2}>
        <div className={styles.conteudo_4}>
          <img src={suporte} alt="Imagem suporte" />
          <h3>Suporte</h3>
          <p>Aprendizado guiado.</p>
          <button type='button'>Saiba mais</button>
        </div>
        <div className={styles.conteudo_5}>
          <img src={locaisInclusivos} alt="Imagem locais inclusivos" />
          <h3>Locais inclusivos</h3>
          <p>Explore espaços acessíveis</p>
          <button type='button'>Saiba mais</button>
        </div>
        <div className={styles.conteudo_6}>
          <img src={loja} alt="Imagem loja de brinquedos" />
          <h3>Loja de brinquedos</h3>
          <p>Produtos educativos.</p>
          <button type='button'>Saiba mais</button>
        </div>
      </div>
    </section>
  );
}

function Card_Celular() {
  return (
    <div className={styles.container_porcentagem}>
      <h2 className={styles.titulo_acenis}>Sobre a Acenis</h2>
      <p className={styles.paragrafo_acenis}>A Acenis é uma plataforma voltada para mães de crianças com síndrome de Down.</p>
      <div className={styles.cards}>
        <div className={styles.container_verde}>
          <h2>97%</h2>
          <p>Sorrisos diários</p>
        </div>
        <div className={styles.container_rosa}>
          <h2>10K</h2>
          <p>Famílias felizes</p>
        </div>
        <div className={styles.container_azul}>
          <h2>4.9K+</h2>
          <p>Clientes</p>
        </div>
      </div>
      <div className={styles.saiba_mais}>
        <button type='button'>Saiba mais</button>
      </div>
    </div>
  );
}

function Carrossel_Acenis() {
  return (
    <section className={styles.conteudo_acenis}>
      <div className={styles.carrossel_container}>
        <div className={styles.carrossel_texto}>
          <img style={{height: '350px', borderRadius: '20px', boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.1)'}} src={mae_filha} alt="Imagem carrossel" />
          <video style={{width: '90%', height: '350px', borderRadius: '20px', boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.1)'}}  autoPlay muted loop>
            <source src={video_coracao} type='video/mp4'/>
          </video>
          <img style={{height: '350px', borderRadius: '20px', boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.1)'}}  src={imagem_crianca} alt="Imagem carrossel" />
          <video style={{height: '350px', borderRadius: '20px', boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.1)'}}  autoPlay muted loop>
            <source src={se_divertindo} type='video/mp4'/>
          </video>
          <img style={{height: '350px', borderRadius: '20px', boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.1)'}}  src={aprendendo_brincando} alt="Imagem carrossel" />
          <video style={{height: '350px', borderRadius: '20px', boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.1)'}}  autoPlay muted loop>
            <source src={aprendendo} type='video/mp4'/>
          </video>
          <video style={{height: '350px', borderRadius: '20px', boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.1)'}} autoPlay muted loop>
            <source src={video_mae_filho} type='video/mp4'/>
          </video>
        </div>
      </div>
      <div className={styles.flores}>
        <img src={florRosa} alt="Imagem de uma flor rosa" />
      </div>
      <div className={styles.flores2}>
        <img src={florRosa2} alt="Imagem de uma flor rosa" />
      </div>
      <div className={styles.flores3}>
        <img src={macarrao} alt="Imagem de um macarrão" />
      </div>
      <div className={styles.precisa_ajuda}>
        <h2>Precisa de ajuda?</h2>
        <hr />
        <p>Nossa assistente virtual está disponível 24 horas para tirar suas dúvidas!</p>
      </div>
      <div className={styles.container_chatbot}>
        <div className={styles.chatbot}>
          <img src={clara} alt="Nossa mascote Clara" />
          <h3>Converse com a Clara</h3>
          <p>Nosso chatbot inteligente pode responder suas perguntas sobre instituições, profissionais, produtos e muito mais. Clique no ícone no canto inferior direito para iniciar uma conversa.</p>
          <button type='button'>Iniciar conversa</button>
        </div>
      </div>
    </section>
  );
}

function Carrossel_Responsivo() {
  const [index, setIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);

  const cards = [
    { title: 'Redes sociais', content: 'Apoie outras mães.', image: sociais },
    { title: 'Educação e apoio', content: 'Educadores qualificados.', image: educacao },
    { title: 'Jogos e terapia', content: 'Aprender, crescer e se divertir.', image: jogos },
    { title: 'Suporte', content: 'Aprendizado guiado.', image: suporte },
    { title: 'Locais inclusivos', content: 'Explore espaços acessíveis', image: locaisInclusivos },
    { title: 'Loja de brinquedos', content: 'Produtos educativos.', image: loja },
  ];

  const cardClasses = [
    styles.card1,
    styles.card2,
    styles.card3,
    styles.card4,
    styles.card5,
    styles.card6,
  ];

  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth;
      if (width >= 1023) {
        setVisibleCards(2);
      } else if (width >= 768) {
        setVisibleCards(2);
      } else {
        setVisibleCards(1);
      }
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  const next = () => {
    if (index < cards.length - visibleCards) {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const cardWidth = `calc(${100 / visibleCards}% - 20px)`;

  return (
    <section className={styles.carrossel_responsivo}>
      <div className={styles.descubra_container}>
        <div className={styles.descubra}>
          <h2>
            <span className={styles.mudar_cor}>Descubra</span> o que a <br /> Acenis oferece
          </h2>
        </div>
        <div className={styles.paragrafo_explicacao}>
          <p>
            Bem-vindo à Acenis, onde apoiamos seu <br /> crescimento com cuidado e inovação.
          </p>
        </div>
        <div className={styles.carrossel_mobile}>
          <p>Deslize para o lado e descubra mais!</p>
        </div>
      </div>
      <div className={styles.card_container}>
        <button className={styles.seta} onClick={prev} disabled={index === 0}>
          <img src={setaEsquerda} alt="Seta esquerda" />
        </button>
        <div className={styles.sub_container} style={{ overflow: 'hidden', width: '68%', }}>
          <div style={{ display: 'flex', justifyContent: 'center'}}>
            {cards.slice(index, index + visibleCards).map((card, i) => (
              <div
                key={i}
                className={`${styles.card} ${cardClasses[(index + i) % cardClasses.length]}`}
                style={{
                  flex: `0 0 ${cardWidth}`,
                  marginRight: i !== visibleCards - 1 ? '20px' : '0',
                }}
              >
                {card.image && <img src={card.image} alt={card.title} />}
                <h3>{card.title}</h3>
                <p>{card.content}</p>
                <button type="button">Saiba mais</button>
              </div>
            ))}
          </div>
        </div>
        <button
          className={styles.seta}
          onClick={next}
          disabled={index >= cards.length - visibleCards}
        >
          <img src={setaDireita} alt="Seta direita" />
        </button>
      </div>
    </section>
  );
}

function Vire_membro() {
  return (
    <section className={styles.conteudo_vire_membro}>
        <img src={quadrado} alt="quadrado" className={styles.quadrado}/>
      <div className={styles.vire_membro}>
        <img src={girl} alt="Mascote vire membro" />
      </div>
      <div className={styles.imagem_flor}>
        <img src={flor} alt="Imagem de uma flor" />
      </div>
      <div className={styles.ver_planos}>
        <h2>Vire membro da <span className={styles.muda_cor}>Ac</span><span className={styles.muda_cor2}>enis!</span></h2>
        <p>Muito mais do que uma assinatura, é o cuidado.</p>
        <button type='button'>Ver planos</button>
        <span className={styles.circle}>
          <img src={seta} alt="Seta saiba mais" />
        </span>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <Principal />
      <Sobre_Nos />
      <Acenis_Oferece />
      <Carrossel_Acenis />
      <Card_Celular />
      <Carrossel_Responsivo />
      <Vire_membro />
    </>
  );
}

export default HomePage
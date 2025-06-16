import React, { useState, useEffect } from 'react';
import styles from './Instituicoes.module.css';
import iconFamilia from '../../assets/imgs/imgs-instituicoes/iconfamilia.png';
import iconInstitui from '../../assets/imgs/imgs-instituicoes/iconinstitui.png';
import destaque1 from '../../assets/imgs/imgs-instituicoes/apaedestaque.png';
import destaque2 from '../../assets/imgs/imgs-instituicoes/manodown.jpg';
import destaque3 from '../../assets/imgs/imgs-instituicoes/destaque3.png';
import destaque4 from '../../assets/imgs/imgs-instituicoes/unidown.png';
import destaque5 from '../../assets/imgs/imgs-instituicoes/df.avif';
import destaque6 from '../../assets/imgs/imgs-instituicoes/destaque6.png';

const instituicoesDestaque = [
  {
    nome: 'APAE',
    localizacao: 'Brasil',
    imagem: destaque1,
    descricao: 'Educação especializada e terapias.',
    link: 'https://www.apaebrasil.org.br'
  },
  {
    nome: 'Instituto Mano Down',
    localizacao: 'Belo Horizonte, MG',
    imagem: destaque2,
    descricao: 'Inclusão por meio de educação, esportes e cultura.',
    link: 'https://www.manodown.org.br'
  },
  {
    nome: 'Fundação Down',
    localizacao: 'Campinas, SP',
    imagem: destaque3,
    descricao: 'Intervenção precoce e treinamento profissional.',
    link: 'https://www.fsdown.org.br'
  },
  {
    nome: 'Instituto UniDown',
    localizacao: 'São Paulo, SP',
    imagem: destaque4,
    descricao: 'Cursos especializados para desenvolver autonomia.',
    link: 'https://www.unidown.org.br'
  },
  {
    nome: 'Associação DF Down',
    localizacao: 'Brasília, DF',
    imagem: destaque5,
    descricao: 'Defesa de direitos e grupos de apoio.',
    link: 'https://www.dfdown.org.br'
  },
  {
    nome: 'Instituto Serendipidade',
    localizacao: 'Rio de Janeiro, RJ',
    imagem: destaque6,
    descricao: 'Inclusão profissional e programas comunitários.',
    link: 'https://www.serendipidade.org.br'
  },
];

function HomeInstituicao() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeConteudo}>
        <header className={styles.homeCabecalho}>
          <h1>BOAS-VINDAS ÀS INSTITUIÇÕES ACENIS !</h1>
          <h2>Encontre instituições<br />que transformam vidas.</h2>
          <p>Apoio, cuidado e desenvolvimento para pessoas<br /> com Síndrome de Down.</p>
        </header>

        <div className={styles.homeCardUnico}>
          <div className={styles.homeItemEstatistica}>
            <div className={styles.homeItemContent}>
              <img src={iconFamilia} alt="Ícone de família" className={styles.homeIconeEstatistica} />
              <p>+80% das famílias relatam melhora na qualidade de vida.</p>
            </div>
          </div>
          
          <div className={styles.homeDivisoria}></div>
          
          <div className={styles.homeItemEstatistica}>
            <div className={styles.homeItemContent}>
              <img src={iconInstitui} alt="Ícone de instituição" className={styles.homeIconeEstatistica} />
              <p>Mais de 3.000 crianças são atendidas por instituições parceiras em todo o Brasil.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DivCelular() {
  return (
    <main className={styles.celularCaixa}>
      <div className={styles.celularDiv}>
        <img src={iconFamilia} alt="Ícone de família" className={styles.celularIconeEstatistica} />
        <p>+80% das famílias relatam melhora na qualidade de vida.</p>
      </div>

      <div className={styles.celularDiv2}>
        <img src={iconInstitui} alt="Ícone de instituição" className={styles.celularIconeEstatistica2} />
        <p>Mais de 3.000 crianças são atendidas por instituições.</p>
      </div>
    </main>
  );
}

function SlideInstituicoes() {
  const [indice, setIndice] = useState(0);
  const [visiveis, setVisiveis] = useState(3);
  const total = instituicoesDestaque.length;

  useEffect(() => {
    const atualizarQuantidadeVisiveis = () => {
      const largura = window.innerWidth;
      if (largura < 600) setVisiveis(1);
      else if (largura < 900) setVisiveis(2);
      else setVisiveis(3);
    };

    atualizarQuantidadeVisiveis();
    window.addEventListener('resize', atualizarQuantidadeVisiveis);
    return () => window.removeEventListener('resize', atualizarQuantidadeVisiveis);
  }, []);

  const proximo = () => {
    setIndice((indice + visiveis) % total);
  };

  const anterior = () => {
    setIndice((indice - visiveis + total) % total);
  };

  const cardsVisiveis = [];
  for (let i = 0; i < visiveis; i++) {
    cardsVisiveis.push(instituicoesDestaque[(indice + i) % total]);
  }

  return (
    <div className={styles.slideContainer}>
      <h2>Descubra Instituições em Destaque</h2>
      <p className={styles.slideSubtitulo}>Nossas instituições em destaque</p>
      <div className={styles.slideDestaque}>
        <button className={styles.slideSeta} onClick={anterior}>{'<'}</button>

        {cardsVisiveis.map((inst, i) => (
          <div key={i} className={styles.slideCard}>
            <img src={inst.imagem} alt={inst.nome} className={styles.slideCardImg} />
            <div className={styles.slideCardInfo}>
              <h3>{inst.nome}</h3>
              <p className={styles.slideLocalizacao}>{inst.localizacao}</p>
              <p>{inst.descricao}</p>
              <div className={styles.slideBotaoContainer}>
                <a href={inst.link} className={styles.slideBotao} target="_blank" rel="noopener noreferrer">
                  Sobre
                </a>
              </div>
            </div>
          </div>
        ))}

        <button className={styles.slideSeta} onClick={proximo}>{'>'}</button>
      </div>
    </div>
  );
}

function InstituicoesProximas() {
  const [estados, setEstados] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [instituicoes, setInstituicoes] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [sugestao, setSugestao] = useState({
    nome: '',
    estado: '',
    cidade: '',
    descricao: '',
    site: ''
  });
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const estadosBrasil = [
      'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 
      'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão', 
      'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 
      'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 
      'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 
      'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'
    ];
    setEstados(estadosBrasil);
  }, []);

  const buscarInstituicoes = () => {
    if (!estadoSelecionado) return;
    
    setCarregando(true);
    
    setTimeout(() => {
      const instituicoesFicticias = {
        'Acre': [
          {
            id: 1,
            nome: 'APAE Rio Branco',
            cidade: 'Rio Branco',
            estado: 'AC',
            descricao: 'Atendimento especializado para pessoas com síndrome de Down e outras deficiências intelectuais.',
            imagem: 'https://www.noticiasdahora.com.br/images/2025/05/17/APAERB1.jpg',
            site: 'https://www.instagram.com/apaeriobranco/'
          },
          {
            id: 2,
            nome: 'Instituto Down do Acre',
            cidade: 'Rio Branco',
            estado: 'AC',
            descricao: 'Promove a inclusão social e o desenvolvimento de pessoas com síndrome de Down.',
            imagem: 'https://www.serra.es.gov.br/admin/download/1742588015064-032125-meias.jpg',
            site: 'https://www.facebook.com/familiadownac/'
          }
        ],
        'Alagoas': [
          {
            id: 3,
            nome: 'APAE Maceió',
            cidade: 'Maceió',
            estado: 'AL',
            descricao: 'Atendimento especializado para pessoas com síndrome de Down.',
            imagem: 'https://www.maragogiro.com.br/wp-content/uploads/2020/08/leoloureio05.jpg',
            site: 'https://www.instagram.com/apaemaceio/'
          },
          {
            id: 4,
            nome: 'Associação Pestalozzi de Alagoas',
            cidade: 'Maceió',
            estado: 'AL',
            descricao: 'Oferece educação especial e atendimento terapêutico.',
            imagem: 'https://palmeiradosindios.al.gov.br/wp-content/uploads/2021/09/IMG-20210927-WA0080.jpg',
            site: 'https://pestalozzidemaceio.org.br/web/'
          }
        ],
        'Amapá': [
          {
            id: 5,
            nome: 'APAE Macapá',
            cidade: 'Macapá',
            estado: 'AP',
            descricao: 'Atendimento a pessoas com síndrome de Down e outras deficiências.',
            imagem: 'https://clickmaisnoticia.com/wp-content/uploads/2023/10/Capa-apae.jpg',
            site: 'https://clickmaisnoticia.com/wp-content/uploads/2023/10/Capa-apae.jpg'
          }
        ],
        'Amazonas': [
          {
            id: 6,
            nome: 'APAE Manaus',
            cidade: 'Manaus',
            estado: 'AM',
            descricao: 'Atendimento especializado para pessoas com síndrome de Down.',
            imagem: 'https://d24am.com/wp-content/uploads/2025/02/Dia-Internacional-da-Sindrome-de-Down-Prefeitura-participa-de-acao-social-promovida-pela-Apae-1.jpg',
            site: 'https://www.instagram.com/apaemanaus/'
          },
          {
            id: 7,
            nome: 'Instituto Autismo e Down do Amazonas',
            cidade: 'Manaus',
            estado: 'AM',
            descricao: 'Promove a inclusão de pessoas com síndrome de Down e autismo.',
            imagem: 'https://www.agenciaamazonas.am.gov.br/wp-content/uploads/2021/08/FPS-IAAM-recebe-fomento-do-Governo-2.jpeg',
            site: 'https://www.instagram.com/institutoautismonoamazonas/'
          }
        ],
        'Bahia': [
          {
            id: 8,
            nome: 'APAE Salvador',
            cidade: 'Salvador',
            estado: 'BA',
            descricao: 'Atendimento especializado para pessoas com síndrome de Down.',
            imagem: 'https://www.apaesalvador.org.br/media/56155/img_0590.jpg?width=500&height=333.3333333333333',
            site: 'https://www.apaesalvador.org.br/'
          },
          {
            id: 9,
            nome: 'Instituto Ser Down da Bahia',
            cidade: 'Salvador',
            estado: 'BA',
            descricao: 'Promove a inclusão social de pessoas com síndrome de Down.',
            imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYijC4uN_7EMbGuzG-ZDhS7O-DrAVav8pStw&s',
            site: 'https://www.instagram.com/serdown/'
          },
          {
            id: 10,
            nome: 'Centro de Atendimento Especializado',
            cidade: 'Feira de Santana',
            estado: 'BA',
            descricao: 'Atendimento multidisciplinar para pessoas com síndrome de Down.',
            imagem: 'https://diadeaprenderbrincando.org.br/wp-content/uploads/sites/6/2017/04/down1.jpg',
            site: 'https://www.instagram.com/capedabahia/'
          }
        ],
        'Ceará': [
          {
            id: 11,
            nome: 'APAE Fortaleza',
            cidade: 'Fortaleza',
            estado: 'CE',
            descricao: 'Atendimento especializado para pessoas com síndrome de Down.',
            imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt2BOM4XjjB7VnxX--gWMDOhg3u_sx3ORrvw&s',
            site: 'https://www.instagram.com/apaefortaleza/'
          },
          {
            id: 12,
            nome: 'Instituto Primeiro Olhar',
            cidade: 'Fortaleza',
            estado: 'CE',
            descricao: 'Acompanhamento desde o nascimento para crianças com síndrome de Down.',
            imagem: 'https://live.staticflickr.com/2851/33691369415_2c4bc7a66e_b.jpg',
            site: 'https://primeiroolhar.org/'
          }
        ],
        'Distrito Federal': [
          {
            id: 13,
            nome: 'APAE Brasília',
            cidade: 'Brasília',
            estado: 'DF',
            descricao: 'Atendimento especializado para pessoas com síndrome de Down.',
            imagem: 'https://apaedf.org.br/wp-content/uploads/2022/09/2022.09.01-Campeonato-Brasilerio-CBDI.jpg',
            site: 'https://apaedf.org.br/'
          },
          {
            id: 14,
            nome: 'Instituto Ápice Down',
            cidade: 'Brasília',
            estado: 'DF',
            descricao: 'Promove a inclusão social e educacional de pessoas com síndrome de Down.',
            imagem: 'https://midias.correiobraziliense.com.br/_midias/jpg/2024/08/16/whatsapp_image_2024_08_16_at_10_51_41-39459709.jpeg',
            site: 'https://www.instagram.com/instituto_apicedown/'
          },
          {
            id: 15,
            nome: 'Associação DF Down',
            cidade: 'Brasília',
            estado: 'DF',
            descricao: 'Atendimento multidisciplinar e apoio às famílias.',
            imagem: 'https://ampol.org.br/wp-content/uploads/2023/03/WhatsApp-Image-2023-03-28-at-13.01.50-1.jpeg',
            site: 'https://www.dfdown.com.br/'
          }
        ],
        'Espírito Santo': [
          {
            id: 16,
            nome: 'APAE Vitória',
            cidade: 'Vitória',
            estado: 'ES',
            descricao: 'Atendimento especializado para pessoas com síndrome de Down.',
            imagem: 'https://www.institutoclaro.org.br/educacao/wp-content/uploads/sites/2/2024/03/alfabetizacao-sindrome-down-e1710366179278.jpg',
            site: 'https://www.instagram.com/apaevitoria/'
          },
          {
            id: 17,
            nome: 'Instituto Vitoria Down do Espírito Santo',
            cidade: 'Vitória',
            estado: 'ES',
            descricao: 'Promove a inclusão de pessoas com síndrome de Down.',
            imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUplKA7mOnQ2_jmzTPvvNYGAwsMDBmm85TjA&s',
            site: 'https://www.instagram.com/vitoriadown/'
          }
        ],
        'Goiás': [
          {
            id: 18,
            nome: 'APAE Goiânia',
            cidade: 'Goiânia',
            estado: 'GO',
            descricao: 'Atendimento especializado para pessoas com síndrome de Down.',
            imagem: 'https://files.aredacao.com.br/upload/content/EvgnCF1o4vRJkj3hRKmYk7UXf8rRdtlbOSbpGvS1',
            site: 'https://www.apaedegoiania.org.br/'
          },
          {
            id: 19,
            nome: 'Associação Goiana de Síndrome de Down',
            cidade: 'Goiânia',
            estado: 'GO',
            descricao: 'Apoio às famílias e promoção da inclusão social.',
            imagem: 'https://goias.gov.br/saude/wp-content/uploads/sites/34/2024/03/2103-crer-sindrome-de-down.jpeg',
            site: 'https://www.instagram.com/asdowngo/?hl=pt'
          }
        ],
        'Maranhão': [
          {
            id: 20,
            nome: 'APAE São Luís',
            cidade: 'São Luís',
            estado: 'MA',
            descricao: 'Atendimento especializado para pessoas com síndrome de Down.',
            imagem: 'https://static.wixstatic.com/media/2e8811_fed8f9d2366148e5bcb09866525bab25~mv2.jpg/v1/fill/w_816,h_544,al_c,lg_1,q_85/2e8811_fed8f9d2366148e5bcb09866525bab25~mv2.jpg',
            site: 'https://www.apaesaoluis.org.br/'
          }
        ],
        'Mato Grosso': [
          {
            id: 21,
            nome: 'APAE Cuiabá',
            cidade: 'Cuiabá',
            estado: 'MT',
            descricao: 'Atendimento especializado para pessoas com síndrome de Down.',
            imagem: 'https://scassessoriadeimprensa.com.br/wp-content/uploads/2022/08/Auditoria-Fiscal-do-Trabalho-e-APAE-Cuiaba-se-unem-por-inclusao-de-PCDs-Intelectuais-2.jpeg',
            site: 'https://www.instagram.com/apae.cuiaba/'
          }
        ],
        'Mato Grosso do Sul': [
          {
            id: 22,
            nome: 'APAE Campo Grande',
            cidade: 'Campo Grande',
            estado: 'MS',
            descricao: 'Atendimento especializado para pessoas com síndrome de Down.',
            imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIMuIYzgsgBmTG5pfjkPwMCMyP1c-j7D0--U2QwR1_t6fZ4AACTFHI-hvy1DXt_x1DXXQ&usqp=CAU',
            site: 'https://apaecg.org.br/'
          }
        ],
        'Minas Gerais': [
          {
            id: 23,
            nome: 'APAE Belo Horizonte',
            cidade: 'Belo Horizonte',
            estado: 'MG',
            descricao: 'Atendimento especializado para pessoas com síndrome de Down.',
            imagem: 'https://www.oreporterregional.com.br/images/noticias/26707/affcc9470b519a1b7996e573161bac86.JPG',
            site: 'https://apaebh.org.br/'
          },
          {
            id: 24,
            nome: 'Instituto Mano Down',
            cidade: 'Belo Horizonte',
            estado: 'MG',
            descricao: 'Promove a inclusão social e educacional de pessoas com síndrome de Down.',
            imagem: 'https://www.manodown.com.br/wp-content/uploads/2018/04/foto-casa-modelo-manodown.jpg',
            site: 'https://manodown.com.br/'
          },
          {
            id: 25,
            nome: 'Minas Down',
            cidade: 'Belo Horizonte',
            estado: 'MG',
            descricao: 'Apoio às famílias e promoção da inclusão social.',
            imagem: 'https://viverbem.unimedbh.com.br/wp-content/uploads/2022/03/sindrome-de-down-3-e1647545408224.jpg',
            site: 'https://www.facebook.com/MinasDown/?locale=pt_BR'
          },
          {
            id: 26,
            nome: '21 Inclusão Down Uberlândia',
            cidade: 'Uberlândia',
            estado: 'MG',
            descricao: 'Atendimento multidisciplinar para pessoas com síndrome de Down.',
            imagem: 'https://www.alphafono.com.br/wp-content/uploads/2019/05/shutterstock_1280207638.jpg',
            site: 'https://www.instagram.com/21inclusaodown/'
          }
        ],
        'Pará': [
          {
            id: 27,
            nome: 'APAE Belém',
            cidade: 'Belém',
            estado: 'PA',
            descricao: 'Atendimento especializado para pessoas com síndrome de Down.',
            imagem: 'https://static.vakinha.com.br/uploads/vakinha/image/987791/vakinha.png',
            site: 'https://www.instagram.com/apaebelem/'
          }
        ],
        'Paraíba': [
          {
            id: 28,
            nome: 'APAE João Pessoa',
            cidade: 'João Pessoa',
            estado: 'PB',
            descricao: 'Atendimento especializado para pessoas com síndrome de Down.',
            imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYQVg2YPlEyTwHPRspxnyJeGHIZQxS87h6FA&s',
            site: 'https://www.instagram.com/apaejp/'
          }
        ],
        'Paraná': [
          {
            id: 29,
            nome: 'APAE Curitiba',
            cidade: 'Curitiba',
            estado: 'PR',
            descricao: 'Atendimento especializado para pessoas com síndrome de Down.',
            imagem: 'https://apaecuritiba.org.br/wp-content/uploads/2022/05/Greca.png',
            site: 'https://apaecuritiba.org.br/'
          },
          {
            id: 30,
            nome: 'Paranadown',
            cidade: 'Curitiba',
            estado: 'PR',
            descricao: 'Promove a inclusão social e educacional.',
            imagem: 'https://www.fundepar.pr.gov.br/sites/fundepar/arquivos_restritos/files/styles/escala_500_altura_/public/imagem/2022-03/img_5049.jpg?itok=eUnpcfoc',
            site: 'https://www.facebook.com/paranadown'
          },
          {
            id: 31,
            nome: 'Associação Reviver Down',
            cidade: 'Londrina',
            estado: 'PR',
            descricao: 'Apoio às famílias e promoção da inclusão social.',
            imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7husKvH7CrooDZYtgI24aCM75Na13cteMjA&s',
            site: 'https://reviverdown.org.br/'
          }
        ],
        'Pernambuco': [
          {
            id: 32,
            nome: 'APAE Recife',
            cidade: 'Recife',
            estado: 'PE',
            descricao: 'Atendimento especializado para pessoas com síndrome de Down.',
            imagem: 'https://www.gov.br/esporte/pt-br/noticias-e-conteudos/esporte/apae-recife-recebe-nucleo-do-programa-teativo/whatsapp-image-2024-10-14-at-10-27-37.jpeg',
            site: 'https://www.instagram.com/apaerecife/'
          },
          {
            id: 33,
            nome: 'Instituto Maria Alcoforado de Pernambuco',
            cidade: 'Olinda',
            estado: 'PE',
            descricao: 'Promove a inclusão social e educacional.',
            imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3Mngs8fSJEFa9wAOz_uLQqf5X7T-lI-587q3KrKVsnRwEPfkvQcmYvPo1PnbbW0s4k9o&usqp=CAU',
            site: 'https://l.instagram.com/?u=https%3A%2F%2Finstitutomaria.org.br%2F%3Ffbclid%3DPAZXh0bgNhZW0CMTEAAafYM7QMM3JSexZ37wtM-0TBm19Ba4aByBJPBB9Xh3zt-94CRUCOlEPc38OsYw_aem_HC3J1b6KT56TljJLtIQuXA&e=AT0Ci35_m0aLoqOaAG4jyndVxs0xk0aXyK5p4z_TWwOMLQxSB0T3el7evLKnajmzb6FgJVSZYJmPnbnaGzzBWmT9Ijj3leGnVi9-7YCmemxKO0BEesk7cA'
          }
        ],
        'Piauí': [
          {
            id: 34,
            nome: 'APAE Teresina',
            cidade: 'Teresina',
            estado: 'PI',
            descricao: 'Atendimento especializado para pessoas com síndrome de Down.',
            imagem: 'https://www.pi.gov.br/wp-content/uploads/2025/04/WhatsApp-Image-2025-04-02-at-14.32.48-1-scaled-e1743623999503.jpeg',
            site: 'https://www.instagram.com/apaedeteresina/'
          }
        ],
        'Rio de Janeiro': [
          {
            id: 35,
            nome: 'APAE Rio de Janeiro',
            cidade: 'Rio de Janeiro',
            estado: 'RJ',
            descricao: 'Atendimento especializado para pessoas com síndrome de Down.',
            imagem: 'https://pbs.twimg.com/media/DmK7TQiW4AYU12P.jpg',
            site: 'https://www.instagram.com/apaerio/?hl=pt'
          },
          {
            id: 36,
            nome: 'Instituto Serendipidade',
            cidade: 'Rio de Janeiro',
            estado: 'RJ',
            descricao: 'Promove a autonomia e qualidade de vida de pessoas com síndrome de Down.',
            imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6W0zA_fc-P2bW1_1hEMsZoQz9Pm0KyG828A&s',
            site: 'https://www.serendipidade.org.br/'
          },
          {
            id: 37,
            nome: 'Instituto Meta Social',
            cidade: 'Barra da Tijuca',
            estado: 'RJ',
            descricao: 'Apoio às famílias e promoção da inclusão social.',
            imagem: 'https://static.wixstatic.com/media/c00d30_8205ada800ef48d094cb8c74727f775d~mv2.jpg/v1/fill/w_640,h_688,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c00d30_8205ada800ef48d094cb8c74727f775d~mv2.jpg',
            site: 'https://www.metasocial.org.br/'
          },
          {
            id: 38,
            nome: 'APAE Nova Iguaçu',
            cidade: 'Nova Iguaçu',
            estado: 'RJ',
            descricao: 'Atendimento multidisciplinar para pessoas com síndrome de Down.',
            imagem: 'https://www.bnews.com.br/media/uploads/legacy/ckfinder/userfiles/images/geral/apae-salvador.jpg',
            site: 'https://www.instagram.com/apaenovaiguacu/'
          }
        ],
        'Rio Grande do Norte': [
          {
            id: 39,
            nome: 'APAE Natal',
            cidade: 'Natal',
            estado: 'RN',
            descricao: 'Atendimento especializado para pessoas com síndrome de Down.',
            imagem: 'https://s2-g1.glbimg.com/CeVjNMkD9TQVX_Bnj-IMvgcCTNo=/0x0:1280x853/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2018/N/z/TBiqPOQGWmxHINO6u2Qg/whatsapp-image-2018-01-30-at-16.57.42.jpeg',
            site: 'https://www.instagram.com/apaenatal/'
          }
        ],
        'Rio Grande do Sul': [
          {
            id: 40,
            nome: 'APAE Porto Alegre',
            cidade: 'Porto Alegre',
            estado: 'RS',
            descricao: 'Atendimento especializado para pessoas com síndrome de Down.',
            imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXKZ6SQ2FPyIxFHz7EueNtOibN7KjVpSXJdg&s',
            site: 'https://www.instagram.com/apaeportoalegre/'
          },
          {
            id: 41,
            nome: 'AFAD Instituto Down de Porto Alegre',
            cidade: 'Porto Alegre',
            estado: 'RS',
            descricao: 'Promove a inclusão social e educacional.',
            imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThtOfThhe8W3zLEOBJmmi5TtjkoHsKQhzhn5b9WAhbPGqKQooof1btSyFPF2qbqUY1e2s&usqp=CAU',
            site: 'https://www.instagram.com/afadpoa/'
          },
          {
            id: 42,
            nome: 'Associação Carpe Diem',
            cidade: 'Caxias do Sul',
            estado: 'RS',
            descricao: 'Apoio às famílias e promoção da inclusão social.',
            imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs_QQbhRNhc7hTdZn78EZGsfSQxUn8ZH0e2g&s',
            site: 'https://www.facebook.com/associacaocarpediem/?locale=pt_BR'
          }
        ],
        'Rondônia': [
          {
            id: 43,
            nome: 'APAE Porto Velho',
            cidade: 'Porto Velho',
            estado: 'RO',
            descricao: 'Atendimento especializado para pessoas com síndrome de Down.',
            imagem: 'https://newsrondonia.com.br/wp-content/uploads/2023/05/3-16.jpg',
            site: 'https://www.instagram.com/apaepvhro/'
          }
        ],
        'Roraima': [
          {
            id: 44,
            nome: 'APAE Boa Vista',
            cidade: 'Boa Vista',
            estado: 'RR',
            descricao: 'Atendimento especializado para pessoas com síndrome de Down.',
            imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQntx8PixhjykLj4q2KL2pKuPMQq8Go_eLkw&s',
            site: 'https://www.instagram.com/apaeboavista/'
          }
        ],
        'Santa Catarina': [
          {
            id: 45,
            nome: 'APAE Florianópolis',
            cidade: 'Florianópolis',
            estado: 'SC',
            descricao: 'Atendimento especializado para pessoas com síndrome de Down.',
            imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSRhGjQPqDj4EJWoRbGWGcjUWQ0h0DzDCW_g&s',
            site: 'https://www.apae.floripa.br/site/'
          },
          {
            id: 46,
            nome: 'Universo Down de Santa Catarina',
            cidade: 'Joinville',
            estado: 'SC',
            descricao: 'Promove a inclusão social e educacional.',
            imagem: 'https://s2-g1.glbimg.com/AdH-uaPj5eKpe6dK5P9ipfsV9gY=/42x39:1240x839/600x0/smart/filters:gifv():strip_icc()/s.glbimg.com/jo/g1/f/original/2017/03/20/whatsapp_image_2017-03-20_at_15.52.38.jpeg',
            site: 'https://www.instagram.com/universodown/'
          },
          {
            id: 47,
            nome: 'Amor pra Down',
            cidade: 'Itajaí',
            estado: 'SC',
            descricao: 'Apoio às famílias e promoção da inclusão social.',
            imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScXyxg9S6aMiQ_2ri0xAmrxBhZGQgmV8e7rg&s',
            site: 'https://amorpradown.org/'
          }
        ],
        'São Paulo': [
          {
            id: 48,
            nome: 'APAE São Paulo',
            cidade: 'São Paulo',
            estado: 'SP',
            descricao: 'Atendimento especializado para pessoas com síndrome de Down.',
            imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS150VX7gJ2skGKmhwVEe1Gv47pM60ko7ZAf_eq6V63gURz9508EevzbB8Y46_a9obmP_w&usqp=CAU',
            site: 'https://apaebrasil.org.br/'
          },
          {
            id: 49,
            nome: 'Instituto Mano Down',
            cidade: 'São Paulo',
            estado: 'SP',
            descricao: 'Oferece atendimento multidisciplinar e promove a inclusão de pessoas com síndrome de Down.',
            imagem: 'https://manodown.com.br/wp-content/uploads/2020/02/quem_somos.jpg',
            site: 'https://manodown.com.br/'
          },
          {
            id: 50,
            nome: 'Associação Carpe Diem',
            cidade: 'São Paulo',
            estado: 'SP',
            descricao: 'Trabalha com educação e desenvolvimento de pessoas com síndrome de Down.',
            imagem: 'https://s2.glbimg.com/loWh9x-458XcrgIJBjJXq67UULQ=/s.glbimg.com/og/rg/f/original/2013/04/18/divulgacao_carpe_diem_1_606x455.jpg',
            site: 'https://voluntarios.com.br/entidade/1835'
          },
          {
            id: 51,
            nome: 'CESD - Centro Síndrome de Down',
            cidade: 'Campinas',
            estado: 'SP',
            descricao: 'Atendimento multidisciplinar para pessoas com síndrome de Down.',
            imagem: 'https://www.cesdcampinas.org.br/images/texts/pgcaptacao1.jpg',
            site: 'https://www.cesdcampinas.org.br/'
          },
          {
            id: 52,
            nome: 'Instituto Inclusão Brasil',
            cidade: 'São Paulo',
            estado: 'SP',
            descricao: 'Promove a inclusão social e educacional.',
            imagem: 'https://jornalistainclusivo.com/wp-content/uploads/2022/06/educacao-inclusiva-mt-instituto-inclusao-na-escola-bangkok-click-studio-adobestock.jpg',
            site: 'https://institutoinclusaobrasil.com.br/'
          },
          {
            id: 53,
            nome: 'Associação Reviver Down',
            cidade: 'São José dos Campos',
            estado: 'SP',
            descricao: 'Apoio às famílias e promoção da inclusão social.',
            imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz3bQuuBqRiHH5uJJSVSKFfbPLPt1KrbNIrFHGu9rNBVIWBzrH_kTwdtQ28E9PT9eAypw&usqp=CAU',
            site: 'https://reviverdown.org.br/'
          }
        ],
        'Sergipe': [
          {
            id: 54,
            nome: 'APAE Aracaju',
            cidade: 'Aracaju',
            estado: 'SE',
            descricao: 'Atendimento especializado para pessoas com síndrome de Down.',
            imagem: 'https://ajn1.com.br/wp-content/uploads/2023/03/Equipe-do-Ministro-da-Secretaria-Geral-da-Presidencia-da-Republica-visita-Apae-Aracaju-para-fortalecer-a-inclusao-de-pessoas-com-deficiencia-700x525.jpg',
            site: 'https://www.instagram.com/apaearacaju/'
          }
        ],
        'Tocantins': [
          {
            id: 55,
            nome: 'APAE Palmas',
            cidade: 'Palmas',
            estado: 'TO',
            descricao: 'Atendimento especializado para pessoas com síndrome de Down.',
            imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxFQ1H2LrI0RwPvTCs46LlrMK7j6HudZgYzw&s',
            site: 'https://www.instagram.com/apaepalmasto/'
          }
        ]
      };

      const resultado = instituicoesFicticias[estadoSelecionado] || [];
      setInstituicoes(resultado);
      setPaginaAtual(1);
      setCarregando(false);
    }, 500);
  };

  const handleSubmitSugestao = (e) => {
    e.preventDefault();
    setCarregando(true);
    
    setTimeout(() => {
      alert('Obrigado pela sugestão! Vamos analisar sua indicação.');
      setSugestao({
        nome: '',
        estado: '',
        cidade: '',
        descricao: '',
        site: ''
      });
      setCarregando(false);
      setMostrarFormulario(false);
    }, 1000);
  };

  const instituicoesPorPagina = 1;
  const totalPaginas = Math.ceil(instituicoes.length / instituicoesPorPagina);
  const instituicoesPaginaAtual = instituicoes.slice(
    (paginaAtual - 1) * instituicoesPorPagina,
    paginaAtual * instituicoesPorPagina
  );

  return (
    <div className={styles.proximasContainer} id='instituicoesProximas'>
      <div className={styles.proximasHeader}>
        <h1 className={styles.proximasTitulo}>Encontre instituições próximas de você</h1>
        <p className={styles.proximasSubtitulo}>Use sua localização para descobrir instituições recomendadas na sua região.</p>
      </div>

      <div className={styles.proximasFiltroWrapper}>
        <div className={styles.proximasFiltroContainer}>
          <select 
            className={styles.proximasSelectEstado}
            value={estadoSelecionado}
            onChange={(e) => setEstadoSelecionado(e.target.value)}
          >
            <option value="">Selecione um estado</option>
            {estados.map((estado) => (
              <option key={estado} value={estado}>{estado}</option>
            ))}
          </select>
          <button 
            className={styles.proximasBotaoBuscar}
            onClick={buscarInstituicoes}
            disabled={!estadoSelecionado || carregando}
          >
            {carregando ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
      </div>

      <div className={styles.proximasResultadosContainer}>
        {carregando ? (
          <div className={styles.proximasCarregando}>
            <div className={styles.proximasSpinner}></div>
            <p>Buscando instituições...</p>
          </div>
        ) : instituicoes.length === 0 && estadoSelecionado ? (
          <div className={styles.proximasSemResultados}>
            <p></p>
            <p className={styles.proximasBotaoSugerir}>
              Por favor, selecione seu estado e clique em "Buscar" para visualizar as instituições disponíveis.
            </p>
          </div>
        ) : (
          <>
            <div className={styles.proximasCardsContainer}>
              {instituicoesPaginaAtual.map((instituicao) => (
                <div key={instituicao.id} className={styles.proximasCard}>
                  <div className={styles.proximasCardImagemContainer}>
                    <img 
                      src={instituicao.imagem} 
                      alt={instituicao.nome} 
                      className={styles.proximasCardImagem}
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = 'https://via.placeholder.com/200?text=Instituição';
                      }}
                    />
                  </div>
                  <div className={styles.proximasCardConteudo}>
                    <h3 className={styles.proximasCardTitulo}>{instituicao.nome}</h3>
                    <p className={styles.proximasCardLocalizacao}>{instituicao.cidade} - {instituicao.estado}</p>
                    <p className={styles.proximasCardDescricao}>{instituicao.descricao}</p>
                    {instituicao.site && (
                      <a 
                        href={instituicao.site} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.proximasBotaoSite}
                      >
                        Visitar Site
                      </a>
                    )}
                  </div>
                </div>
              ))}

              {instituicoesPaginaAtual.length < 2 && (
                <div className={`${styles.proximasCard} ${styles.proximasCardSugestao}`}>
                  <div className={styles.proximasCardImagemContainer}>
                    <div className={styles.proximasIconeSugestao}>+</div>
                  </div>
                  <div className={styles.proximasCardConteudo}>
                    <h3 className={styles.proximasCardTitulo}>Sugira uma instituição</h3>
                    <p className={styles.proximasCardDescricao}>Conhece alguma instituição que não está listada? Ajude-nos a melhorar nosso cadastro!</p>
                    <button 
                      className={styles.proximasBotaoSobre}
                      onClick={() => setMostrarFormulario(true)}
                    >
                      Sugerir Instituição
                    </button>
                  </div>
                </div>
              )}
            </div>

            {totalPaginas > 1 && (
              <div className={styles.proximasPaginacao}>
                <button 
                  className={styles.proximasBotaoPaginacao}
                  onClick={() => setPaginaAtual(p => Math.max(1, p - 1))}
                  disabled={paginaAtual === 1}
                >
                  Anterior
                </button>
                
                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    className={`${styles.proximasBotaoPaginacao} ${paginaAtual === num ? styles.proximasAtivo : ''}`}
                    onClick={() => setPaginaAtual(num)}
                  >
                    {num}
                  </button>
                ))}
                
                <button 
                  className={styles.proximasBotaoPaginacao}
                  onClick={() => setPaginaAtual(p => Math.min(totalPaginas, p + 1))}
                  disabled={paginaAtual === totalPaginas}
                >
                  Próximo
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {mostrarFormulario && (
        <div className={styles.proximasModal}>
          <div className={styles.proximasModalConteudo}>
            <button 
              className={styles.proximasModalFechar}
              onClick={() => setMostrarFormulario(false)}
            >
              ×
            </button>
            <h3>Sugerir Instituição</h3>
            <form onSubmit={handleSubmitSugestao}>
              <div className={styles.proximasFormGrupo}>
                <label>Nome da Instituição:</label>
                <input 
                  type="text" 
                  value={sugestao.nome}
                  onChange={(e) => setSugestao({...sugestao, nome: e.target.value})}
                  required
                />
              </div>
              <div className={styles.proximasFormGrupo}>
                <label>Estado:</label>
                <select 
                  value={sugestao.estado}
                  onChange={(e) => setSugestao({...sugestao, estado: e.target.value})}
                  required
                >
                  <option value="">Selecione</option>
                  {estados.map((estado) => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </select>
              </div>
              <div className={styles.proximasFormGrupo}>
                <label>Cidade:</label>
                <input 
                  type="text" 
                  value={sugestao.cidade}
                  onChange={(e) => setSugestao({...sugestao, cidade: e.target.value})}
                  required
                />
              </div>
              <div className={styles.proximasFormGrupo}>
                <label>Descrição:</label>
                <textarea 
                  value={sugestao.descricao}
                  onChange={(e) => setSugestao({...sugestao, descricao: e.target.value})}
                  required
                />
              </div>
              <div className={styles.proximasFormGrupo}>
                <label>Site (opcional):</label>
                <input 
                  type="url" 
                  value={sugestao.site}
                  onChange={(e) => setSugestao({...sugestao, site: e.target.value})}
                  placeholder="https://www.exemplo.com.br"
                />
              </div>
              <button 
                type="submit" 
                className={styles.proximasBotaoEnviar}
                disabled={carregando}
              >
                {carregando ? 'Enviando...' : 'Enviar Sugestão'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function InstituicoesPage() {
  return (
    <>
      <HomeInstituicao />
      <DivCelular />
      <SlideInstituicoes />
      <InstituicoesProximas />
    </>
  );
}

export default InstituicoesPage

import { useState, useEffect, useMemo } from 'react';
import { Search, MapPin, Star, Phone, Mail, X, Clock, DollarSign, Home, Award, User } from 'lucide-react';
import Styles from './HomeEducacao.module.css'
import iconPacientes from '../../assets/imgs/imgs-educadores/iconpacientes.png'
import iconEspecialistas from '../../assets/imgs/imgs-educadores/iconespecialistas.png'
import iconPacientes2 from '../../assets/imgs/imgs-educadores/iconpacientes.png'
import iconEspecialistas2 from '../../assets/imgs/imgs-educadores/iconespecialistas.png'
import iconNeuroeducador from '../../assets/imgs/imgs-educadores/icon-neuroeducador.png';
import iconProfessorEducacaoEspecial from '../../assets/imgs/imgs-educadores/icon-professor-educacao-especial.png';
import iconEducadorMultidisciplinar from '../../assets/imgs/imgs-educadores/icon-educador-multidisciplinar.png';
import iconPedagogoInclusao from '../../assets/imgs/imgs-educadores/icon-pedagogo-inclusao.png';
import iconCoordenadorInclusao from '../../assets/imgs/imgs-educadores/icon-coordenador-inclusao.png';
import iconPsicopedagogo from '../../assets/imgs/imgs-educadores/icon-psicopedagogo.png';
import iconEducadorApoio from '../../assets/imgs/imgs-educadores/icon-educador-apoio.png';
import fotouserEmili from '../../assets/imgs/imgs-educadores/fotouser-emili.png';
import fotouserHelena from '../../assets/imgs/imgs-educadores/fotouser-helena.png';
import fotouserRoberta from '../../assets/imgs/imgs-educadores/fotouser-roberta.png';

function HomeEducacao() {

const profissionais = [
    {
      id: 1,
      icon: iconNeuroeducador,
      title: 'Neuroeducador',
      description:
        'Aplica princípios de neurociência para otimizar o aprendizado de alunos com síndrome de Down, focando no desenvolvimento cognitivo.',
      link: '#',
    },
    {
      id: 2,
      icon: iconProfessorEducacaoEspecial,
      title: 'Professor de Educação Especial',
      description:
        'Desenvolve planos de ensino individualizados para promover a inclusão de alunos com síndrome de Down em ambientes escolares.',
      link: '#',
    },
    {
      id: 3,
      icon: iconEducadorMultidisciplinar,
      title: 'Educador Multidisciplinar',
      description:
        'Integra pedagogia e estratégias socioemocionais para apoiar o desenvolvimento integral de alunos com síndrome de Down.',
      link: '#',
    },
    {
      id: 4,
      icon: iconPedagogoInclusao,
      title: 'Pedagogo com Especialização em Inclusão',
      description:
        'Cria currículos adaptados para garantir a participação de alunos com síndrome de Down em salas de aula regulares.',
      link: '#',
    },
    {
      id: 5,
      icon: iconCoordenadorInclusao,
      title: 'Coordenador de Inclusão Escolar',
      description:
        'Gerencia programas de inclusão, treinando professores para apoiar alunos com síndrome de Down em ambientes escolares.',
      link: '#',
    },
    {
      id: 6,
      icon: iconPsicopedagogo,
      title: 'Psicopedagogo',
      description:
        'Intervém em dificuldades de aprendizagem, promovendo o desenvolvimento acadêmico de alunos com síndrome de Down.',
      link: '#',
    },
    {
      id: 7,
      icon: iconEducadorApoio,
      title: 'Educador de Apoio Escolar',
      description:
        'Oferece suporte individualizado em sala de aula, auxiliando alunos com síndrome de Down a acompanhar as atividades.',
      link: '#',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const slidesPerView = window.innerWidth < 768 ? 1 : 3;
  const totalSlides = Math.ceil(profissionais.length / slidesPerView);

  const getCurrentSlideItems = () => {
    const start = currentSlide * slidesPerView;
    return profissionais.slice(start, start + slidesPerView);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    const handleResize = () => {
      const newSlidesPerView = window.innerWidth < 768 ? 1 : 3;
      const newTotalSlides = Math.ceil(profissionais.length / newSlidesPerView);
      if (currentSlide >= newTotalSlides) {
        setCurrentSlide(0);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentSlide, profissionais.length]);

  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState('');
  const [localizacaoSelecionada, setLocalizacaoSelecionada] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [modalAberto, setModalAberto] = useState(false);
  const [profissionalSelecionado, setProfissionalSelecionado] = useState(null);
  const profissionaisPorPagina = 4;

  const especialidades = [
    'Neuroeducador',
    'Professor de Educação Especial',
    'Educador Multidisciplinar',
    'Pedagogo com Especialização em Inclusão',
  'Coordenador de Inclusão Escolar',
  'Psicopedagogo',
  'Educador de Apoio Escolar'
  ];

  const estados = [
    'São Paulo, SP',
    'Rio de Janeiro, RJ', 
    'Minas Gerais, MG',
    'Paraná, PR',
    'Rio Grande do Sul, RS',
    'Bahia, BA',
    'Santa Catarina, SC',
    'Goiás, GO'
  ];

  const profissionaisEducadores = [
    // Neuroeducador
    {
      id: 1,
      nome: 'Prof. Mariana Silva',
      especialidade: 'Neuroeducador',
      credencial: 'CNE 123456/SP',
      experiencia: '12 anos de experiência em neuroeducação para pessoas com síndrome de Down.',
      descricao: 'Especialista em aplicar princípios de neurociência para otimizar o aprendizado de alunos com síndrome de Down, utilizando estratégias personalizadas para desenvolvimento cognitivo.',
      localizacao: 'São Paulo, SP',
      avaliacao: 5.0,
      telefone: '(11) 99999-9999',
      email: 'mariana.silva@email.com',
      foto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      valorConsulta: 'R$ 150,00',
      tipoAtendimento: 'Presencial e Online',
      localAtendimento: 'Centro de Neuroeducação - Vila Mariana',
      horarioFuncionamento: 'Seg-Sex: 08:00-18:00 | Sáb: 08:00-12:00',
      formacao: 'Graduação em Pedagogia - USP, Especialização em Neuroeducação',
      abordagens: ['Neuroeducação', 'Estratégias Cognitivas', 'Aprendizagem Personalizada']
    },
    {
      id: 2,
      nome: 'Prof. João Mendes',
      especialidade: 'Neuroeducador',
      credencial: 'CNE 654321/RJ',
      experiencia: '10 anos de experiência em neurociência aplicada à educação.',
      descricao: 'Focado em desenvolver habilidades cognitivas e socioemocionais em alunos com síndrome de Down, utilizando abordagens baseadas em neurociência.',
      localizacao: 'Rio de Janeiro, RJ',
      avaliacao: 4.9,
      telefone: '(21) 98888-8888',
      email: 'joao.mendes@email.com',
      foto: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      valorConsulta: 'R$ 130,00',
      tipoAtendimento: 'Presencial',
      localAtendimento: 'Instituto de Neuroeducação - Copacabana',
      horarioFuncionamento: 'Seg-Sex: 09:00-17:00',
      formacao: 'Graduação em Psicologia - UFRJ, Mestrado em Neuroeducação',
      abordagens: ['Neurociência Educacional', 'Desenvolvimento Cognitivo', 'Treinamento de Habilidades']
    },
    
    // Professor de Educação Especial
    {
      id: 3,
      nome: 'Profa. Clara Ferreira',
      especialidade: 'Professor de Educação Especial',
      credencial: 'CNE 789012/SP',
      experiencia: '8 anos de experiência em educação inclusiva para síndrome de Down.',
      descricao: 'Especialista em criar planos de ensino individualizados para alunos com síndrome de Down, promovendo inclusão e desenvolvimento acadêmico em ambientes escolares.',
      localizacao: 'São Paulo, SP',
      avaliacao: 4.8,
      telefone: '(11) 97777-7777',
      email: 'clara.ferreira@email.com',
      foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      valorConsulta: 'R$ 140,00',
      tipoAtendimento: 'Presencial e Online',
      localAtendimento: 'Escola Inclusiva - Moema',
      horarioFuncionamento: 'Seg-Sex: 08:00-17:00 | Sáb: 08:00-13:00',
      formacao: 'Graduação em Pedagogia - PUC-SP, Especialização em Educação Especial',
      abordagens: ['Educação Inclusiva', 'Planejamento Educacional Individualizado', 'Adaptação Curricular']
    },
    {
      id: 4,
      nome: 'Prof. Pedro Almeida',
      especialidade: 'Professor de Educação Especial',
      credencial: 'CNE 456789/MG',
      experiencia: '7 anos de experiência em inclusão escolar.',
      descricao: 'Trabalho com adaptações curriculares e estratégias inclusivas para apoiar o aprendizado e a socialização de alunos com síndrome de Down.',
      localizacao: 'Minas Gerais, MG',
      avaliacao: 4.7,
      telefone: '(31) 96666-6666',
      email: 'pedro.almeida@email.com',
      foto: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
      valorConsulta: 'R$ 120,00',
      tipoAtendimento: 'Presencial',
      localAtendimento: 'Centro de Educação Inclusiva - Savassi',
      horarioFuncionamento: 'Seg-Sex: 13:00-19:00',
      formacao: 'Graduação em Pedagogia - UFMG, Especialização em Educação Inclusiva',
      abordagens: ['Inclusão Escolar', 'Ensino Colaborativo', 'Desenvolvimento Socioemocional']
    },

    // Educador Multidisciplinar
    {
      id: 5,
      nome: 'Profa. Laura Santos',
      especialidade: 'Educador Multidisciplinar',
      credencial: 'CNE 234567/SP',
      experiencia: '15 anos de experiência em educação holística para síndrome de Down.',
      descricao: 'Integro pedagogia, psicologia e estratégias socioemocionais para apoiar o desenvolvimento integral de alunos com síndrome de Down em ambientes inclusivos.',
      localizacao: 'São Paulo, SP',
      avaliacao: 4.9,
      telefone: '(11) 95555-5555',
      email: 'laura.santos@email.com',
      foto: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      valorConsulta: 'R$ 200,00',
      tipoAtendimento: 'Presencial e Online',
      localAtendimento: 'Instituto de Educação Holística - Bela Vista',
      horarioFuncionamento: 'Seg-Sex: 07:00-16:00',
      formacao: 'Graduação em Pedagogia - USP, Mestrado em Educação Multidisciplinar',
      abordagens: ['Educação Holística', 'Desenvolvimento Socioemocional', 'Integração Multidisciplinar']
    },
    {
      id: 6,
      nome: 'Profa. Sofia Ribeiro',
      especialidade: 'Educador Multidisciplinar',
      credencial: 'CNE 345678/RJ',
      experiencia: '10 anos de experiência em consultoria educacional inclusiva.',
      descricao: 'Especialista em abordagens multidisciplinares, combinando estratégias pedagógicas e socioemocionais para promover a inclusão de alunos com síndrome de Down.',
      localizacao: 'Rio de Janeiro, RJ',
      avaliacao: 5.0,
      telefone: '(21) 94444-4444',
      email: 'sofia.ribeiro@email.com',
      foto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      valorConsulta: 'R$ 180,00',
      tipoAtendimento: 'Presencial',
      localAtendimento: 'Centro de Educação Multidisciplinar - Ipanema',
      horarioFuncionamento: 'Seg-Sex: 08:00-17:00',
      formacao: 'Graduação em Pedagogia - UFRJ, Especialização em Educação Multidisciplinar',
      abordagens: ['Consultoria Educacional', 'Inclusão Multidisciplinar', 'Treinamento de Professores']
    }
  ];

  // Filtrar profissionais baseado nos filtros selecionados
  const profissionaisFiltrados = useMemo(() => {
    return profissionaisEducadores.filter(profissional => {
      const matchEspecialidade = !especialidadeSelecionada || profissional.especialidade === especialidadeSelecionada;
      const matchLocalizacao = !localizacaoSelecionada || profissional.localizacao === localizacaoSelecionada;
      return matchEspecialidade && matchLocalizacao;
    });
  }, [especialidadeSelecionada, localizacaoSelecionada]);

  // Calcular paginação
  const totalPaginas = Math.ceil(profissionaisFiltrados.length / profissionaisPorPagina);
  const indexInicio = (paginaAtual - 1) * profissionaisPorPagina;
  const profissionaisPagina = profissionaisFiltrados.slice(indexInicio, indexInicio + profissionaisPorPagina);

  // Reset página quando filtros mudam
  const handleFiltroChange = (tipo, valor) => {
    if (tipo === 'especialidade') {
      setEspecialidadeSelecionada(valor);
    } else {
      setLocalizacaoSelecionada(valor);
    }
    setPaginaAtual(1);
  };

  const renderEstrelas = (avaliacao) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < Math.floor(avaliacao) ? Styles['verde-star-filled'] : Styles['verde-star-empty']}
      />
    ));
  };

  const abrirModal = (profissional) => {
    setProfissionalSelecionado(profissional);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setProfissionalSelecionado(null);
  };


  return (
    <main className='Educadores'>
      <section className={Styles.verdeSaudeContainer}>
        <div className={Styles.verdeSaudeConteudo}>
          <header className={Styles.verdeSaudeCabecalho}>
            <h1>BOAS-VINDAS A EDUCAÇÃO ACENIS !</h1>
            <h2>Educação especializada para crianças<br />com síndrome de Down</h2>
            <p>Professores preparados para estimular o desenvolvimento integral dos alunos.</p>
            <button className={Styles.verdeSaudeBotao}>
              <a href="#servicosSaude"> Saiba mais </a>
            </button>
          </header>
        </div>

        {/* Estatística agora fora do verdeSaudeConteudo */}
        <div className={Styles.verdeEstatisticaContainer}>
          <div className={Styles.verdeSaudeCardUnico}>
            <div className={Styles.verdeSaudeItemEstatistica}>
              <div className={Styles.verdeSaudeItemContent}>
                <img 
                  src={iconPacientes} 
                  alt="Ícone de pacientes" 
                  className={Styles.verdeSaudeIconeEstatistica} 
                />
                <p>+80% das crianças mostram progresso em habilidades sociais.</p>
              </div>
            </div>

            <div className={Styles.verdeSaudeDivisoria}></div>

            <div className={Styles.verdeSaudeItemEstatistica}>
              <div className={Styles.verdeSaudeItemContent}>
                <img 
                  src={iconEspecialistas} 
                  alt="Ícone de especialistas" 
                  className={Styles.verdeSaudeIconeEstatistica} 
                />
                <p>Mais de 1.500 famílias atendidas em todo o Brasil.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={Styles.verdeCaixacelular}>
        <div className={Styles.verdeDivcelular}>
            <img src={iconPacientes2} alt="Ícone de pacientes" className={Styles.verdeCelularIconeEstatistica} />
            <p>+80% das crianças mostram <br/> progresso em habilidades sociais.</p>
        </div>

        <div className={Styles.verdeDivcelular}>
            <img src={iconEspecialistas2} alt="Ícone de especialistas" className={Styles.verdeCelularIconeEstatistica} />
            <p>Mais de 1.500 famílias <br/>  atendidas em todo o Brasil.</p>
        </div>
      </section>       
      <section className={Styles['verde-educacao-container']}>
        <div className={Styles['verde-educacao-content']}>
          <h2 className={Styles['verde-educacao-title']}>Nossa Equipe de Educação Inclusiva</h2>

          <div className={Styles['verde-educacao-slider']}>
            <button
              className={Styles['verde-educacao-nav-button']}
              onClick={prevSlide}
              aria-label="Slide anterior"
            >
              ‹
            </button>

            <div className={Styles['verde-educacao-cards']}>
              {getCurrentSlideItems().map((profissional) => (
                <div key={profissional.id} className={Styles['verde-educacao-card']}>
                  <div className={Styles['verde-educacao-icon-container']}>
                    <img
                      src={profissional.icon}
                      alt={`Ícone ${profissional.title}`}
                      className={Styles['verde-educacao-icon']}
                    />
                  </div>
                  <h3 className={Styles['verde-educacao-card-title']}>{profissional.title}</h3>
                  <p className={Styles['verde-educacao-card-description']}>
                    {profissional.description}
                  </p>
                  <a href={profissional.link} className={Styles['verde-educacao-card-button']}>
                    VEJA A LISTA COMPLETA
                  </a>
                </div>
              ))}
            </div>

            <button
              className={Styles['verde-educacao-nav-button']}
              onClick={nextSlide}
              aria-label="Próximo slide"
            >
              ›
            </button>
          </div>

          <div className={Styles['verde-educacao-dots']}>
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                className={`${Styles['verde-educacao-dot']} ${
                  index === currentSlide ? Styles['verde-educacao-dot-active'] : ''
                }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
      <section className={Styles.verdeDepoimentosSection}>
        <div className={Styles.verdeContainer}>
          <div className={Styles.verdeHeader}>
            <div className={Styles.verdeTituloContainer}>
              <h2 className={Styles.verdeTitulo}>DEPOIMENTOS</h2>
              <h3 className={Styles.verdeSubtitulo}>O que os clientes dizem sobre os profissionais Acenis?</h3>
            </div>
            
            <div className={Styles.verdeCardGrande}>
              <p className={Styles.verdeDepoimentoTexto}>
                "Depois que começamos o acompanhamento com a psicopedagoga da plataforma, meu filho avançou muito na escola."
              </p>
              <div className={Styles.verdeAutorContainer}>
                <div className={Styles.verdeUserIcon}>
                  <img src={fotouserHelena} alt="Helena Silva" className={Styles.verdeUserImage} />
                </div>
                <p className={Styles.verdeDepoimentoAutor}>Helena Silva</p>
              </div>
            </div>
          </div>
  
          <div className={Styles.verdeCardsPequenos}>
            <div className={Styles.verdeCardPequeno}>
              <p className={Styles.verdeDepoimentoTexto}>
                "Me senti acolhida desde o primeiro atendimento. Eles nos ajudam a enxergar possibilidades onde só víamos dificuldades."
              </p>
              <div className={Styles.verdeAutorContainer}>
                <div className={Styles.verdeUserIcon}>
                  <img src={fotouserEmili} alt="Emili Souza" className={Styles.verdeUserImage} />
                </div>
                <p className={Styles.verdeDepoimentoAutor}>Emili Souza</p>
              </div>
            </div>
  
            <div className={Styles.verdeCardPequeno}>
              <p className={Styles.verdeDepoimentoTexto}>
                "Cada consulta é um passo a mais no desenvolvimento do meu filho. Finalmente encontrei profissionais que olham além do diagnóstico."
              </p>
              <div className={Styles.verdeAutorContainer}>
                <div className={Styles.verdeUserIcon}>
                  <img src={fotouserRoberta} alt="Roberta Souza" className={Styles.verdeUserImage} />
                </div>
                <p className={Styles.verdeDepoimentoAutor}>Roberta Souza</p>
              </div>
            </div>
          </div>
        </div>
      </section>
        <section className={Styles['verde-container-principal']}>
        <div className={Styles['verde-container-conteudo']}>
          {/* Header */}
          <div className={Styles['verde-header']}>
            <h1 className={Styles['verde-titulo-principal']}>
              Especialistas em Educação para <br/> Síndrome de Down
            </h1>
            <p className={Styles['verde-subtitulo']}>
              Encontre profissionais especializados em educação e inclusão para pessoas com síndrome de Down. Nossa equipe está pronta para apoiar o desenvolvimento e a inclusão educacional.
            </p>
          </div>

          {/* Filtros */}
          <div className={Styles['verde-filtros-container']}>
            <div className={Styles['verde-filtros-grid']}>
              <div className={Styles['verde-filtro-grupo']}>
                <label className={Styles['verde-filtro-label']}>
                  <Search className={`${Styles['verde-filtro-icon']} ${Styles['verde-filtro-icon-blue']}`} />
                  Especialidade
                </label>
                <select
                  value={especialidadeSelecionada}
                  onChange={(e) => handleFiltroChange('especialidade', e.target.value)}
                  className={Styles['verde-filtro-select']}
                >
                  <option value="">Todas as especialidades</option>
                  {especialidades.map(esp => (
                    <option key={esp} value={esp}>{esp}</option>
                  ))}
                </select>
              </div>
              
              <div className={Styles['verde-filtro-grupo']}>
                <label className={Styles['verde-filtro-label']}>
                  <MapPin className={`${Styles['verde-filtro-icon']} ${Styles['verde-filtro-icon-purple']}`} />
                  Localização
                </label>
                <select
                  value={localizacaoSelecionada}
                  onChange={(e) => handleFiltroChange('localização', e.target.value)}
                  className={Styles['verde-filtro-select']}
                >
                  <option value="">Todas as localizações</option>
                  {estados.map(estado => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </select>
              </div>
              
              <button className={Styles['verde-btn-buscar']}>
                <Search size={18} />
                Buscar
              </button>
            </div>
          </div>

          {/* Resultados */}
          <div className={Styles['verde-resultados-info']}>
            <p className={Styles['verde-resultados-texto']}>
              <span className={Styles['verde-resultado-numero']}>{profissionaisFiltrados.length}</span> profissionais encontrados
              {especialidadeSelecionada && <span> em <span className={Styles['verde-filtro-ativo']}>{especialidadeSelecionada}</span></span>}
              {localizacaoSelecionada && <span> em <span className={Styles['verde-filtro-ativo']}>{localizacaoSelecionada}</span></span>}
            </p>
          </div>

          {/* Cards dos Profissionais */}
          <div className={Styles['verde-cards-grid']}>
            {profissionaisPagina.map(profissional => (
              <div key={profissional.id} className={Styles['verde-card-profissional']}>
                <div className={Styles['verde-card-conteudo']}>
                  <div className={Styles['verde-profissional-header']}>
                    <img
                      src={profissional.foto}
                      alt={profissional.nome}
                      className={Styles['verde-profissional-foto']}
                    />
                    <div className={Styles['verde-profissional-info']}>
                      <h3 className={Styles['verde-profissional-nome']}>{profissional.nome}</h3>
                      <p className={Styles['verde-profissional-especialidade']}>{profissional.especialidade}</p>
                      <p className={Styles['verde-profissional-crp']}>{profissional.credencial}</p>
                      <div className={Styles['verde-avaliacao-container']}>
                        {renderEstrelas(profissional.avaliacao)}
                        <span className={Styles['verde-avaliacao-numero']}>{profissional.avaliacao}</span>
                      </div>
                      <div className={Styles['verde-localizacao-container']}>
                        <MapPin size={14} className={Styles['verde-localizacao-icon']} />
                        {profissional.localizacao}
                      </div>
                    </div>
                  </div>
                  
                  <p className={Styles['verde-profissional-descricao']}>
                    {profissional.descricao}
                  </p>
                  
                  <div className={Styles['verde-card-acoes']}>
                    <button 
                      onClick={() => abrirModal(profissional)}
                      className={Styles['verde-btn-ver-info']}
                    >
                      Ver Informações Completas
                    </button>
                    
                    <div className={Styles['verde-contato-info']}>
                      <div className={Styles['verde-contato-item']}>
                        <Phone size={14} className={`${Styles['verde-contato-icon']} ${Styles['verde-contato-icon-green']}`} />
                        <span className={Styles['verde-contato-texto']}>{profissional.telefone}</span>
                      </div>
                      <div className={Styles['verde-contato-item']}>
                        <Mail size={14} className={`${Styles['verde-contato-icon']} ${Styles['verde-contato-icon-orange']}`} />
                        <span className={Styles['verde-contato-texto']}>{profissional.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Paginação */}
          {totalPaginas > 1 && (
            <div className={Styles['verde-paginacao']}>
              <button
                onClick={() => setPaginaAtual(prev => Math.max(1, prev - 1))}
                disabled={paginaAtual === 1}
                className={Styles['verde-btn-paginacao']}
              >
                Anterior
              </button>
              
              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(numero => (
                <button
                  key={numero}
                  onClick={() => setPaginaAtual(numero)}
                  className={`${Styles['verde-btn-paginacao']} ${numero === paginaAtual ? Styles['verde-btn-paginacao-ativo'] : ''}`}
                >
                  {numero}
                </button>
              ))}
              
              <button
                onClick={() => setPaginaAtual(prev => Math.min(totalPaginas, prev + 1))}
                disabled={paginaAtual === totalPaginas}
                className={Styles['verde-btn-paginacao']}
              >
                Próxima
              </button>
            </div>
          )}

          {/* Caso não encontre resultados */}
          {profissionaisFiltrados.length === 0 && (
            <div className={Styles['verde-sem-resultados']}>
              <div className={Styles['verde-sem-resultados-icon']}>
                <Search size={48} />
              </div>
              <h3 className={Styles['verde-sem-resultados-titulo']}>Nenhum profissional encontrado</h3>
              <p className={Styles['verde-sem-resultados-texto']}>Tente ajustar os filtros de busca para encontrar mais resultados.</p>
            </div>
          )}
        </div>

        {/* Modal */}
        {modalAberto && profissionalSelecionado && (
          <div className={Styles['verde-modal-overlay']}>
            <div className={Styles['verde-modal-container']}>
              <div className={Styles['verde-modal-header']}>
                <h2 className={Styles['verde-modal-titulo']}>Informações do Profissional</h2>
                <button 
                  onClick={fecharModal}
                  className={Styles['verde-btn-fechar-modal']}
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className={Styles['verde-modal-conteudo']}>
                {/* Header do profissional */}
                <div className={Styles['verde-modal-profissional-header']}>
                  <img
                    src={profissionalSelecionado.foto}
                    alt={profissionalSelecionado.nome}
                    className={Styles['verde-modal-profissional-foto']}
                  />
                  <div className={Styles['verde-modal-profissional-info']}>
                    <h3 className={Styles['verde-modal-profissional-nome']}>{profissionalSelecionado.nome}</h3>
                    <p className={Styles['verde-modal-profissional-especialidade']}>{profissionalSelecionado.especialidade}</p>
                    <p className={Styles['verde-modal-profissional-crp']}>{profissionalSelecionado.credencial}</p>
                    <div className={Styles['verde-modal-avaliacao']}>
                      {renderEstrelas(profissionalSelecionado.avaliacao)}
                      <span className={Styles['verde-modal-avaliacao-numero']}>{profissionalSelecionado.avaliacao}</span>
                    </div>
                    <div className={Styles['verde-modal-localizacao']}>
                      <MapPin size={16} className={Styles['verde-modal-localizacao-icon']} />
                      {profissionalSelecionado.localizacao}
                    </div>
                  </div>
                </div>

                {/* Informações principais */}
                <div className={Styles['verde-info-cards-grid']}>
                  <div className={`${Styles['verde-info-card']} ${Styles['verde-info-card-green']}`}>
                    <div className={Styles['verde-info-card-header']}>
                      <div className={`${Styles['verde-info-card-icon']} ${Styles['verde-info-card-icon-green']}`}>
                        <DollarSign size={20} />
                      </div>
                      <h4 className={Styles['verde-info-card-titulo']}>Valor da Consulta</h4>
                    </div>
                    <p className={`${Styles['verde-info-card-valor']} ${Styles['verde-info-card-valor-green']}`}>{profissionalSelecionado.valorConsulta}</p>
                  </div>

                  <div className={`${Styles['verde-info-card']} ${Styles['verde-info-card-blue']}`}>
                    <div className={Styles['verde-info-card-header']}>
                      <div className={`${Styles['verde-info-card-icon']} ${Styles['verde-info-card-icon-blue']}`}>
                        <User size={20} />
                      </div>
                      <h4 className={Styles['verde-info-card-titulo']}>Tipo de Atendimento</h4>
                    </div>
                    <p className={`${Styles['verde-info-card-valor']} ${Styles['verde-info-card-valor-blue']}`}>{profissionalSelecionado.tipoAtendimento}</p>
                  </div>

                  <div className={`${Styles['verde-info-card']} ${Styles['verde-info-card-purple']}`}>
                    <div className={Styles['verde-info-card-header']}>
                      <div className={`${Styles['verde-info-card-icon']} ${Styles['verde-info-card-icon-purple']}`}>
                        <Home size={20} />
                      </div>
                      <h4 className={Styles['verde-info-card-titulo']}>Local de Atendimento</h4>
                    </div>
                    <p className={Styles['verde-info-card-texto']}>{profissionalSelecionado.localAtendimento}</p>
                  </div>

                  <div className={`${Styles['verde-info-card']} ${Styles['verde-info-card-orange']}`}>
                    <div className={Styles['verde-info-card-header']}>
                      <div className={`${Styles['verde-info-card-icon']} ${Styles['verde-info-card-icon-orange']}`}>
                        <Clock size={20} />
                      </div>
                      <h4 className={Styles['verde-info-card-titulo']}>Horário de Funcionamento</h4>
                    </div>
                    <p className={Styles['verde-info-card-texto']}>{profissionalSelecionado.horarioFuncionamento}</p>
                  </div>
                </div>

                {/* Descrição e experiência */}
                <div className={Styles['verde-descricao-container']}>
                  <h4 className={Styles['verde-secao-titulo']}>Sobre o Profissional</h4>
                  <p className={Styles['verde-descricao-texto']}>{profissionalSelecionado.descricao}</p>
                  <p className={Styles['verde-experiencia-texto']}>{profissionalSelecionado.experiencia}</p>
                </div>

                {/* Formação */}
                <div className={Styles['verde-formacao-container']}>
                  <div className={Styles['verde-formacao-header']}>
                    <div className={Styles['verde-formacao-icon']}>
                      <Award size={20} />
                    </div>
                    <h4 className={Styles['verde-secao-titulo']}>Formação</h4>
                  </div>
                  <p className={Styles['verde-formacao-texto']}>{profissionalSelecionado.formacao}</p>
                </div>

                {/* Abordagens */}
                <div className={Styles['verde-abordagens-container']}>
                  <h4 className={Styles['verde-secao-titulo']}>Abordagens e Especialidades</h4>
                  <div className={Styles['verde-abordagens-tags']}>
                    {profissionalSelecionado.abordagens.map((abordagem, index) => (
                      <span 
                        key={index}
                        className={Styles['verde-abordagem-tag']}
                      >
                        {abordagem}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contato */}
                <div className={Styles['verde-contato-container']}>
                  <h4 className={Styles['verde-secao-titulo']}>Informações de Contato</h4>
                  <div className={Styles['verde-contato-grid']}>
                    <div className={Styles['verde-contato-item-modal']}>
                      <div className={`${Styles['verde-contato-icon-container']} ${Styles['verde-contato-icon-container-green']}`}>
                        <Phone size={20} />
                      </div>
                      <div className={Styles['verde-contato-info-modal']}>
                        <p className={Styles['verde-contato-label']}>Telefone</p>
                        <p className={Styles['verde-contato-valor']}>{profissionalSelecionado.telefone}</p>
                      </div>
                    </div>
                    <div className={Styles['verde-contato-item-modal']}>
                      <div className={`${Styles['verde-contato-icon-container']} ${Styles['verde-contato-icon-container-orange']}`}>
                        <Mail size={20} />
                      </div>
                      <div className={Styles['verde-contato-info-modal']}>
                        <p className={Styles['verde-contato-label']}>E-mail</p>
                        <p className={Styles['verde-contato-valor']}>{profissionalSelecionado.email}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botões de ação */}
                <div className={Styles['verde-modal-acoes']}>
                  <button className={Styles['verde-btn-contato']}>
                    <Phone size={18} />
                    Entrar em Contato
                  </button>
                  <button className={Styles['verde-btn-agendar']}>
                    <Mail size={18} />
                    Agendar Consulta
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

export default HomeEducacao

import { useState, useEffect, useMemo } from 'react';
import { Search, MapPin, Star, Phone, Mail, X, Clock, DollarSign, Home, Award, User } from 'lucide-react';
import Styles from './HomeSaude.module.css'
import iconPacientes from '../../assets/imgs/iconpacientes.png'
import iconEspecialistas from '../../assets/imgs/iconespecialistas.png'
import iconAnos from '../../assets/imgs/iconanos.png'
import iconPacientes2 from '../../assets/imgs/iconpacientes.png'
import iconEspecialistas2 from '../../assets/imgs/iconespecialistas.png'
import iconAnos2 from '../../assets/imgs/iconanos.png'
import iconPsiquiatra from '../../assets/imgs/icon-psiquiatra.png';
import iconPsicologo from '../../assets/imgs/icon-psicologo.png';
import iconPsicopedagogo from '../../assets/imgs/icon-psicopedagogo.png';
import iconFonoaudiologo from '../../assets/imgs/icon-fonoaudiologo.png';
import iconTerapeuta from '../../assets/imgs/icon-terapeuta.png';
import iconFisioterapeuta from '../../assets/imgs/icon-fisioterapeuta.png';
import iconNutricionista from '../../assets/imgs/icon-nutricionista.png';
import iconPediatra from '../../assets/imgs/icon-pediatra.png';
import iconNeurologista from '../../assets/imgs/icon-neurologista.png';
import fotouserEmili from '../../assets/imgs/fotouser-emili.png';
import fotouserHelena from '../../assets/imgs/fotouser-helena.png';
import fotouserRoberta from '../../assets/imgs/fotouser-roberta.png';

function HomeSaude() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const profissionais = [
    {
      id: 1,
      title: 'Psicólogo',
      icon: iconPsicologo,
      description: 'Ajuda no desenvolvimento emocional, autoestima e enfrentamento de desafios.',
      link: '#psicologo'
    },
    {
      id: 2,
      title: 'Psicopedagogo',
      icon: iconPsicopedagogo,
      description: 'Atua nas dificuldades de aprendizagem, propondo estratégias personalizadas.',
      link: '#psicopedagogo'
    },
    {
      id: 3,
      title: 'Psiquiatra',
      icon: iconPsiquiatra,
      description: 'Cuida da saúde mental, atenção, comportamento e possíveis comorbidades.',
      link: '#psiquiatra'
    },
    {
      id: 4,
      title: 'Fonoaudiólogo',
      icon: iconFonoaudiologo,
      description: 'Trabalha com comunicação, linguagem, fala e processos de deglutição.',
      link: '#fonoaudiologo'
    },
    {
      id: 5,
      title: 'Terapeuta Ocupacional',
      icon: iconTerapeuta,
      description: 'Desenvolve habilidades para atividades do dia a dia e promoção da autonomia.',
      link: '#terapeuta-ocupacional'
    },
    {
      id: 6,
      title: 'Fisioterapeuta',
      icon: iconFisioterapeuta,
      description: 'Atua no desenvolvimento motor, coordenação física e reabilitação.',
      link: '#fisioterapeuta'
    },
    {
      id: 7,
      title: 'Nutricionista',
      icon: iconNutricionista,
      description: 'Cuida da alimentação e nutrição adequada para o desenvolvimento saudável.',
      link: '#nutricionista'
    },
    {
      id: 8,
      title: 'Pediatra',
      icon: iconPediatra,
      description: 'Acompanha o desenvolvimento geral e cuida da saúde física da criança.',
      link: '#pediatra'
    },
    {
      id: 9,
      title: 'Neurologista',
      icon: iconNeurologista,
      description: 'Especialista em sistema nervoso e acompanhamento do desenvolvimento neurológico.',
      link: '#neurologista'
    }
  ];

  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(profissionais.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getCurrentSlideItems = () => {
    const startIndex = currentSlide * itemsPerSlide;
    return profissionais.slice(startIndex, startIndex + itemsPerSlide);
  };

const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState('');
  const [localizacaoSelecionada, setLocalizacaoSelecionada] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [modalAberto, setModalAberto] = useState(false);
  const [profissionalSelecionado, setProfissionalSelecionado] = useState(null);
  const profissionaisPorPagina = 4;

  const especialidades = [
    'Psicólogo',
    'Psicopedagogo', 
    'Psiquiatra',
    'Fonoaudiólogo',
    'Terapeuta Ocupacional',
    'Fisioterapeuta',
    'Nutricionista',
    'Pediatra',
    'Neurologista'
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

  const profissionaisSaude = [
    // Psicólogos
    {
      id: 1,
      nome: 'Dra. Larissa Souza',
      especialidade: 'Psicólogo',
      crp: 'CRP 06/123456',
      experiencia: '15 anos de experiência em desenvolvimento infantil.',
      descricao: 'Especialista em psicologia clínica com foco em desenvolvimento infantil e adolescente. Atendo com uma abordagem humanizada e personalizada, utilizando técnicas cognitivo-comportamentais.',
      localizacao: 'São Paulo, SP',
      avaliacao: 5.0,
      telefone: '(11) 99999-9999',
      email: 'larissa.souza@email.com',
      foto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      valorConsulta: 'R$ 180,00',
      tipoAtendimento: 'Presencial e Online',
      localAtendimento: 'Clínica Mente Saudável - Vila Madalena',
      horarioFuncionamento: 'Seg-Sex: 08:00-18:00 | Sáb: 08:00-12:00',
      formacao: 'Graduação em Psicologia - USP, Especialização em Terapia Cognitivo-Comportamental',
      abordagens: ['Terapia Cognitivo-Comportamental', 'Psicoterapia Infantil', 'Orientação de Pais']
    },
    {
      id: 2,
      nome: 'Dr. Carlos Eduardo',
      especialidade: 'Psicólogo',
      crp: 'CRP 06/654321',
      experiencia: '12 anos de experiência em terapia familiar.',
      descricao: 'Especialista em psicologia clínica com foco em desenvolvimento infantil e adolescente. Atendo com uma abordagem humanizada e personalizada. Atendo com uma abordagem diferente.',
      localizacao: 'Rio de Janeiro, RJ',
      avaliacao: 4.9,
      telefone: '(21) 98888-8888',
      email: 'carlos.eduardo@email.com',
      foto: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      valorConsulta: 'R$ 160,00',
      tipoAtendimento: 'Presencial',
      localAtendimento: 'Instituto de Psicologia Familiar - Copacabana',
      horarioFuncionamento: 'Seg-Sex: 09:00-17:00',
      formacao: 'Graduação em Psicologia - UFRJ, Mestrado em Terapia Familiar',
      abordagens: ['Terapia Familiar Sistêmica', 'Psicoterapia de Casal', 'Mediação Familiar']
    },
    
    // Psicopedagogos
    {
      id: 3,
      nome: 'Dra. Ana Paula Lima',
      especialidade: 'Psicopedagogo',
      crp: 'ABPp 123/SP',
      experiencia: '10 anos de experiência em dificuldades de aprendizagem.',
      descricao: 'Psicopedagoga especializada em transtornos de aprendizagem, com metodologias inovadoras para cada caso específico.',
      localizacao: 'São Paulo, SP',
      avaliacao: 4.8,
      telefone: '(11) 97777-7777',
      email: 'ana.lima@email.com',
      foto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      valorConsulta: 'R$ 140,00',
      tipoAtendimento: 'Presencial e Online',
      localAtendimento: 'Centro de Aprendizagem Especializada - Moema',
      horarioFuncionamento: 'Seg-Sex: 08:00-17:00 | Sáb: 08:00-13:00',
      formacao: 'Graduação em Pedagogia - PUC-SP, Especialização em Psicopedagogia Clínica',
      abordagens: ['Avaliação Psicopedagógica', 'Intervenção em Dislexia', 'Reabilitação Cognitiva']
    },
    {
      id: 4,
      nome: 'Dr. Roberto Santos',
      especialidade: 'Psicopedagogo',
      crp: 'ABPp 456/MG',
      experiencia: '8 anos de experiência em educação especial.',
      descricao: 'Focado em estratégias personalizadas de aprendizagem, trabalho com crianças com necessidades especiais há mais de 8 anos.',
      localizacao: 'Minas Gerais, MG',
      avaliacao: 4.7,
      telefone: '(31) 96666-6666',
      email: 'roberto.santos@email.com',
      foto: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
      valorConsulta: 'R$ 120,00',
      tipoAtendimento: 'Presencial',
      localAtendimento: 'Núcleo de Desenvolvimento Infantil - Savassi',
      horarioFuncionamento: 'Seg-Sex: 13:00-19:00',
      formacao: 'Graduação em Pedagogia - UFMG, Especialização em Educação Especial',
      abordagens: ['Educação Inclusiva', 'Adaptação Curricular', 'Tecnologia Assistiva']
    },

    // Psiquiatras
    {
      id: 5,
      nome: 'Dr. Fernando Oliveira',
      especialidade: 'Psiquiatra',
      crp: 'CRM 12345/SP',
      experiencia: '18 anos de experiência em psiquiatria infantil.',
      descricao: 'Psiquiatra especializado em TDAH, ansiedade e transtornos do espectro autista. Atendimento humanizado e baseado em evidências.',
      localizacao: 'São Paulo, SP',
      avaliacao: 4.9,
      telefone: '(11) 95555-5555',
      email: 'fernando.oliveira@email.com',
      foto: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      valorConsulta: 'R$ 350,00',
      tipoAtendimento: 'Presencial e Online',
      localAtendimento: 'Hospital Sírio-Libanês - Bela Vista',
      horarioFuncionamento: 'Seg-Sex: 07:00-16:00',
      formacao: 'Graduação em Medicina - USP, Residência em Psiquiatria - HC-FMUSP',
      abordagens: ['Psiquiatria Infantil', 'Neuropsiquiatria', 'Psicofarmacologia']
    },
    {
      id: 6,
      nome: 'Dra. Marina Costa',
      especialidade: 'Psiquiatra',
      crp: 'CRM 67890/RJ',
      experiencia: '14 anos de experiência em neuropsiquiatria.',
      descricao: 'Especialista em transtornos neuropsiquiátricos infantis, com abordagem integrativa entre medicação e terapias complementares.',
      localizacao: 'Rio de Janeiro, RJ',
      avaliacao: 5.0,
      telefone: '(21) 94444-4444',
      email: 'marina.costa@email.com',
      foto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      valorConsulta: 'R$ 300,00',
      tipoAtendimento: 'Presencial',
      localAtendimento: 'Clínica Neuropsiquiátrica Infantil - Ipanema',
      horarioFuncionamento: 'Seg-Sex: 08:00-17:00',
      formacao: 'Graduação em Medicina - UFRJ, Especialização em Neuropsiquiatria',
      abordagens: ['Neuropsiquiatria Infantil', 'Medicina Integrativa', 'Tratamento Multimodal']
    }
  ];

  // Filtrar profissionais baseado nos filtros selecionados
  const profissionaisFiltrados = useMemo(() => {
    return profissionaisSaude.filter(profissional => {
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
        className={i < Math.floor(avaliacao) ? Styles['star-filled'] : Styles['star-empty']}
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
    <main className='teste'>
      <div className={Styles.saudeContainer}>
        <div className={Styles.saudeConteudo}>
          <header className={Styles.saudeCabecalho}>
            <h1>BOAS-VINDAS A SAÚDE ACENIS !</h1>
            <h2>Cuidado especializado para pessoas<br />com síndrome de Down</h2>
            <p>Profissionais preparados para apoiar cada fase da jornada.</p>
            <button className={Styles.saudeBotao}> 
              <a href="#servicosSaude"> Saiba mais </a>
            </button>
          </header>
        </div>

        {/* Estatística agora fora do verdeSaudeConteudo */}
        <div className={Styles.EstatisticaContainer}>
          <div className={Styles.saudeCardUnico}>
            <div className={Styles.saudeItemEstatistica}>
              <div className={Styles.saudeItemContent}>
                <img src={iconPacientes} alt="Ícone de pacientes" className={Styles.saudeIconeEstatistica} />
                <p>+3.500<br />Pacientes atendidos</p>
              </div>
            </div>
              
            <div className={Styles.saudeDivisoria}></div>
            
            <div className={Styles.saudeItemEstatistica}>
              <div className={Styles.saudeItemContent}>
                <img src={iconEspecialistas} alt="Ícone de especialistas" className={Styles.saudeIconeEstatistica} />
                <p>+15<br />Especialistas disponíveis</p>
              </div>
            </div>

            <div className={Styles.saudeDivisoria}></div>

            <div className={Styles.saudeItemEstatistica}>
              <div className={Styles.saudeItemContent}>
                <img src={iconAnos} alt="Ícone de anos" className={Styles.saudeIconeEstatistica} />
                <p>+10<br />Anos no mercado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={Styles.caixacelular}>
        <div className={Styles.divcelular}>
            <img src={iconPacientes2} alt="Ícone de pacientes" className={Styles.celularIconeEstatistica} />
            <p>+3.500<br />Pacientes atendidos</p>
        </div>

        <div className={Styles.divcelular}>
            <img src={iconEspecialistas2} alt="Ícone de especialistas" className={Styles.celularIconeEstatistica} />
            <p>+15<br />Especialistas disponíveis</p>
        </div>

        <div className={Styles.divcelular}>
            <img src={iconAnos2} alt="Ícone de anos" className={Styles.celularIconeEstatistica} />
            <p>+10<br />Anos no mercado</p>
        </div>
      </div>
      <section className={Styles.saudeSlideContainer}>
        <div className={Styles.saudeContent}>
          <h2 className={Styles.saudeTitle}>Nossa equipe multidisciplinar</h2>
          
          <div className={Styles.saudeSlider}>
            <button 
              className={Styles.saudeNavButton} 
              onClick={prevSlide}
              aria-label="Slide anterior"
            >
              &#8249;
            </button>
  
            <div className={Styles.saudeCards}>
              {getCurrentSlideItems().map((profissional) => (
                <div key={profissional.id} className={Styles.saudeCard}>
                  <div className={Styles.saudeIconContainer}>
                    <img 
                      src={profissional.icon} 
                      alt={`Ícone ${profissional.title}`}
                      className={Styles.saudeIcon}
                    />
                  </div>
                  <h3 className={Styles.saudeCardTitle}>{profissional.title}</h3>
                  <p className={Styles.saudeCardDescription}>
                    {profissional.description}
                  </p>
                  <a href={profissional.link} className={Styles.saudeCardButton}>
                    VEJA A LISTA COMPLETA
                  </a>
                </div>
              ))}
            </div>
  
            <button 
              className={Styles.saudeNavButton} 
              onClick={nextSlide}
              aria-label="Próximo slide"
            >
              &#8250;
            </button>
          </div>
  
          <div className={Styles.saudeDots}>
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                className={`${Styles.saudeDot} ${index === currentSlide ? Styles.saudeDotActive : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
      <section className={Styles.depoimentosSection}>
        <div className={Styles.depoimentoContainer}>
          <div className={Styles.depoimentoHeader}>
            <div className={Styles.tituloContainer}>
              <h2 className={Styles.depoimentoTitulo}>DEPOIMENTOS</h2>
              <h3 className={Styles.depoimentoSubtitulo}>O que os clientes dizem sobre os profissionais Acenis?</h3>
            </div>
            <div className={Styles.depoimentoCardGrande}>
              <p className={Styles.depoimentoTexto}>
                "Depois que começamos o acompanhamento com a psicopedagoga da plataforma, meu filho avançou muito na escola."
              </p>
              <div className={Styles.autorContainer}>
                <div className={Styles.userIcon}>
                  <img src={fotouserHelena} alt="Helena Silva" className={Styles.userImage} />
                </div>
                <p className={Styles.depoimentoAutor}>Helena Silva</p>
              </div>
            </div>
          </div>
          <div className={Styles.cardsPequenos}>
            <div className={Styles.cardPequeno}>
              <p className={Styles.depoimentoTexto}>
                "Me senti acolhida desde o primeiro atendimento. Eles nos ajudam a enxergar possibilidades onde só víamos dificuldades."
              </p>
              <div className={Styles.autorContainer}>
                <div className={Styles.userIcon}>
                  <img src={fotouserEmili} alt="Emili Souza" className={Styles.userImage} />
                </div>
                <p className={Styles.depoimentoAutor}>Emili Souza</p>
              </div>
            </div>
            <div className={Styles.cardPequeno}>
              <p className={Styles.depoimentoTexto}>
                "Cada consulta é um passo a mais no desenvolvimento do meu filho. Finalmente encontrei profissionais que olham além do diagnóstico."
              </p>
              <div className={Styles.autorContainer}>
                <div className={Styles.userIcon}>
                  <img src={fotouserRoberta} alt="Roberta Souza" className={Styles.userImage} />
                </div>
                <p className={Styles.depoimentoAutor}>Roberta Souza</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={Styles['container-principal']}>
        <div className={Styles['container-conteudo']}>
          {/* Header */}
          <div className={Styles.header}>
            <h1 className={Styles['titulo-principal']}>
              Nossos Profissionais
            </h1>
            <p className={Styles.subtitulo}>
              Encontre o profissional ideal para suas necessidades. Nossa equipe multidisciplinar está pronta para oferecer o melhor atendimento.
            </p>
          </div>
  
          {/* Filtros */}
          <div className={Styles['filtros-container']}>
            <div className={Styles['filtros-grid']}>
              <div className={Styles['filtro-grupo']}>
                <label className={Styles['filtro-label']}>
                  <Search className={`${Styles['filtro-icon']} ${Styles['filtro-icon-blue']}`} />
                  Especialidade
                </label>
                <select
                  value={especialidadeSelecionada}
                  onChange={(e) => handleFiltroChange('especialidade', e.target.value)}
                  className={Styles['filtro-select']}
                >
                  <option value="">Todas as especialidades</option>
                  {especialidades.map(esp => (
                    <option key={esp} value={esp}>{esp}</option>
                  ))}
                </select>
              </div>
              
              <div className={Styles['filtro-grupo']}>
                <label className={Styles['filtro-label']}>
                  <MapPin className={`${Styles['filtro-icon']} ${Styles['filtro-icon-purple']}`} />
                  Localização
                </label>
                <select
                  value={localizacaoSelecionada}
                  onChange={(e) => handleFiltroChange('localização', e.target.value)}
                  className={Styles['filtro-select']}
                >
                  <option value="">Todas as localizações</option>
                  {estados.map(estado => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </select>
              </div>
              
              <button className={Styles['btn-buscar']}>
                <Search size={18} />
                Buscar
              </button>
            </div>
          </div>
  
          {/* Resultados */}
          <div className={Styles['resultados-info']}>
            <p className={Styles['resultados-texto']}>
              <span className={Styles['resultado-numero']}>{profissionaisFiltrados.length}</span> profissionais encontrados
              {especialidadeSelecionada && <span> em <span className={Styles['filtro-ativo']}>{especialidadeSelecionada}</span></span>}
              {localizacaoSelecionada && <span> em <span className={Styles['filtro-ativo']}>{localizacaoSelecionada}</span></span>}
            </p>
          </div>
  
          {/* Cards dos Profissionais */}
          <div className={Styles['cards-grid']}>
            {profissionaisPagina.map(profissional => (
              <div key={profissional.id} className={Styles['card-profissional']}>
                <div className={Styles['card-conteudo']}>
                  <div className={Styles['profissional-header']}>
                    <img
                      src={profissional.foto}
                      alt={profissional.nome}
                      className={Styles['profissional-foto']}
                    />
                    <div className={Styles['profissional-info']}>
                      <h3 className={Styles['profissional-nome']}>{profissional.nome}</h3>
                      <p className={Styles['profissional-especialidade']}>{profissional.especialidade}</p>
                      <p className={Styles['profissional-crp']}>{profissional.crp}</p>
                      <div className={Styles['avaliacao-container']}>
                        {renderEstrelas(profissional.avaliacao)}
                        <span className={Styles['avaliacao-numero']}>{profissional.avaliacao}</span>
                      </div>
                      <div className={Styles['localizacao-container']}>
                        <MapPin size={14} className={Styles['localizacao-icon']} />
                        {profissional.localizacao}
                      </div>
                    </div>
                  </div>
                  
                  <p className={Styles['profissional-descricao']}>
                    {profissional.descricao}
                  </p>
                  
                  <div className={Styles['card-acoes']}>
                    <button 
                      onClick={() => abrirModal(profissional)}
                      className={Styles['btn-ver-info']}
                    >
                      Ver Informações Completas
                    </button>
                    
                    <div className={Styles['contato-info']}>
                      <div className={Styles['contato-item']}>
                        <Phone size={14} className={`${Styles['contato-icon']} ${Styles['contato-icon-green']}`} />
                        <span className={Styles['contato-texto']}>{profissional.telefone}</span>
                      </div>
                      <div className={Styles['contato-item']}>
                        <Mail size={14} className={`${Styles['contato-icon']} ${Styles['contato-icon-orange']}`} />
                        <span className={Styles['contato-texto']}>{profissional.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
  
          {/* Paginação */}
          {totalPaginas > 1 && (
            <div className={Styles.paginacao}>
              <button
                onClick={() => setPaginaAtual(prev => Math.max(1, prev - 1))}
                disabled={paginaAtual === 1}
                className={Styles['btn-paginacao']}
              >
                Anterior
              </button>
              
              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(numero => (
                <button
                  key={numero}
                  onClick={() => setPaginaAtual(numero)}
                  className={`${Styles['btn-paginacao']} ${numero === paginaAtual ? Styles['btn-paginacao-ativo'] : ''}`}
                >
                  {numero}
                </button>
              ))}
              
              <button
                onClick={() => setPaginaAtual(prev => Math.min(totalPaginas, prev + 1))}
                disabled={paginaAtual === totalPaginas}
                className={Styles['btn-paginacao']}
              >
                Próxima
              </button>
            </div>
          )}
  
          {/* Caso não encontre resultados */}
          {profissionaisFiltrados.length === 0 && (
            <div className={Styles['sem-resultados']}>
              <div className={Styles['sem-resultados-icon']}>
                <Search size={48} />
              </div>
              <h3 className={Styles['sem-resultados-titulo']}>Nenhum profissional encontrado</h3>
              <p className={Styles['sem-resultados-texto']}>Tente ajustar os filtros de busca para encontrar mais resultados.</p>
            </div>
          )}
        </div>
  
        {/* Modal */}
        {modalAberto && profissionalSelecionado && (
          <div className={Styles['modal-overlay']}>
            <div className={Styles['modal-container']}>
              <div className={Styles['modal-header']}>
                <h2 className={Styles['modal-titulo']}>Informações do Profissional</h2>
                <button 
                  onClick={fecharModal}
                  className={Styles['btn-fechar-modal']}
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className={Styles['modal-conteudo']}>
                {/* Header do profissional */}
                <div className={Styles['modal-profissional-header']}>
                  <img
                    src={profissionalSelecionado.foto}
                    alt={profissionalSelecionado.nome}
                    className={Styles['modal-profissional-foto']}
                  />
                  <div className={Styles['modal-profissional-info']}>
                    <h3 className={Styles['modal-profissional-nome']}>{profissionalSelecionado.nome}</h3>
                    <p className={Styles['modal-profissional-especialidade']}>{profissionalSelecionado.especialidade}</p>
                    <p className={Styles['modal-profissional-crp']}>{profissionalSelecionado.crp}</p>
                    <div className={Styles['modal-avaliacao']}>
                      {renderEstrelas(profissionalSelecionado.avaliacao)}
                      <span className={Styles['modal-avaliacao-numero']}>{profissionalSelecionado.avaliacao}</span>
                    </div>
                    <div className={Styles['modal-localizacao']}>
                      <MapPin size={16} className={Styles['modal-localizacao-icon']} />
                      {profissionalSelecionado.localizacao}
                    </div>
                  </div>
                </div>
  
                {/* Informações principais */}
                <div className={Styles['info-cards-grid']}>
                  <div className={`${Styles['info-card']} ${Styles['info-card-green']}`}>
                    <div className={Styles['info-card-header']}>
                      <div className={`${Styles['info-card-icon']} ${Styles['info-card-icon-green']}`}>
                        <DollarSign size={20} />
                      </div>
                      <h4 className={Styles['info-card-titulo']}>Valor da Consulta</h4>
                    </div>
                    <p className={`${Styles['info-card-valor']} ${Styles['info-card-valor-green']}`}>{profissionalSelecionado.valorConsulta}</p>
                  </div>
  
                  <div className={`${Styles['info-card']} ${Styles['info-card-blue']}`}>
                    <div className={Styles['info-card-header']}>
                      <div className={`${Styles['info-card-icon']} ${Styles['info-card-icon-blue']}`}>
                        <User size={20} />
                      </div>
                      <h4 className={Styles['info-card-titulo']}>Tipo de Atendimento</h4>
                    </div>
                    <p className={`${Styles['info-card-valor']} ${Styles['info-card-valor-blue']}`}>{profissionalSelecionado.tipoAtendimento}</p>
                  </div>
  
                  <div className={`${Styles['info-card']} ${Styles['info-card-purple']}`}>
                    <div className={Styles['info-card-header']}>
                      <div className={`${Styles['info-card-icon']} ${Styles['info-card-icon-purple']}`}>
                        <Home size={20} />
                      </div>
                      <h4 className={Styles['info-card-titulo']}>Local de Atendimento</h4>
                    </div>
                    <p className={Styles['info-card-texto']}>{profissionalSelecionado.localAtendimento}</p>
                  </div>
  
                  <div className={`${Styles['info-card']} ${Styles['info-card-orange']}`}>
                    <div className={Styles['info-card-header']}>
                      <div className={`${Styles['info-card-icon']} ${Styles['info-card-icon-orange']}`}>
                        <Clock size={20} />
                      </div>
                      <h4 className={Styles['info-card-titulo']}>Horário de Funcionamento</h4>
                    </div>
                    <p className={Styles['info-card-texto']}>{profissionalSelecionado.horarioFuncionamento}</p>
                  </div>
                </div>
  
                {/* Descrição e experiência */}
                <div className={Styles['descricao-container']}>
                  <h4 className={Styles['secao-titulo']}>Sobre o Profissional</h4>
                  <p className={Styles['descricao-texto']}>{profissionalSelecionado.descricao}</p>
                  <p className={Styles['experiencia-texto']}>{profissionalSelecionado.experiencia}</p>
                </div>
  
                {/* Formação */}
                <div className={Styles['formacao-container']}>
                  <div className={Styles['formacao-header']}>
                    <div className={Styles['formacao-icon']}>
                      <Award size={20} />
                    </div>
                    <h4 className={Styles['secao-titulo']}>Formação</h4>
                  </div>
                  <p className={Styles['formacao-texto']}>{profissionalSelecionado.formacao}</p>
                </div>
  
                {/* Abordagens */}
                <div className={Styles['abordagens-container']}>
                  <h4 className={Styles['secao-titulo']}>Abordagens e Especialidades</h4>
                  <div className={Styles['abordagens-tags']}>
                    {profissionalSelecionado.abordagens.map((abordagem, index) => (
                      <span 
                        key={index}
                        className={Styles['abordagem-tag']}
                      >
                        {abordagem}
                      </span>
                    ))}
                  </div>
                </div>
  
                {/* Contato */}
                <div className={Styles['contato-container']}>
                  <h4 className={Styles['secao-titulo']}>Informações de Contato</h4>
                  <div className={Styles['contato-grid']}>
                    <div className={Styles['contato-item-modal']}>
                      <div className={`${Styles['contato-icon-container']} ${Styles['contato-icon-container-green']}`}>
                        <Phone size={20} />
                      </div>
                      <div className={Styles['contato-info-modal']}>
                        <p className={Styles['contato-label']}>Telefone</p>
                        <p className={Styles['contato-valor']}>{profissionalSelecionado.telefone}</p>
                      </div>
                    </div>
                    <div className={Styles['contato-item-modal']}>
                      <div className={`${Styles['contato-icon-container']} ${Styles['contato-icon-container-orange']}`}>
                        <Mail size={20} />
                      </div>
                      <div className={Styles['contato-info-modal']}>
                        <p className={Styles['contato-label']}>E-mail</p>
                        <p className={Styles['contato-valor']}>{profissionalSelecionado.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
  
                {/* Botões de ação */}
                <div className={Styles['modal-acoes']}>
                  <button className={Styles['btn-contato']}>
                    <Phone size={18} />
                    Entrar em Contato
                  </button>
                  <button className={Styles['btn-agendar']}>
                    <Mail size={18} />
                    Agendar Consulta
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default HomeSaude
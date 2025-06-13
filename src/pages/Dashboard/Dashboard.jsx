import React, { useState, useEffect } from 'react';
import {
  FaTachometerAlt,
  FaUserCircle,
  FaCalendarAlt,
  FaClipboard,
  FaUsers,
  FaFolder,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaCalendarCheck,
  FaFileAlt,
  FaSearch,
  FaBell,
  FaChevronLeft,
  FaChevronRight,
  FaEdit,
  FaTrash,
  FaPlus,
  FaUpload,
} from 'react-icons/fa';
import styles from './Dashboard.module.css';

// Componente principal do Dashboard
function Dashboard() {
  const [secaoAtiva, setSecaoAtiva] = useState('visaoGeral');
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [ehMobile, setEhMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    function verificarTela() {
      setEhMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMostrarMenu(true);
      } else {
        setMostrarMenu(false);
      }
    }
    window.addEventListener('resize', verificarTela);
    verificarTela();
    return () => window.removeEventListener('resize', verificarTela);
  }, []);

  function toggleMenu() {
    setMostrarMenu(!mostrarMenu);
  }

  function fecharMenu() {
    if (ehMobile && mostrarMenu) {
      setMostrarMenu(false);
    }
  }

  function mudarSecao(secao) {
    setSecaoAtiva(secao);
    fecharMenu();
  }

  // ---- Seção Visão Geral ----
  const [termoPesquisaVisao, setTermoPesquisaVisao] = useState('');
  const [notificacoes, setNotificacoes] = useState([
    { id: 1, mensagem: 'Nova sessão agendada', lida: false },
  ]);
  const [mostrarNotificacoes, setMostrarNotificacoes] = useState(false);
  const [anotacaoSelecionada, setAnotacaoSelecionada] = useState(null);
  const [sessoesHoje, setSessoesHoje] = useState([
    {
      id: 1,
      nome: 'Cliente Exemplo',
      tipo: 'Terapia Individual',
      data: 'Hoje',
      horario: '14:00',
      concluida: false,
    },
  ]);
  const [anotacoesRecentes, setAnotacoesRecentes] = useState([
    {
      id: 1,
      nome: 'Cliente Exemplo',
      texto: 'Progresso na comunicação verbal.',
      data: new Date(),
    },
  ]);
  const clientesAtivos = 10;
  const recursos = 5;

  function atualizarPesquisaVisao(evento) {
    setTermoPesquisaVisao(evento.target.value);
  }

  function toggleNotificacoes() {
    setMostrarNotificacoes(!mostrarNotificacoes);
    fecharMenu();
  }

  function marcarNotificacaoLida(id) {
    setNotificacoes(
      notificacoes.map((notificacao) =>
        notificacao.id === id ? { ...notificacao, lida: true } : notificacao
      )
    );
  }

  function marcarSessaoConcluida(id) {
    setSessoesHoje(
      sessoesHoje.map((sessao) =>
        sessao.id === id ? { ...sessao, concluida: true } : sessao
      )
    );
  }

  function abrirDetalhesAnotacao(anotacao) {
    setAnotacaoSelecionada(anotacao);
    fecharMenu();
  }

  function fecharDetalhesAnotacao() {
    setAnotacaoSelecionada(null);
  }

  const sessoesFiltradas = sessoesHoje.filter((sessao) =>
    sessao.nome.toLowerCase().includes(termoPesquisaVisao.toLowerCase())
  );

  const anotacoesFiltradasVisao = anotacoesRecentes.filter(
    (anotacao) =>
      anotacao.nome.toLowerCase().includes(termoPesquisaVisao.toLowerCase()) ||
      anotacao.texto.toLowerCase().includes(termoPesquisaVisao.toLowerCase())
  );

  // ---- Seção Agenda ----
  const [visualizacaoAgenda, setVisualizacaoAgenda] = useState('mes');
  const [mesAtual, setMesAtual] = useState(new Date());
  const [eventos, setEventos] = useState([]);
  const [proximosCompromissos, setProximosCompromissos] = useState([]);
  const [termoBuscaAgenda, setTermoBuscaAgenda] = useState('');
  const [modalAbertoAgenda, setModalAbertoAgenda] = useState(false);
  const [eventoEditando, setEventoEditando] = useState(null);
  const [novoEvento, setNovoEvento] = useState({
    data: '',
    hora: '',
    paciente: '',
    tipo: 'Consulta',
    cor: 'verde',
  });
  const [diaSelecionado, setDiaSelecionado] = useState(new Date());

  useEffect(() => {
    const eventosSalvos = localStorage.getItem('eventos');
    if (eventosSalvos) {
      const eventosCarregados = JSON.parse(eventosSalvos).map((evento) => ({
        ...evento,
        data: new Date(evento.data),
      }));
      setEventos(eventosCarregados);
      atualizarProximosCompromissos(eventosCarregados);
    } else {
      const eventosIniciais = [
        {
          id: 1,
          data: new Date(2025, 5, 5),
          hora: '08:00',
          paciente: 'João Pedro',
          tipo: 'Consulta',
          cor: 'verde',
        },
      ];
      setEventos(eventosIniciais);
      atualizarProximosCompromissos(eventosIniciais);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('eventos', JSON.stringify(eventos));
    atualizarProximosCompromissos(eventos);
  }, [eventos]);

  function atualizarProximosCompromissos(eventosAtuais) {
    const hoje = new Date();
    const proximos = eventosAtuais
      .filter((evento) => evento.data >= hoje)
      .sort((a, b) => a.data - b.data)
      .slice(0, 3);
    setProximosCompromissos(proximos);
  }

  function mesAnterior() {
    setMesAtual(new Date(mesAtual.getFullYear(), mesAtual.getMonth() - 1, 1));
  }

  function mesSeguinte() {
    setMesAtual(new Date(mesAtual.getFullYear(), mesAtual.getMonth() + 1, 1));
  }

  function gerarDiasDoMes() {
    const ano = mesAtual.getFullYear();
    const mes = mesAtual.getMonth();
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);
    const diasVaziosInicio = primeiroDia.getDay();
    const totalDias = ultimoDia.getDate();
    const dias = [];
    for (let i = 0; i < diasVaziosInicio; i++) {
      dias.push(null);
    }
    for (let i = 1; i <= totalDias; i++) {
      dias.push(new Date(ano, mes, i));
    }
    return dias;
  }

  function formatarData(data) {
    if (!data) return '';
    return data.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  }

  function abrirModalAgenda(evento, dia) {
    if (evento) {
      setEventoEditando(evento);
      setNovoEvento({
        data: evento.data.toISOString().split('T')[0],
        hora: evento.hora,
        paciente: evento.paciente,
        tipo: evento.tipo,
        cor: evento.cor,
      });
    } else {
      const dataFormatada = dia ? dia.toISOString().split('T')[0] : '';
      setEventoEditando(null);
      setNovoEvento({
        data: dataFormatada,
        hora: '08:00',
        paciente: '',
        tipo: 'Consulta',
        cor: 'verde',
      });
    }
    setModalAbertoAgenda(true);
    fecharMenu();
  }

  function salvarEvento(evento) {
    evento.preventDefault();
    const novo = {
      id: eventoEditando ? eventoEditando.id : Date.now(),
      data: new Date(novoEvento.data),
      hora: novoEvento.hora,
      paciente: novoEvento.paciente,
      tipo: novoEvento.tipo,
      cor: novoEvento.cor,
    };
    if (eventoEditando) {
      setEventos(eventos.map((ev) => (ev.id === novo.id ? novo : ev)));
    } else {
      setEventos([...eventos, novo]);
    }
    setModalAbertoAgenda(false);
  }

  function excluirCompromisso(id) {
    if (window.confirm('Deseja excluir este compromisso?')) {
      setEventos(eventos.filter((evento) => evento.id !== id));
    }
  }

  // ---- Seção Anotações ----
  const [anotacoes, setAnotacoes] = useState(anotacoesRecentes);
  const [novaAnotacao, setNovaAnotacao] = useState({ nome: '', texto: '' });
  const [modalAnotacaoAberto, setModalAnotacaoAberto] = useState(false);

  function abrirModalAnotacao() {
    setNovaAnotacao({ nome: '', texto: '' });
    setModalAnotacaoAberto(true);
    fecharMenu();
  }

  function salvarAnotacao(evento) {
    evento.preventDefault();
    const anotacao = {
      id: Date.now(),
      nome: novaAnotacao.nome,
      texto: novaAnotacao.texto,
      data: new Date(),
    };
    setAnotacoes([...anotacoes, anotacao]);
    setAnotacoesRecentes([...anotacoesRecentes, anotacao]);
    setModalAnotacaoAberto(false);
  }

  // ---- Seção Clientes ----
  const [clientes, setClientes] = useState([
    { id: 1, nome: 'João Pedro', contato: 'joao@email.com' },
    { id: 2, nome: 'Maria Silva', contato: 'maria@email.com' },
  ]);

  // ---- Seção Recursos ----
  const [recursosLista, setRecursosLista] = useState([
    { id: 1, nome: 'Guia de Exercícios', tipo: 'PDF' },
    { id: 2, nome: 'Vídeo Tutorial', tipo: 'Vídeo' },
  ]);

  // ---- Seção Configurações ----
  const [configuracoes, setConfiguracoes] = useState({
    notificacoes: true,
    tema: 'claro',
    idioma: 'pt-BR',
    fusoHorario: '-03:00',
    backups: true,
    integracaoCalendario: false,
  });

  function salvarConfiguracoes(evento) {
    evento.preventDefault();
    alert('Configurações salvas!');
  }

  // ---- Seção Meu Perfil ----
  const [perfil, setPerfil] = useState({
    nome: 'Dra. Ana Silva',
    email: 'ana@email.com',
    especialidade: 'Fonoaudióloga',
    telefone: '(11) 98765-4321',
    endereco: 'Rua Exemplo, 123, São Paulo',
    foto: 'https://randomuser.me/api/portraits/women/65.jpg',
  });
  const [novaFoto, setNovaFoto] = useState(null);

  function handleFileChange(evento) {
    const file = evento.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPerfil({ ...perfil, foto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  function salvarPerfil(evento) {
    evento.preventDefault();
    if (novaFoto) {
      setPerfil({ ...perfil, foto: novaFoto });
    }
    alert('Perfil atualizado!');
  }

  function renderizarSecao() {
    if (secaoAtiva === 'visaoGeral') {
      return (
        <div className={styles.container}>
          <header className={styles.header}>
            <h2 className={styles.titulo}>Visão Geral</h2>
            <div className={styles.pesquisaContainer}>
              <span className={styles.iconePesquisa}></span>
              <input
                type="text"
                placeholder="Pesquisar..."
                className={styles.pesquisa}
                value={termoPesquisaVisao}
                onChange={atualizarPesquisaVisao}
              />
            </div>
            <div className={styles.perfilHeader}>
              <div className={styles.notificacaoWrapper} onClick={toggleNotificacoes}>
                <FaBell className={styles.iconeNotificacao} />
                <span className={styles.notificacaoBadge}>
                  {notificacoes.filter((n) => !n.lida).length}
                </span>
              </div>
              <img
                src={perfil.foto}
                alt="Perfil"
                className={styles.fotoPerfil}
              />
              <span className={styles.nomePerfil}>Profissional</span>
            </div>
          </header>

          {mostrarNotificacoes && (
            <div className={styles.modalNotificacoes}>
              <div className={styles.modalContent}>
                <h3>Notificações</h3>
                {notificacoes.length === 0 ? (
                  <p>Nenhuma notificação.</p>
                ) : (
                  notificacoes.map((notificacao) => (
                    <div
                      key={notificacao.id}
                      className={`${styles.notificacaoItem} ${notificacao.lida ? styles.lida : ''}`}
                      onClick={() => marcarNotificacaoLida(notificacao.id)}
                    >
                      <p>{notificacao.mensagem}</p>
                      <span>{notificacao.lida ? 'Lida' : 'Nova'}</span>
                    </div>
                  ))
                )}
                <button className={styles.botaoFechar} onClick={toggleNotificacoes}>
                  Fechar
                </button>
              </div>
            </div>
          )}

          <main className={styles.main}>
            <div className={styles.cartoes}>
              <div className={styles.cartao}>
                <div className={styles.iconeContainer}>
                  <FaCalendarCheck className={styles.icone} />
                </div>
                <div className={styles.textoCartao}>
                  <p className={styles.descricao}>Sessões Hoje</p>
                  <p className={styles.valor}>{sessoesHoje.length}</p>
                </div>
              </div>
              <div className={styles.cartao}>
                <div className={styles.iconeContainer}>
                  <FaUsers className={styles.icone} />
                </div>
                <div className={styles.textoCartao}>
                  <p className={styles.descricao}>Clientes Ativos</p>
                  <p className={styles.valor}>{clientesAtivos}</p>
                </div>
              </div>
              <div className={styles.cartao}>
                <div className={styles.iconeContainer}>
                  <FaFileAlt className={styles.icone} />
                </div>
                <div className={styles.textoCartao}>
                  <p className={styles.descricao}>Anotações</p>
                  <p className={styles.valor}>{anotacoesRecentes.length}</p>
                </div>
              </div>
              <div className={styles.cartao}>
                <div className={styles.iconeContainer}>
                  <FaFolder className={styles.icone} />
                </div>
                <div className={styles.textoCartao}>
                  <p className={styles.descricao}>Recursos</p>
                  <p className={styles.valor}>{recursos}</p>
                </div>
              </div>
            </div>

            <div className={styles.sessoes}>
              <h3 className={styles.subtitulo}>Próximas Sessões</h3>
              <div className={styles.listaSessoes}>
                {sessoesFiltradas.length === 0 ? (
                  <p>Nenhuma sessão encontrada.</p>
                ) : (
                  sessoesFiltradas.map((sessao) => (
                    <div key={sessao.id} className={styles.sessaoItem}>
                      <div>
                        <p className={styles.nomeSessao}>{sessao.nome}</p>
                        <p className={styles.detalheSessao}>{sessao.tipo}</p>
                      </div>
                      <div className={styles.horarioSessao}>
                        <p>{sessao.data}</p>
                        <p>{sessao.horario}</p>
                        {!sessao.concluida && (
                          <button
                            className={styles.botaoConcluir}
                            onClick={() => marcarSessaoConcluida(sessao.id)}
                          >
                            Concluir
                          </button>
                        )}
                        {sessao.concluida && <span className={styles.concluida}>Concluída</span>}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className={styles.caixasDuplas}>
              <div className={styles.anotacoes}>
                <h3 className={styles.subtitulo}>Anotações Recentes</h3>
                {anotacoesFiltradasVisao.length === 0 ? (
                  <p>Nenhuma anotação encontrada.</p>
                ) : (
                  anotacoesFiltradasVisao.map((anotacao) => (
                    <div
                      key={anotacao.id}
                      className={styles.anotacaoItem}
                      onClick={() => abrirDetalhesAnotacao(anotacao)}
                    >
                      <div>
                        <p className={styles.nomeAnotacao}>{anotacao.nome}</p>
                        <p className={styles.textoAnotacao}>{anotacao.texto}</p>
                      </div>
                      <span className={styles.dataAnotacao}>
                        {anotacao.data.toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </main>

          {anotacaoSelecionada && (
            <div className={styles.modalAnotacao}>
              <div className={styles.modalContent}>
                <h3>Detalhes da Anotação</h3>
                <p><strong>Cliente:</strong> {anotacaoSelecionada.nome}</p>
                <p><strong>Texto:</strong> {anotacaoSelecionada.texto}</p>
                <p><strong>Data:</strong> {anotacaoSelecionada.data.toLocaleDateString('pt-BR')}</p>
                <button className={styles.botaoFechar} onClick={fecharDetalhesAnotacao}>
                  Fechar
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (secaoAtiva === 'agenda') {
      return (
        <div className={styles.container}>
          {modalAbertoAgenda && (
            <div className={styles.modal}>
              <div className={styles.modalConteudo}>
                <button
                  className={styles.botaoFecharModal}
                  onClick={() => setModalAbertoAgenda(false)}
                >
                  <FaTimes />
                </button>
                <h3>{eventoEditando ? 'Editar Compromisso' : 'Novo Compromisso'}</h3>
                <form onSubmit={salvarEvento}>
                  <label>
                    Data:
                    <input
                      type="date"
                      value={novoEvento.data}
                      onChange={(e) => setNovoEvento({ ...novoEvento, data: e.target.value })}
                      required
                    />
                  </label>
                  <label>
                    Hora:
                    <input
                      type="time"
                      value={novoEvento.hora}
                      onChange={(e) => setNovoEvento({ ...novoEvento, hora: e.target.value })}
                      required
                    />
                  </label>
                  <label>
                    Paciente:
                    <input
                      type="text"
                      value={novoEvento.paciente}
                      onChange={(e) => setNovoEvento({ ...novoEvento, paciente: e.target.value })}
                      required
                    />
                  </label>
                  <label>
                    Tipo:
                    <select
                      value={novoEvento.tipo}
                      onChange={(e) => setNovoEvento({ ...novoEvento, tipo: e.target.value })}
                    >
                      <option value="Consulta">Consulta</option>
                      <option value="Evento">Evento</option>
                      <option value="Reunião">Reunião</option>
                    </select>
                  </label>
                  <label>
                    Cor:
                    <select
                      value={novoEvento.cor}
                      onChange={(e) => setNovoEvento({ ...novoEvento, cor: e.target.value })}
                    >
                      <option value="verde">Verde</option>
                      <option value="azul">Azul</option>
                      <option value="rosa">Rosa</option>
                    </select>
                  </label>
                  <button type="submit" className={styles.botaoSalvar}>
                    Salvar
                  </button>
                </form>
              </div>
            </div>
          )}

          <header className={styles.header}>
            <h2 className={styles.titulo}>Agenda</h2>
            <div className={styles.pesquisaContainer}>
              <span className={styles.iconePesquisa}></span>
              <input
                type="text"
                placeholder="Pesquisar..."
                className={styles.pesquisa}
                value={termoBuscaAgenda}
                onChange={(e) => setTermoBuscaAgenda(e.target.value)}
              />
            </div>
            <div className={styles.perfilHeader}>
              <img
                src={perfil.foto}
                alt="Perfil"
                className={styles.fotoPerfil}
              />
              <span className={styles.nomePerfil}>Dra. Ana</span>
            </div>
          </header>

          <main className={styles.main}>
            <div className={styles.controles}>
              <div className={styles.visualizacao}>
                <span
                  className={visualizacaoAgenda === 'mes' ? styles.opcaoAtiva : ''}
                  onClick={() => setVisualizacaoAgenda('mes')}
                >
                  Mês
                </span>
                <span
                  className={visualizacaoAgenda === 'semana' ? styles.opcaoAtiva : ''}
                  onClick={() => setVisualizacaoAgenda('semana')}
                >
                  Semana
                </span>
                <span
                  className={visualizacaoAgenda === 'dia' ? styles.opcaoAtiva : ''}
                  onClick={() => setVisualizacaoAgenda('dia')}
                >
                  Dia
                </span>
              </div>
              <div className={styles.botoes}>
                {visualizacaoAgenda === 'mes' && (
                  <>
                    <button className={styles.botaoMes} onClick={mesAnterior}>
                      <FaChevronLeft />
                    </button>
                    <span className={styles.mesAtual}>
                      {mesAtual.toLocaleDateString('pt-BR', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                    <button className={styles.botaoMes} onClick={mesSeguinte}>
                      <FaChevronRight />
                    </button>
                  </>
                )}
                <button
                  className={styles.botaoAdicionar}
                  onClick={() => abrirModalAgenda(null, diaSelecionado)}
                >
                  <FaPlus /> Adicionar Sessão
                </button>
              </div>
            </div>

            {visualizacaoAgenda === 'mes' && (
              <div className={styles.calendario}>
                <div className={styles.diasSemana}>
                  <span>Dom</span>
                  <span>Seg</span>
                  <span>Ter</span>
                  <span>Qua</span>
                  <span>Qui</span>
                  <span>Sex</span>
                  <span>Sáb</span>
                </div>
                <div className={styles.dias}>
                  {gerarDiasDoMes().map((dia, index) => (
                    <div
                      key={index}
                      className={`${styles.dia} ${!dia ? styles.diaVazio : ''} ${
                        dia &&
                        dia.getDate() === new Date().getDate() &&
                        dia.getMonth() === new Date().getMonth()
                          ? styles.diaAtual
                          : ''
                      }`}
                      onClick={() => dia && abrirModalAgenda(null, dia)}
                    >
                      {dia && <span>{dia.getDate()}</span>}
                      {dia &&
                        eventos
                          .filter(
                            (evento) =>
                              evento.data.getDate() === dia.getDate() &&
                              evento.data.getMonth() === dia.getMonth() &&
                              evento.data.getFullYear() === dia.getFullYear()
                          )
                          .map((evento) => (
                            <div
                              key={evento.id}
                              className={`${styles.evento} ${
                                styles[`evento${evento.cor.charAt(0).toUpperCase() + evento.cor.slice(1)}`]
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                abrirModalAgenda(evento);
                              }}
                            >
                              {evento.hora} - {evento.paciente}
                            </div>
                          ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.compromissos}>
              <h3 className={styles.subtitulo}>Próximos Compromissos</h3>
              {proximosCompromissos.length > 0 ? (
                proximosCompromissos.map((compromisso) => (
                  <div key={compromisso.id} className={styles.compromissoItem}>
                    <div className={styles.infoCompromisso}>
                      <div
                        className={`${styles.iconeCompromisso} ${
                          styles[`icone${compromisso.cor.charAt(0).toUpperCase() + compromisso.cor.slice(1)}`]
                        }`}
                      ></div>
                      <div>
                        <p className={styles.nomeCompromisso}>{compromisso.paciente}</p>
                        <p className={styles.detalheCompromisso}>{compromisso.tipo}</p>
                      </div>
                    </div>
                    <div className={styles.horarioCompromisso}>
                      <p>{formatarData(compromisso.data)}</p>
                      <p>{compromisso.hora}</p>
                    </div>
                    <div className={styles.acoes}>
                      <FaEdit
                        className={styles.iconeEditar}
                        onClick={() => abrirModalAgenda(compromisso)}
                      />
                      <FaTrash
                        className={styles.iconeExcluir}
                        onClick={() => excluirCompromisso(compromisso.id)}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles.semCompromissos}>Nenhum compromisso agendado</p>
              )}
            </div>
          </main>
        </div>
      );
    }

    if (secaoAtiva === 'anotacoes') {
      return (
        <div className={styles.container}>
          {modalAnotacaoAberto && (
            <div className={styles.modal}>
              <div className={styles.modalConteudo}>
                <button
                  className={styles.botaoFecharModal}
                  onClick={() => setModalAnotacaoAberto(false)}
                >
                  <FaTimes />
                </button>
                <h3>Nova Anotação</h3>
                <form onSubmit={salvarAnotacao}>
                  <label>
                    Cliente:
                    <input
                      type="text"
                      value={novaAnotacao.nome}
                      onChange={(e) => setNovaAnotacao({ ...novaAnotacao, nome: e.target.value })}
                      required
                    />
                  </label>
                  <label>
                    Texto:
                    <input
                      type="text"
                      value={novaAnotacao.texto}
                      onChange={(e) => setNovaAnotacao({ ...novaAnotacao, texto: e.target.value })}
                      required
                    />
                  </label>
                  <button type="submit" className={styles.botaoSalvar}>
                    Salvar
                  </button>
                </form>
              </div>
            </div>
          )}
          <header className={styles.header}>
            <h2 className={styles.titulo}>Anotações</h2>
            <div className={styles.perfilHeader}>
              <img
                src={perfil.foto}
                alt="Perfil"
                className={styles.fotoPerfil}
              />
              <span className={styles.nomePerfil}>Dra. Ana</span>
            </div>
          </header>
          <main className={styles.main}>
            <div className={styles.anotacoes}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 className={styles.subtitulo}>Todas as Anotações</h3>
                <button className={styles.botaoAdicionar} onClick={abrirModalAnotacao}>
                  <FaPlus /> Adicionar Anotação
                </button>
              </div>
              {anotacoes.length === 0 ? (
                <p>Nenhuma anotação encontrada.</p>
              ) : (
                anotacoes.map((anotacao) => (
                  <div
                    key={anotacao.id}
                    className={styles.anotacaoItem}
                    onClick={() => abrirDetalhesAnotacao(anotacao)}
                  >
                    <div>
                      <p className={styles.nomeAnotacao}>{anotacao.nome}</p>
                      <p className={styles.textoAnotacao}>{anotacao.texto}</p>
                    </div>
                    <span className={styles.dataAnotacao}>
                      {anotacao.data.toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                ))
              )}
            </div>
          </main>
          {anotacaoSelecionada && (
            <div className={styles.modalAnotacao}>
              <div className={styles.modalContent}>
                <h3>Detalhes da Anotação</h3>
                <p><strong>Cliente:</strong> {anotacaoSelecionada.nome}</p>
                <p><strong>Texto:</strong> {anotacaoSelecionada.texto}</p>
                <p><strong>Data:</strong> {anotacaoSelecionada.data.toLocaleDateString('pt-BR')}</p>
                <button className={styles.botaoFechar} onClick={fecharDetalhesAnotacao}>
                  Fechar
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (secaoAtiva === 'clientes') {
      return (
        <div className={styles.container}>
          <header className={styles.header}>
            <h2 className={styles.titulo}>Clientes</h2>
            <div className={styles.perfilHeader}>
              <img
                src={perfil.foto}
                alt="Perfil"
                className={styles.fotoPerfil}
              />
              <span className={styles.nomePerfil}>Dra. Ana</span>
            </div>
          </header>
          <main className={styles.main}>
            <div className={styles.clientesLista}>
              <h3 className={styles.subtitulo}>Lista de Clientes</h3>
              {clientes.length === 0 ? (
                <p>Nenhum cliente cadastrado.</p>
              ) : (
                clientes.map((cliente) => (
                  <div key={cliente.id} className={styles.clienteItem}>
                    <div>
                      <p className={styles.nomeCliente}>{cliente.nome}</p>
                      <p className={styles.detalheCliente}>{cliente.contato}</p>
                    </div>
                    <div className={styles.acoes}>
                      <FaEdit className={styles.iconeEditar} />
                      <FaTrash className={styles.iconeExcluir} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </main>
        </div>
      );
    }

    if (secaoAtiva === 'recursos') {
      return (
        <div className={styles.container}>
          <header className={styles.header}>
            <h2 className={styles.titulo}>Recursos</h2>
            <div className={styles.perfilHeader}>
              <img
                src={perfil.foto}
                alt="Perfil"
                className={styles.fotoPerfil}
              />
              <span className={styles.nomePerfil}>Dra. Ana</span>
            </div>
          </header>
          <main className={styles.main}>
            <div className={styles.recursosLista}>
              <h3 className={styles.subtitulo}>Lista de Recursos</h3>
              {recursosLista.length === 0 ? (
                <p>Nenhum recurso disponível.</p>
              ) : (
                recursosLista.map((recurso) => (
                  <div key={recurso.id} className={styles.recursoItem}>
                    <div>
                      <p className={styles.nomeRecurso}>{recurso.nome}</p>
                      <p className={styles.detalheRecurso}>{recurso.tipo}</p>
                    </div>
                    <div className={styles.acoes}>
                      <FaEdit className={styles.iconeEditar} />
                      <FaTrash className={styles.iconeExcluir} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </main>
        </div>
      );
    }

    if (secaoAtiva === 'configuracoes') {
      return (
        <div className={styles.container}>
          <header className={styles.header}>
            <h2 className={styles.titulo}>Configurações</h2>
            <div className={styles.perfilHeader}>
              <img
                src={perfil.foto}
                alt="Perfil"
                className={styles.fotoPerfil}
              />
              <span className={styles.nomePerfil}>Dra. Ana</span>
            </div>
          </header>
          <main className={styles.main}>
            <div className={styles.configuracoesForm}>
              <h3 className={styles.subtitulo}>Configurações Gerais</h3>
              <form onSubmit={salvarConfiguracoes}>
                <div className={styles.formGrupo}>
                  <label>
                    Notificações:
                    <select
                      value={configuracoes.notificacoes ? 'sim' : 'nao'}
                      onChange={(e) =>
                        setConfiguracoes({
                          ...configuracoes,
                          notificacoes: e.target.value === 'sim',
                        })
                      }
                    >
                      <option value="sim">Sim</option>
                      <option value="nao">Não</option>
                    </select>
                  </label>
                </div>
                <div className={styles.formGrupo}>
                  <label>
                    Tema:
                    <select
                      value={configuracoes.tema}
                      onChange={(e) =>
                        setConfiguracoes({ ...configuracoes, tema: e.target.value })
                      }
                    >
                      <option value="claro">Claro</option>
                      <option value="escuro">Escuro</option>
                    </select>
                  </label>
                </div>
                <div className={styles.formGrupo}>
                  <label>
                    Idioma:
                    <select
                      value={configuracoes.idioma}
                      onChange={(e) =>
                        setConfiguracoes({ ...configuracoes, idioma: e.target.value })
                      }
                    >
                      <option value="pt-BR">Português (Brasil)</option>
                      <option value="en-US">Inglês</option>
                      <option value="es-ES">Espanhol</option>
                    </select>
                  </label>
                </div>
                <div className={styles.formGrupo}>
                  <label>
                    Fuso Horário:
                    <select
                      value={configuracoes.fusoHorario}
                      onChange={(e) =>
                        setConfiguracoes({ ...configuracoes, fusoHorario: e.target.value })
                      }
                    >
                      <option value="-03:00">UTC-03:00 (BRT)</option>
                      <option value="-02:00">UTC-02:00</option>
                      <option value="+00:00">UTC+00:00</option>
                    </select>
                  </label>
                </div>
                <div className={styles.formGrupo}>
                  <label>
                    Backups Automáticos:
                    <select
                      value={configuracoes.backups ? 'sim' : 'nao'}
                      onChange={(e) =>
                        setConfiguracoes({
                          ...configuracoes,
                          backups: e.target.value === 'sim',
                        })
                      }
                    >
                      <option value="sim">Sim</option>
                      <option value="nao">Não</option>
                    </select>
                  </label>
                </div>
                <div className={styles.formGrupo}>
                  <label>
                    Integração com Calendário:
                    <select
                      value={configuracoes.integracaoCalendario ? 'sim' : 'nao'}
                      onChange={(e) =>
                        setConfiguracoes({
                          ...configuracoes,
                          integracaoCalendario: e.target.value === 'sim',
                        })
                      }
                    >
                      <option value="sim">Sim</option>
                      <option value="nao">Não</option>
                    </select>
                  </label>
                </div>
                <button type="submit" className={styles.botaoSalvar}>
                  Salvar Configurações
                </button>
              </form>
            </div>
          </main>
        </div>
      );
    }

    if (secaoAtiva === 'meuPerfil') {
      return (
        <div className={styles.container}>
          <header className={styles.header}>
            <h2 className={styles.titulo}>Meu Perfil</h2>
            <div className={styles.perfilHeader}>
              <img
                src={perfil.foto}
                alt="Perfil"
                className={styles.fotoPerfil}
              />
              <span className={styles.nomePerfil}>Dra. Ana</span>
            </div>
          </header>
          <main className={styles.main}>
            <div className={styles.perfilForm}>
              <h3 className={styles.subtitulo}>Dados do Perfil</h3>
              <form onSubmit={salvarPerfil}>
                <div className={styles.formGrupo}>
                  <label>
                    Foto de Perfil:
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <img src={perfil.foto} alt="Pré-visualização" style={{ width: '100px', marginTop: '10px' }} />
                  </label>
                </div>
                <div className={styles.formGrupo}>
                  <label>
                    Nome:
                    <input
                      type="text"
                      value={perfil.nome}
                      onChange={(e) => setPerfil({ ...perfil, nome: e.target.value })}
                      required
                    />
                  </label>
                </div>
                <div className={styles.formGrupo}>
                  <label>
                    Email:
                    <input
                      type="email"
                      value={perfil.email}
                      onChange={(e) => setPerfil({ ...perfil, email: e.target.value })}
                      required
                    />
                  </label>
                </div>
                <div className={styles.formGrupo}>
                  <label>
                    Especialidade:
                    <input
                      type="text"
                      value={perfil.especialidade}
                      onChange={(e) => setPerfil({ ...perfil, especialidade: e.target.value })}
                      required
                    />
                  </label>
                </div>
                <div className={styles.formGrupo}>
                  <label>
                    Telefone:
                    <input
                      type="tel"
                      value={perfil.telefone}
                      onChange={(e) => setPerfil({ ...perfil, telefone: e.target.value })}
                      required
                    />
                  </label>
                </div>
                <div className={styles.formGrupo}>
                  <label>
                    Endereço:
                    <input
                      type="text"
                      value={perfil.endereco}
                      onChange={(e) => setPerfil({ ...perfil, endereco: e.target.value })}
                      required
                    />
                  </label>
                </div>
                <button type="submit" className={styles.botaoSalvar}>
                  Salvar Perfil
                </button>
              </form>
            </div>
          </main>
        </div>
      );
    }

    return <div className={styles.container}>Seção não encontrada</div>;
  }

  return (
    <div className={styles.dashboard}>
      {ehMobile && (
        <button className={styles.menuMobileButton} onClick={toggleMenu}>
          {mostrarMenu ? <FaTimes /> : <FaBars />}
        </button>
      )}

      <aside
        className={`${styles.sidebar} ${!mostrarMenu && ehMobile ? styles.escondido : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.logoArea}>DASHBOARD</div>
        <div className={styles.perfilArea}>
          <img
            src={perfil.foto}
            alt="Foto de Perfil"
            className={styles.perfilFoto}
          />
          <div className={styles.perfilInfo}>
            <span className={styles.perfilNome}>Dra. Ana Silva</span>
            <span className={styles.perfilFuncao}>
                <br /> Fonoaudióloga</span>
          </div>
        </div>
        <nav className={styles.menu}>
          <button
            className={`${styles.link} ${secaoAtiva === 'visaoGeral' ? styles.ativo : ''}`}
            onClick={() => mudarSecao('visaoGeral')}
          >
            <FaTachometerAlt className={styles.icone} /> Visão Geral
          </button>
          <button
            className={`${styles.link} ${secaoAtiva === 'agenda' ? styles.ativo : ''}`}
            onClick={() => mudarSecao('agenda')}
          >
            <FaCalendarAlt className={styles.icone} /> Agenda
          </button>
          <button
            className={`${styles.link} ${secaoAtiva === 'anotacoes' ? styles.ativo : ''}`}
            onClick={() => mudarSecao('anotacoes')}
          >
            <FaClipboard className={styles.icone} /> Anotações
          </button>
          <button
            className={`${styles.link} ${secaoAtiva === 'clientes' ? styles.ativo : ''}`}
            onClick={() => mudarSecao('clientes')}
          >
            <FaUsers className={styles.icone} /> Clientes
          </button>
          <button
            className={`${styles.link} ${secaoAtiva === 'recursos' ? styles.ativo : ''}`}
            onClick={() => mudarSecao('recursos')}
          >
            <FaFolder className={styles.icone} /> Recursos
          </button>
          <button
            className={`${styles.link} ${secaoAtiva === 'configuracoes' ? styles.ativo : ''}`}
            onClick={() => mudarSecao('configuracoes')}
          >
            <FaCog className={styles.icone} /> Configurações
          </button>
          <button
            className={`${styles.link} ${secaoAtiva === 'meuPerfil' ? styles.ativo : ''}`}
            onClick={() => mudarSecao('meuPerfil')}
          >
            <FaUserCircle className={styles.icone} /> Meu Perfil
          </button>
        </nav>
        <div className={styles.footer}>
          <button className={`${styles.link} ${styles.sair}`}>
            <FaSignOutAlt className={styles.icone} /> Sair
          </button>
        </div>
      </aside>

      <div className={styles.conteudo} onClick={fecharMenu}>
        {renderizarSecao()}
      </div>
    </div>
  );
}

export default Dashboard;
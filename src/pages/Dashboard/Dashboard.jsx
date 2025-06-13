import React, { useState, useEffect, useRef } from 'react';
import { FaTachometerAlt, FaUserCircle, FaCalendarAlt, FaClipboard, FaUsers, FaFolder, FaCog, FaSignOutAlt, FaBars, FaTimes, FaCalendarCheck, FaFileAlt, FaSearch, FaBell, FaChevronLeft, FaChevronRight, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import styles from './Dashboard.module.css';


function Dashboard() {

  const [activeSection, setActiveSection] = useState('visaoGeral');

  // BarraLateral section
  
  const [menuAberto, setMenuAberto] = useState(false);
  const [mobile, setMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    window.addEventListener('resize', () => setMobile(window.innerWidth < 768));
    return () => window.removeEventListener('resize', () => setMobile(window.innerWidth < 768));
  }, []);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const handleClick = (section) => {
    setActiveSection(section);
    if (mobile) {
      setMenuAberto(false);
    }
  };
  

  
  // Visão Geral section
  const [searchTermVisao, setSearchTermVisao] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Nova sessão agendada com Cliente Exemplo', read: false },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedAnnotation, setSelectedAnnotation] = useState(null);
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
      texto: 'Anotação exemplo: Progresso na comunicação verbal.',
      data: new Date(),
    },
  ]);
  const clientesAtivos = 10;
  const recursos = 5;

  const handleSearchVisao = (e) => {
    setSearchTermVisao(e.target.value);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const markSessionAsCompleted = (id) => {
    setSessoesHoje((prev) =>
      prev.map((sessao) =>
        sessao.id === id ? { ...sessao, concluida: true } : sessao
      )
    );
  };

  const openAnnotationDetails = (anotacao) => {
    setSelectedAnnotation(anotacao);
  };

  const closeAnnotationDetails = () => {
    setSelectedAnnotation(null);
  };

  const filteredSessoes = sessoesHoje.filter((sessao) =>
    sessao.nome.toLowerCase().includes(searchTermVisao.toLowerCase())
  );

  const filteredAnotacoesVisao = anotacoesRecentes.filter((anotacao) =>
    anotacao.nome.toLowerCase().includes(searchTermVisao.toLowerCase()) ||
    anotacao.texto.toLowerCase().includes(searchTermVisao.toLowerCase())
  );

  // Agenda section
  const [visualizacao, setVisualizacao] = useState('mes');
  const [mesAtual, setMesAtual] = useState(new Date());
  const [eventos, setEventos] = useState([]);
  const [proximosCompromissos, setProximosCompromissos] = useState([]);
  const [buscaAgenda, setBuscaAgenda] = useState('');
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
    const eventosIniciais = eventosSalvos
      ? JSON.parse(eventosSalvos).map((evento) => ({
          ...evento,
          data: new Date(evento.data),
        }))
      : [
          { id: 1, data: new Date(2025, 5, 5), hora: '08:00', paciente: 'João Pedro', tipo: 'Consulta', cor: 'verde' },
          { id: 2, data: new Date(2025, 5, 12), hora: '10:00', paciente: 'Congresso', tipo: 'Evento', cor: 'azul' },
          { id: 3, data: new Date(2025, 5, 19), hora: '09:30', paciente: 'Maria Clara', tipo: 'Consulta', cor: 'verde' },
          { id: 4, data: new Date(2025, 5, 17), hora: '15:00', paciente: 'Lucas', tipo: 'Consulta', cor: 'rosa' },
        ];
    setEventos(eventosIniciais);
    atualizarProximosCompromissos(eventosIniciais);
  }, []);

  useEffect(() => {
    localStorage.setItem('eventos', JSON.stringify(eventos));
    atualizarProximosCompromissos(eventos);
  }, [eventos]);

  const atualizarProximosCompromissos = (eventosAtuais) => {
    const hoje = new Date();
    const proximos = eventosAtuais
      .filter((evento) => evento.data >= hoje)
      .sort((a, b) => a.data - b.data)
      .slice(0, 3);
    setProximosCompromissos(proximos);
  };

  const mesAnterior = () => {
    setMesAtual(new Date(mesAtual.getFullYear(), mesAtual.getMonth() - 1, 1));
  };

  const mesSeguinte = () => {
    setMesAtual(new Date(mesAtual.getFullYear(), mesAtual.getMonth() + 1, 1));
  };

  const gerarDiasDoMes = () => {
    const year = mesAtual.getFullYear();
    const month = mesAtual.getMonth();
    const primeiroDia = new Date(year, month, 1);
    const ultimoDia = new Date(year, month + 1, 0);
    const diasVaziosInicio = primeiroDia.getDay();
    const totalDias = ultimoDia.getDate();
    const dias = [];
    for (let i = 0; i < diasVaziosInicio; i++) {
      dias.push(null);
    }
    for (let i = 1; i <= totalDias; i++) {
      dias.push(new Date(year, month, i));
    }
    return dias;
  };

  const gerarDiasDaSemana = () => {
    const inicioSemana = new Date(diaSelecionado);
    inicioSemana.setDate(diaSelecionado.getDate() - diaSelecionado.getDay());
    const dias = [];
    for (let i = 0; i < 7; i++) {
      const dia = new Date(inicioSemana);
      dia.setDate(inicioSemana.getDate() + i);
      dias.push(dia);
    }
    return dias;
  };

  const formatarData = (data) => {
    if (!data) return '';
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return data.toLocaleDateString('pt-BR', options);
  };

  const eventosDoDia = (dia) => {
    if (!dia) return [];
    return eventos.filter(
      (evento) =>
        evento.data.getDate() === dia.getDate() &&
        evento.data.getMonth() === dia.getMonth() &&
        evento.data.getFullYear() === dia.getFullYear()
    );
  };

  const eventosFiltrados = eventos.filter(
    (evento) =>
      evento.paciente.toLowerCase().includes(buscaAgenda.toLowerCase()) ||
      evento.tipo.toLowerCase().includes(buscaAgenda.toLowerCase())
  );

  const abrirModalAgenda = (evento = null, dia = null) => {
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
  };

  const salvarEvento = (e) => {
    e.preventDefault();
    const evento = {
      id: eventoEditando ? eventoEditando.id : Date.now(),
      data: new Date(novoEvento.data),
      hora: novoEvento.hora,
      paciente: novoEvento.paciente,
      tipo: novoEvento.tipo,
      cor: novoEvento.cor,
    };
    if (eventoEditando) {
      setEventos(eventos.map((ev) => (ev.id === evento.id ? evento : ev)));
    } else {
      setEventos([...eventos, evento]);
    }
    setModalAbertoAgenda(false);
    setNovoEvento({ data: '', hora: '', paciente: '', tipo: 'Consulta', cor: 'verde' });
  };

  const excluirCompromisso = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este compromisso?')) {
      setEventos(eventos.filter((evento) => evento.id !== id));
    }
  };

  const semanaAnterior = () => {
    setDiaSelecionado(new Date(diaSelecionado.setDate(diaSelecionado.getDate() - 7)));
  };

  const semanaSeguinte = () => {
    setDiaSelecionado(new Date(diaSelecionado.setDate(diaSelecionado.getDate() + 7)));
  };

  const diaAnterior = () => {
    setDiaSelecionado(new Date(diaSelecionado.setDate(diaSelecionado.getDate() - 1)));
  };

  const diaSeguinte = () => {
    setDiaSelecionado(new Date(diaSelecionado.setDate(diaSelecionado.getDate() + 1)));
  };

  // Anotações section
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Progresso na pronúncia',
      date: '20/06/2023',
      category: 'Comunicação',
      text: 'Melhorou significativamente na pronúncia do "R" depois das últimas sessões. Conseguiu pronunciar corretamente palavras como "carro" e "árvore" com pouco auxílio. Manter exercícios de vibração de língua.',
    },
    {
      id: 2,
      title: 'Interação social',
      date: '18/06/2023',
      category: 'Socialização',
      text: 'Dificuldade em manter contato visual por mais de 2 segundos. Introduzido jogo de cartas com recompensa por contato visual. Responde bem quando é o seu turno, mas precisa de mais estímulo para observar os outros.',
    },
    {
      id: 3,
      title: 'Coordenação motora',
      date: '15/06/2023',
      category: 'Habilidades Motoras',
      text: 'Progresso na coordenação motora fina - conseguiu segurar o lápis com três dedos por períodos mais longos. Trabalhando com atividades de recorte e colagem. Sugerido uso de massinha para fortalecimento.',
    },
  ]);
  const [searchTermNotes, setSearchTermNotes] = useState('');
  const [categoryFilterNotes, setCategoryFilterNotes] = useState('todasCategorias');
  const [isModalOpenNotes, setIsModalOpenNotes] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [newNote, setNewNote] = useState({ title: '', category: '', text: '' });
  const [visibleNotes, setVisibleNotes] = useState(3);

  const handleSearchNotes = (e) => {
    setSearchTermNotes(e.target.value);
  };

  const handleCategoryFilterNotes = (e) => {
    setCategoryFilterNotes(e.target.value);
  };

  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.text.toLowerCase().includes(searchTermNotes.toLowerCase()) ||
                         note.title.toLowerCase().includes(searchTermNotes.toLowerCase());
    const matchesCategory = categoryFilterNotes === 'todasCategorias' || note.category === categoryFilterNotes;
    return matchesSearch && matchesCategory;
  });

  const handleOpenModalNotes = (note = null) => {
    setCurrentNote(note);
    setNewNote(note ? { title: note.title, category: note.category, text: note.text } : { title: '', category: '', text: '' });
    setIsModalOpenNotes(true);
  };

  const handleCloseModalNotes = () => {
    setIsModalOpenNotes(false);
    setCurrentNote(null);
    setNewNote({ title: '', category: '', text: '' });
  };

  const handleSaveNote = () => {
    if (!newNote.title || !newNote.category || !newNote.text) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    if (currentNote) {
      setNotes(notes.map((note) =>
        note.id === currentNote.id ? { ...note, ...newNote } : note
      ));
    } else {
      const newId = Math.max(...notes.map((n) => n.id), 0) + 1;
      const today = new Date().toLocaleDateString('pt-BR');
      setNotes([...notes, { id: newId, date: today, ...newNote }]);
    }
    handleCloseModalNotes();
  };

  const handleDeleteNote = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta anotação?')) {
      setNotes(notes.filter((note) => note.id !== id));
    }
  };

  const handleLoadMoreNotes = () => {
    setVisibleNotes((prev) => prev + 3);
  };

  // Clientes section
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'João Pedro',
      age: '6 anos',
      responsible: 'Carlos Silva',
      contact: { email: 'carlos.silva@exemplo.com', phone: '(11) 98765-4321' },
      focus: 'Comunicação',
      status: 'Ativo',
      lastSession: '20/06/2023',
    },
    {
      id: 2,
      name: 'Maria Eduarda',
      age: '8 anos',
      responsible: 'Ana Costa',
      contact: { email: 'ana.costa@exemplo.com', phone: '(11) 99876-5432' },
      focus: 'Socialização',
      status: 'Ativo',
      lastSession: '18/06/2023',
    },
    {
      id: 3,
      name: 'Pedro Henrique',
      age: '4 anos',
      responsible: 'Mariana Santos',
      contact: { email: 'mariana.santos@exemplo.com', phone: '(11) 97654-3210' },
      focus: 'Habilidades Motoras',
      status: 'Pendente',
      lastSession: '15/06/2023',
    },
    {
      id: 4,
      name: 'Sofia Lima',
      age: '12 anos',
      responsible: 'Ricardo Almeida',
      contact: { email: 'ricardo.almeida@exemplo.com', phone: '(11) 96543-2109' },
      focus: 'Comunicação',
      status: 'Ativo',
      lastSession: '22/06/2023',
    },
    {
      id: 5,
      name: 'Gabriel Rocha',
      age: '7 anos',
      responsible: 'Patrícia Oliveira',
      contact: { email: 'patricia.oliveira@exemplo.com', phone: '(11) 95432-1098' },
      focus: 'Socialização',
      status: 'Inativo',
      lastSession: '10/06/2023',
    },
    {
      id: 6,
      name: 'Isabela Fernandes',
      age: '9 anos',
      responsible: 'Fernando Guedes',
      contact: { email: 'fernando.guedes@exemplo.com', phone: '(11) 94321-0987' },
      focus: 'Habilidades Motoras',
      status: 'Ativo',
      lastSession: '19/06/2023',
    },
    {
      id: 7,
      name: 'Lucas Pereira',
      age: '5 anos',
      responsible: 'Carla Dias',
      contact: { email: 'carla.dias@exemplo.com', phone: '(11) 93210-9876' },
      focus: 'Comunicação',
      status: 'Ativo',
      lastSession: '21/06/2023',
    },
    {
      id: 8,
      name: 'Manuela Costa',
      age: '10 anos',
      responsible: 'Paulo Souza',
      contact: { email: 'paulo.souza@exemplo.com', phone: '(11) 92109-8765' },
      focus: 'Socialização',
      status: 'Pendente',
      lastSession: '16/06/2023',
    },
  ]);
  const [searchTermClients, setSearchTermClients] = useState('');
  const [ageFilter, setAgeFilter] = useState('todasIdades');
  const [focusFilter, setFocusFilter] = useState('todasAreasFoco');
  const [statusFilter, setStatusFilter] = useState('todosStatus');
  const [isModalOpenClients, setIsModalOpenClients] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);
  const [newClient, setNewClient] = useState({
    name: '',
    age: '',
    responsible: '',
    email: '',
    phone: '',
    focus: '',
    status: 'Ativo',
    lastSession: '',
  });
  const [visibleClients, setVisibleClients] = useState(5);

  const handleSearchClients = (e) => {
    setSearchTermClients(e.target.value);
  };

  const handleAgeFilter = (e) => {
    setAgeFilter(e.target.value);
  };

  const handleFocusFilter = (e) => {
    setFocusFilter(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(searchTermClients.toLowerCase());
    const matchesAge =
      ageFilter === 'todasIdades' ||
      (ageFilter === '0-5' && ['0 anos', '1 ano', '2 anos', '3 anos', '4 anos', '5 anos'].includes(client.age)) ||
      (ageFilter === '6-10' && ['6 anos', '7 anos', '8 anos', '9 anos', '10 anos'].includes(client.age)) ||
      (ageFilter === '11+' && parseInt(client.age.split(' ')[0]) >= 11);
    const matchesFocus = focusFilter === 'todasAreasFoco' || client.focus === focusFilter;
    const matchesStatus = statusFilter === 'todosStatus' || client.status === statusFilter;
    return matchesSearch && matchesAge && matchesFocus && matchesStatus;
  });

  const handleOpenModalClients = (client = null) => {
    setCurrentClient(client);
    setNewClient(
      client
        ? {
            name: client.name,
            age: client.age,
            responsible: client.responsible,
            email: client.contact.email,
            phone: client.contact.phone,
            focus: client.focus,
            status: client.status,
            lastSession: client.lastSession,
          }
        : {
            name: '',
            age: '',
            responsible: '',
            email: '',
            phone: '',
            focus: '',
            status: 'Ativo',
            lastSession: '',
          }
    );
    setIsModalOpenClients(true);
  };

  const handleCloseModalClients = () => {
    setIsModalOpenClients(false);
    setCurrentClient(null);
    setNewClient({
      name: '',
      age: '',
      responsible: '',
      email: '',
      phone: '',
      focus: '',
      status: 'Ativo',
      lastSession: '',
    });
  };

  const handleSaveClient = () => {
    if (!newClient.name || !newClient.age || !newClient.responsible || !newClient.email || !newClient.phone || !newClient.focus) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    if (currentClient) {
      setClients(
        clients.map((client) =>
          client.id === currentClient.id
            ? {
                ...client,
                name: newClient.name,
                age: newClient.age,
                responsible: newClient.responsible,
                contact: { email: newClient.email, phone: newClient.phone },
                focus: newClient.focus,
                status: newClient.status,
                lastSession: newClient.lastSession || client.lastSession,
              }
            : client
        )
      );
    } else {
      const newId = Math.max(...clients.map((c) => c.id), 0) + 1;
      setClients([
        ...clients,
        {
          id: newId,
          name: newClient.name,
          age: newClient.age,
          responsible: newClient.responsible,
          contact: { email: newClient.email, phone: newClient.phone },
          focus: newClient.focus,
          status: newClient.status,
          lastSession: newClient.lastSession || new Date().toLocaleDateString('pt-BR'),
        },
      ]);
    }
    handleCloseModalClients();
  };

  const handleDeleteClient = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      setClients(clients.filter((client) => client.id !== id));
    }
  };

  const handleLoadMoreClients = () => {
    setVisibleClients((prev) => prev + 5);
  };

  // Recursos section
  const [resources, setResources] = useState([
    {
      id: 1,
      title: 'Atividades de Pronúncia - R',
      category: 'Comunicação',
      type: 'PDF',
      description: 'Exercícios para sons vibrantes',
      date: '09/06/2023',
      url: 'data:application/pdf;base64,JVBERi0xLjAKMSAwIG9iago8PC9UeXBlL0NhdGFsb2cvUGFnZXMgMiAwIFIgPj4KZW5kb2JqIDIgMCBvYmoKPDwvVHlwZS9QYWdlcy9Db3VudCAxL0tpZHMgWzMgMCBSXSA+PgplbmRvYmoKMyAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBSL01lZGlhQm94IFswIDAgNjEyIDc5Ml0vQ29udGVudHMgNCAwIFIgL1Jlc291cmNlcyA8PC9Qcm9jU2V0Wy9QREYgL1RleHRdPj4gPj4KZW5kb2JqIDQgMCBvYmoKPDwvTGVuZ3RoIDQzPj4Kc3RyZWFtCkJULzEyIFRmIDEyIFRkIDUwIDUwMCBUbCAoU2FtcGxlIFBERikgVGoKRVRlbmRzdHJlYW0KZW5kb2JqIDUgMCBvYmoKPDwvTGVuZ3RoIDY2Pj4Kc3RyZWFtCkJULzEyIFRmIDEyIFRkIDUwIDUwMCBUbCAoVGhpcyBpcyBhIHNhbXBsZSBQREYgZmlsZSBjcmVhdGVkIGZvciBkZW1vIHB1cnBvc2VzLikgVGoKRVRlbmRzdHJlYW0KZW5kb2JqCmVuZG9iago=',
    },
  ]);
  const [searchTermResources, setSearchTermResources] = useState('');
  const [categoryFilterResources, setCategoryFilterResources] = useState('todasCategorias');
  const [typeFilter, setTypeFilter] = useState('todosTipos');
  const [isModalOpenResources, setIsModalOpenResources] = useState(false);
  const [newResource, setNewResource] = useState({
    title: '',
    category: '',
    type: '',
    description: '',
    file: null,
  });
  const [visibleResources, setVisibleResources] = useState(4);

  const handleSearchResources = (e) => {
    setSearchTermResources(e.target.value);
  };

  const handleCategoryFilterResources = (e) => {
    setCategoryFilterResources(e.target.value);
  };

  const handleTypeFilter = (e) => {
    setTypeFilter(e.target.value);
  };

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTermResources.toLowerCase());
    const matchesCategory = categoryFilterResources === 'todasCategorias' || resource.category === categoryFilterResources;
    const matchesType = typeFilter === 'todosTipos' || resource.type === typeFilter;
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleOpenModalResources = () => {
    setIsModalOpenResources(true);
  };

  const handleCloseModalResources = () => {
    setIsModalOpenResources(false);
    setNewResource({ title: '', category: '', type: '', description: '', file: null });
  };

  const handleSaveResource = () => {
    if (!newResource.title || !newResource.category || !newResource.type || !newResource.file) {
      alert('Por favor, preencha todos os campos obrigatórios e selecione um arquivo.');
      return;
    }
    const newId = Math.max(...resources.map((r) => r.id), 0) + 1;
    const today = new Date().toLocaleDateString('pt-BR');
    const reader = new FileReader();
    reader.onload = (e) => {
      setResources([
        ...resources,
        {
          id: newId,
          title: newResource.title,
          category: newResource.category,
          type: newResource.type,
          description: newResource.description,
          date: today,
          url: e.target.result,
        },
      ]);
      handleCloseModalResources();
    };
    reader.readAsDataURL(newResource.file);
  };

  const handleFileChange = (e) => {
    setNewResource({ ...newResource, file: e.target.files[0] });
  };

  const handleVisualizar = (url) => {
    window.open(url, '_blank');
  };

  const handleDownload = (url, title) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = title;
    link.click();
  };

  const handleDeleteResource = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este recurso?')) {
      setResources(resources.filter((resource) => resource.id !== id));
    }
  };

  const handleLoadMoreResources = () => {
    setVisibleResources((prev) => prev + 4);
  };

  // Configurações section
  const [notificationsConfig, setNotificationsConfig] = useState({
    email: true,
    platform: true,
    sms: false,
  });
  const [userData, setUserData] = useState({
    email: 'ana.silva@exemplo.com',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [supportMessage, setSupportMessage] = useState({
    category: 'Problemas técnicos',
    message: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      setNotificationsConfig(JSON.parse(savedNotifications));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notificationsConfig));
  }, [notificationsConfig]);

  const handleNotificationChange = (type) => {
    setNotificationsConfig((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSecurity = () => {
    if (!userData.email) {
      setError('O e-mail é obrigatório.');
      return;
    }
    if (userData.newPassword || userData.confirmNewPassword) {
      if (userData.newPassword !== userData.confirmNewPassword) {
        setError('As senhas não coincidem.');
        return;
      }
      if (!userData.currentPassword) {
        setError('A senha atual é obrigatória para alterar a senha.');
        return;
      }
      if (userData.newPassword.length < 6) {
        setError('A nova senha deve ter pelo menos 6 caracteres.');
        return;
      }
    }
    setError('');
    alert('Dados de segurança atualizados com sucesso!');
    setUserData((prev) => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    }));
  };

  const handleSupportMessageChange = (e) => {
    const { name, value } = e.target;
    setSupportMessage((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendSupportMessage = () => {
    if (!supportMessage.message.trim()) {
      setError('A mensagem de suporte não pode estar vazia.');
      return;
    }
    setError('');
    alert(`Mensagem enviada: [${supportMessage.category}] ${supportMessage.message}`);
    setSupportMessage({ category: 'Problemas técnicos', message: '' });
  };

  const handleExportData = () => {
    const data = {
      user: userData.email,
      notificationsConfig,
      exampleData: 'Dados fictícios exportados',
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'dados_usuario.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
      alert('Conta excluída com sucesso!');
    }
  };

  // Meu Perfil section
  const [perfil, setPerfil] = useState({
    nomeCompleto: 'Dra. Ana Silva',
    especialidade: 'Fonoaudiologia',
    email: 'ana.silva@exemplo.com',
    telefone: '(11) 98765-4321',
    biografia: 'Fonoaudióloga especializada em crianças com síndrome de Down, com 8 anos de experiência. Formada pela USP, com pós-graduação em Desenvolvimento Infantil. Acredito em uma abordagem multidisciplinar para melhorar a comunicação e qualidade de vida das crianças.',
    credenciais: 'CRFa 12345/SP\nPós-graduação em Desenvolvimento Infantil - USP',
    fotoPerfil: 'https://randomuser.me/api/portraits/women/65.jpg'
  });
  const [erros, setErros] = useState({});
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const fileInputRef = useRef(null);
  const especialidades = [
    'Fonoaudiologia',
    'Terapia Ocupacional',
    'Pedagogia',
    'Psicologia',
    'Neurologia',
    'Pediatria',
    'Fisioterapia'
  ];

  const handleChangePerfil = (e) => {
    const { name, value } = e.target;
    setPerfil(prev => ({
      ...prev,
      [name]: value
    }));
    if (erros[name]) {
      setErros(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        alert('Por favor, selecione um arquivo de imagem.');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert('A imagem deve ter menos de 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setPerfil(prev => ({
          ...prev,
          fotoPerfil: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validarFormulario = () => {
    const novosErros = {};
    if (!perfil.nomeCompleto.trim()) {
      novosErros.nomeCompleto = 'Nome completo é obrigatório';
    }
    if (!perfil.email.trim()) {
      novosErros.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(perfil.email)) {
      novosErros.email = 'E-mail inválido';
    }
    if (perfil.telefone && !/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/.test(perfil.telefone)) {
      novosErros.telefone = 'Telefone inválido';
    }
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmitPerfil = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      console.log('Dados para salvar:', perfil);
      setTimeout(() => {
        setMensagemSucesso('Perfil atualizado com sucesso!');
        setTimeout(() => setMensagemSucesso(''), 3000);
      }, 1000);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'visaoGeral':
        return (
          <div className={styles.container}>
            <header className={styles.header}>
              <h2 className={styles.titulo}>Visão Geral</h2>
              <div className={styles.pesquisaContainer}>
                <FaSearch className={styles.iconePesquisa} />
                <input
                  type="text"
                  placeholder="Pesquisar..."
                  className={styles.pesquisa}
                  value={searchTermVisao}
                  onChange={handleSearchVisao}
                />
              </div>
              <div className={styles.perfilHeader}>
                <div className={styles.notificacaoWrapper} onClick={toggleNotifications}>
                  <FaBell className={styles.iconeNotificacao} />
                  <span className={styles.notificacaoBadge}>
                    {notifications.filter((n) => !n.read).length}
                  </span>
                </div>
                <img
                  src="https://randomuser.me/api/portraits/women/65.jpg"
                  alt="Perfil"
                  className={styles.fotoPerfil}
                />
                <span className={styles.nomePerfil}>Profissional</span>
              </div>
            </header>
            {showNotifications && (
              <div className={styles.modalNotificacoes}>
                <div className={styles.modalContent}>
                  <h3>Notificações</h3>
                  {notifications.length === 0 ? (
                    <p>Nenhuma notificação.</p>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`${styles.notificacaoItem} ${notif.read ? styles.lida : ''}`}
                        onClick={() => markNotificationAsRead(notif.id)}
                      >
                        <p>{notif.message}</p>
                        <span>{notif.read ? 'Lida' : 'Nova'}</span>
                      </div>
                    ))
                  )}
                  <button
                    className={styles.botaoFechar}
                    onClick={toggleNotifications}
                  >
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
                  {filteredSessoes.length === 0 ? (
                    <p>Nenhuma sessão encontrada.</p>
                  ) : (
                    filteredSessoes.map((sessao) => (
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
                              onClick={() => markSessionAsCompleted(sessao.id)}
                            >
                              Concluir
                            </button>
                          )}
                          {sessao.concluida && (
                            <span className={styles.concluida}>Concluída</span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className={styles.caixasDuplas}>
                <div className={styles.anotacoes}>
                  <h3 className={styles.subtitulo}>Anotações Recentes</h3>
                  {filteredAnotacoesVisao.length === 0 ? (
                    <p>Nenhuma anotação encontrada.</p>
                  ) : (
                    filteredAnotacoesVisao.map((anotacao) => (
                      <div
                        key={anotacao.id}
                        className={styles.anotacaoItem}
                        onClick={() => openAnnotationDetails(anotacao)}
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
            {selectedAnnotation && (
              <div className={styles.modalAnotacao}>
                <div className={styles.modalContent}>
                  <h3>Detalhes da Anotação</h3>
                  <p>
                    <strong>Cliente:</strong> {selectedAnnotation.nome}
                  </p>
                  <p>
                    <strong>Texto:</strong> {selectedAnnotation.texto}
                  </p>
                  <p>
                    <strong>Data:</strong>{' '}
                    {selectedAnnotation.data.toLocaleDateString('pt-BR')}
                  </p>
                  <button
                    className={styles.botaoFechar}
                    onClick={closeAnnotationDetails}
                  >
                    Fechar
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      case 'agenda':
        return (
          <div className={styles.container}>
            {modalAbertoAgenda && (
              <div className={styles.modal}>
                <div className={styles.modalConteudo}>
                  <button className={styles.botaoFechar} onClick={() => setModalAbertoAgenda(false)}>
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
                <input
                  type="text"
                  placeholder="Pesquisar..."
                  className={styles.pesquisa}
                  value={buscaAgenda}
                  onChange={(e) => setBuscaAgenda(e.target.value)}
                />
                <FaSearch className={styles.iconePesquisa} />
              </div>
              <div className={styles.perfilHeader}>
                <img
                  src="https://randomuser.me/api/portraits/women/65.jpg"
                  alt="Perfil"
                  className={styles.fotoPerfil}
                />
                <span className={styles.nomePerfil}>Dra. Ana</span>
                <div className={styles.notificacaoContainer}>
                  <FaBell className={styles.iconeNotificacao} />
                  <span className={styles.bolinhaNotificacao}></span>
                </div>
              </div>
            </header>
            <main className={styles.main}>
              <div className={styles.controles}>
                <div className={styles.visualizacao}>
                  <span
                    className={visualizacao === 'mes' ? styles.opcaoAtiva : ''}
                    onClick={() => setVisualizacao('mes')}
                  >
                    Mês
                  </span>
                  <span
                    className={visualizacao === 'semana' ? styles.opcaoAtiva : ''}
                    onClick={() => setVisualizacao('semana')}
                  >
                    Semana
                  </span>
                  <span
                    className={visualizacao === 'dia' ? styles.opcaoAtiva : ''}
                    onClick={() => setVisualizacao('dia')}
                  >
                    Dia
                  </span>
                </div>
                <div className={styles.botoes}>
                  {visualizacao === 'mes' && (
                    <>
                      <button className={styles.botaoMes} onClick={mesAnterior}>
                        <FaChevronLeft />
                      </button>
                      <span className={styles.mesAtual}>
                        {mesAtual.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                      </span>
                      <button className={styles.botaoMes} onClick={mesSeguinte}>
                        <FaChevronRight />
                      </button>
                    </>
                  )}
                  {visualizacao === 'semana' && (
                    <>
                      <button className={styles.botaoMes} onClick={semanaAnterior}>
                        <FaChevronLeft />
                      </button>
                      <span className={styles.mesAtual}>
                        Semana de {gerarDiasDaSemana()[0].toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })} -{' '}
                        {gerarDiasDaSemana()[6].toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}
                      </span>
                      <button className={styles.botaoMes} onClick={semanaSeguinte}>
                        <FaChevronRight />
                      </button>
                    </>
                  )}
                  {visualizacao === 'dia' && (
                    <>
                      <button className={styles.botaoMes} onClick={diaAnterior}>
                        <FaChevronLeft />
                      </button>
                      <span className={styles.mesAtual}>{formatarData(diaSelecionado)}</span>
                      <button className={styles.botaoMes} onClick={diaSeguinte}>
                        <FaChevronRight />
                      </button>
                    </>
                  )}
                  <button className={styles.botaoAdicionar} onClick={() => abrirModalAgenda(null, diaSelecionado)}>
                    <FaPlus /> Adicionar Sessão
                  </button>
                </div>
              </div>
              {visualizacao === 'mes' && (
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
                          dia && dia.getDate() === new Date().getDate() && dia.getMonth() === new Date().getMonth()
                            ? styles.diaAtual
                            : ''
                        }`}
                        onClick={() => dia && abrirModalAgenda(null, dia)}
                      >
                        {dia && <span>{dia.getDate()}</span>}
                        {dia &&
                          eventosDoDia(dia).map((evento) => (
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
              {visualizacao === 'semana' && (
                <div className={styles.semana}>
                  <div className={styles.diasSemana}>
                    {gerarDiasDaSemana().map((dia, index) => (
                      <span key={index}>{dia.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric' })}</span>
                    ))}
                  </div>
                  <div className={styles.dias}>
                    {gerarDiasDaSemana().map((dia, index) => (
                      <div
                        key={index}
                        className={`${styles.dia} ${
                          dia.getDate() === new Date().getDate() && dia.getMonth() === new Date().getMonth()
                            ? styles.diaAtual
                            : ''
                        }`}
                        onClick={() => abrirModalAgenda(null, dia)}
                      >
                        {eventosDoDia(dia).map((evento) => (
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
                            {evento.hora} - {evento.paciente} ({evento.tipo})
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {visualizacao === 'dia' && (
                <div className={styles.diaView}>
                  <div className={styles.eventosDia}>
                    {eventosDoDia(diaSelecionado).length > 0 ? (
                      eventosDoDia(diaSelecionado).map((evento) => (
                        <div
                          key={evento.id}
                          className={`${styles.evento} ${
                            styles[`evento${evento.cor.charAt(0).toUpperCase() + evento.cor.slice(1)}`]
                          }`}
                          onClick={() => abrirModalAgenda(evento)}
                        >
                          {evento.hora} - {evento.paciente} ({evento.tipo})
                        </div>
                      ))
                    ) : (
                      <p className={styles.semCompromissos}>Nenhum compromisso neste dia</p>
                    )}
                  </div>
                </div>
              )}
              <div className={styles.compromissos}>
                <h3 className={styles.subtitulo}>Próximos Compromissos</h3>
                {buscaAgenda ? (
                  eventosFiltrados.length > 0 ? (
                    eventosFiltrados.map((compromisso) => (
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
                    <p className={styles.semCompromissos}>Nenhum compromisso encontrado</p>
                  )
                ) : proximosCompromissos.length > 0 ? (
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
      case 'anotacoes':
        return (
          <div className={styles.container}>
            <header className={styles.header}>
              <h2 className={styles.titulo}>Anotações</h2>
              <div className={styles.pesquisaContainer}>
                <input
                  type="text"
                  placeholder="Pesquisar anotação..."
                  className={styles.pesquisa}
                  value={searchTermNotes}
                  onChange={handleSearchNotes}
                />
                <span className={styles.iconePesquisa}></span>
              </div>
              <div className={styles.filtros}>
                <select className={styles.filtro} value={categoryFilterNotes} onChange={handleCategoryFilterNotes}>
                  <option value="todasCategorias">Todas as Categorias</option>
                  <option value="Comunicação">Comunicação</option>
                  <option value="Socialização">Socialização</option>
                  <option value="Habilidades Motoras">Habilidades Motoras</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>
              <button className={styles.botaoNova} onClick={() => handleOpenModalNotes()}>
                + Nova Anotação
              </button>
            </header>
            <main className={styles.main}>
              <div className={styles.anotacoesRecentes}>
                <h3 className={styles.subtitulo}>Anotações Recentes</h3>
                {filteredNotes.slice(0, visibleNotes).map((note) => (
                  <div key={note.id} className={styles.anotacaoItem}>
                    <div>
                      <span className={styles.iconeAnotacao}></span>
                      <div>
                        <p className={styles.nomeCliente}>{note.title}</p>
                        <p className={styles.data}>{note.date} | {note.category}</p>
                        <p className={styles.textoAnotacao}>{note.text}</p>
                      </div>
                    </div>
                    <div className={styles.acoes}>
                      <span
                        className={styles.iconeEditar}
                        onClick={() => handleOpenModalNotes(note)}
                      ></span>
                      <span
                        className={styles.iconeExcluir}
                        onClick={() => handleDeleteNote(note.id)}
                      ></span>
                    </div>
                  </div>
                ))}
                {visibleNotes < filteredNotes.length && (
                  <button className={styles.botaoCarregar} onClick={handleLoadMoreNotes}>
                    Carregar Mais
                  </button>
                )}
              </div>
            </main>
            {isModalOpenNotes && (
              <div className={styles.modal}>
                <div className={styles.modalContent}>
                  <h2>{currentNote ? 'Editar Anotação' : 'Nova Anotação'}</h2>
                  <input
                    type="text"
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    placeholder="Título da anotação"
                    className={styles.filtro}
                  />
                  <select
                    value={newNote.category}
                    onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
                    className={styles.filtro}
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="Comunicação">Comunicação</option>
                    <option value="Socialização">Socialização</option>
                    <option value="Habilidades Motoras">Habilidades Motoras</option>
                    <option value="Outros">Outros</option>
                  </select>
                  <textarea
                    value={newNote.text}
                    onChange={(e) => setNewNote({ ...newNote, text: e.target.value })}
                    placeholder="Digite a anotação..."
                    className={styles.textarea}
                  />
                  <div className={styles.modalAcoes}>
                    <button className={styles.botaoSalvar} onClick={handleSaveNote}>
                      Salvar
                    </button>
                    <button className={styles.botaoCancelar} onClick={handleCloseModalNotes}>
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case 'clientes':
        return (
          <div className={styles.container}>
            <header className={styles.header}>
              <h2 className={styles.titulo}>Clientes</h2>
              <div className={styles.pesquisaContainer}>
                <input
                  type="text"
                  placeholder="Pesquisar clientes..."
                  className={styles.pesquisa}
                  value={searchTermClients}
                  onChange={handleSearchClients}
                />
                <span className={styles.iconePesquisa}></span>
              </div>
              <div className={styles.filtros}>
                <select className={styles.filtro} value={ageFilter} onChange={handleAgeFilter}>
                  <option value="todasIdades">Todas as Idades</option>
                  <option value="0-5">0-5 anos</option>
                  <option value="6-10">6-10 anos</option>
                  <option value="11+">11+ anos</option>
                </select>
                <select className={styles.filtro} value={focusFilter} onChange={handleFocusFilter}>
                  <option value="todasAreasFoco">Todas as Áreas de Foco</option>
                  <option value="Comunicação">Comunicação</option>
                  <option value="Socialização">Socialização</option>
                  <option value="Habilidades Motoras">Habilidades Motoras</option>
                </select>
                <select className={styles.filtro} value={statusFilter} onChange={handleStatusFilter}>
                  <option value="todosStatus">Todos os Status</option>
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                  <option value="Pendente">Pendente</option>
                </select>
              </div>
              <button className={styles.botaoAdicionar} onClick={() => handleOpenModalClients()}>
                + Adicionar Cliente
              </button>
            </header>
            <main className={styles.main}>
              <div className={styles.tabelaContainer}>
                <table className={styles.tabela}>
                  <thead>
                    <tr>
                      <th>Cliente</th>
                      <th>Idade</th>
                      <th>Responsável</th>
                      <th>Contato</th>
                      <th>Foco</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClients.slice(0, visibleClients).map((client) => (
                      <tr key={client.id}>
                        <td>
                          <span className={styles.iconeCliente}></span>
                          <div>
                            <p className={styles.nomeCliente}>{client.name}</p>
                            <p className={styles.ultimaSessao}>Última sessão: {client.lastSession}</p>
                          </div>
                        </td>
                        <td>{client.age}</td>
                        <td>{client.responsible}</td>
                        <td>
                          <p>{client.contact.email}</p>
                          <p>{client.contact.phone}</p>
                        </td>
                        <td>{client.focus}</td>
                        <td>
                          <span
                            className={styles.iconeEditar}
                            onClick={() => handleOpenModalClients(client)}
                          ></span>
                          <span
                            className={styles.iconeExcluir}
                            onClick={() => handleDeleteClient(client.id)}
                          ></span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {visibleClients < filteredClients.length && (
                <button className={styles.botaoCarregar} onClick={handleLoadMoreClients}>
                  Carregar Mais
                </button>
              )}
            </main>
            {isModalOpenClients && (
              <div className={styles.modal}>
                <div className={styles.modalContent}>
                  <h2>{currentClient ? 'Editar Cliente' : 'Adicionar Cliente'}</h2>
                  <input
                    type="text"
                    value={newClient.name}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    placeholder="Nome do cliente"
                    className={styles.filtro}
                  />
                  <input
                    type="text"
                    value={newClient.age}
                    onChange={(e) => setNewClient({ ...newClient, age: e.target.value })}
                    placeholder="Idade (ex.: 6 anos)"
                    className={styles.filtro}
                  />
                  <input
                    type="text"
                    value={newClient.responsible}
                    onChange={(e) => setNewClient({ ...newClient, responsible: e.target.value })}
                    placeholder="Nome do responsável"
                    className={styles.filtro}
                  />
                  <input
                    type="email"
                    value={newClient.email}
                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                    placeholder="E-mail"
                    className={styles.filtro}
                  />
                  <input
                    type="text"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                    placeholder="Telefone (ex.: (11) 98765-4321)"
                    className={styles.filtro}
                  />
                  <select
                    value={newClient.focus}
                    onChange={(e) => setNewClient({ ...newClient, focus: e.target.value })}
                    className={styles.filtro}
                  >
                    <option value="">Selecione uma área de foco</option>
                    <option value="Comunicação">Comunicação</option>
                    <option value="Socialização">Socialização</option>
                    <option value="Habilidades Motoras">Habilidades Motoras</option>
                  </select>
                  <select
                    value={newClient.status}
                    onChange={(e) => setNewClient({ ...newClient, status: e.target.value })}
                    className={styles.filtro}
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                    <option value="Pendente">Pendente</option>
                  </select>
                  <input
                    type="text"
                    value={newClient.lastSession}
                    onChange={(e) => setNewClient({ ...newClient, lastSession: e.target.value })}
                    placeholder="Última sessão (ex.: 20/06/2023)"
                    className={styles.filtro}
                  />
                  <div className={styles.modalAcoes}>
                    <button className={styles.botaoSalvar} onClick={handleSaveClient}>
                      Salvar
                    </button>
                    <button className={styles.botaoCancelar} onClick={handleCloseModalClients}>
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case 'recursos':
        return (
          <div className={styles.container}>
            <header className={styles.header}>
              <h2 className={styles.titulo}>Recursos e Materiais</h2>
              <div className={styles.pesquisaContainer}>
                <input
                  type="text"
                  placeholder="Pesquisar recursos..."
                  className={styles.pesquisa}
                  value={searchTermResources}
                  onChange={handleSearchResources}
                />
                <span className={styles.iconePesquisa}></span>
              </div>
              <div className={styles.filtros}>
                <select className={styles.filtro} value={categoryFilterResources} onChange={handleCategoryFilterResources}>
                  <option value="todasCategorias">Todas as Categorias</option>
                  <option value="Comunicação">Comunicação</option>
                  <option value="Socialização">Socialização</option>
                  <option value="Habilidades Motoras">Habilidades Motoras</option>
                  <option value="Outros">Outros</option>
                </select>
                <select className={styles.filtro} value={typeFilter} onChange={handleTypeFilter}>
                  <option value="todosTipos">Todos os Tipos</option>
                  <option value="PDF">PDF</option>
                  <option value="Imagem">Imagem</option>
                  <option value="Documento">Documento</option>
                  <option value="Vídeo">Vídeo</option>
                </select>
              </div>
              <button className={styles.botaoEnviar} onClick={handleOpenModalResources}>
                ↑ Enviar Arquivo
              </button>
            </header>
            <main className={styles.main}>
              <div className={styles.recursosContainer}>
                {filteredResources.slice(0, visibleResources).map((resource) => (
                  <div key={resource.id} className={styles.cartao}>
                    <span
                      className={
                        resource.type === 'PDF'
                          ? styles.iconePdf
                          : resource.type === 'Imagem'
                          ? styles.iconeImagem
                          : resource.type === 'Documento'
                          ? styles.iconeDocumento
                          : resource.type === 'Vídeo'
                          ? styles.iconeVideo
                          : styles.iconeOutros
                      }
                    ></span>
                    <div>
                      <p className={styles.tituloRecurso}>{resource.title}</p>
                      <p className={styles.categoria}>{resource.description}</p>
                      <p className={styles.data}>{resource.date}</p>
                    </div>
                    <div className={styles.acoes}>
                      <span
                        className={styles.iconeVisualizar}
                        onClick={() => handleVisualizar(resource.url)}
                      ></span>
                      <span
                        className={styles.iconeDownload}
                        onClick={() => handleDownload(resource.url, resource.title)}
                      ></span>
                      <span
                        className={styles.iconeExcluir}
                        onClick={() => handleDeleteResource(resource.id)}
                      ></span>
                    </div>
                  </div>
                ))}
              </div>
              {visibleResources < filteredResources.length && (
                <button className={styles.botaoCarregar} onClick={handleLoadMoreResources}>
                  Carregar Mais
                </button>
              )}
            </main>
            {isModalOpenResources && (
              <div className={styles.modal}>
                <div className={styles.modalContent}>
                  <h2>Enviar Novo Recurso</h2>
                  <input
                    type="text"
                    value={newResource.title}
                    onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                    placeholder="Título do recurso"
                    className={styles.filtro}
                  />
                  <select
                    value={newResource.category}
                    onChange={(e) => setNewResource({ ...newResource, category: e.target.value })}
                    className={styles.filtro}
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="Comunicação">Comunicação</option>
                    <option value="Socialização">Socialização</option>
                    <option value="Habilidades Motoras">Habilidades Motoras</option>
                    <option value="Outros">Outros</option>
                  </select>
                  <select
                    value={newResource.type}
                    onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
                    className={styles.filtro}
                  >
                    <option value="">Selecione um tipo</option>
                    <option value="PDF">PDF</option>
                    <option value="Imagem">Imagem</option>
                    <option value="Documento">Documento</option>
                    <option value="Vídeo">Vídeo</option>
                  </select>
                  <input
                    type="text"
                    value={newResource.description}
                    onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                    placeholder="Descrição"
                    className={styles.filtro}
                  />
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.mp4"
                    onChange={handleFileChange}
                    className={styles.filtro}
                  />
                  <div className={styles.modalAcoes}>
                    <button className={styles.botaoSalvar} onClick={handleSaveResource}>
                      Salvar
                    </button>
                    <button className={styles.botaoCancelar} onClick={handleCloseModalResources}>
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case 'configuracoes':
        return (
          <div className={styles.container}>
            <header className={styles.header}>
              <h2 className={styles.titulo}>Configurações</h2>
            </header>
            <main className={styles.main}>
              {error && <p className={styles.error}>{error}</p>}
              <section className={styles.secao}>
                <h3 className={styles.subtitulo}>Notificações</h3>
                <p className={styles.descricao}>Gerencie como você recebe notificações</p>
                <div className={styles.opcao}>
                  <label>
                    <input
                      type="checkbox"
                      checked={notificationsConfig.email}
                      onChange={() => handleNotificationChange('email')}
                    />
                    Notificações por E-mail
                    <span className={styles.subtexto}>
                      Receba notificações sobre novas mensagens e lembretes de sessão no seu e-mail
                    </span>
                  </label>
                </div>
                <div className={styles.opcao}>
                  <label>
                    <input
                      type="checkbox"
                      checked={notificationsConfig.platform}
                      onChange={() => handleNotificationChange('platform')}
                    />
                    Notificações na Plataforma
                    <span className={styles.subtexto}>
                      Receba notificações diretamente no painel da Acenis
                    </span>
                  </label>
                </div>
                <div className={styles.opcao}>
                  <label>
                    <input
                      type="checkbox"
                      checked={notificationsConfig.sms}
                      onChange={() => handleNotificationChange('sms')}
                    />
                    Notificações por SMS
                    <span className={styles.subtexto}>
                      Receba alertas de compromissos e mensagens urgentes via SMS. Podem ser aplicadas taxas de operadora.
                    </span>
                  </label>
                </div>
              </section>
              <section className={styles.secao}>
                <h3 className={styles.subtitulo}>Segurança</h3>
                <p className={styles.descricao}>Atualize suas informações de login</p>
                <div className={styles.campo}>
                  <label>
                    E-mail
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleUserDataChange}
                      className={styles.input}
                      placeholder="seu.email@exemplo.com"
                    />
                  </label>
                </div>
                <div className={styles.campo}>
                  <label>
                    Senha Atual
                    <input
                      type="password"
                      name="currentPassword"
                      value={userData.currentPassword}
                      onChange={handleUserDataChange}
                      className={styles.input}
                      placeholder="Digite sua senha atual"
                    />
                  </label>
                </div>
                <div className={styles.campo}>
                  <label>
                    Nova Senha
                    <input
                      type="password"
                      name="newPassword"
                      value={userData.newPassword}
                      onChange={handleUserDataChange}
                      className={styles.input}
                      placeholder="Digite uma nova senha"
                    />
                  </label>
                </div>
                <div className={styles.campo}>
                  <label>
                                        <input
                      type="password"
                      name="confirmNewPassword"
                      value={userData.confirmNewPassword}
                      onChange={handleUserDataChange}
                      className={styles.input}
                      placeholder="Confirme a nova senha"
                    />
                  </label>
                </div>
                <button className={styles.botaoSalvar} onClick={handleUpdateSecurity}>
                  Atualizar Dados
                </button>
              </section>
              <section className={styles.secao}>
                <h3 className={styles.subtitulo}>Suporte</h3>
                <p className={styles.descricao}>Entre em contato com nossa equipe</p>
                <div className={styles.campo}>
                  <label>
                    Categoria
                    <select
                      name="category"
                      value={supportMessage.category}
                      onChange={handleSupportMessageChange}
                      className={styles.input}
                    >
                      <option value="Problemas técnicos">Problemas técnicos</option>
                      <option value="Dúvidas gerais">Dúvidas gerais</option>
                      <option value="Sugestões">Sugestões</option>
                    </select>
                  </label>
                </div>
                <div className={styles.campo}>
                  <label>
                    Mensagem
                    <textarea
                      name="message"
                      value={supportMessage.message}
                      onChange={handleSupportMessageChange}
                      className={styles.textarea}
                      placeholder="Descreva seu problema ou dúvida"
                    />
                  </label>
                </div>
                <button className={styles.botaoSalvar} onClick={handleSendSupportMessage}>
                  Enviar Mensagem
                </button>
              </section>
              <section className={styles.secao}>
                <h3 className={styles.subtitulo}>Gerenciamento de Dados</h3>
                <p className={styles.descricao}>Exporte ou exclua seus dados</p>
                <div className={styles.opcao}>
                  <button className={styles.botaoSecundario} onClick={handleExportData}>
                    Exportar Dados
                  </button>
                  <span className={styles.subtexto}>
                    Faça download de um arquivo com seus dados pessoais e de uso.
                  </span>
                </div>
                <div className={styles.opcao}>
                  <button className={styles.botaoExcluir} onClick={handleDeleteAccount}>
                    Excluir Conta
                  </button>
                  <span className={styles.subtexto}>
                    Exclua permanentemente sua conta e todos os dados associados.
                  </span>
                </div>
              </section>
            </main>
          </div>
        );
      case 'meuPerfil':
        return (
          <div className={styles.container}>
            <header className={styles.header}>
              <h2 className={styles.titulo}>Meu Perfil</h2>
            </header>
            <main className={styles.main}>
              {mensagemSucesso && <p className={styles.mensagemSucesso}>{mensagemSucesso}</p>}
              <form onSubmit={handleSubmitPerfil} className={styles.formPerfil}>
                <div className={styles.campo}>
                  <label>Foto de Perfil</label>
                  <div className={styles.fotoContainer}>
                    <img src={perfil.fotoPerfil} alt="Foto de Perfil" className={styles.fotoPerfil} />
                    <button
                      type="button"
                      className={styles.botaoMudarFoto}
                      onClick={() => fileInputRef.current.click()}
                    >
                      Mudar Foto
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={handleFotoChange}
                    />
                  </div>
                </div>
                <div className={styles.campo}>
                  <label>
                    Nome Completo
                    <input
                      type="text"
                      name="nomeCompleto"
                      value={perfil.nomeCompleto}
                      onChange={handleChangePerfil}
                      className={styles.input}
                    />
                    {erros.nomeCompleto && <span className={styles.erro}>{erros.nomeCompleto}</span>}
                  </label>
                </div>
                <div className={styles.campo}>
                  <label>
                    Especialidade
                    <select
                      name="especialidade"
                      value={perfil.especialidade}
                      onChange={handleChangePerfil}
                      className={styles.input}
                    >
                      {especialidades.map((esp) => (
                        <option key={esp} value={esp}>{esp}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className={styles.campo}>
                  <label>
                    E-mail
                    <input
                      type="email"
                      name="email"
                      value={perfil.email}
                      onChange={handleChangePerfil}
                      className={styles.input}
                    />
                    {erros.email && <span className={styles.erro}>{erros.email}</span>}
                  </label>
                </div>
                <div className={styles.campo}>
                  <label>
                    Telefone
                    <input
                      type="text"
                      name="telefone"
                      value={perfil.telefone}
                      onChange={handleChangePerfil}
                      className={styles.input}
                      placeholder="(11) 98765-4321"
                    />
                    {erros.telefone && <span className={styles.erro}>{erros.telefone}</span>}
                  </label>
                </div>
                <div className={styles.campo}>
                  <label>
                    Biografia
                    <textarea
                      name="biografia"
                      value={perfil.biografia}
                      onChange={handleChangePerfil}
                      className={styles.textarea}
                    />
                  </label>
                </div>
                <div className={styles.campo}>
                  <label>
                    Credenciais
                    <textarea
                      name="credenciais"
                      value={perfil.credenciais}
                      onChange={handleChangePerfil}
                      className={styles.textarea}
                    />
                  </label>
                </div>
                <button type="submit" className={styles.botaoSalvar}>
                  Salvar Alterações
                </button>
              </form>
            </main>
          </div>
        );
      default:
        return <div>Seção não encontrada</div>;
    }
  };

  return (
    <div className={styles.dashboard}>
<>
  {mobile && (
    <button className={styles.menuMobileButton} onClick={toggleMenu}>
      {menuAberto ? <FaTimes /> : <FaBars />}
    </button>
  )}
  <aside className={`${styles.sidebar} ${!menuAberto && mobile ? styles.escondido : ''}`}>
    <div className={styles.logoArea}>
      DASHBOARD
    </div>
    <div className={styles.perfilArea}>
      <img
        src="https://randomuser.me/api/portraits/women/65.jpg"
        alt="Foto de Perfil"
        className={styles.perfilFoto}
      />
      <div className={styles.perfilInfo}>
        <span className={styles.perfilNome}>Dra. Ana Silva</span>
        <span className={styles.perfilFuncao}>Fonoaudióloga</span>
      </div>
    </div>
    <nav className={styles.menu}>
      <button
        className={`${styles.link} ${activeSection === 'visaoGeral' ? styles.ativo : ''}`}
        onClick={() => handleClick('visaoGeral')}
      >
        <FaTachometerAlt className={styles.icone} /> Visão Geral
      </button>
      <button
        className={`${styles.link} ${activeSection === 'agenda' ? styles.ativo : ''}`}
        onClick={() => handleClick('agenda')}
      >
        <FaCalendarAlt className={styles.icone} /> Agenda
      </button>
      <button
        className={`${styles.link} ${activeSection === 'anotacoes' ? styles.ativo : ''}`}
        onClick={() => handleClick('anotacoes')}
      >
        <FaClipboard className={styles.icone} /> Anotações
      </button>
      <button
        className={`${styles.link} ${activeSection === 'clientes' ? styles.ativo : ''}`}
        onClick={() => handleClick('clientes')}
      >
        <FaUsers className={styles.icone} /> Clientes
      </button>
      <button
        className={`${styles.link} ${activeSection === 'recursos' ? styles.ativo : ''}`}
        onClick={() => handleClick('recursos')}
      >
        <FaFolder className={styles.icone} /> Recursos
      </button>
      <button
        className={`${styles.link} ${activeSection === 'configuracoes' ? styles.ativo : ''}`}
        onClick={() => handleClick('configuracoes')}
      >
        <FaCog className={styles.icone} /> Configurações
      </button>
      <button
        className={`${styles.link} ${activeSection === 'meuPerfil' ? styles.ativo : ''}`}
        onClick={() => handleClick('meuPerfil')}
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
</>
      <div className={styles.conteudo}>{renderSection()}</div>
    </div>
  );
}

export default Dashboard;
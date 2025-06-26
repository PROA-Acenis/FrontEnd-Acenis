
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaChartBar, FaShoppingCart, FaUsers, FaRocket, FaSearch, FaCalendarAlt,
  FaBars, FaTimes, FaEdit, FaTrash, FaPlus, FaUser, FaSignOutAlt, FaFilter, FaUpload, FaTimesCircle
} from 'react-icons/fa';

import styles from '../Dashboard-Fornecedores/DashFornecedor.module.css';

function FornecedorDashboard() {
  const [secaoAtiva, setSecaoAtiva] = useState('visaoGeral');
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [ehMobile, setEhMobile] = useState(window.innerWidth < 768);
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [mesSelecionado, setMesSelecionado] = useState('Jun');
  const [produtos, setProdutos] = useState([
    { id: 1, nome: 'Quebra-Cabeça Educativo', preco: 85.00, estoque: 77, dimensoes: '30x20x5 cm', faixaEtaria: '6-8 anos', genero: 'Unisex', desconto: 5, tipoDesconto: 'Lançamento', categoria: 'Quebra-cabeça', imagens: { principal: null, adicionais: [] } },
    { id: 2, nome: 'Quebra-Cabeça Numérico', preco: 95.00, estoque: 50, dimensoes: '25x25x3 cm', faixaEtaria: '3-5 anos', genero: 'Unisex', desconto: 0, tipoDesconto: '', categoria: 'Quebra-cabeça', imagens: { principal: null, adicionais: [] } },
    { id: 3, nome: 'Quebra-Cabeça Infantil', preco: 65.00, estoque: 30, dimensoes: '20x15x2 cm', faixaEtaria: '0-2 anos', genero: 'Unisex', desconto: 10, tipoDesconto: 'Fim de Ano', categoria: 'Quebra-cabeça', imagens: { principal: null, adicionais: [] } },
  ]);
  const [pedidos, setPedidos] = useState([
    { id: 265473, data: '22/06/2025 15:00', cliente: 'Erica Almeida', item: 5, total: 425.00, status: 'Pendente', pagamento: 'Pendente' },
    { id: 265474, data: '21/06/2025 14:30', cliente: 'Carlos Eduardo', item: 3, total: 285.00, status: 'Em transação', pagamento: 'Pago' },
    { id: 265475, data: '20/06/2025 13:45', cliente: 'Diego Silva', item: 2, total: 130.00, status: 'Completo', pagamento: 'Pago' },
  ]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [novoProduto, setNovoProduto] = useState({ nome: '', preco: 0, estoque: 0, dimensoes: '', faixaEtaria: '0-2 anos', genero: 'Unisex', desconto: 0, tipoDesconto: '', categoria: 'Quebra-cabeça', imagens: { principal: null, adicionais: [] } });
  const [imagensPreviews, setImagensPreviews] = useState({ principal: null, adicionais: [] });
  const [filtroStatus, setFiltroStatus] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina] = useState(5);
  const [fornecedor, setFornecedor] = useState({
    nomeEmpresa: 'Moreira Brinquedos',
    cnpj: '12.345.678/0001-90',
    emailContato: 'contato@moreirabrinq.com',
    telefone: '(11) 98765-4321',
    endereco: 'Rua das Crianças, 123, São Paulo',
    banco: 'Banco XYZ, Ag. 1234, Cc. 567890',
    foto: 'https://randomuser.me/api/portraits/women/65.jpg'
  });
  const [mostrarModalPlano, setMostrarModalPlano] = useState(false);

  useEffect(() => {
    function handleResize() {
      setEhMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMostrarMenu(true);
      else setMostrarMenu(false);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setMostrarMenu(!mostrarMenu);
  const fecharMenu = () => ehMobile && mostrarMenu && setMostrarMenu(false);
  const handlePesquisa = (e) => setTermoPesquisa(e.target.value);

  const dadosVisao = {
    saldoDisponivel: 2750000.50,
    saldoPendente: 450000.75,
    crescimento: 15,
    totalClientes: 128,
    vendas: [
      { mes: 'Jan', valor: 850000 }, { mes: 'Fev', valor: 920000 },
      { mes: 'Mar', valor: 780000 }, { mes: 'Abr', valor: 950000 },
      { mes: 'Mai', valor: 880000 }, { mes: 'Jun', valor: 975000 },
    ],
    vendasRecentes: [
      { nome: 'Diego Silva', valor: 2500, dias: '1 dia atrás' },
      { nome: 'Eduarda Melo', valor: 1800, dias: '2 dias atrás' },
      { nome: 'Emili Souza', valor: 3200, dias: '3 dias atrás' },
    ],
  };

  // Produtos Section
  const adicionarProduto = () => {
    setNovoProduto({ nome: '', preco: 0, estoque: 0, dimensoes: '', faixaEtaria: '0-2 anos', genero: 'Unisex', desconto: 0, tipoDesconto: '', categoria: 'Quebra-cabeça', imagens: { principal: null, adicionais: [] } });
    setImagensPreviews({ principal: null, adicionais: [] });
    setMostrarModal(true);
  };

  const salvarProduto = () => {
    if (produtoEditando) {
      setProdutos(produtos.map(p => p.id === produtoEditando.id ? { ...produtoEditando } : p));
    } else {
      setProdutos([...produtos, { ...novoProduto, id: Date.now() }]);
    }
    setMostrarModal(false);
    setProdutoEditando(null);
    setNovoProduto({ nome: '', preco: 0, estoque: 0, dimensoes: '', faixaEtaria: '0-2 anos', genero: 'Unisex', desconto: 0, tipoDesconto: '', categoria: 'Quebra-cabeça', imagens: { principal: null, adicionais: [] } });
    setImagensPreviews({ principal: null, adicionais: [] });
  };

  const editarProduto = (produto) => {
    setProdutoEditando({ ...produto });
    setImagensPreviews({
      principal: produto.imagens.principal ? URL.createObjectURL(produto.imagens.principal) : null,
      adicionais: produto.imagens.adicionais.map(img => URL.createObjectURL(img))
    });
    setMostrarModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (produtoEditando) setProdutoEditando({ ...produtoEditando, [name]: value });
    else setNovoProduto({ ...novoProduto, [name]: value });
  };

  const handleImagemUpload = (e, tipo) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      if (tipo === 'principal') {
        if (produtoEditando) setProdutoEditando(prev => ({ ...prev, imagens: { ...prev.imagens, principal: file } }));
        else setNovoProduto(prev => ({ ...prev, imagens: { ...prev.imagens, principal: file } }));
        setImagensPreviews(prev => ({ ...prev, principal: preview }));
      } else {
        const novasAdicionais = [...(produtoEditando ? produtoEditando.imagens.adicionais : novoProduto.imagens.adicionais), file];
        if (novasAdicionais.length <= 3) {
          if (produtoEditando) setProdutoEditando(prev => ({ ...prev, imagens: { ...prev.imagens, adicionais: novasAdicionais } }));
          else setNovoProduto(prev => ({ ...prev, imagens: { ...prev.imagens, adicionais: novasAdicionais } }));
          setImagensPreviews(prev => ({ ...prev, adicionais: [...prev.adicionais, preview].slice(0, 3) }));
        }
      }
    }
  };

  const handleFotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFornecedor({ ...fornecedor, foto: URL.createObjectURL(file) });
    }
  };

  const removerFoto = () => {
    setFornecedor({ ...fornecedor, foto: null });
  };

  // Pedidos Section
  const handleFiltroChange = (e) => {
    const { value, checked } = e.target;
    setFiltroStatus(checked ? [...filtroStatus, value] : filtroStatus.filter(status => status !== value));
    setPaginaAtual(1);
  };

  const filtrarPedidos = () => {
    return pedidos.filter(pedido =>
      (filtroStatus.length === 0 || filtroStatus.includes(pedido.status)) &&
      (pedido.cliente.toLowerCase().includes(termoPesquisa.toLowerCase()) || pedido.id.toString().includes(termoPesquisa))
    );
  };

  const indexUltimoItem = paginaAtual * itensPorPagina;
  const indexPrimeiroItem = indexUltimoItem - itensPorPagina;
  const pedidosFiltrados = filtrarPedidos();
  const pedidosPaginados = pedidosFiltrados.slice(indexPrimeiroItem, indexUltimoItem);
  const totalPaginas = Math.ceil(pedidosFiltrados.length / itensPorPagina);

  const paginar = (numeroPagina) => setPaginaAtual(numeroPagina);

  const salvarFornecedor = () => {
    alert('Informações salvas!');
  };

  const abrirModalPlano = () => setMostrarModalPlano(true);
  const fecharModalPlano = () => setMostrarModalPlano(false);

  return (
    <div className={styles.fornecedorDashboard}>
      {ehMobile && <button className={styles.menuMobileButton} onClick={toggleMenu}>{mostrarMenu ? <FaTimes /> : <FaBars />}</button>}

      <aside className={`${styles.sidebar} ${!mostrarMenu && ehMobile ? styles.hidden : ''}`} onClick={e => e.stopPropagation()}>
        <div className={styles.logoArea}>FORNECEDOR</div>
        <nav className={styles.menuNav}>
          <button className={`${styles.menuItem} ${secaoAtiva === 'visaoGeral' ? styles.active : ''}`} onClick={() => { setSecaoAtiva('visaoGeral'); fecharMenu(); }}>
            <FaChartBar className={styles.menuIcon} /> Visão Geral
          </button>
          <button className={`${styles.menuItem} ${secaoAtiva === 'produtos' ? styles.active : ''}`} onClick={() => { setSecaoAtiva('produtos'); fecharMenu(); }}>
            <FaShoppingCart className={styles.menuIcon} /> Produtos
          </button>
          <button className={`${styles.menuItem} ${secaoAtiva === 'pedidos' ? styles.active : ''}`} onClick={() => { setSecaoAtiva('pedidos'); fecharMenu(); }}>
            <FaCalendarAlt className={styles.menuIcon} /> Pedidos
          </button>
          <button className={`${styles.menuItem} ${secaoAtiva === 'perfil' ? styles.active : ''}`} onClick={() => { setSecaoAtiva('perfil'); fecharMenu(); }}>
            <FaUser className={styles.menuIcon} /> Perfil
          </button>
          <button className={`${styles.menuItem} ${secaoAtiva === 'planos' ? styles.active : ''}`} onClick={() => { setSecaoAtiva('planos'); fecharMenu(); }}>
            <FaRocket className={styles.menuIcon} /> Planos
          </button>
          <button className={styles.menuItem} id='botaosair' style={{ color: '#FF0000' }}>
            <Link>
              <FaSignOutAlt className={styles.menuIcon} /> Sair
            </Link>
          </button>


        </nav>
      </aside>

      <div className={styles.contentArea} onClick={fecharMenu}>
        <header className={styles.headerSection}>
          <div className={styles.headerRightSection}>
            <div className={styles.searchBox}>
              <FaSearch className={styles.searchIcon} />
              <input type="text" placeholder="Pesquisa" className={styles.searchInput} value={termoPesquisa} onChange={handlePesquisa} />
            </div>
            <div className={styles.datePicker}>
              <FaCalendarAlt className={styles.calendarIcon} />
              <select value={mesSelecionado} onChange={e => setMesSelecionado(e.target.value)} className={styles.monthDropdown}>
                <option value="Jan">Jan</option>
                <option value="Fev">Fev</option>
                <option value="Mar">Mar</option>
                <option value="Abr">Abr</option>
                <option value="Mai">Mai</option>
                <option value="Jun">Jun</option>
                <option value="Jul">Jul</option>
                <option value="Ago">Ago</option>
                <option value="Set">Set</option>
                <option value="Out">Out</option>
                <option value="Nov">Nov</option>
                <option value="Dez">Dez</option>
              </select>
            </div>
            <div className={styles.userProfile}>
              {fornecedor.foto && <img src={fornecedor.foto} alt="Perfil Fornecedor" className={styles.profilePic} />}
              <span className={styles.userName}>{fornecedor.nomeEmpresa}</span>
              <span className={styles.userStatus}>{fornecedor.status || 'Ativo'}</span>
            </div>
          </div>
        </header>

        <main className={styles.mainArea}>
          {secaoAtiva === 'visaoGeral' && (
            <>
              <div className={styles.greetingSection}>
                <h1 className={styles.greetingTitle}>Olá, {fornecedor.nomeEmpresa}!</h1>
                <p className={styles.greetingText}>Bem-vindo ao seu dashboard de fornecedor. Confira seu desempenho e gerencie seus produtos e pedidos para este mês de junho de 2025.</p>
              </div>
              <div className={styles.mainCards}>
                <div className={styles.balanceCard}>
                  <h3 className={styles.cardTitle}>Saldo Disponível</h3>
                  <p className={styles.cardValue}>R$ {dadosVisao.saldoDisponivel.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  <span className={styles.cardGrowth}>+8%</span>
                </div>
                <div className={styles.balanceCard}>
                  <h3 className={styles.cardTitle}>Saldo Pendente</h3>
                  <p className={styles.cardValue}>R$ {dadosVisao.saldoPendente.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  <span className={styles.cardGrowth} style={{ color: '#e74c3c' }}>-2%</span>
                </div>
                <div className={styles.growthCard}>
                  <FaRocket className={styles.growthIcon} />
                  <h3 className={styles.cardTitle}>Crescimento Mensal</h3>
                  <p className={styles.cardValue}>+{dadosVisao.crescimento}%</p>
                  <div className={styles.growthProgress}>
                    <div className={styles.progressBar} style={{ width: `${dadosVisao.crescimento}%`, backgroundColor: '#006400' }}></div>
                  </div>
                </div>
                <div className={styles.clientsCard}>
                  <FaUsers className={styles.clientsIcon} />
                  <h3 className={styles.cardTitle}>Total de Clientes</h3>
                  <p className={styles.cardValue}>{dadosVisao.totalClientes}</p>
                  <div className={styles.clientsProgress}>
                    <div className={styles.progressBar} style={{ width: `${(dadosVisao.totalClientes / 200) * 100}%`, backgroundColor: '#2ecc71' }}></div>
                  </div>
                </div>
              </div>
              <div className={styles.analysisSection}>
                <div className={styles.salesAnalysis}>
                  <div className={styles.analysisHeader}>
                    <FaChartBar className={styles.analysisIcon} />
                    <h3>Vendas</h3>
                  </div>
                  <div className={styles.salesChart}>
                    {dadosVisao.vendas.map((venda, index) => (
                      <div key={index} className={styles.salesBar} style={{ height: `${(venda.valor / 1000000) * 200}px`, backgroundColor: '#2ecc71' }}>
                        <span className={styles.barValue}>R$ {venda.valor.toLocaleString('pt-BR')}</span>
                      </div>
                    ))}
                  </div>
                  <div className={styles.axisLabels}>
                    {dadosVisao.vendas.map((venda, index) => (
                      <span key={index} className={styles.axisLabel}>{venda.mes}</span>
                    ))}
                  </div>
                </div>
                <div className={styles.recentSales}>
                  <div className={styles.analysisHeader}>
                    <FaShoppingCart className={styles.analysisIcon} />
                    <h3>Vendas Recentes</h3>
                    <span className={styles.seeMore}>Veja mais</span>
                  </div>
                  {dadosVisao.vendasRecentes.map((venda, index) => (
                    <div key={index} className={styles.saleItem}>
                      <div className={styles.saleInfo}>
                        <p className={styles.saleName}>{venda.nome}</p>
                        <p className={styles.saleDays}>{venda.dias}</p>
                      </div>
                      <p className={styles.saleValue}>R$ {venda.valor.toLocaleString('pt-BR')}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {secaoAtiva === 'produtos' && (
            <div className={styles.productsSection}>
              <div className={styles.productsHeader}>
                <h1 className={styles.greetingTitle}>Gerenciar Produtos</h1>
                <p className={styles.greetingText}>Adicione, edite e visualize os produtos da sua loja de fornecedores.</p>
                <button className={styles.addProductButton} onClick={adicionarProduto}>
                  <FaPlus /> Adicionar Produto
                </button>
              </div>
              <div className={styles.productsList}>
                {produtos.map((produto) => (
                  <div key={produto.id} className={styles.productItem}>
                    <div className={styles.productImage}>
                      {produto.imagens.principal && <img src={URL.createObjectURL(produto.imagens.principal)} alt={produto.nome} className={styles.productImg} />}
                    </div>
                    <div className={styles.productDetails}>
                      <span className={styles.productName}>{produto.nome}</span>
                      <span className={styles.productPrice}>R$ {produto.preco.toFixed(2)}</span>
                      <span className={styles.productStock}>Estoque: {produto.estoque}</span>
                      <span className={styles.productDimensions}>Dimensões: {produto.dimensoes}</span>
                      <span className={styles.productAgeRange}>Faixa Etária: {produto.faixaEtaria}</span>
                      <span className={styles.productGender}>Gênero: {produto.genero}</span>
                      <span className={styles.productDiscount}>Desconto: {produto.desconto}% ({produto.tipoDesconto})</span>
                      <span className={styles.productCategory}>Categoria: {produto.categoria}</span>
                    </div>
                    <div className={styles.productActions}>
                      <button className={styles.editButton} onClick={() => editarProduto(produto)}>
                        <FaEdit /> Editar
                      </button>
                      <button className={styles.deleteButton} onClick={() => setProdutos(produtos.filter(p => p.id !== produto.id))}>
                        <FaTrash /> Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {secaoAtiva === 'pedidos' && (
            <div className={styles.ordersSection}>
              <div className={styles.ordersHeader}>
                <h1 className={styles.greetingTitle}>Pedidos</h1>
                <p className={styles.greetingText}>Gerencie e acompanhe os pedidos dos seus clientes.</p>
              </div>
              <div className={styles.ordersStats}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Data</span>
                  <select className={styles.statSelect} onChange={e => setMesSelecionado(e.target.value)}>
                    <option value="22/06/2025">22/06/2025</option>
                    <option value="21/06/2025">21/06/2025</option>
                    <option value="20/06/2025">20/06/2025</option>
                  </select>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Total de pedidos</span>
                  <span className={styles.statValue}>314</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Pendente</span>
                  <span className={styles.statValue} style={{ color: '#f1c40f' }}>12</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Em transação</span>
                  <span className={styles.statValue} style={{ color: '#3498db' }}>250</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Completo</span>
                  <span className={styles.statValue} style={{ color: '#2ecc71' }}>50</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Cancelado</span>
                  <span className={styles.statValue} style={{ color: '#e74c3c' }}>2</span>
                </div>
              </div>
              <div className={styles.ordersControls}>
                <div className={styles.statusFilters}>
                  <label><input type="checkbox" value="Pendente" onChange={handleFiltroChange} /> Pendente</label>
                  <label><input type="checkbox" value="Em transação" onChange={handleFiltroChange} /> Em transação</label>
                  <label><input type="checkbox" value="Completo" onChange={handleFiltroChange} /> Completo</label>
                  <label><input type="checkbox" value="Cancelado" onChange={handleFiltroChange} /> Cancelado</label>
                </div>

              </div>
              <div className={styles.ordersTable}>
                <table>
                  <thead>
                    <tr>
                      <th><input type="checkbox" onChange={e => setPedidos(pedidos.map(p => ({ ...p, selecionado: e.target.checked })))} /></th>
                      <th>ID do pedido</th>
                      <th>Data</th>
                      <th>Clientes</th>
                      <th>Item</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Pagamento</th>
                      <th>Editar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pedidosPaginados.map((pedido) => (
                      <tr key={pedido.id}>
                        <td><input type="checkbox" checked={pedido.selecionado || false} onChange={e => setPedidos(pedidos.map(p => p.id === pedido.id ? { ...p, selecionado: e.target.checked } : p))} /></td>
                        <td>#{pedido.id}</td>
                        <td>{pedido.data}</td>
                        <td>{pedido.cliente}</td>
                        <td>{pedido.item}</td>
                        <td>R$ {pedido.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                        <td>
                          <span className={`${styles.orderStatus} ${styles[pedido.status.toLowerCase().replace(' ', '')]}`}>
                            {pedido.status}
                          </span>
                        </td>
                        <td>{pedido.pagamento}</td>
                        <td>
                          <button className={styles.editButton}><FaEdit /></button>
                          <button className={styles.deleteButton} onClick={() => setPedidos(pedidos.filter(p => p.id !== pedido.id))}>
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={styles.pagination}>
                <button onClick={() => paginar(paginaAtual - 1)} disabled={paginaAtual === 1}>Anterior</button>
                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(numero => (
                  <button key={numero} onClick={() => paginar(numero)} className={paginaAtual === numero ? styles.activePage : ''}>
                    {numero}
                  </button>
                ))}
                <button onClick={() => paginar(paginaAtual + 1)} disabled={paginaAtual === totalPaginas}>Próximo</button>
              </div>
            </div>
          )}

          {secaoAtiva === 'perfil' && (
            <div className={styles.profileSection}>
              <h1 className={styles.greetingTitle}>Perfil do Fornecedor</h1>
              <p className={styles.greetingText}>Gerencie as informações da sua empresa fornecedora.</p>
              <div className={styles.profileRows}>
                <div className={styles.profileRow}>
                  <div className={styles.profilePhoto}>
                    {fornecedor.foto ? (
                      <img src={fornecedor.foto} alt="Foto do Fornecedor" className={styles.profilePicLarge} />
                    ) : (
                      <div className={styles.profilePicPlaceholder}>Sem Foto</div>
                    )}
                    <div className={styles.photoActions}>
                      <label className={styles.uploadButton}>
                        <FaUpload /> Carregar Foto
                        <input type="file" accept="image/*" onChange={handleFotoUpload} hidden />
                      </label>
                      {fornecedor.foto && (
                        <button className={styles.removeButton} onClick={removerFoto}>
                          <FaTrash /> Remover Foto
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.profileRow}>
                  <div className={styles.formGroup}>
                    <label>Nome da Empresa</label>
                    <input type="text" value={fornecedor.nomeEmpresa} onChange={e => setFornecedor({ ...fornecedor, nomeEmpresa: e.target.value })} />
                  </div>
                </div>
                <div className={styles.profileRow}>
                  <div className={styles.formGroup}>
                    <label>CNPJ</label>
                    <input type="text" value={fornecedor.cnpj} onChange={e => setFornecedor({ ...fornecedor, cnpj: e.target.value })} />
                  </div>
                </div>
                <div className={styles.profileRow}>
                  <div className={styles.formGroup}>
                    <label>Email de Contato</label>
                    <input type="email" value={fornecedor.emailContato} onChange={e => setFornecedor({ ...fornecedor, emailContato: e.target.value })} />
                  </div>
                </div>
                <div className={styles.profileRow}>
                  <div className={styles.formGroup}>
                    <label>Telefone</label>
                    <input type="text" value={fornecedor.telefone} onChange={e => setFornecedor({ ...fornecedor, telefone: e.target.value })} placeholder="(99) 99999-9999" />
                  </div>
                </div>
                <div className={styles.profileRow}>
                  <div className={styles.formGroup}>
                    <label>Endereço</label>
                    <input type="text" value={fornecedor.endereco} onChange={e => setFornecedor({ ...fornecedor, endereco: e.target.value })} placeholder="Rua, Número, Cidade" />
                  </div>
                </div>
                <div className={styles.profileRow}>
                  <div className={styles.formGroup}>
                    <label>Dados Bancários</label>
                    <input type="text" value={fornecedor.banco} onChange={e => setFornecedor({ ...fornecedor, banco: e.target.value })} placeholder="Banco, Ag., Cc." />
                  </div>
                </div>
                <div className={styles.profileRow}>
                  <button className={styles.saveButton} onClick={salvarFornecedor}>Salvar Alterações</button>
                </div>
              </div>
            </div>
          )}

          {secaoAtiva === 'planos' && (
            <div className={styles.plansSection}>
              <h1 className={styles.greetingTitle}>Planos</h1>
              <p className={styles.greetingText}>Escolha o plano ideal para potencializar seu negócio de fornecimento.</p>
              <div className={styles.plansGrid}>
                <div className={styles.planCard}>
                  <h3 className={styles.planTitle}>Plano Básico</h3>
                  <p className={styles.planPrice}>R$ 99,90/mês</p>
                  <ul className={styles.planFeatures}>
                    <li><span className={styles.featureCheck}>✓</span> 50 produtos no catálogo</li>
                    <li><span className={styles.featureCheck}>✓</span> Relatórios mensais básicos</li>
                    <li><span className={styles.featureCheck}>✓</span> Suporte por email</li>
                  </ul>
                  <button className={styles.planButton} onClick={abrirModalPlano}>Assinar</button>
                </div>
                <div className={styles.planCard}>
                  <h3 className={styles.planTitle}>Plano Pro</h3>
                  <p className={styles.planPrice}>R$ 199,90/mês</p>
                  <ul className={styles.planFeatures}>
                    <li><span className={styles.featureCheck}>✓</span> 200 produtos no catálogo</li>
                    <li><span className={styles.featureCheck}>✓</span> Relatórios detalhados</li>
                    <li><span className={styles.featureCheck}>✓</span> Suporte prioritário por chat</li>
                  </ul>
                  <button className={styles.planButton} onClick={abrirModalPlano}>Assinar</button>
                </div>
                <div className={styles.planCard}>
                  <h3 className={styles.planTitle}>Plano Premium</h3>
                  <p className={styles.planPrice}>R$ 399,90/mês</p>
                  <ul className={styles.planFeatures}>
                    <li><span className={styles.featureCheck}>✓</span> Produtos ilimitados</li>
                    <li><span className={styles.featureCheck}>✓</span> Relatórios avançados com analytics</li>
                    <li><span className={styles.featureCheck}>✓</span> Suporte 24/7 por telefone e chat</li>
                  </ul>
                  <button className={styles.planButton} onClick={abrirModalPlano}>Assinar</button>
                </div>
              </div>
            </div>
          )}

          {mostrarModal && (
            <div className={styles.modalOverlay} onClick={() => setMostrarModal(false)}>
              <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <h2>{produtoEditando ? 'Editar Produto' : 'Adicionar Novo Produto'}</h2>
                <div className={styles.modalForm}>
                  <div className={styles.modalLeft}>
                    <div className={styles.formGroup}>
                      <label>Nome do produto</label>
                      <input type="text" name="nome" value={produtoEditando ? produtoEditando.nome : novoProduto.nome} onChange={handleInputChange} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Descrição do produto</label>
                      <textarea name="descricao" value={produtoEditando ? (produtoEditando.descricao || '') : (novoProduto.descricao || '')} onChange={handleInputChange} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Dimensões (ex: 20x30x5 cm)</label>
                      <input type="text" name="dimensoes" value={produtoEditando ? produtoEditando.dimensoes : novoProduto.dimensoes} onChange={handleInputChange} placeholder="20x30x5 cm" />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Faixa Etária</label>
                      <select name="faixaEtaria" value={produtoEditando ? produtoEditando.faixaEtaria : novoProduto.faixaEtaria} onChange={handleInputChange}>
                        <option value="0-2 anos">0-2 anos</option>
                        <option value="3-5 anos">3-5 anos</option>
                        <option value="6-8 anos">6-8 anos</option>
                        <option value="9+ anos">9+ anos</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Gênero</label>
                      <div>
                        {['Homem', 'Mulher', 'Unisex'].map((genero) => (
                          <label key={genero}>
                            <input type="radio" name="genero" value={genero} checked={(produtoEditando ? produtoEditando.genero : novoProduto.genero) === genero} onChange={handleInputChange} /> {genero}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Preço e Estoque</label>
                      <input type="number" name="preco" value={produtoEditando ? produtoEditando.preco : novoProduto.preco} onChange={handleInputChange} placeholder="R$ 85,00" step="0.01" />
                      <input type="number" name="estoque" value={produtoEditando ? produtoEditando.estoque : novoProduto.estoque} onChange={handleInputChange} placeholder="77" />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Desconto</label>
                      <input type="number" name="desconto" value={produtoEditando ? produtoEditando.desconto : novoProduto.desconto} onChange={handleInputChange} placeholder="5%" />
                      <select name="tipoDesconto" value={produtoEditando ? produtoEditando.tipoDesconto : novoProduto.tipoDesconto} onChange={handleInputChange}>
                        <option value="">Nenhum</option>
                        <option value="Lançamento">Lançamento</option>
                        <option value="Fim de Ano">Fim de Ano</option>
                        <option value="Promocional">Promocional</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Categoria</label>
                      <select name="categoria" value={produtoEditando ? produtoEditando.categoria : novoProduto.categoria} onChange={handleInputChange}>
                        <option value="Quebra-cabeça">Quebra-cabeça</option>
                        <option value="Livro">Livro</option>
                        <option value="Brinquedo">Brinquedo</option>
                      </select>
                    </div>
                  </div>
                  <div className={styles.modalRight}>
                    <div className={styles.formGroup}>
                      <label>Imagem Principal</label>
                      <input type="file" accept="image/*" onChange={(e) => handleImagemUpload(e, 'principal')} />
                      {imagensPreviews.principal && <img src={imagensPreviews.principal} alt="Imagem Principal" className={styles.mainImagePreview} />}
                    </div>
                    <div className={styles.formGroup}>
                      <label>Imagens Adicionais (até 3)</label>
                      <div className={styles.additionalImages}>
                        {[...Array(3)].map((_, index) => (
                          <input key={index} type="file" accept="image/*" onChange={(e) => handleImagemUpload(e, 'adicionais')} />
                        ))}
                        {imagensPreviews.adicionais.map((preview, index) => (
                          <img key={index} src={preview} alt={`Adicional ${index + 1}`} className={styles.imagePreview} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.modalActions}>
                  <button className={styles.saveButton} onClick={salvarProduto}>Salvar</button>
                  <button className={styles.cancelButton} onClick={() => setMostrarModal(false)}>Cancelar</button>
                </div>
              </div>
            </div>
          )}

          {mostrarModalPlano && (
            <div className={styles.modalOverlay} onClick={fecharModalPlano}>
              <div className={styles.modalContentPlano} onClick={e => e.stopPropagation()}>
                <button className={styles.closeModal} onClick={fecharModalPlano}><FaTimesCircle /></button>
                {/* Aqui você pode integrar sua API do Mercado Pago */}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default FornecedorDashboard;
import React, { useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './SocialAppLayout.css'; // Assume que seu arquivo CSS global se chama SocialAppLayout.css

// --- IMPORTS DE IMAGENS (VERIFIQUE NOVAMENTE OS CAMINHOS!) ---
import imgProfile from '../../assets/imgs/img-perfil/imgMae.jpeg';
import camera from '../../assets/imgs/img-perfil/camera.png';
import cameraChange from '../../assets/imgs/img-perfil/cameraChange.png';
import pen from '../../assets/imgs/img-perfil/Pen.png';
import trash from '../../assets/imgs/img-perfil/trash.png';
import image from '../../assets/imgs/img-perfil/Image.png';
import amigo1 from '../../assets/imgs/img-perfil/amigos/amigo1.jpeg';
import amigo2 from '../../assets/imgs/img-perfil/amigos/amigo2.jpg';
import amigo3 from '../../assets/imgs/img-perfil/amigos/amigo3.jpg';
import amigo4 from '../../assets/imgs/img-perfil/amigos/amigo4.jpeg';
import amigo5 from '../../assets/imgs/img-perfil/amigos/amigo5.jpg';
import amigo6 from '../../assets/imgs/img-perfil/amigos/amigo6.jpeg';
import linhaBottom from '../../assets/imgs/img-perfil/florRosa/linhaBottom.png';
import florLeft from '../../assets/imgs/img-perfil/florRosa/florLeft.png';
import florTop from '../../assets/imgs/img-perfil/florRosa/florTop.png';
import florRight from '../../assets/imgs/img-perfil/florRosa/florRight.png';

const API_BASE_URL = 'https://backend-acenis-production.up.railway.app/api';
const API_POSTS_URL = `${API_BASE_URL}/posts`;
const API_LIKES_URL = `${API_BASE_URL}/likes`;
const API_COMMENTS_URL = `${API_BASE_URL}/comments`; // <--- Adicionado: URL para comentários

function Modal({ isOpen, onClose, children, customClass = '' }) {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className={`modal-content ${customClass}`} onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>,
        document.getElementById('modal-root')
    );
}

// --- COMPONENTE DE POST INDIVIDUAL (FeedPost) ---
function FeedPost({ post, currentUser, onPostDelete, onOpenFullPostModal, onLikeToggle }) {
    // Inicializa o estado 'liked' e 'likesCount' com base nas props do post
    // Estas props agora virão diretamente do backend com os valores corretos
    const [liked, setLiked] = useState(post.likedByUser || false);
    const [likesCount, setLikesCount] = useState(post.likesCount || 0);

    // Usa useEffect para atualizar 'liked' e 'likesCount' se as props do post mudarem
    // Isso é crucial quando 'allPosts' é atualizado em 'SocialAppLayout'
    useEffect(() => {
        setLiked(post.likedByUser || false);
        setLikesCount(post.likesCount || 0);
    }, [post.likedByUser, post.likesCount]); // Depende das props que vêm do pai

    const handleLike = async () => {
        if (!currentUser || !currentUser.id) {
            console.warn("Usuário não logado. Não é possível curtir.");
            alert("Você precisa estar logado para curtir um post."); // Feedback ao usuário
            return;
        }

        try {
            const url = `${API_LIKES_URL}/toggle`;
            const requestBody = {
                postId: post.id,
                userId: currentUser.id
            };

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = `Falha ao alternar curtida: ${response.status} ${response.statusText}`;
                try {
                    const errorJson = JSON.parse(errorText);
                    errorMessage = errorJson.message || errorJson.error || errorMessage;
                } catch (parseError) {
                    errorMessage = errorText || errorMessage;
                }
                throw new Error(errorMessage);
            }

            // Se a requisição foi bem-sucedida, atualiza o estado local
            const newLikedStatus = !liked;
            const newLikesCount = newLikedStatus ? likesCount + 1 : likesCount - 1;

            setLiked(newLikedStatus);
            setLikesCount(newLikesCount);

            // Chama a função passada pelo pai para atualizar o estado global de posts
            if (onLikeToggle) {
                onLikeToggle(post.id, newLikedStatus, newLikesCount);
            }

        } catch (error) {
            console.error("Erro ao alternar curtida:", error);
            alert(`Erro ao curtir/descurtir post: ${error.message}`);
        }
    };

    const isMyPost = post.autor && post.autor.idUser === currentUser.id;

    return (
        <div className="post-card">
            <div className="post-name">
                <img src={post.autor?.profilePic || imgProfile} alt="Profile" />
                <h1>{post.autor ? post.autor.nameUser : 'Usuário Desconhecido'}</h1>
                <a href="#">@{post.autor ? (post.autor.emailUser || post.autor.nameUser) : 'usuario'}</a>
            </div>
            <div style={{color: 'white'}} className="post-content" onClick={() => onOpenFullPostModal(post)}>
                {post.conteudo}
            </div>
            <div className="likes-and-comments">
                <div className="btn-likes">
                    <button onClick={handleLike}><i className={liked ? "bi bi-heart-fill" : "bi bi-heart"}></i></button>
                    <span>{likesCount}</span>
                </div>
                <div className="btn-comments">
                    <button onClick={() => onOpenFullPostModal(post)}><i className="bi bi-chat-text"></i></button>
                    <span>{post.commentsCount || 0}</span>
                </div>
            </div>
            {isMyPost && (
                <button onClick={() => onPostDelete(post.id)} className="delete-button">
                    <img src={trash} alt="Deletar" className="delete-icon" />
                    Deletar Post
                </button>
            )}
            <a onClick={() => onOpenFullPostModal(post)} className="all-comments" href="#">Ver todos os comentários</a>
        </div>
    );
}

// --- COMPONENTE DE CONTEÚDO DO MODAL DE CRIAÇÃO DE POST ---
function CreatePostModalContent({ currentUser, conteudoPost, setConteudoPost, onCreatePost, postFormMessage }) {
    // Handler para o envio do formulário
    const handleSubmit = (event) => {
        event.preventDefault(); // PREVINE O COMPORTAMENTO PADRÃO DE RECARREGAR A PÁGINA
        onCreatePost(); // Chama a função que faz a requisição à API
    };

    return (
        // Envolve o conteúdo em um <form>
        <form className="publication-input-section" style={{ padding: '0px' }} onSubmit={handleSubmit}>
            <h2>Criar Nova Publicação</h2>
            <div className="text-publication">
                <img src={currentUser.profilePic || imgProfile} alt="Profile" />
                <input
                    type="text"
                    placeholder='O que você está pensando?'
                    value={conteudoPost}
                    onChange={(e) => setConteudoPost(e.target.value)}
                />
            </div>
            <div className="image-publication">
                <p><img src={image} style={{ width: '25px', height: '25px' }} alt="Image icon" />Imagem</p>
                {/* O botão agora é type="submit" e não precisa de onClick */}
                <button type="submit">Publicar</button>
            </div>
            {postFormMessage && (
                <p className={postFormMessage.includes('sucesso') ? "success-message" : "error-message"}>
                    {postFormMessage}
                </p>
            )}
        </form>
    );
}

// --- COMPONENTE PRINCIPAL: SocialAppLayout ---
function SocialAppLayout() {
    // Estado do usuário logado, recuperado do localStorage
    const [usuarios, setUsuarios] = useState(() => {
        const usuarioStorage = localStorage.getItem("usuarioLogado");
        const parsedUser = usuarioStorage ? JSON.parse(usuarioStorage) : {};
        // Garante que o ID do usuário seja um número
        const userId = parsedUser.id ? parseInt(parsedUser.id, 10) : undefined;
        return { ...parsedUser, id: userId };
    });

    // Estados de UI
    const [mostrarPerfilStatus, setMostrarPerfilStatus] = useState(false);
    const [mostrarCameraOptions, setMostrarCameraOptions] = useState(false);
    const [mostrarProfilePictureChangeModal, setMostrarProfilePictureChangeModal] = useState(false);
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    const [isFullPostModalOpen, setIsFullPostModalOpen] = useState(false);
    // const [commentsOfComments, setCommentsOfComments] = useState(false); // REMOVIDO para simplificar, como combinado

    // Estados para Posts e Publicação
    const [conteudoPost, setConteudoPost] = useState('');
    const [allPosts, setAllPosts] = useState([]); // Todos os posts da API
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [errorPosts, setErrorPosts] = useState(null);
    const [postFormMessage, setPostFormMessage] = useState('');
    const [postToDelete, setPostToDelete] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null); // Post selecionado para o modal de visualização completa

    // NOVOS ESTADOS PARA COMENTÁRIOS
    const [commentContent, setCommentContent] = useState(''); // Estado para o input do comentário
    const [postComments, setPostComments] = useState([]); // Comentários do post selecionado
    const [loadingComments, setLoadingComments] = useState(false);
    const [errorComments, setErrorComments] = useState(null);

    // Estados para navegação de feed
    const [activeFeedTab, setActiveFeedTab] = useState('newsFeed');
    const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

    // NOVO ESTADO: Filtro para a aba 'feed'
    const [feedFilter, setFeedFilter] = useState('recent');

    // EX: IDs de amigos (em um app real, viriam do backend)
    const [userFriendsIds, setUserFriendsIds] = useState([2, 3, 4]); // Exemplo de IDs de amigos

    // Dados do Sidebar (Exemplo, pode vir de uma API real)
    const [stories, setStories] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    // --- FUNÇÕES DE API (MEMOIZADAS COM useCallback) ---

    const fetchPosts = useCallback(async () => {
        setLoadingPosts(true);
        setErrorPosts(null);
        try {
            // Passar o ID do usuário logado para o backend
            // IMPORTANTE: O backend foi alterado para esperar 'userId' como query parameter
            const userIdParam = usuarios.id ? `?userId=${usuarios.id}` : '';
            const response = await fetch(`${API_POSTS_URL}${userIdParam}`);

            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = `Erro HTTP! Status: ${response.status}`;
                try {
                    const errorJson = JSON.parse(errorText);
                    errorMessage = errorJson.message || errorMessage;
                } catch (parseError) { /* ignore */ }
                throw new Error(errorMessage);
            }
            const data = await response.json();
            console.log("Dados dos posts recebidos:", data); // Verifique o formato aqui
            // Os dados já devem vir com likedByUser e likesCount do backend
            setAllPosts(data);
        } catch (err) {
            console.error("Erro ao buscar posts:", err);
            setErrorPosts(`Erro ao carregar posts: ${err.message}. Tente novamente mais tarde.`);
        } finally {
            setLoadingPosts(false);
        }
    }, [usuarios.id]); // Adiciona usuarios.id como dependência para que a função seja recriada quando o usuário mudar

    const criarNovoPostAPI = useCallback(async () => {
        setPostFormMessage('');
        if (conteudoPost.trim() === '') {
            setPostFormMessage('O conteúdo do post não pode estar vazio.');
            return;
        }
        if (typeof usuarios.id !== 'number' || isNaN(usuarios.id)) {
            setPostFormMessage('Erro: ID do usuário logado não encontrado ou inválido. Por favor, faça login.');
            return;
        }

        try {
            const postData = { idUser: usuarios.id, conteudo: conteudoPost };
            const response = await fetch(API_POSTS_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
                throw new Error(errorData.message || `Erro ao criar post! Status: ${response.status}`);
            }

            const novoPostCriado = await response.json();
            // A API de criação de post retorna a entidade Post completa, mas sem o `likedByUser` e `likesCount`
            // porque ela não sabe o contexto do usuário logado naquele exato momento.
            // Para novos posts, iniciamos com 0 likes e como não curtido.
            const postComAutorCorreto = {
                ...novoPostCriado,
                autor: novoPostCriado.autor || { idUser: usuarios.id, nameUser: usuarios.name || 'Nome do Usuário', tipo: usuarios.tipo, profilePic: usuarios.profilePic || imgProfile },
                likedByUser: false, // Novo post começa descurtido
                likesCount: 0, // Novo post começa com 0 likes
                commentsCount: 0,
            };
            setAllPosts(prevPosts => [postComAutorCorreto, ...prevPosts]);
            setConteudoPost('');
            setPostFormMessage('Post publicado com sucesso!');
            setIsCreatePostModalOpen(false); // Fecha o modal após a publicação bem-sucedida
            // Não é estritamente necessário refetchPosts aqui, pois já estamos adicionando o post localmente.
            // Mas, para garantir total consistência (ex: se o backend fizer algum processamento extra), pode ser útil.
            // Por simplicidade e performance, vamos confiar na adição local.
            // fetchPosts(); // Você pode descomentar esta linha se precisar de um refetch completo
        } catch (err) {
            console.error("Erro ao publicar post:", err);
            setPostFormMessage(`Erro ao publicar post: ${err.message}`);
        }
    }, [conteudoPost, usuarios]); // Removido fetchPosts das dependências para evitar loop potencial ao criar post

    const deletarPostAPI = useCallback(async (postId) => {
        setPostFormMessage('');
        if (typeof postId !== 'number' || isNaN(postId)) {
            setPostFormMessage('Erro: ID do post inválido para deleção.');
            console.error("ID do post inválido:", postId);
            return;
        }

        try {
            const response = await fetch(`${API_POSTS_URL}/${postId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = `Erro HTTP ao deletar! Status: ${response.status}`;
                try {
                    const errorJson = JSON.parse(errorText);
                    errorMessage = errorJson.message || errorMessage;
                } catch (parseError) { /* ignore */ }
                throw new Error(errorMessage);
            }

            setAllPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
            setPostFormMessage('Post deletado com sucesso!');
        } catch (err) {
            console.error("Erro ao deletar post via API:", err);
            setPostFormMessage(`Erro ao deletar post: ${err.message}.`);
        }
    }, []);

    // A função onLikeToggle deve receber o novo contador de likes
    const handlePostLikeToggle = useCallback((postId, newLikedStatus, newLikesCount) => {
        setAllPosts(prevPosts =>
            prevPosts.map(post =>
                post.id === postId
                    ? { ...post, likedByUser: newLikedStatus, likesCount: newLikesCount }
                    : post
            )
        );
        // Também atualiza o post selecionado no modal, se estiver aberto
        if (selectedPost && selectedPost.id === postId) {
            setSelectedPost(prevSelectedPost => ({
                ...prevSelectedPost,
                likedByUser: newLikedStatus,
                likesCount: newLikesCount,
            }));
        }
    }, [selectedPost]); // selectedPost é uma dependência porque estamos atualizando-o aqui

    // NOVO: Função para buscar comentários de um Post Específico
    const fetchCommentsForPost = useCallback(async (postId) => {
        setLoadingComments(true);
        setErrorComments(null);
        try {
            const response = await fetch(`${API_COMMENTS_URL}/post/${postId}`);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erro ao buscar comentários: ${response.status} ${response.statusText} - ${errorText}`);
            }
            const data = await response.json();
            setPostComments(data);
        } catch (err) {
            console.error("Erro ao buscar comentários:", err);
            setErrorComments(`Erro ao carregar comentários: ${err.message}`);
        } finally {
            setLoadingComments(false);
        }
    }, []);

    // NOVO: Função para Enviar um Novo Comentário
    const handleAddComment = useCallback(async () => {
        if (!commentContent.trim()) {
            alert("O comentário não pode estar vazio!");
            return;
        }
        if (!usuarios.id) {
            alert("Você precisa estar logado para comentar.");
            return;
        }
        if (!selectedPost || !selectedPost.id) {
            alert("Nenhum post selecionado para comentar.");
            return;
        }

        try {
            const commentData = {
                // CORREÇÃO AQUI: Mudando para 'idPost' e 'idUser' para corresponder ao DTO do backend
                idPost: selectedPost.id,
                idUser: usuarios.id,
                content: commentContent
            };

            console.log("Enviando dados do comentário:", commentData); // Para debug, remova em produção

            const response = await fetch(API_COMMENTS_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(commentData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = `Falha ao adicionar comentário: ${response.status} ${response.statusText}`;
                try {
                    const errorJson = JSON.parse(errorText);
                    errorMessage = errorJson.message || errorJson.error || errorMessage;
                } catch (parseError) {
                    errorMessage = errorText || errorMessage;
                }
                throw new Error(errorMessage);
            }

            const newComment = await response.json();
            // Adicionar o autor completo ao novo comentário para exibição imediata
            // A API já deve retornar o objeto 'usuario' aninhado como 'autor' no Comment
            const commentWithAutor = {
                ...newComment,
                autor: newComment.usuario || { idUser: usuarios.id, nameUser: usuarios.name || 'Usuário', profilePic: usuarios.profilePic || imgProfile }
            };

            setPostComments(prevComments => [commentWithAutor, ...prevComments]); // Adiciona o novo comentário no topo
            setCommentContent(''); // Limpa o input

            // Opcional: Atualizar a contagem de comentários no post principal do feed
            setAllPosts(prevPosts =>
                prevPosts.map(p =>
                    p.id === selectedPost.id
                        ? { ...p, commentsCount: (p.commentsCount || 0) + 1 }
                        : p
                )
            );
            // Também atualizar o selectedPost no modal
            setSelectedPost(prevSelectedPost => ({
                ...prevSelectedPost,
                commentsCount: (prevSelectedPost.commentsCount || 0) + 1
            }));


        } catch (error) {
            console.error("Erro ao adicionar comentário:", error);
            alert(`Erro ao comentar: ${error.message}`);
        }
    }, [commentContent, usuarios.id, selectedPost]);

    // --- EFEITOS (useEffect) ---
    useEffect(() => {
        // Quando o usuário logado mudar (ou no carregamento inicial), busca os posts novamente
        if (usuarios.id) { // Garante que só busca posts se tiver um ID de usuário válido
            fetchPosts();
        } else {
            setLoadingPosts(false); // Se não há usuário, para o loading
            setAllPosts([]); // Limpa os posts
        }
    }, [usuarios.id, fetchPosts]); // Adiciona usuarios.id como dependência para que a função seja recriada quando o usuário mudar


    useEffect(() => {
        // Simulação de carregamento de dados do sidebar
        setStories([
            { id: 1, user: "@elise_moreira", image: "https://via.placeholder.com/100x150/8A2BE2/FFFFFF?text=Story1" },
            { id: 2, user: "@user_name", image: "https://via.placeholder.com/100x150/FF4500/FFFFFF?text=Story2" },
            { id: 3, user: "@john_doe", image: "https://via.placeholder.com/100x150/20B2AA/FFFFFF?text=Story3" },
            { id: 4, user: "@jane_smith", image: "https://via.placeholder.com/100x150/DA70D6/FFFFFF?text=Story4" },
        ]);
        setSuggestions([
            { id: 1, name: "Elise Moreira", username: "@Elise_Moreira", profilePic: "https://via.placeholder.com/50/FF69B4/FFFFFF?text=Elise" },
            { id: 2, name: "Another User", username: "@AnotherUser", profilePic: "https://via.placeholder.com/50/ADD8E6/FFFFFF?text=AU" },
            { id: 3, name: "Carlos Silva", username: "@carlos.s", profilePic: "https://via.placeholder.com/50/FFD700/FFFFFF?text=CS" },
            { id: 4, name: "Maria Lima", username: "@mary_L", profilePic: "https://via.placeholder.com/50/98FB98/FFFFFF?text=ML" },
        ]);
        setRecommendations([
            { id: 1, title: "Trending #ReactJS", type: "Topic" },
            { id: 2, title: "Best Practices in Web Dev", type: "Article" },
            { id: 3, title: "New AI Developments", type: "News" },
            { id: 4, title: "Healthy Eating Tips", type: "Guide" },
        ]);
    }, []);

    // --- FUNÇÕES DE HANDLERS DE EVENTOS ---

    const togglePerfilStatus = () => setMostrarPerfilStatus(prev => !prev);
    const toggleCameraOptions = () => setMostrarCameraOptions(prev => !prev);
    const toggleProfilePictureChangeModal = () => setMostrarProfilePictureChangeModal(prev => !prev);
    // const toggleCommentsOfComments = () => setCommentsOfComments(prev => !prev); // REMOVIDO

    const handleDeleteClick = (postId) => {
        setPostToDelete(postId);
        setShowDeleteConfirmModal(true);
    };

    const confirmDelete = async () => {
        if (postToDelete) {
            await deletarPostAPI(postToDelete);
        }
        setShowDeleteConfirmModal(false);
        setPostToDelete(null);
        setPostFormMessage('');
    };

    const cancelDelete = () => {
        setShowDeleteConfirmModal(false);
        setPostToDelete(null);
        setPostFormMessage('');
    };

    const openFullPostModal = (post) => {
        setSelectedPost(post);
        setIsFullPostModalOpen(true);
        // NOVO: Adicionar chamada para buscar comentários
        if (post && post.id) {
            fetchCommentsForPost(post.id);
        }
    };

    const closeFullPostModal = () => {
        setIsFullPostModalOpen(false);
        setSelectedPost(null);
        setPostComments([]); // Limpa os comentários ao fechar o modal
        setCommentContent(''); // Limpa o input de comentário
        setErrorComments(null); // Limpa qualquer erro de comentário
        setLoadingComments(false); // Para o loading se ainda estiver ativo
        // setCommentsOfComments(false); // REMOVIDO
    };

    // Dados do usuário para a Sidebar
    const currentSidebarUser = {
        name: usuarios.name || "Usuário",
        username: usuarios.email || "@usuario",
        followers: 0, // Ajuste conforme seus dados reais
        following: 0, // Ajuste conforme seus dados reais
        profilePic: usuarios.profilePic || imgProfile
    };

    // --- LÓGICA DE FILTRAGEM DOS POSTS A SEREM EXIBIDOS ---
    const getFilteredPosts = useCallback(() => {
        let filtered = allPosts;

        if (activeFeedTab === 'media') {
            // Mostrar apenas posts do usuário logado
            filtered = allPosts.filter(post => post.autor && post.autor.idUser === usuarios.id);
        } else if (activeFeedTab === 'feed') {
            // Aplicar filtros para a aba 'Feed'
            if (feedFilter === 'friends') {
                // Filtra posts de amigos do usuário logado
                filtered = allPosts.filter(post =>
                    post.autor && userFriendsIds.includes(post.autor.idUser)
                );
            } else if (feedFilter === 'popular') {
                // Ordena por likes (do maior para o menor)
                // Usar likesCount que vem do backend
                filtered = [...allPosts].sort((a, b) => b.likesCount - a.likesCount);
            }
            // 'recent' é a ordem padrão (como os posts são adicionados ou viriam do backend)
            // Se for 'recent', 'filtered' já é 'allPosts' por padrão
        }
        // Para 'newsFeed', `filtered` já é `allPosts` por padrão (todos os posts)

        return filtered;
    }, [allPosts, activeFeedTab, feedFilter, usuarios.id, userFriendsIds]);

    const displayedPosts = getFilteredPosts();

    return (
        <div className="social-app-container">
            <div className="social-app-layout-main">

                {/* --- LEFT SIDEBAR --- */}
                <nav className="social-app-sidebar">
                    <div className="profile-card">
                        <img src={currentSidebarUser.profilePic} alt={currentSidebarUser.name} className="profile-pic" />
                        <div className="profile-info">
                            <h2 style={{color: 'white'}} className="profile-name">{currentSidebarUser.name}</h2>
                            <span className="profile-username">{currentSidebarUser.username}</span>
                        </div>
                        <div className="profile-stats">
                            <span>{currentSidebarUser.followers} Seguindo</span>
                            <span>{currentSidebarUser.following} Seguidores</span>
                        </div>
                    </div>
                    <ul className="nav-links">
                        <li><a href="#" className="nav-item">Messages <span className="notification">2</span></a></li>
                        <li><a href="#" className="nav-item">Forums</a></li>

                        {/* NOVO: Link para o Feed Principal */}
                        <li>
                            <a
                                href="#"
                                className={`nav-item ${activeFeedTab === 'feed' ? 'active' : ''}`}
                                onClick={(e) => { e.preventDefault(); setActiveFeedTab('feed'); setFeedFilter('recent'); }} // Padrão para 'recent'
                            >
                                Feed
                            </a>
                        </li>
                        {/* Links de Navegação Existentes */}
                        <li>
                            <a

                                href="#"
                                className={`nav-item ${activeFeedTab === 'newsFeed' ? 'active' : ''}`}
                                onClick={(e) => { e.preventDefault(); setActiveFeedTab('newsFeed'); }}
                            >
                                News Feed
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className={`nav-item ${activeFeedTab === 'media' ? 'active' : ''}`}
                                onClick={(e) => { e.preventDefault(); setActiveFeedTab('media'); }}
                            >
                                Media
                            </a>
                        </li>
                        <li><a href="#" className="nav-item">Friend <span className="notification">6</span></a></li>
                        <li><a href="#" className="nav-item">Settings</a></li>
                    </ul>
                    <button className="logout-button">Sair</button>
                </nav>

                {/* --- MAIN FEED / PROFILE AREA --- */}
                <main className="social-app-feed">
                    {/* MODAIS (mantidos como estavam) */}
                    <Modal isOpen={showDeleteConfirmModal} onClose={cancelDelete}>
                        <h3>Confirmar Deleção</h3>
                        <p>Tem certeza que deseja deletar este post?</p>
                        <div className="modal-actions">
                            <button onClick={confirmDelete} className="confirm-delete-button">Sim</button>
                            <button onClick={cancelDelete} className="cancel-delete-button">Não</button>
                        </div>
                    </Modal>

                    <Modal isOpen={mostrarProfilePictureChangeModal} onClose={toggleProfilePictureChangeModal}>
                        <div className="profile-picture-change-modal-content">
                            <img className="img-change" src={usuarios.profilePic || imgProfile} alt="" />
                            <div className="chooses">
                                <p><img src={pen} alt="" />Editar</p>
                                <p><img src={cameraChange} alt="" />Adicionar</p>
                                <p><img src={trash} alt="" />Deletar</p>
                            </div>
                            <img className="linha-bottom" src={linhaBottom} alt="" />
                            <img className="flor-top" src={florTop} alt="" />
                            <img className="flor-left" src={florLeft} alt="" />
                            <img className="flor-right" src={florRight} alt="" />
                        </div>
                    </Modal>

                    {/* MODAL DE VISUALIZAÇÃO COMPLETA DO POST (COM COMENTÁRIOS) - ATUALIZADO */}
                    {isFullPostModalOpen && selectedPost && (
                        <Modal isOpen={isFullPostModalOpen} onClose={closeFullPostModal}>
                            <div className="modal-publication">
                                <div className="modal-back-button">
                                    <button onClick={closeFullPostModal}><i className="bi bi-chevron-left"></i></button>
                                    <h1>Publicação</h1>
                                </div>
                                <div className="post-name" style={{color: 'white'}}>
                                    <img src={selectedPost.autor?.profilePic || imgProfile} alt="" />
                                    <h1 style={{color: 'white'}}>{selectedPost.autor ? selectedPost.autor.nameUser : 'Usuário Desconhecido'}</h1>
                                    <a href="#">@{selectedPost.autor ? (selectedPost.autor.emailUser || selectedPost.autor.nameUser) : 'usuario'}</a>
                                </div>
                                <div className="publication-content" >
                                    {selectedPost.conteudo}
                                </div>

                                <div className="likes-and-comments" style={{ padding: '10px 0' }}>
                                    <div className="btn-likes">
                                        <button onClick={() => handlePostLikeToggle(selectedPost.id, !selectedPost.likedByUser, selectedPost.likedByUser ? selectedPost.likesCount - 1 : selectedPost.likesCount + 1)}><i className={selectedPost.likedByUser ? "bi bi-heart-fill" : "bi bi-heart"}></i></button>
                                        <span>{selectedPost.likesCount || 0}</span>
                                    </div>
                                    <div className="btn-comments">
                                        <button><i className="bi bi-chat-text"></i></button>
                                        <span>{selectedPost.commentsCount || 0}</span>
                                    </div>
                                </div>

                                {/* Seção de Adicionar Comentário */}
                                <div className="add-comment-section">
                                    <img src={usuarios.profilePic || imgProfile} alt="Seu Perfil" className="comment-profile-pic" />
                                    <input
                                        type="text"
                                        placeholder="Adicione um comentário..."
                                        value={commentContent}
                                        onChange={(e) => setCommentContent(e.target.value)}
                                        onKeyPress={(e) => { // Permite enviar com 'Enter'
                                            if (e.key === 'Enter') {
                                                e.preventDefault(); // Impede quebra de linha no input
                                                handleAddComment();
                                            }
                                        }}
                                    />
                                    <button onClick={handleAddComment} className="add-comment-button">Comentar</button>
                                </div>

                                {/* Seção de Listagem de Comentários */}
                                <div className="comments-list">
                                    {loadingComments ? (
                                        <p>Carregando comentários...</p>
                                    ) : errorComments ? (
                                        <p className="error-message">{errorComments}</p>
                                    ) : postComments.length === 0 ? (
                                        <p>Nenhum comentário ainda. Seja o primeiro!</p>
                                    ) : (
                                        postComments.map(comment => (
                                            <div key={comment.id} className="comment-item">
                                                <div className="comment-header">
                                                    <img src={comment.usuario?.profilePic || imgProfile} alt="Autor" className="comment-author-pic" />
                                                    <span className="comment-author-name">{comment.usuario?.nameUser || 'Usuário Desconhecido'}</span>
                                                    <span className="comment-timestamp">
                                                        {new Date(comment.createdAt).toLocaleString()} {/* Formate a data como preferir */}
                                                    </span>
                                                </div>
                                                <p className="comment-content-text">{comment.content}</p>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </Modal>
                    )}

                    {/* MODAL DE CRIAÇÃO DE POST */}
                    <Modal isOpen={isCreatePostModalOpen} onClose={() => setIsCreatePostModalOpen(false)} customClass="create-post-modal">
                        <CreatePostModalContent
                            currentUser={usuarios}
                            conteudoPost={conteudoPost}
                            setConteudoPost={setConteudoPost}
                            onCreatePost={criarNovoPostAPI}
                            postFormMessage={postFormMessage}
                        />
                    </Modal>

                    {/* SEÇÃO DE PUBLICAÇÃO RÁPIDA (MAIN FEED) */}
                    <div className="publication-input-section" style={{ padding: '0px' }}>
                        <div className="text-publication">
                            <img src={usuarios.profilePic || imgProfile} alt="Profile" />
                            <input type="text" placeholder='O que você está pensando?' readOnly onClick={() => setIsCreatePostModalOpen(true)} />
                        </div>
                        <div className="image-publication">
                            <p><img src={image} style={{ width: '25px', height: '25px' }} alt="Image icon" />Imagem</p>
                            <button onClick={() => setIsCreatePostModalOpen(true)}>Publicar</button>
                        </div>
                    </div>

                    {/* TAB NAVIGATION PARA FEED */}
                    <div className="feed-navigation">
                        <button
                            className={activeFeedTab === 'newsFeed' ? 'active' : ''}
                            onClick={() => { setActiveFeedTab('newsFeed'); setFeedFilter('recent'); }}
                        >
                            News Feed
                        </button>
                        <button
                            className={activeFeedTab === 'media' ? 'active' : ''}
                            onClick={() => { setActiveFeedTab('media'); setFeedFilter('recent'); }}
                        >
                            My Posts
                        </button>
                        <div className={`feed-filter-dropdown ${activeFeedTab === 'feed' ? 'active' : ''}`}>
                            <button
                                onClick={() => setActiveFeedTab('feed')}
                                className={activeFeedTab === 'feed' ? 'active' : ''}
                            >
                                Feed
                                <i className="bi bi-chevron-down"></i>
                            </button>
                            {activeFeedTab === 'feed' && (
                                <div className="dropdown-content">
                                    <a href="#" onClick={(e) => { e.preventDefault(); setFeedFilter('recent'); }}>Recentes</a>
                                    <a href="#" onClick={(e) => { e.preventDefault(); setFeedFilter('popular'); }}>Populares</a>
                                    <a href="#" onClick={(e) => { e.preventDefault(); setFeedFilter('friends'); }}>Amigos</a>
                                </div>
                            )}
                        </div>
                    </div>


                    {/* LISTA DE POSTS */}
                    <div className="feed-posts">
                        {loadingPosts ? (
                            <p>Carregando posts...</p>
                        ) : errorPosts ? (
                            <p className="error-message">{errorPosts}</p>
                        ) : displayedPosts.length === 0 ? (
                            <p>Nenhum post encontrado. Comece a publicar!</p>
                        ) : (
                            displayedPosts.map(post => (
                                <FeedPost
                                    key={post.id}
                                    post={post}
                                    currentUser={usuarios}
                                    onPostDelete={handleDeleteClick}
                                    onOpenFullPostModal={openFullPostModal}
                                    onLikeToggle={handlePostLikeToggle}
                                />
                            ))
                        )}
                    </div>
                </main>

                {/* --- RIGHT SIDEBAR ---
                <aside className="social-app-right-sidebar">
                    <div className="stories-section">
                        <h3>Stories</h3>
                        <div className="stories-grid">
                            {stories.map(story => (
                                <div key={story.id} className="story-item">
                                    <img src={story.image} alt={story.user} />
                                    <span>{story.user}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="suggestions-section">
                        <h3>Sugestões para Você</h3>
                        {suggestions.map(suggestion => (
                            <div key={suggestion.id} className="suggestion-item">
                                <img src={suggestion.profilePic} alt={suggestion.name} />
                                <div className="suggestion-info">
                                    <h4>{suggestion.name}</h4>
                                    <span>{suggestion.username}</span>
                                </div>
                                <button className="follow-button">Seguir</button>
                            </div>
                        ))}
                    </div>
                    <div className="recommendations-section">
                        <h3>Recomendações</h3>
                        {recommendations.map(rec => (
                            <div key={rec.id} className="recommendation-item">
                                <h4>{rec.title}</h4>
                                <span>{rec.type}</span>
                            </div>
                        ))}
                    </div>
                </aside> */}
            </div>
        </div>
    );
}

export default SocialAppLayout;
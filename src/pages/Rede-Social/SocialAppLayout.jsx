import React, { useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './SocialAppLayout.css';

// Importe suas imagens
import imgProfile from '../../assets/imgs/img-perfil/ImgMae.jpeg';
import camera from '../../assets/imgs/img-perfil/camera.png';
import cameraChange from '../../assets/imgs/img-perfil/cameraChange.png';
import pen from '../../assets/imgs/img-perfil/Pen.png';
import trash from '../../assets/imgs/img-perfil/trash.png';
import image from '../../assets/imgs/img-perfil/image.png';
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
import { Link } from 'react-router-dom';

const API_BASE_URL = 'https://backend-acenis-production.up.railway.app/api';
const API_POSTS_URL = `${API_BASE_URL}/posts`;
const API_LIKES_URL = `${API_BASE_URL}/likes`;
const API_COMMENTS_URL = `${API_BASE_URL}/comments`;
const API_FOLLOWS_URL = `${API_BASE_URL}/follows`;

// --- FUNÇÃO AUXILIAR PARA OBTER O TOKEN ---
// Este é o ponto chave para o erro "token não encontrado".
// Certifique-se de que o token esteja sendo salvo no localStorage
// sob a chave 'authToken' APÓS um login bem-sucedido.
const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

// --- COMPONENTES MODAIS (inalterados, mas necessários) ---
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

function FeedPost({ post, currentUser, onPostDelete, onOpenFullPostModal, onLikeToggle, onToggleFollow }) {
    const [liked, setLiked] = useState(post.likedByUser || false);
    const [likesCount, setLikesCount] = useState(post.likesCount || 0);
    const [isFollowingAuthor, setIsFollowingAuthor] = useState(post.isFollowingAuthor || false);
    const [authorFollowersCount, setAuthorFollowersCount] = useState(post.autor?.followersCount || 0);

    useEffect(() => {
        setLiked(post.likedByUser || false);
        setLikesCount(post.likesCount || 0);
        setIsFollowingAuthor(post.isFollowingAuthor || false);
        setAuthorFollowersCount(post.autor?.followersCount || 0);
    }, [post.likedByUser, post.likesCount, post.isFollowingAuthor, post.autor?.followersCount]);

    const handleLike = async () => {
        if (!currentUser || !currentUser.idUser) {
            console.warn("Usuário não logado. Não é possível curtir.");
            alert("Você precisa estar logado para curtir um post.");
            return;
        }

        const token = getAuthToken();
        if (!token) {
            alert("Sessão expirada ou não autenticada. Por favor, faça login.");
            return;
        }

        try {
            const url = `${API_LIKES_URL}/toggle`;
            const requestBody = {
                postId: post.idUser,
                userId: currentUser.idUser
            };

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
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

            const newLikedStatus = !liked;
            const newLikesCount = newLikedStatus ? likesCount + 1 : likesCount - 1;

            setLiked(newLikedStatus);
            setLikesCount(newLikesCount);

            if (onLikeToggle) {
                onLikeToggle(post.idUser, newLikedStatus, newLikesCount);
            }

        } catch (error) {
            console.error("Erro ao alternar curtida:", error);
            alert(`Erro ao curtir/descurtir post: ${error.message}`);
        }
    };

    const handleFollowButtonClick = async () => {
        if (!currentUser || !currentUser.idUser) {
            alert("Você precisa estar logado para seguir um usuário.");
            return;
        }
        if (post.autor && typeof post.autor.idUser === 'number' && !isNaN(post.autor.idUser)) {
            onToggleFollow(post.autor.idUser, isFollowingAuthor);
        } else {
            console.error("Erro: ID do autor do post é inválido para seguir:", post.autor?.idUser);
            alert("Não foi possível seguir este usuário: ID inválido.");
        }
    };

    const isMyPost = post.autor && post.autor.idUser === currentUser.idUser;
    const isAuthorCurrentUser = post.autor && post.autor.idUser === currentUser.idUser;

    return (
        <div className="post-card">
            <div className="post-name">
                <img src={post.autor?.profilePic || imgProfile} alt="Profile" />
                <h1>{post.autor ? post.autor.nameUser : 'Usuário Desconhecido'}</h1>
                <a href="#">@{post.autor ? (post.autor.emailUser || post.autor.nameUser) : 'usuario'}</a>
                {!isAuthorCurrentUser && (
                    <div className="follow-section">
                        <button
                            onClick={handleFollowButtonClick}
                            className={`seguir-button ${isFollowingAuthor ? 'active' : ''}`}
                        >
                            {isFollowingAuthor ? 'Deixar de seguir' : 'Seguir'}
                        </button>
                    </div>
                )}
            </div>
            <div style={{ color: 'white' }} className="post-content" onClick={() => onOpenFullPostModal(post)}>
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
                <button onClick={() => onPostDelete(post.idUser)} className="delete-button">
                    <img src={trash} alt="Deletar" className="delete-icon" />
                    Deletar Post
                </button>
            )}
            <a onClick={() => onOpenFullPostModal(post)} className="all-comments" href="#">Ver todos os comentários</a>
        </div>
    );
}

function CreatePostModalContent({ currentUser, conteudoPost, setConteudoPost, onCreatePost, postFormMessage }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        onCreatePost();
    };

    return (
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

function FullPostModalContent({ post, onClose, currentUser, postComments, commentContent, setCommentContent, handleAddComment, loadingComments, errorComments, onLikeToggle }) {
    const [liked, setLiked] = useState(post.likedByUser || false);
    const [likesCount, setLikesCount] = useState(post.likesCount || 0);

    useEffect(() => {
        setLiked(post.likedByUser || false);
        setLikesCount(post.likesCount || 0);
    }, [post.likedByUser, post.likesCount]);

    const handleInternalLike = async () => {
        if (!currentUser || !currentUser.idUser) {
            alert("Você precisa estar logado para curtir um post.");
            return;
        }

        const token = getAuthToken();
        if (!token) {
            alert("Sessão expirada ou não autenticada. Por favor, faça login.");
            return;
        }

        try {
            const url = `${API_LIKES_URL}/toggle`;
            const requestBody = {
                postId: post.idUser,
                userId: currentUser.idUser
            };

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
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

            const newLikedStatus = !liked;
            const newLikesCount = newLikedStatus ? likesCount + 1 : likesCount - 1;

            setLiked(newLikedStatus);
            setLikesCount(newLikesCount);

            if (onLikeToggle) {
                onLikeToggle(post.idUser, newLikedStatus, newLikesCount);
            }

        } catch (error) {
            console.error("Erro ao alternar curtida no modal completo:", error);
            alert(`Erro ao curtir/descurtir post: ${error.message}`);
        }
    };


    return (
        <div className="full-post-modal-content">
            <div className="post-header">
                <img src={post.autor?.profilePic || imgProfile} alt="Profile" />
                <div className="author-info">
                    <h2>{post.autor ? post.autor.nameUser : 'Usuário Desconhecido'}</h2>
                    <span>@{post.autor ? (post.autor.emailUser || post.autor.nameUser) : 'usuario'}</span>
                </div>
            </div>
            <div className="post-body">
                <p>{post.conteudo}</p>
            </div>
            <div className="post-actions">
                <div className="btn-likes">
                    <button onClick={handleInternalLike}><i className={liked ? "bi bi-heart-fill" : "bi bi-heart"}></i></button>
                    <span>{likesCount}</span>
                </div>
                <div className="btn-comments">
                    <button><i className="bi bi-chat-text"></i></button>
                    <span>{postComments.length}</span>
                </div>
            </div>
            <div className="comments-section">
                <h3>Comentários</h3>
                <div className="comment-input">
                    <input
                        type="text"
                        placeholder="Adicione um comentário..."
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                    />
                    <button onClick={handleAddComment}>Comentar</button>
                </div>
                {loadingComments && <p>Carregando comentários...</p>}
                {errorComments && <p className="error-message">{errorComments}</p>}
                <div className="comments-list">
                    {postComments.length === 0 && !loadingComments && !errorComments && <p>Nenhum comentário ainda. Seja o primeiro a comentar!</p>}
                    {postComments.map(comment => (
                        <div key={comment.id || comment.idUser} className="comment-item">
                            <img src={comment.autor?.profilePic || imgProfile} alt="Profile" />
                            <div className="comment-content-wrapper">
                                <div className="comment-author">{comment.autor ? comment.autor.nameUser : 'Usuário Desconhecido'}</div>
                                <div className="comment-text">{comment.content}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// --- COMPONENTE PRINCIPAL: SocialAppLayout ---
function SocialAppLayout() {
    const [usuarios, setUsuarios] = useState(() => {
        const usuarioStorage = localStorage.getItem("usuarioLogado");
        const parsedUser = usuarioStorage ? JSON.parse(usuarioStorage) : {};
        const userId = (parsedUser.idUser !== null && parsedUser.idUser !== undefined && !isNaN(parseInt(parsedUser.idUser, 10)))
            ? parseInt(parsedUser.idUser, 10)
            : undefined;
        return { ...parsedUser, idUser: userId };
    });

    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    const [isFullPostModalOpen, setIsFullPostModalOpen] = useState(false);

    const [conteudoPost, setConteudoPost] = useState('');
    const [allPosts, setAllPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [errorPosts, setErrorPosts] = useState(null);
    const [postFormMessage, setPostFormMessage] = useState('');
    const [postToDelete, setPostToDelete] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);

    const [commentContent, setCommentContent] = useState('');
    const [postComments, setPostComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const [errorComments, setErrorComments] = useState(null);

    const [activeFeedTab, setActiveFeedTab] = useState('newsFeed');

    // --- MODAL DE CRIAÇÃO DE POST ---
    const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

    const [feedFilter, setFeedFilter] = useState('recent');

    const [stories, setStories] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    const [currentUserFollowersCount, setCurrentUserFollowersCount] = useState(0);
    const [currentUserFollowingCount, setCurrentUserFollowingCount] = useState(0);


    // --- SIMULAÇÃO DE LOGIN E GERAÇÃO DE TOKEN ---
    // ESTE É UM PONTO CRÍTICO PARA O TESTE:
    // Remover ou ajustar para sua lógica de login real em produção.
    useEffect(() => {
        // Verifica se já existe um usuário logado e token no localStorage
        const existingToken = localStorage.getItem('authToken');
        const existingUser = localStorage.getItem('usuarioLogado');

        if (!existingToken || !existingUser) {
            console.log("Simulando login: Token ou usuário não encontrados no localStorage.");
            // Gere um token JWT simulado (apenas para fins de teste)
            // Em um cenário real, este token viria do seu backend após a autenticação.
            const simulatedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"; // Exemplo JWT válido, mas sem valor real
            localStorage.setItem('authToken', simulatedToken);

            // Simula os dados do usuário logado
            const simulatedUser = {
                idUser: 1, // ID de usuário de exemplo. Mude se souber um ID válido do seu backend para testes.
                name: "Usuário Teste",
                email: "teste@example.com",
                profilePic: imgProfile, // Use sua imagem padrão
                tipo: "cliente"
            };
            localStorage.setItem('usuarioLogado', JSON.stringify(simulatedUser));
            setUsuarios(simulatedUser);
            console.log("Login simulado: Token e usuário armazenados no localStorage.");
        } else {
            console.log("Token e usuário já existentes no localStorage. Continuando...");
        }
    }, []); // Executa apenas uma vez na montagem do componente

    const fetchPosts = useCallback(async () => {
        setLoadingPosts(true);
        setErrorPosts(null);
        const token = getAuthToken();
        if (!token) {
            setErrorPosts("Erro de autenticação: Token não encontrado. Faça login novamente.");
            setLoadingPosts(false);
            return;
        }

        try {
            // Garante que usuarios.idUser esteja definido e seja um número antes de usá-lo
            const userIdParam = usuarios.idUser && typeof usuarios.idUser === 'number' && !isNaN(usuarios.idUser)
                ? `?userId=${usuarios.idUser}`
                : '';

            const response = await fetch(`${API_POSTS_URL}${userIdParam}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

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
            console.log("Dados dos posts recebidos:", data);
            const processedData = data.map(post => ({
                ...post,
                autor: post.autor || { idUser: null, nameUser: 'Desconhecido', profilePic: imgProfile },
                isFollowingAuthor: post.isFollowingAuthor !== undefined ? post.isFollowingAuthor : false,
                likedByUser: post.likedByUser !== undefined ? post.likedByUser : false,
                likesCount: post.likesCount !== undefined ? post.likesCount : 0,
                commentsCount: post.commentsCount !== undefined ? post.commentsCount : 0,
            }));

            setAllPosts(processedData);
        } catch (err) {
            console.error("Erro ao buscar posts:", err);
            setErrorPosts(`Erro ao carregar posts: ${err.message}. Tente novamente mais tarde.`);
        } finally {
            setLoadingPosts(false);
        }
    }, [usuarios.idUser]);

    const fetchCurrentUserFollowStats = useCallback(async () => {
        if (!usuarios.idUser) {
            console.log("Não é possível buscar stats de seguidores: ID do usuário logado não definido.");
            return;
        }
        const token = getAuthToken();
        if (!token) {
            console.warn("Erro de autenticação para stats de seguidores: Token não encontrado.");
            return;
        }

        try {
            const headers = { 'Authorization': `Bearer ${token}` };

            const followersResponse = await fetch(`${API_FOLLOWS_URL}/${usuarios.idUser}/followers/count`, { headers });
            const followingResponse = await fetch(`${API_FOLLOWS_URL}/${usuarios.idUser}/following/count`, { headers });

            if (followersResponse.ok) {
                const count = await followersResponse.json();
                setCurrentUserFollowersCount(count);
                console.log(`Seguidores do usuário ${usuarios.idUser}: ${count}`);
            } else {
                console.error(`Falha ao buscar seguidores: ${followersResponse.status} ${followersResponse.statusText}`);
            }
            if (followingResponse.ok) {
                const count = await followingResponse.json();
                setCurrentUserFollowingCount(count);
                console.log(`Seguindo pelo usuário ${usuarios.idUser}: ${count}`);
            } else {
                console.error(`Falha ao buscar seguindo: ${followingResponse.status} ${followingResponse.statusText}`);
            }
        } catch (error) {
            console.error("Erro ao buscar contagens de seguidores do usuário logado:", error);
        }
    }, [usuarios.idUser]);

    const handleToggleFollow = useCallback(async (followedId, currentIsFollowing) => {
        console.log("--- handleToggleFollow Chamado ---");
        console.log("    followerId (usuário logado):", usuarios.idUser, "Tipo:", typeof usuarios.idUser);
        console.log("    followedId (usuário a seguir):", followedId, "Tipo:", typeof followedId);
        console.log("    currentIsFollowing (estado atual):", currentIsFollowing);

        if (!usuarios.idUser || typeof usuarios.idUser !== 'number' || isNaN(usuarios.idUser)) {
            console.warn("Usuário logado inválido ou ausente. Não é possível seguir.");
            alert("Erro: ID do usuário logado inválido. Por favor, faça login novamente.");
            return;
        }
        if (!followedId || typeof followedId !== 'number' || isNaN(followedId)) {
            console.warn("ID do usuário a ser seguido é inválido ou ausente.");
            alert("Erro: ID do usuário a ser seguido inválido.");
            return;
        }
        if (usuarios.idUser === followedId) {
            console.warn("Você não pode seguir a si mesmo.");
            alert("Você não pode seguir a si mesmo!");
            return;
        }

        const token = getAuthToken();
        if (!token) {
            alert("Sessão expirada ou não autenticada. Por favor, faça login.");
            return;
        }

        try {
            const response = await fetch(`${API_FOLLOWS_URL}/toggle`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    followerId: usuarios.idUser,
                    followedId: followedId
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = `Falha ao alternar seguir/deixar de seguir: ${response.status} ${response.statusText}`;
                try {
                    const errorJson = JSON.parse(errorText);
                    errorMessage = errorJson.message || errorJson.error || errorMessage;
                } catch (parseError) {
                    errorMessage = errorText || errorMessage;
                }
                throw new Error(errorMessage);
            }

            const result = await response.json();

            console.log('Operação de seguir/deixar de seguir realizada com sucesso!', result);
            setAllPosts(prevPosts => prevPosts.map(p => {
                if (p.autor && p.autor.idUser === followedId) {
                    return {
                        ...p,
                        isFollowingAuthor: result.isFollowing,
                        autor: {
                            ...p.autor,
                            followersCount: result.followedUserNewFollowersCount
                        }
                    };
                }
                return p;
            }));

            setSuggestions(prevSuggestions => prevSuggestions.map(sug => {
                if (sug.id === followedId) {
                    return {
                        ...sug,
                        isFollowing: result.isFollowing,
                        followers: result.followedUserNewFollowersCount // Atualiza o contador de seguidores
                    };
                }
                return sug;
            }));

            fetchCurrentUserFollowStats();

        } catch (error) {
            console.error('Erro ao alternar seguir/deixar de seguir:', error.message);
            alert(`Erro ao seguir/deixar de seguir: ${error.message}`);
        }
    }, [usuarios.idUser, fetchCurrentUserFollowStats]);

    const criarNovoPostAPI = useCallback(async () => {
        setPostFormMessage('');
        if (conteudoPost.trim() === '') {
            setPostFormMessage('O conteúdo do post não pode estar vazio.');
            return;
        }
        if (typeof usuarios.idUser !== 'number' || isNaN(usuarios.idUser)) {
            setPostFormMessage('Erro: ID do usuário logado não encontrado ou inválido. Por favor, faça login.');
            return;
        }

        const token = getAuthToken();
        if (!token) {
            setPostFormMessage("Sessão expirada ou não autenticada. Por favor, faça login.");
            return;
        }

        try {
            const postData = { idUser: usuarios.idUser, conteudo: conteudoPost };
            const response = await fetch(API_POSTS_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(postData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = `Erro desconhecido ao criar post. Status: ${response.status}`;
                try {
                    const errorJson = JSON.parse(errorText);
                    errorMessage = errorJson.message || errorMessage;
                } catch (parseError) {
                    errorMessage = errorText || errorMessage;
                }
                throw new Error(errorMessage);
            }

            const novoPostCriado = await response.json();
            const postComAutorCorreto = {
                ...novoPostCriado,
                autor: novoPostCriado.autor || {
                    idUser: usuarios.idUser,
                    nameUser: usuarios.name || 'Nome do Usuário',
                    tipo: usuarios.tipo,
                    profilePic: usuarios.profilePic || imgProfile,
                    followersCount: currentUserFollowersCount
                },
                likedByUser: false,
                likesCount: 0,
                commentsCount: 0,
                isFollowingAuthor: true,
            };
            setAllPosts(prevPosts => [postComAutorCorreto, ...prevPosts]);
            setConteudoPost('');
            setPostFormMessage('Post publicado com sucesso!');
            setIsCreatePostModalOpen(false);
        } catch (err) {
            console.error("Erro ao publicar post:", err);
            setPostFormMessage(`Erro ao publicar post: ${err.message}`);
        }
    }, [conteudoPost, usuarios.idUser, usuarios.name, usuarios.tipo, usuarios.profilePic, currentUserFollowersCount]);

    const deletarPostAPI = useCallback(async (postId) => {
        setPostFormMessage('');
        if (typeof postId !== 'number' || isNaN(postId)) {
            setPostFormMessage('Erro: ID do post inválido para deleção.');
            console.error("ID do post inválido:", postId);
            return;
        }

        const token = getAuthToken();
        if (!token) {
            setPostFormMessage("Sessão expirada ou não autenticada. Por favor, faça login.");
            return;
        }

        try {
            const response = await fetch(`${API_POSTS_URL}/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
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

            setAllPosts(prevPosts => prevPosts.filter(post => post.idUser !== postId));
            setPostFormMessage('Post deletado com sucesso!');
        } catch (err) {
            console.error("Erro ao deletar post via API:", err);
            setPostFormMessage(`Erro ao deletar post: ${err.message}.`);
        }
    }, []);

    const handlePostLikeToggle = useCallback((postId, newLikedStatus, newLikesCount) => {
        setAllPosts(prevPosts =>
            prevPosts.map(post =>
                post.idUser === postId
                    ? { ...post, likedByUser: newLikedStatus, likesCount: newLikesCount }
                    : post
            )
        );
        if (selectedPost && selectedPost.idUser === postId) {
            setSelectedPost(prevSelectedPost => ({
                ...prevSelectedPost,
                likedByUser: newLikedStatus,
                likesCount: newLikesCount,
            }));
        }
    }, [selectedPost]);

    const fetchCommentsForPost = useCallback(async (postId) => {
        setLoadingComments(true);
        setErrorComments(null);
        const token = getAuthToken();
        if (!token) {
            setErrorComments("Erro de autenticação: Token não encontrado. Faça login novamente.");
            setLoadingComments(false);
            return;
        }
        try {
            console.log("Fetching comments from URL:", `${API_COMMENTS_URL}/post/${postId}`);

            const response = await fetch(`${API_COMMENTS_URL}/post/${postId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = `Erro ao buscar comentários: ${response.status} ${response.statusText}`;
                try {
                    const errorJson = JSON.parse(errorText);
                    errorMessage = errorJson.message || errorJson.error || errorMessage;
                } catch (parseError) {
                    errorMessage = errorText || errorMessage;
                }
                throw new Error(errorMessage);
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

    const handleAddComment = useCallback(async () => {
        if (!commentContent.trim()) {
            alert("O comentário não pode estar vazio!");
            return;
        }
        if (!usuarios.idUser) {
            alert("Você precisa estar logado para comentar.");
            return;
        }
        if (!selectedPost || !selectedPost.idUser) {
            alert("Nenhum post selecionado para comentar.");
            return;
        }

        const token = getAuthToken();
        if (!token) {
            alert("Sessão expirada ou não autenticada. Por favor, faça login.");
            return;
        }

        try {
            const commentData = {
                idPost: selectedPost.idUser,
                idUser: usuarios.idUser,
                content: commentContent
            };

            console.log("Enviando dados do comentário:", commentData);

            const response = await fetch(API_COMMENTS_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
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
            const commentWithAutor = {
                ...newComment,
                autor: newComment.usuario || { idUser: usuarios.idUser, nameUser: usuarios.name || 'Usuário', profilePic: usuarios.profilePic || imgProfile }
            };

            setPostComments(prevComments => [commentWithAutor, ...prevComments]);
            setCommentContent('');

            setAllPosts(prevPosts =>
                prevPosts.map(p =>
                    p.idUser === selectedPost.idUser
                        ? { ...p, commentsCount: (p.commentsCount || 0) + 1 }
                        : p
                )
            );
            setSelectedPost(prevSelectedPost => ({
                ...prevSelectedPost,
                commentsCount: (prevSelectedPost.commentsCount || 0) + 1
            }));


        } catch (error) {
            console.error("Erro ao adicionar comentário:", error);
            alert(`Erro ao comentar: ${error.message}`);
        }
    }, [commentContent, usuarios.idUser, usuarios.name, usuarios.profilePic, selectedPost]);

    // --- EFEITOS DE CARREGAMENTO DE DADOS ---
    useEffect(() => {
        console.log("useEffect principal acionado. usuarios.id:", usuarios.idUser, "Tipo:", typeof usuarios.idUser);

        if (usuarios.idUser) {
            fetchPosts();
            fetchCurrentUserFollowStats();
        } else {
            setLoadingPosts(false);
            setAllPosts([]);
            setCurrentUserFollowersCount(0);
            setCurrentUserFollowingCount(0);
            console.log("Usuário não logado, posts e stats não serão carregados.");
        }
    }, [usuarios.idUser, fetchPosts, fetchCurrentUserFollowStats]);


    useEffect(() => {
        setStories([
            { id: 1, user: "@elise_moreira", image: amigo1 },
            { id: 2, user: "@user_name", image: amigo2 },
            { id: 3, user: "@john_doe", image: amigo3 },
            { id: 4, user: "@jane_smith", image: amigo4 },
            { id: 5, user: "@alex_fox", image: amigo5 },
            { id: 6, user: "@lisa_ann", image: amigo6 },
        ]);

        const mockSuggestions = [
            { id: 102, name: "Elise Moreira", username: "@Elise_Moreira", profilePic: "https://via.placeholder.com/50/FF69B4/FFFFFF?text=Elise", followers: 50 },
            { id: 103, name: "Another User", username: "@AnotherUser", profilePic: "https://via.placeholder.com/50/ADD8E6/FFFFFF?text=AU", followers: 120 },
            { id: 104, name: "Carlos Silva", username: "@carlos.s", profilePic: "https://via.placeholder.com/50/FFD700/FFFFFF?text=CS", followers: 300 },
            { id: 105, name: "Maria Lima", username: "@mary_L", profilePic: "https://via.placeholder.com/50/98FB98/FFFFFF?text=ML", followers: 80 },
        ].filter(sug => sug.id !== usuarios.idUser)
            .map(sug => {
                const authorPost = allPosts.find(post => post.autor?.idUser === sug.id);
                return {
                    ...sug,
                    isFollowing: authorPost ? authorPost.isFollowingAuthor : false,
                    followers: authorPost ? authorPost.autor.followersCount : sug.followers
                };
            });

        setSuggestions(mockSuggestions);


        setRecommendations([
            { id: 1, title: "Trending #ReactJS", type: "Topic" },
            { id: 2, title: "Best Practices in Web Dev", type: "Article" },
            { id: 3, title: "New AI Developments", type: "News" },
            { id: 4, title: "Healthy Eating Tips", type: "Guide" },
        ]);
    }, [usuarios.idUser, allPosts]);


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
        setPostFormMessage('')
    };

    const cancelDelete = () => {
        setShowDeleteConfirmModal(false);
        setPostToDelete(null);
        setPostFormMessage('');
    };

    const openFullPostModal = (post) => {
        setSelectedPost(post);
        setIsFullPostModalOpen(true);
        if (post && post.idUser) {
            fetchCommentsForPost(post.idUser);
        }
    };

    const closeFullPostModal = () => {
        setIsFullPostModalOpen(false);
        setSelectedPost(null);
        setPostComments([]);
        setCommentContent('');
        setErrorComments(null);
        setLoadingComments(false);
    };


    const currentSidebarUser = {
        name: usuarios.name || "Usuário",
        username: usuarios.email || "@usuario",
        followers: currentUserFollowersCount,
        following: currentUserFollowingCount,
        profilePic: usuarios.profilePic || imgProfile
    };

    const getFilteredPosts = useCallback(() => {
        let filtered = allPosts;

        if (activeFeedTab === 'media') {
            filtered = allPosts.filter(post => post.autor && post.autor.idUser === usuarios.idUser);
        } else if (activeFeedTab === 'feed') {
            if (feedFilter === 'friends') {
                filtered = allPosts.filter(post =>
                    post.autor && post.autor.idUser !== usuarios.idUser && post.isFollowingAuthor
                );
            } else if (feedFilter === 'popular') {
                filtered = [...allPosts].sort((a, b) => b.likesCount - a.likesCount);
            }
        }

        return filtered;
    }, [allPosts, activeFeedTab, feedFilter, usuarios.idUser]);

    const displayedPosts = getFilteredPosts();

    return (
        <div className="social-app-container">
            <Modal isOpen={showDeleteConfirmModal} onClose={cancelDelete} customClass="delete-confirm-modal">
                <h2>Confirmar Exclusão</h2>
                <p>Tem certeza que deseja deletar este post? Esta ação não pode ser desfeita.</p>
                <div className="buttons">
                    <button onClick={confirmDelete} className="confirm-btn">Deletar</button>
                    <button onClick={cancelDelete} className="cancel-btn">Cancelar</button>
                </div>
            </Modal>

            <Modal isOpen={isCreatePostModalOpen} onClose={() => setIsCreatePostModalOpen(false)} customClass="create-post-modal">
                <CreatePostModalContent
                    currentUser={usuarios}
                    conteudoPost={conteudoPost}
                    setConteudoPost={setConteudoPost}
                    onCreatePost={criarNovoPostAPI}
                    postFormMessage={postFormMessage}
                />
            </Modal>

            <Modal isOpen={isFullPostModalOpen} onClose={closeFullPostModal} customClass="full-post-modal-content">
                {selectedPost && (
                    <FullPostModalContent
                        post={selectedPost}
                        onClose={closeFullPostModal}
                        currentUser={usuarios}
                        postComments={postComments}
                        commentContent={commentContent}
                        setCommentContent={setCommentContent}
                        handleAddComment={handleAddComment}
                        loadingComments={loadingComments}
                        errorComments={errorComments}
                        onLikeToggle={handlePostLikeToggle}
                    />
                )}
            </Modal>

            <div className="social-app-layout-main">
                <nav className="social-app-sidebar">
                    <div className="profile-card">
                        <img src={currentSidebarUser.profilePic} alt={currentSidebarUser.name} className="profile-pic" />
                        <div className="profile-info">
                            <h2 style={{ color: 'white' }} className="profile-name">{currentSidebarUser.name}</h2>
                            <span className="profile-username">{currentSidebarUser.username}</span>
                        </div>
                        <div className="profile-stats">
                            <span>{currentSidebarUser.following} Seguindo</span>
                            <span>{currentSidebarUser.followers} Seguidores</span>
                        </div>
                    </div>
                    <ul className="nav-links">
                        <li><a href="#" className="nav-item">Mensagens <span className="notification">2</span></a></li>
                        <li>
                            <a
                                href="#"
                                className={`nav-item ${activeFeedTab === 'feed' ? 'active' : ''}`}
                                onClick={(e) => { e.preventDefault(); setActiveFeedTab('feed'); setFeedFilter('recent'); }}
                            >
                                Publicações
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className={`nav-item ${activeFeedTab === 'newsFeed' ? 'active' : ''}`}
                                onClick={(e) => { e.preventDefault(); setIsCreatePostModalOpen(true); }}
                            >
                                Adicionar Publicação
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className={`nav-item ${activeFeedTab === 'media' ? 'active' : ''}`}
                                onClick={(e) => { e.preventDefault(); setActiveFeedTab('media'); }}
                            >
                                Minhas publicações
                            </a>
                        </li>
                        <li><a href="#" className="nav-item">Configurações</a></li>
                    </ul>
                    {/* Botão para recarregar posts - útil para depuração */}
                    <button onClick={fetchPosts} className="logout-button" style={{ marginBottom: '10px' }}>
                        Recarregar Posts
                    </button>
                    <Link className='link-button' to='/HomePage'><button className="logout-button">Sair</button></Link>
                </nav>

                <div className="social-app-content">
                    <div className="stories-section">
                        <h3>Stories</h3>
                        <div className="stories-list">
                            {stories.map(story => (
                                <div key={story.id} className="story-item">
                                    <img src={story.image} alt={story.user} />
                                    <span>{story.user}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="feed-header">
                        <button
                            className={`feed-tab ${activeFeedTab === 'newsFeed' ? 'active' : ''}`}
                            onClick={() => { setActiveFeedTab('newsFeed'); setFeedFilter('recent'); }}
                        >
                            Feed de Notícias
                        </button>
                        <button
                            className={`feed-tab ${activeFeedTab === 'feed' ? 'active' : ''}`}
                            onClick={() => { setActiveFeedTab('feed'); setFeedFilter('recent'); }}
                        >
                            Meus Posts/Friends/Popular
                        </button>
                        <button
                            className={`feed-tab ${activeFeedTab === 'media' ? 'active' : ''}`}
                            onClick={() => setActiveFeedTab('media')}
                        >
                            Minhas Publicações
                        </button>
                    </div>

                    {activeFeedTab === 'feed' && (
                        <div className="feed-filter-options">
                            <button
                                className={feedFilter === 'recent' ? 'active' : ''}
                                onClick={() => setFeedFilter('recent')}
                            >
                                Recentes
                            </button>
                            <button
                                className={feedFilter === 'friends' ? 'active' : ''}
                                onClick={() => setFeedFilter('friends')}
                            >
                                Amigos
                            </button>
                            <button
                                className={feedFilter === 'popular' ? 'active' : ''}
                                onClick={() => setFeedFilter('popular')}
                            >
                                Populares
                            </button>
                        </div>
                    )}

                    {loadingPosts && <p>Carregando posts...</p>}
                    {errorPosts && <p className="error-message">{errorPosts}</p>}
                    {!loadingPosts && displayedPosts.length === 0 && (
                        <p style={{ textAlign: 'center', color: '#bbb' }}>Nenhum post para exibir. Crie um novo post ou siga alguém!</p>
                    )}
                    <div className="posts-list">
                        {displayedPosts.map(post => (
                            <FeedPost
                                key={post.idUser}
                                post={post}
                                currentUser={usuarios}
                                onPostDelete={handleDeleteClick}
                                onOpenFullPostModal={openFullPostModal}
                                onLikeToggle={handlePostLikeToggle}
                                onToggleFollow={handleToggleFollow}
                            />
                        ))}
                    </div>
                </div>

                <aside className="social-app-right-sidebar">
                    <div className="right-sidebar-section">
                        <h3>Sugestões para seguir</h3>
                        <ul className="suggestions-list">
                            {suggestions.map(sug => (
                                <li key={sug.id} className="suggestion-item">
                                    <img src={sug.profilePic} alt={sug.name} />
                                    <div className="user-info">
                                        <div className="name">{sug.name}</div>
                                        <div className="username">{sug.username}</div>
                                    </div>
                                    {sug.id !== usuarios.idUser && (
                                        <button
                                            onClick={() => handleToggleFollow(sug.id, sug.isFollowing)}
                                            className={`seguir-button ${sug.isFollowing ? 'active' : ''}`}
                                        >
                                            {sug.isFollowing ? 'Deixar de seguir' : 'Seguir'}
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="right-sidebar-section">
                        <h3>Recomendações e Tendências</h3>
                        <ul className="recommendations-list">
                            {recommendations.map(rec => (
                                <li key={rec.id} className="recommendation-item">
                                    <span>{rec.type}:</span> {rec.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default SocialAppLayout;
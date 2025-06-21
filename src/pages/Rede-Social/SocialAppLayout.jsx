import React, { useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './SocialAppLayout.css';

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
        if (!currentUser || !currentUser.id) {
            console.warn("Usuário não logado. Não é possível curtir.");
            alert("Você precisa estar logado para curtir um post.");
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

            const newLikedStatus = !liked;
            const newLikesCount = newLikedStatus ? likesCount + 1 : likesCount - 1;

            setLiked(newLikedStatus);
            setLikesCount(newLikesCount);

            if (onLikeToggle) {
                onLikeToggle(post.id, newLikedStatus, newLikesCount);
            }

        } catch (error) {
            console.error("Erro ao alternar curtida:", error);
            alert(`Erro ao curtir/descurtir post: ${error.message}`);
        }
    };

    const handleFollowButtonClick = async () => {
        if (!currentUser || !currentUser.id) {
            alert("Você precisa estar logado para seguir um usuário.");
            return;
        }
        if (post.autor && typeof post.autor.id === 'number' && !isNaN(post.autor.id)) {
            // Chamada para a função de toggle passada via props
            onToggleFollow(post.autor.id, isFollowingAuthor); 
        } else {
            console.error("Erro: ID do autor do post é inválido para seguir:", post.autor?.id);
            alert("Não foi possível seguir este usuário: ID inválido.");
        }
    };

    const isMyPost = post.autor && post.autor.id === currentUser.id;
    const isAuthorCurrentUser = post.autor && post.autor.id === currentUser.id;

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
                <button onClick={() => onPostDelete(post.id)} className="delete-button">
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
        if (!currentUser || !currentUser.id) {
            alert("Você precisa estar logado para curtir um post.");
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

            const newLikedStatus = !liked;
            const newLikesCount = newLikedStatus ? likesCount + 1 : likesCount - 1;

            setLiked(newLikedStatus);
            setLikesCount(newLikesCount);

            if (onLikeToggle) {
                onLikeToggle(post.id, newLikedStatus, newLikesCount);
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
                        <div key={comment.id} className="comment-item">
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


function SocialAppLayout() {
    const [usuarios, setUsuarios] = useState(() => {
        const usuarioStorage = localStorage.getItem("usuarioLogado");
        const parsedUser = usuarioStorage ? JSON.parse(usuarioStorage) : {};
        const userId = (parsedUser.id !== null && parsedUser.id !== undefined && !isNaN(parseInt(parsedUser.id, 10)))
            ? parseInt(parsedUser.id, 10)
            : undefined;
        return { ...parsedUser, id: userId };
    });

    const [mostrarPerfilStatus, setMostrarPerfilStatus] = useState(false);
    const [mostrarCameraOptions, setMostrarCameraOptions] = useState(false);
    const [mostrarProfilePictureChangeModal, setMostrarProfilePictureChangeModal] = useState(false);
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
    const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

    const [feedFilter, setFeedFilter] = useState('recent');

    const [stories, setStories] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    const [currentUserFollowersCount, setCurrentUserFollowersCount] = useState(0);
    const [currentUserFollowingCount, setCurrentUserFollowingCount] = useState(0);



    const fetchPosts = useCallback(async () => {
        setLoadingPosts(true);
        setErrorPosts(null);
        try {
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
            console.log("Dados dos posts recebidos:", data);
            const processedData = data.map(post => ({
                ...post,
                autor: post.autor || { id: null, nameUser: 'Desconhecido', profilePic: imgProfile },
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
    }, [usuarios.id]);

    const fetchCurrentUserFollowStats = useCallback(async () => {
        if (!usuarios.id) {
            console.log("Não é possível buscar stats de seguidores: ID do usuário logado não definido.");
            return;
        }
        try {
            const followersResponse = await fetch(`${API_FOLLOWS_URL}/${usuarios.id}/followers/count`);
            const followingResponse = await fetch(`${API_FOLLOWS_URL}/${usuarios.id}/following/count`);

            if (followersResponse.ok) {
                const count = await followersResponse.json();
                setCurrentUserFollowersCount(count);
                console.log(`Seguidores do usuário ${usuarios.id}: ${count}`);
            }
            if (followingResponse.ok) {
                const count = await followingResponse.json();
                setCurrentUserFollowingCount(count);
                console.log(`Seguindo pelo usuário ${usuarios.id}: ${count}`);
            }
        } catch (error) {
            console.error("Erro ao buscar contagens de seguidores do usuário logado:", error);
        }
    }, [usuarios.id]);

    const handleToggleFollow = useCallback(async (followedId, currentIsFollowing) => {
        console.log("--- handleToggleFollow Chamado ---");
        console.log("   followerId (usuário logado):", usuarios.id, "Tipo:", typeof usuarios.id);
        console.log("   followedId (usuário a seguir):", followedId, "Tipo:", typeof followedId);
        console.log("   currentIsFollowing (estado atual):", currentIsFollowing);

        if (!usuarios.id || typeof usuarios.id !== 'number' || isNaN(usuarios.id)) {
            console.warn("Usuário logado inválido ou ausente. Não é possível seguir.");
            alert("Erro: ID do usuário logado inválido. Por favor, faça login novamente.");
            return;
        }
        if (!followedId || typeof followedId !== 'number' || isNaN(followedId)) {
            console.warn("ID do usuário a ser seguido é inválido ou ausente.");
            alert("Erro: ID do usuário a ser seguido inválido.");
            return;
        }
        if (usuarios.id === followedId) {
            console.warn("Você não pode seguir a si mesmo.");
            alert("Você não pode seguir a si mesmo!");
            return;
        }

        try {
            const response = await fetch(`${API_FOLLOWS_URL}/toggle`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    followerId: usuarios.id,
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
                if (p.autor && p.autor.id === followedId) {
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
                        followers: result.followedUserNewFollowersCount 
                    };
                }
                return sug;
            }));

            fetchCurrentUserFollowStats(); 

        } catch (error) {
            console.error('Erro ao alternar seguir/deixar de seguir:', error.message);
            alert(`Erro ao seguir/deixar de seguir: ${error.message}`);
        }
    }, [usuarios.id, fetchCurrentUserFollowStats]);

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
            const postComAutorCorreto = {
                ...novoPostCriado,
                autor: novoPostCriado.autor || { id: usuarios.id, nameUser: usuarios.name || 'Nome do Usuário', tipo: usuarios.tipo, profilePic: usuarios.profilePic || imgProfile, followersCount: currentUserFollowersCount },
                likedByUser: false,
                likesCount: 0,
                commentsCount: 0,
                isFollowingAuthor: false, 
            };
            setAllPosts(prevPosts => [postComAutorCorreto, ...prevPosts]);
            setConteudoPost('');
            setPostFormMessage('Post publicado com sucesso!');
            setIsCreatePostModalOpen(false);
        } catch (err) {
            console.error("Erro ao publicar post:", err);
            setPostFormMessage(`Erro ao publicar post: ${err.message}`);
        }
    }, [conteudoPost, usuarios, currentUserFollowersCount]); 

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
                } catch (parseError) {  }
                throw new Error(errorMessage);
            }

            setAllPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
            setPostFormMessage('Post deletado com sucesso!');
        } catch (err) {
            console.error("Erro ao deletar post via API:", err);
            setPostFormMessage(`Erro ao deletar post: ${err.message}.`);
        }
    }, []);

    const handlePostLikeToggle = useCallback((postId, newLikedStatus, newLikesCount) => {
        setAllPosts(prevPosts =>
            prevPosts.map(post =>
                post.id === postId
                    ? { ...post, likedByUser: newLikedStatus, likesCount: newLikesCount }
                    : post
            )
        );
        if (selectedPost && selectedPost.id === postId) {
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
        try {
            console.log("Fetching comments from URL:", `${API_COMMENTS_URL}/post/${postId}`);

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
                idPost: selectedPost.id,
                idUser: usuarios.id,
                content: commentContent
            };

            console.log("Enviando dados do comentário:", commentData);

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
            const commentWithAutor = {
                ...newComment,
                autor: newComment.usuario || { id: usuarios.id, nameUser: usuarios.name || 'Usuário', profilePic: usuarios.profilePic || imgProfile }
            };

            setPostComments(prevComments => [commentWithAutor, ...prevComments]);
            setCommentContent('');

            setAllPosts(prevPosts =>
                prevPosts.map(p =>
                    p.id === selectedPost.id
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
    }, [commentContent, usuarios.id, selectedPost]);

    useEffect(() => {
        console.log("useEffect principal acionado. usuarios.id:", usuarios.id, "Tipo:", typeof usuarios.id);

        if (usuarios.id) {
            fetchPosts();
            fetchCurrentUserFollowStats();
        } else {
            setLoadingPosts(false);
            setAllPosts([]);
            setCurrentUserFollowersCount(0);
            setCurrentUserFollowingCount(0);
        }
    }, [usuarios.id, fetchPosts, fetchCurrentUserFollowStats]);


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
        ].filter(sug => sug.id !== usuarios.id) 
           .map(sug => {
               const authorPost = allPosts.find(post => post.autor?.id === sug.id);
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
    }, [usuarios.id, allPosts]); 


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
        if (post && post.id) {
            fetchCommentsForPost(post.id);
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
            filtered = allPosts.filter(post => post.autor && post.autor.id === usuarios.id);
        } else if (activeFeedTab === 'feed') {
            if (feedFilter === 'friends') {
                filtered = allPosts.filter(post =>
                    post.autor && post.autor.id !== usuarios.id && post.isFollowingAuthor
                );
            } else if (feedFilter === 'popular') {
                filtered = [...allPosts].sort((a, b) => b.likesCount - a.likesCount);
            }
        }

        return filtered;
    }, [allPosts, activeFeedTab, feedFilter, usuarios.id]);

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
                                key={post.id}
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
                                    {sug.id !== usuarios.id && ( 
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
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './SocialAppLayout.css'; 
import imgProfile from '../../assets/imgs/img-perfil/ImgMae.jpeg'; 
import amigo1 from '../../assets/imgs/img-perfil/amigos/amigo1.jpeg'; 
import amigo2 from '../../assets/imgs/img-perfil/amigos/amigo2.jpg'; 
import amigo3 from '../../assets/imgs/img-perfil/amigos/amigo3.jpg'; 
import amigo4 from '../../assets/imgs/img-perfil/amigos/amigo4.jpeg'; 
import amigo5 from '../../assets/imgs/img-perfil/amigos/amigo5.jpg'; 
import amigo6 from '../../assets/imgs/img-perfil/amigos/amigo6.jpeg';

const API_BASE_URL = 'https://backend-acenis-production.up.railway.app'; 
const API_POSTS_URL = `${API_BASE_URL}/api/posts`;
const API_USERS_URL = `${API_BASE_URL}/usuarios`;
const API_COMMENTS_URL = `${API_BASE_URL}/api/comments`;
const API_FOLLOW_URL = `${API_BASE_URL}/api/follows`; 

const useUser = () => {
    const [usuarios, setUsuarios] = useState(() => {
        const storedUser = localStorage.getItem('usuarioLogado2'); 
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser && typeof parsedUser.idUser === 'number' && !isNaN(parsedUser.idUser)) {
                    return parsedUser;
                }
                console.warn("useUser: Usuário em 'usuarioLogado2' é inválido ou incompleto. Limpando e inicializando como Visitante.");
                localStorage.removeItem('usuarioLogado2'); 
            } catch (e) {
                console.error("useUser: ERRO ao fazer JSON.parse de 'usuarioLogado2':", e);
                localStorage.removeItem('usuarioLogado2'); 
            }
        }
        return {
            idUser: null,
            nameUser: 'Visitante',
            emailUser: '',
            tipo: 'comum',
            profilePic: imgProfile
        };
    });

    useEffect(() => {
        if (usuarios.idUser) { 
            localStorage.setItem('usuarioLogado2', JSON.stringify(usuarios)); 
        } else {
            localStorage.removeItem('usuarioLogado2'); 
        }
    }, [usuarios]);

    const updateUser = useCallback((userData) => {
        const newUser = {
            idUser: userData.idUser,
            nameUser: userData.nameUser || userData.name,
            emailUser: userData.emailUser || userData.email,
            tipo: userData.tipo || 'comum',
            profilePic: userData.profilePic || imgProfile,
        };
        setUsuarios(newUser);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('usuarioLogado2'); 
        setUsuarios({
            idUser: null,
            nameUser: 'Visitante',
            emailUser: '',
            tipo: 'comum',
            profilePic: imgProfile
        });
    }, []);

    return { usuarios, updateUser, logout };
};

const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

function SocialAppLayout() {
    const { usuarios, updateUser, logout } = useUser();

    const [allPosts, setAllPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [errorPosts, setErrorPosts] = useState(null);

    const [conteudoPost, setConteudoPost] = useState('');
    const [postFormMessage, setPostFormMessage] = useState('');
    const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);

    const [isFullPostModalOpen, setIsFullPostModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [postComments, setPostComments] = useState([]);
    const [commentContent, setCommentContent] = useState('');
    const [loadingComments, setLoadingComments] = useState(false);
    const [errorComments, setErrorComments] = useState(null);

    const [stories, setStories] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    const [activeFeedTab, setActiveFeedTab] = useState('feed');
    const [feedFilter, setFeedFilter] = useState('recent');

    const [currentUserFollowersCount, setCurrentUserFollowersCount] = useState(0);
    const [currentUserFollowingCount, setCurrentUserFollowingCount] = useState(0);


    const fetchPosts = useCallback(async () => {
        setLoadingPosts(true);
        setErrorPosts(null);
        const token = getAuthToken();

        if (!token) {
            setErrorPosts("Autenticação necessária. Por favor, faça login.");
            setLoadingPosts(false);
            return;
        }

        try {
            const userIdParam = usuarios.idUser ? `?userId=${usuarios.idUser}` : '';
            const response = await fetch(`${API_POSTS_URL}${userIdParam}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = `Erro ao buscar posts: ${response.status} ${response.statusText}`;
                try {
                    const errorJson = JSON.parse(errorText);
                    errorMessage = errorJson.message || errorJson.error || errorMessage;
                } catch (parseError) {
                    errorMessage = errorText || errorMessage;
                }
                throw new Error(errorMessage);
            }

            const data = await response.json();
            const postsProcessed = data.map(post => ({
                ...post,
                autor: {
                    idUser: post.autor?.idUser || post.idUser,
                    nameUser: post.autor?.nameUser || post.autor?.name || 'Usuário Desconhecido',
                    tipo: post.autor?.tipo || 'comum',
                    profilePic: post.autor?.profilePic || imgProfile,
                    followersCount: post.autor?.followersCount || 0,
                },
                likedByUser: post.likedByUser || false,
                likesCount: post.likesCount || 0,
                commentsCount: post.commentsCount || 0,
                isFollowingAuthor: post.isFollowingAuthor !== undefined ? post.isFollowingAuthor : false,
            }));

            setAllPosts(postsProcessed);
        } catch (err) {
            console.error("Erro ao buscar posts:", err);
            setErrorPosts(`Erro ao carregar posts: ${err.message}`);
        } finally {
            setLoadingPosts(false);
        }
    }, [usuarios.idUser]); 

    const fetchCurrentUserFollowStats = useCallback(async () => {
        const token = getAuthToken();
        if (!token || !usuarios.idUser || typeof usuarios.idUser !== 'number') {
            console.log("Token ou ID do usuário inválido/ausente para buscar estatísticas de seguimento.");
            setCurrentUserFollowersCount(0); 
            setCurrentUserFollowingCount(0);
            return;
        }

        try {
            const followersResponse = await fetch(`${API_FOLLOW_URL}/${usuarios.idUser}/followers/count`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const followingResponse = await fetch(`${API_FOLLOW_URL}/${usuarios.idUser}/following/count`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!followersResponse.ok) {
                const errorText = await followersResponse.text();
                throw new Error(`Erro ao buscar contagem de seguidores: ${followersResponse.status} ${followersResponse.statusText}. Detalhes: ${errorText}`);
            }
            if (!followingResponse.ok) {
                const errorText = await followingResponse.text();
                throw new Error(`Erro ao buscar contagem de seguindo: ${followingResponse.status} ${followingResponse.statusText}. Detalhes: ${errorText}`);
            }

            const followersCount = await followersResponse.json();
            const followingCount = await followingResponse.json();
            
            setCurrentUserFollowersCount(followersCount || 0);
            setCurrentUserFollowingCount(followingCount || 0);
        } catch (error) {
            console.error("Erro ao buscar estatísticas de seguimento:", error);
            setCurrentUserFollowersCount(0); 
            setCurrentUserFollowingCount(0);
        }
    }, [usuarios.idUser]);


    const handleToggleFollow = useCallback(async (targetUserId, isCurrentlyFollowing) => {
        const token = getAuthToken();
        if (!usuarios.idUser || typeof usuarios.idUser !== 'number' || !token) {
            alert("Você precisa estar logado para seguir/deixar de seguir.");
            return;
        }
        if (typeof targetUserId !== 'number' || isNaN(targetUserId)) {
            console.error("Erro: ID do usuário alvo inválido para seguir/deixar de seguir.", targetUserId);
            alert("Não foi possível seguir/deixar de seguir este usuário. ID inválido.");
            return;
        }
        if (usuarios.idUser === targetUserId) {
            alert("Você não pode seguir a si mesmo!");
            return;
        }

        try {
            const response = await fetch(`${API_FOLLOW_URL}/toggle`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ followerId: usuarios.idUser, followedId: targetUserId })
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = `Erro ao ${isCurrentlyFollowing ? 'deixar de seguir' : 'seguir'} o usuário: ${response.status}`;
                try {
                    const errorJson = JSON.parse(errorText);
                    errorMessage = errorJson.message || errorJson.error || errorMessage;
                } catch (parseError) {  }
                throw new Error(errorMessage);
            }

            const data = await response.json();
            const isNowFollowing = data.isFollowing; 

            setAllPosts(prevPosts =>
                prevPosts.map(post =>
                    post.autor?.idUser === targetUserId
                        ? { ...post, isFollowingAuthor: isNowFollowing } 
                        : post
                )
            );
            setSuggestions(prevSuggestions =>
                prevSuggestions.map(sug =>
                    sug.id === targetUserId
                        ? { ...sug, isFollowing: isNowFollowing, followers: data.newFollowersCount || sug.followers } 
                        : sug
                )
            );
            fetchCurrentUserFollowStats(); 
            alert(data.message); 
        } catch (error) {
            console.error(`Erro ao ${isCurrentlyFollowing ? 'deixar de seguir' : 'seguir'}:`, error);
            alert(`Erro: ${error.message}`);
        }
    }, [usuarios.idUser, fetchCurrentUserFollowStats, setAllPosts, setSuggestions]); 

    const criarNovoPostAPI = useCallback(async () => {
        setPostFormMessage('');
        if (!conteudoPost.trim()) {
            setPostFormMessage('O conteúdo do post não pode estar vazio!');
            return;
        }
        if (!usuarios.idUser) {
            setPostFormMessage('Usuário não autenticado. Por favor, faça login.');
            return;
        }

        const token = getAuthToken();
        if (!token) {
            setPostFormMessage("Sessão expirada ou não autenticada. Por favor, faça login.");
            return;
        }

        try {
            const response = await fetch(API_POSTS_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    idUser: usuarios.idUser,
                    conteudo: conteudoPost,
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = `Erro HTTP ao publicar! Status: ${response.status}`;
                try {
                    const errorJson = JSON.parse(errorText);
                    errorMessage = errorJson.message || errorMessage;
                } catch (parseError) {  }
                throw new Error(errorMessage);
            }

            const novoPostCriado = await response.json();
            const postComAutorCorreto = {
                ...novoPostCriado,
                autor: novoPostCriado.autor || {
                    idUser: usuarios.idUser,
                    nameUser: usuarios.nameUser || usuarios.name || 'Nome do Usuário',
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
    }, [conteudoPost, usuarios.idUser, usuarios.nameUser, usuarios.name, usuarios.tipo, usuarios.profilePic, currentUserFollowersCount, setAllPosts]); 

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
                } catch (parseError) {  }
                throw new Error(errorMessage);
            }

            setAllPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
            setPostFormMessage('Post deletado com sucesso!');
        } catch (err) {
            console.error("Erro ao deletar post via API:", err);
            setPostFormMessage(`Erro ao deletar post: ${err.message}.`);
        }
    }, [setAllPosts]); 

    const handlePostLikeToggle = useCallback(async (postId, newLikedStatus, newLikesCount) => {
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

        const token = getAuthToken();
        if (!token || !usuarios.idUser) {
            alert("Você precisa estar logado para curtir um post.");
            setAllPosts(prevPosts =>
                prevPosts.map(post =>
                    post.id === postId
                        ? { ...post, likedByUser: !newLikedStatus, likesCount: newLikesCount + (newLikedStatus ? -1 : 1) }
                        : post
                )
            );
            if (selectedPost && selectedPost.id === postId) {
                setSelectedPost(prevSelectedPost => ({
                    ...prevSelectedPost,
                    likedByUser: !newLikedStatus,
                    likesCount: newLikesCount + (newLikedStatus ? -1 : 1),
                }));
            }
            return;
        }

        try {
            const method = 'POST'; 
            const endpoint = `${API_POSTS_URL}/${postId}/like`;
            const response = await fetch(endpoint, {
                method: method, 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ userId: usuarios.idUser })
            });

            if (!response.ok) {
                setAllPosts(prevPosts =>
                    prevPosts.map(post =>
                        post.id === postId
                            ? { ...post, likedByUser: !newLikedStatus, likesCount: newLikesCount + (newLikedStatus ? -1 : 1) }
                            : post
                    )
                );
                if (selectedPost && selectedPost.id === postId) {
                    setSelectedPost(prevSelectedPost => ({
                        ...prevSelectedPost,
                        likedByUser: !newLikedStatus,
                        likesCount: newLikesCount + (newLikedStatus ? -1 : 1),
                    }));
                }
                const errorText = await response.text();
                let errorMessage = `Erro ao ${newLikedStatus ? 'curtir' : 'descurtir'} post: ${response.status}`;
                try {
                    const errorJson = JSON.parse(errorText);
                    errorMessage = errorJson.message || errorMessage;
                } catch (parseError) { }
                throw new Error(errorMessage);
            }
            const updatedPost = await response.json();
            setAllPosts(prevPosts =>
                prevPosts.map(post =>
                    post.id === postId
                        ? { ...post, likedByUser: updatedPost.likedByUser, likesCount: updatedPost.likesCount }
                        : post
                )
            );
            if (selectedPost && selectedPost.id === postId) {
                setSelectedPost(prevSelectedPost => ({
                    ...prevSelectedPost,
                    likedByUser: updatedPost.likedByUser,
                    likesCount: updatedPost.likesCount,
                }));
            }

        } catch (err) {
            console.error(`Erro ao ${newLikedStatus ? 'curtir' : 'descurtir'} post:`, err);
            alert(`Erro ao ${newLikedStatus ? 'curtir' : 'descurtir'} post: ${err.message}`);
        }
    }, [selectedPost, usuarios.idUser, setAllPosts, setSelectedPost]);

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
            setPostComments(data.map(comment => ({
                ...comment,
                autor: comment.usuario || { idUser: comment.idUser, nameUser: 'Usuário Comentário', profilePic: imgProfile }
            })));
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
        if (!selectedPost || !selectedPost.id) {
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
                idPost: selectedPost.id,
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
                autor: newComment.usuario || { idUser: usuarios.idUser, nameUser: usuarios.nameUser || 'Usuário', profilePic: usuarios.profilePic || imgProfile }
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
    }, [commentContent, usuarios.idUser, usuarios.nameUser, usuarios.profilePic, selectedPost, setAllPosts, setSelectedPost]);

    useEffect(() => {
        console.log("useEffect principal acionado. usuarios.id:", usuarios.idUser, "Tipo:", typeof usuarios.idUser);

        if (usuarios.idUser && typeof usuarios.idUser === 'number') {
            fetchPosts();
            fetchCurrentUserFollowStats();
        } else {
            setLoadingPosts(false);
            setAllPosts([]);
            setCurrentUserFollowersCount(0);
            setCurrentUserFollowingCount(0);
            console.log("Usuário não logado ou ID inválido, posts e stats não serão carregados.");
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
            { id: 102, name: "Elise Moreira", username: "@Elise_Moreira", profilePic: "https://placehold.co/50x50/FF69B4/FFFFFF?text=Elise", followers: 50 },
            { id: 103, name: "Another User", username: "@AnotherUser", profilePic: "https://placehold.co/50x50/ADD8E6/FFFFFF?text=AU", followers: 120 },
            { id: 104, name: "Carlos Silva", username: "@carlos.s", profilePic: "https://placehold.co/50x50/FFD700/FFFFFF?text=CS", followers: 300 },
            { id: 105, name: "Maria Lima", username: "@mary_L", profilePic: "https://placehold.co/50x50/98FB98/FFFFFF?text=ML", followers: 80 },
        ].filter(sug => sug.id !== usuarios.idUser)
            .map(sug => {
                const isFollowing = allPosts.some(post => post.autor?.idUser === sug.id && post.isFollowingAuthor);
                return {
                    ...sug,
                    isFollowing: isFollowing,
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
        name: usuarios.nameUser || "Usuário",
        username: usuarios.emailUser || "@usuario",
        followers: currentUserFollowersCount,
        following: currentUserFollowingCount,
        profilePic: usuarios.profilePic || imgProfile
    };

    const getFilteredPosts = useCallback(() => {
        let filtered = allPosts;

        if (activeFeedTab === 'media') {
            filtered = allPosts.filter(post => post.autor && post.autor.idUser === usuarios.idUser);
        } else if (activeFeedTab === 'feed') {
            if (feedFilter === 'recent') {
                filtered = [...allPosts].sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao)); 
            } else if (feedFilter === 'friends') {
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
            {}
            {showDeleteConfirmModal && (
                <div className="modal-overlay">
                    <div className="modal-content delete-confirm-modal">
                        <h2>Confirmar Exclusão</h2>
                        <p>Tem certeza que deseja deletar este post? Esta ação não pode ser desfeita.</p>
                        <div className="buttons">
                            <button onClick={confirmDelete} className="confirm-btn">Deletar</button>
                            <button onClick={cancelDelete} className="cancel-btn">Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            {}
            {isCreatePostModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content create-post-modal">
                        <h2>Criar Nova Publicação</h2>
                        <div className="create-post-form">
                            <div className="user-info-header">
                                <img src={usuarios.profilePic || imgProfile} alt={usuarios.nameUser || 'Usuário'} className="user-avatar" />
                                <span>{usuarios.nameUser || 'Usuário'}</span>
                            </div>
                            <textarea
                                placeholder="O que você está pensando?"
                                value={conteudoPost}
                                onChange={(e) => setConteudoPost(e.target.value)}
                                rows="5"
                            ></textarea>
                            {postFormMessage && <p className="form-message">{postFormMessage}</p>}
                            <div className="form-actions">
                                <button onClick={criarNovoPostAPI} disabled={!conteudoPost.trim()}>Publicar</button>
                                <button onClick={() => setIsCreatePostModalOpen(false)}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {}
            {isFullPostModalOpen && selectedPost && (
                <div className="modal-overlay">
                    <div className="modal-content full-post-modal-content">
                        <div className="full-post-header">
                            <button className="close-button" onClick={closeFullPostModal}>X</button>
                            <h2>Publicação Completa</h2>
                        </div>
                        <div className="full-post-body">
                            <div className="post-item">
                                <div className="post-header">
                                    <img src={selectedPost.autor?.profilePic || imgProfile} alt={selectedPost.autor?.nameUser} className="profile-pic" />
                                    <div className="post-info">
                                        <div className="user-name">{selectedPost.autor?.nameUser}</div>
                                        <div className="username">{selectedPost.autor?.emailUser || `@${selectedPost.autor?.nameUser.replace(/\s/g, '').toLowerCase()}`}</div>
                                    </div>
                                    {}
                                    {selectedPost.autor?.idUser !== usuarios.idUser && (
                                        <button
                                            className={`follow-button ${selectedPost.isFollowingAuthor ? 'following' : ''}`}
                                            onClick={() => {
                                                if (selectedPost.autor && typeof selectedPost.autor.idUser === 'number') {
                                                    handleToggleFollow(selectedPost.autor.idUser, selectedPost.isFollowingAuthor);
                                                } else {
                                                    console.error("Erro: ID do autor do post selecionado inválido para seguir/deixar de seguir.", selectedPost.autor);
                                                    alert("Não foi possível seguir/deixar de seguir este usuário. ID inválido.");
                                                }
                                            }}
                                        >
                                            {selectedPost.isFollowingAuthor ? 'Seguindo' : 'Seguir'}
                                        </button>
                                    )}
                                </div>
                                <p className="post-content">{selectedPost.conteudo}</p>
                                <div className="post-actions">
                                    <button
                                        className={`like-button ${selectedPost.likedByUser ? 'liked' : ''}`}
                                        onClick={() => handlePostLikeToggle(selectedPost.id, !selectedPost.likedByUser, selectedPost.likesCount + (selectedPost.likedByUser ? -1 : 1))}
                                    >
                                        ❤️ {selectedPost.likesCount}
                                    </button>
                                    <button className="comment-button" onClick={() => openFullPostModal(selectedPost)}>
                                        💬 {selectedPost.commentsCount}
                                    </button>
                                    {selectedPost.autor?.idUser === usuarios.idUser && (
                                        <button onClick={() => handleDeleteClick(selectedPost.id)} className="delete-button">🗑️ Deletar</button>
                                    )}
                                </div>
                            </div>

                            <div className="comments-section">
                                <h3>Comentários</h3>
                                <div className="add-comment">
                                    <input
                                        type="text"
                                        placeholder="Adicionar um comentário..."
                                        value={commentContent}
                                        onChange={(e) => setCommentContent(e.target.value)}
                                    />
                                    <button onClick={handleAddComment} disabled={!commentContent.trim()}>Comentar</button>
                                </div>
                                {loadingComments && <p>Carregando comentários...</p>}
                                {errorComments && <p className="error-message">{errorComments}</p>}
                                <div className="comments-list">
                                    {postComments.length === 0 && !loadingComments && !errorComments && (
                                        <p className="no-comments">Nenhum comentário ainda. Seja o primeiro a comentar!</p>
                                    )}
                                    {postComments.map(comment => (
                                        <div key={comment.id} className="comment-item">
                                            <img src={comment.autor?.profilePic || imgProfile} alt={comment.autor?.nameUser} className="comment-avatar" />
                                            <div className="comment-content-wrapper">
                                                <div className="comment-author">{comment.autor?.nameUser}</div>
                                                <div className="comment-text">{comment.content}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="social-app-layout-main">
                <nav className="social-app-sidebar">
                    <div className="profile-card">
                        <img src={currentSidebarUser.profilePic} alt={currentSidebarUser.name} className="profile-pic" />
                        <div className="profile-info">
                            <h2 className="profile-name">{currentSidebarUser.name}</h2>
                            <span className="profile-username">{currentSidebarUser.username}</span>
                        </div>
                        <div className="profile-stats">
                            <span>{currentSidebarUser.following} Seguindo</span>
                            <span>{currentSidebarUser.followers} Seguidores</span>
                        </div>
                    </div>
                    <ul className="nav-links">
                        <li>
                            <a
                                href="#"
                                className={`nav-item ${activeFeedTab === 'newsFeed' ? 'active' : ''}`}
                                onClick={(e) => { e.preventDefault(); setIsCreatePostModalOpen(true); }}
                            >
                                Adicionar Publicação
                            </a>
                        </li>
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
                                className={`nav-item ${activeFeedTab === 'media' ? 'active' : ''}`}
                                onClick={(e) => { e.preventDefault(); setActiveFeedTab('media'); }}
                            >
                                Minhas publicações
                            </a>
                        </li>
                        <li><a href="#" className="nav-item">Configurações</a></li>
                    </ul>
                    <button onClick={fetchPosts} className="logout-button" style={{ marginBottom: '10px' }}>
                        Recarregar Posts
                    </button>
                    <Link className='link-button' to='/HomePage'><button className="logout-button" onClick={logout}>Sair</button></Link>
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
                            <div className="post-item" key={post.id}> {}
                                <div className="post-header">
                                    <img src={post.autor?.profilePic || imgProfile} alt={post.autor?.nameUser} className="profile-pic" />
                                    <div className="post-info">
                                        <div className="user-name">{post.autor?.nameUser}</div>
                                        <div className="username">{post.autor?.emailUser || `@${post.autor?.nameUser.replace(/\s/g, '').toLowerCase()}`}</div>
                                    </div>
                                    {}
                                    {post.autor?.idUser !== usuarios.idUser && (
                                        <button
                                            className={`follow-button ${post.isFollowingAuthor ? 'following' : ''}`}
                                            onClick={() => {
                                                if (post.autor && typeof post.autor.idUser === 'number') {
                                                    handleToggleFollow(post.autor.idUser, post.isFollowingAuthor);
                                                } else {
                                                    console.error("Erro: ID do autor do post inválido para seguir/deixar de seguir.", post.autor);
                                                    alert("Não foi possível seguir/deixar de seguir este usuário. ID inválido.");
                                                }
                                            }}
                                        >
                                            {post.isFollowingAuthor ? 'Seguindo' : 'Seguir'}
                                        </button>
                                    )}
                                </div>
                                <p className="post-content">{post.conteudo}</p>
                                <div className="post-actions">
                                    <button
                                        className={`like-button ${post.likedByUser ? 'liked' : ''}`}
                                        onClick={() => handlePostLikeToggle(post.id, !post.likedByUser, post.likesCount + (post.likedByUser ? -1 : 1))}
                                    >
                                        ❤️ {post.likesCount}
                                    </button>
                                    <button className="comment-button" onClick={() => openFullPostModal(post)}>
                                        💬 {post.commentsCount}
                                    </button>
                                    {post.autor?.idUser === usuarios.idUser && (
                                        <button onClick={() => handleDeleteClick(post.id)} className="delete-button">🗑️ Deletar</button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <aside className="social-app-right-sidebar">
                    <div className="right-sidebar-section">
                        <h3>Sugestões para seguir</h3>
                        <ul className="suggestions-list">
                            {suggestions.map(sug => (
                                <li key={sug.id} className="suggestion-item">
                                    <img src={sug.profilePic || "https://placehold.co/50x50/cccccc/000000?text=User"} alt={sug.name} />
                                    <div className="user-info">
                                        <div className="name">{sug.name}</div>
                                        <div className="username">{sug.username}</div>
                                    </div>
                                    {}
                                    {sug.id !== usuarios.idUser && (
                                        <button
                                            onClick={() => {
                                                if (typeof sug.id === 'number') {
                                                    handleToggleFollow(sug.id, sug.isFollowing);
                                                } else {
                                                    console.error("Erro: ID da sugestão inválido para seguir/deixar de seguir.", sug);
                                                    alert("Não foi possível seguir/deixar de seguir esta sugestão. ID inválido.");
                                                }
                                            }}
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

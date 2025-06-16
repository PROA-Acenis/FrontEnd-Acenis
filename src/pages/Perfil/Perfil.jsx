import React, { useEffect, useState } from 'react';
import styles from './Perfil.module.css';

// Importações de imagens
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

// URL base da sua API de posts
const API_BASE_URL = 'https://backend-acenis-production.up.railway.app/api/posts';

function Perfil() {
    // Estado para armazenar os dados do usuário logado do localStorage
    const [usuarios, setUsuarios] = useState(() => {
        const usuarioStorage = localStorage.getItem("usuarioLogado");
        console.log("1. (Inicialização) Conteúdo bruto do localStorage ('usuarioLogado'):", usuarioStorage);

        const parsedUser = usuarioStorage ? JSON.parse(usuarioStorage) : {};
        console.log("2. (Inicialização) Objeto JSON parseado do localStorage:", parsedUser);

        const userId = parsedUser.id ? parseInt(parsedUser.id, 10) : undefined;
        console.log("3. (Inicialização) ID do usuário processado (usuarios.id):", userId, "Tipo:", typeof userId);

        return {
            ...parsedUser,
            id: userId 
        };
    });

    // Estados para a UI
    const [mostrar, setMostrar] = useState(false);
    const [mostrarCam, setMostrarCam] = useState(false);
    const [mostrarChange, setMostrarChange] = useState(false);
    const [conteudoPost, setConteudoPost] = useState('');
    const [posts, setPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [errorPosts, setErrorPosts] = useState(null);
    const [postFormMessage, setPostFormMessage] = useState('');
    const [liked, setLiked] = useState(false); 
    const [likes, setLikes] = useState(0);     
    const [modal, setModal] = useState(false); // Modal para visualização de posts
    const [CommentsOfComments, setCommentsOfComments] = useState(false);

    // ADICIONADO: Estado para o modal de confirmação de deleção
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null); // Armazena o ID do post a ser deletado

    // --- FUNÇÕES DE CONSUMO DA API ---

    // Função assíncrona para buscar posts do usuário logado
    const fetchPosts = async () => {
        setLoadingPosts(true);
        setErrorPosts(null);

        console.log("4. (fetchPosts) Valor atual de usuarios.id antes da validação:", usuarios.id, "Tipo:", typeof usuarios.id);
        if (typeof usuarios.id !== 'number' || isNaN(usuarios.id)) {
            console.warn("ID do usuário não é um número válido ou não encontrado. Não foi possível buscar posts.");
            setLoadingPosts(false);
            setErrorPosts("ID do usuário não disponível ou inválido. Por favor, faça login novamente.");
            return;
        }

        try {
            const url = `${API_BASE_URL}/usuario/${usuarios.id}`;
            console.log("5. (fetchPosts) URL da requisição de posts:", url);
            const response = await fetch(url);
            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = `Erro HTTP! Status: ${response.status}`;
                try {
                    const errorJson = JSON.parse(errorText);
                    errorMessage = errorJson.message || errorMessage;
                } catch (parseError) {}
                throw new Error(errorMessage);
            }
            const data = await response.json();
            setPosts(data);
            console.log("6. (fetchPosts) Posts recebidos:", data);
        } catch (err) {
            console.error("Erro ao buscar posts:", err);
            setErrorPosts(`Erro ao carregar posts: ${err.message}. Tente novamente mais tarde.`);
        } finally {
            setLoadingPosts(false);
        }
    };

    // Função para criar um novo post via API
    const criarNovoPostAPI = async () => {
        console.log("8. (criarNovoPostAPI) Função foi chamada.");
        setPostFormMessage('');

        console.log("9. (criarNovoPostAPI) Conteúdo do post:", conteudoPost);
        if (conteudoPost.trim() === '') {
            setPostFormMessage('O conteúdo do post não pode estar vazio.');
            console.log("10. (criarNovoPostAPI) Validação de conteúdo falhou: Conteúdo vazio.");
            return;
        }

        console.log("11. (criarNovoPostAPI) Valor de usuarios.id para POST:", usuarios.id, "Tipo:", typeof usuarios.id);
        if (typeof usuarios.id !== 'number' || isNaN(usuarios.id)) {
            setPostFormMessage('Erro: ID do usuário logado não encontrado ou inválido. Por favor, faça login.');
            console.log("12. (criarNovoPostAPI) Validação de ID do usuário falhou: ID inválido.");
            return;
        }
        console.log("13. (criarNovoPostAPI) Todas as validações passaram. Preparando para fetch.");

        try {
            const postData = {
                idUser: usuarios.id, // O ID do usuário logado é enviado para o backend
                conteudo: conteudoPost
            };
            console.log("14. (criarNovoPostAPI) Dados a serem enviados:", postData);

            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });
            console.log("15. (criarNovoPostAPI) Requisição fetch enviada. Esperando resposta.");

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
                console.error("16. (criarNovoPostAPI) Resposta da API NÃO OK. Erro:", errorData);
                throw new Error(errorData.message || `Erro ao criar post! Status: ${response.status}`);
            }

            const novoPostCriado = await response.json();
            console.log("17. (criarNovoPostAPI) Post criado com sucesso:", novoPostCriado);
            
            const postComAutorCorreto = {
                ...novoPostCriado,
                autor: novoPostCriado.autor && novoPostCriado.autor.nameUser 
                    ? novoPostCriado.autor 
                    : { 
                        idUser: usuarios.id, 
                        nameUser: usuarios.name || 'Nome do Usuário', 
                        tipo: usuarios.tipo 
                    } 
            };
            setPosts(prevPosts => [postComAutorCorreto, ...prevPosts]); 
            setConteudoPost(''); 
            setPostFormMessage('Post publicado com sucesso!');
        } catch (err) {
            console.error("18. (criarNovoPostAPI) Erro no bloco try-catch:", err);
            setPostFormMessage(`Erro ao publicar post: ${err.message}`);
        }
    };

    // FUNÇÕES DO MODAL DE DELEÇÃO
    const handleDeleteClick = (postId) => {
        console.log("Tentativa de deletar post com ID:", postId);
        setPostToDelete(postId); // Armazena o ID do post a ser deletado
        setShowDeleteConfirmModal(true); // Exibe o modal de confirmação
    };

    const confirmDelete = async () => {
        console.log("Confirmação de deleção para post ID:", postToDelete);
        if (postToDelete) {
            await deletarPostAPI(postToDelete); // Chama a função de deleção real
        }
        setShowDeleteConfirmModal(false); // Fecha o modal
        setPostToDelete(null); // Limpa o ID do post
    };

    const cancelDelete = () => {
        console.log("Deleção cancelada.");
        setShowDeleteConfirmModal(false); // Fecha o modal
        setPostToDelete(null); // Limpa o ID do post
        setPostFormMessage(''); // Limpa mensagens de erro/sucesso anteriores
    };


    // Função real para deletar um post via API
    const deletarPostAPI = async (postId) => {
        console.log("Chamando deletarPostAPI para o ID:", postId);
        setPostFormMessage(''); 

        if (typeof postId !== 'number' || isNaN(postId)) {
            setPostFormMessage('Erro: ID do post inválido para deleção.');
            console.error("ID do post inválido:", postId);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = `Erro HTTP ao deletar! Status: ${response.status}`;
                try {
                    const errorJson = JSON.parse(errorText);
                    errorMessage = errorJson.message || errorMessage;
                } catch (parseError) {
                    console.error("Erro ao parsear resposta de erro:", parseError);
                }
                throw new Error(errorMessage);
            }

            setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
            setPostFormMessage('Post deletado com sucesso!');
            console.log("Post deletado com sucesso no frontend:", postId);
        } catch (err) {
            console.error("Erro ao deletar post via API:", err);
            setPostFormMessage(`Erro ao deletar post: ${err.message}.`);
        }
    };

    // --- useEffect para carregar posts ao montar o componente ---
    useEffect(() => {
        console.log("7. useEffect disparado. usuarios.id atual:", usuarios.id, "Tipo:", typeof usuarios.id);
        fetchPosts();
    }, [usuarios.id]);


    // --- FUNÇÕES DE UI (mantidas) ---
    const abrir = () => setMostrar(prev => !prev);
    const abrirCam = () => setMostrarCam(prev2 => !prev2);
    const abrirChange = () => setMostrarChange(prev3 => !prev3);
    const Curtiu = () => setLiked(prev => !prev);
    const Curtidas = () => {
        if (liked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setLiked(!liked);
    };
    const modalPubli = () => setModal(prev => !prev);
    const CommentsOf = () => setCommentsOfComments(prev => !prev);
    const Curti = () => {
        Curtiu();
        Curtidas();
    };

    return (
        <>
            <section className={styles.imgBanner}></section>
            <section className={styles.Profile}>
                {/* Modal de confirmação de deleção */}
                {showDeleteConfirmModal && (
                    <div className={styles.deleteConfirmModalOverlay}>
                        <div className={styles.deleteConfirmModal}>
                            <h3>Confirmar Deleção</h3>
                            <p>Tem certeza que deseja deletar este post?</p>
                            <div className={styles.modalActions}>
                                <button onClick={confirmDelete} className={styles.confirmDeleteButton}>Sim</button>
                                <button onClick={cancelDelete} className={styles.cancelDeleteButton}>Não</button>
                            </div>
                        </div>
                    </div>
                )}

                {mostrarChange && (
                    <div className={styles.ProfilePictureChange}>
                        {mostrarChange && <button onClick={abrirChange}><i className="bi bi-x"></i></button>}
                        <img className={styles.imgChange} src={imgProfile} alt="" />
                        <div className={styles.chooses}>
                            <p><img src={pen} alt="" />Editar</p>
                            <p><img src={cameraChange} alt="" />Adicionar</p>
                            <p><img src={trash} alt="" />Deletar</p>
                        </div>
                        <img className={styles.linhaBottom} src={linhaBottom} alt="" />
                        <img className={styles.florTop} src={florTop} alt="" />
                        <img className={styles.florleft} src={florLeft} alt="" />
                        <img className={styles.florRight} src={florRight} alt="" />
                    </div>
                )}
                <div className={styles.ProfileChange}>
                    <div className={styles.ProfilePicture}>
                        <img src={imgProfile} alt="" />
                    </div>
                    <div onClick={abrirCam} className={styles.ProfileCamera}>
                        <img src={camera} alt="" />
                    </div>
                    {mostrarCam && (
                        <div className={styles.ProfileCamChange}>
                            {!mostrarChange && <p onClick={abrirChange}> <img src={cameraChange} alt="" />Visualizar ou editar foto do perfil</p>}
                        </div>
                    )}
                </div>
                <div className={styles.ProfileName}>
                    <h1>{usuarios.name || 'Nome do Usuário'}</h1> 
                    {!mostrar && <button onClick={abrir}><i className="bi bi-chevron-down"></i></button>}
                    {mostrar && <button onClick={abrir}><i className="bi bi-chevron-up"></i></button>}
                </div>
                <hr className={styles.hrProfile} />
                {mostrar && (
                    <div className={styles.ProfileStatus}>
                        <div className={styles.ProfileDescription}>
                            <h2>Meu perfil</h2>
                            <textarea name="biografia" id="biografia" placeholder='Adicione uma biografia sua!'></textarea>
                        </div>
                        <div className={styles.ProfileFriends}>
                            <h2>Meus Amigos</h2>
                            <div className={styles.Friends}>
                                <div className={styles.FriendSection1}>
                                    <div><img src={amigo1} alt="" /><a href="#">@AnaJulia</a></div>
                                    <div><img src={amigo2} alt="" /><a href="#">@CarolG.</a></div>
                                    <div><img src={amigo3} alt="" /><a href="#">@RobertoS</a></div>
                                </div>
                                <div className={styles.FriendSection2}>
                                    <div><img src={amigo4} alt="" /><a href="#">@AlineSam.</a></div>
                                    <div><img src={amigo5} alt="" /><a href="#">@GiMidori</a></div>
                                    <div><img src={amigo6} alt="" /><a href="#">@Lionel Messi</a></div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.Advertisement}><h1>Advertise</h1></div>
                    </div>
                )}
                <div className={styles.Publication}>
                    <div className={styles.TextPublication}>
                        <img src={imgProfile} alt="" />
                        <input
                            type="text"
                            name="text"
                            id="textPublication"
                            placeholder='O que você está pensando?'
                            value={conteudoPost}
                            onChange={(e) => setConteudoPost(e.target.value)}
                        />
                    </div>
                    <div className={styles.ImagePublication}>
                        <p><img src={image} alt="" />Imagem</p>
                        <button onClick={criarNovoPostAPI}>Publicar</button>
                    </div>
                    {postFormMessage && (
                        <p className={
                            postFormMessage.includes('sucesso') ? styles.successMessage : styles.errorMessage
                        }>
                            {postFormMessage}
                        </p>
                    )}
                </div>

                <div className={styles.ProfileNameDesktop}>
                    <h1>{usuarios.name || 'Nome do Usuário'}</h1>
                </div>

                <div className={styles.ProfileStatusDesktop}>
                    <h2>Meu Perfil</h2>
                    <textarea name="" placeholder='Adicione uma biografia sua!' id=""></textarea>

                    <h2>Meus amigos</h2>
                    <div className={styles.ProfileFriendsDesktop}>
                        <div className={styles.Friends1Desktop}>
                            <div><img src={amigo1} alt="" /><a href="#">@Lionel Messi</a></div>
                            <div><img src={amigo2} alt="" /><a href="#">@Lionel Messi</a></div>
                            <div><img src={amigo3} alt="" /><a href="#">@Lionel Messi</a></div>
                        </div>
                        <div className={styles.Friends2Desktop}>
                            <div><img src={amigo4} alt="" /><a href="#">@AlineSam.</a></div>
                            <div><img src={amigo5} alt="" /><a href="#">@GiMidori</a></div>
                            <div><img src={amigo6} alt="" /><a href="#">@Lionel Messi</a></div>
                        </div>
                    </div>
                </div>
                <div className={styles.publicationdesktop}>
                    <div className={styles.publicationdesktoptext}>
                        <img src={imgProfile} alt="" />
                        <input
                            type="text"
                            placeholder='O que você está pensando?'
                            value={conteudoPost}
                            onChange={(e) => setConteudoPost(e.target.value)}
                        />
                        <button onClick={criarNovoPostAPI}>Publicar</button>
                    </div>
                    <div className={styles.publicationdesktopimage}>
                        <p><img src={image} style={{ width: '3vw' }} alt="" />Imagem</p>
                    </div>
                </div>
            </section>
            <section className={styles.Posts}>
                <h2>Minhas Postagens</h2>
                {modal && (
                    <div className={styles.ModalPublication}>
                        <div className={styles.back}>
                            {modal && <button onClick={modalPubli}><i className="bi bi-chevron-left"></i></button>}
                            <h1>Publicação</h1>
                        </div>
                        <div className={styles.ProfileName}>
                            <h1>{usuarios.name || 'Nome do Usuário'}</h1>
                            <a href="#">@EliMoreira</a>
                        </div>
                        <div className={styles.PublicationContent}>
                            <p>Qual a melhor forma de as mães de crianças com síndrome de Down aproveitarem vídeos educativos ou de entretenimento para seus filhos?</p>
                        </div>
                        <div className={styles.Comment}>
                            <img src={imgProfile} alt="" />
                            <input type="text" name="" id="" placeholder='Comentando...' />
                        </div>
                        <button className={styles.btnComment}>Comentar</button>
                        <hr className={styles.hrPost} />
                        <div className={styles.CommentAnother}>
                            <div className={styles.ProfileAnother}>
                                <img src={amigo1} alt="" />
                                <h1>Angela Arden</h1>
                                <a href="#">@AngeArden</a>
                            </div>
                            <div className={styles.CommentsContent}>
                                <p>
                                    Julia, sim! Quanto mais entendemos as necessidades específicas deles, mais conseguimos ajudar. A comunicação pode ser aprimorada com recursos visuais, linguagem simples e muita interação favorecendo o aprendizado.
                                </p>
                            </div>
                            <a className={styles.CommentsOfComments} href="#" onClick={(e) => { e.preventDefault(); CommentsOf(); }}>Exibir todas as 7 respostas.</a>
                            {CommentsOfComments && (
                                <div className={styles.CommentsOfCommentsContent}>
                                    <div className={styles.ProfileAnotherComement}>
                                        <img src={amigo2} alt="" />
                                        <h1>Olivia Vigueira</h1>
                                        <a href="#">@OliGueira</a>
                                    </div>
                                    <div className={styles.CommentsAnotherContent}>
                                        <p>
                                            Julia, sim! Quanto mais entendemos as necessidades específicas deles, mais conseguimos ajudar. A comunicação pode ser aprimorada com recursos visuais, linguagem simples e muita interação favorecendo o aprendizado.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Mensagens de Carregamento e Erro para os Posts */}
                {loadingPosts && <p className={styles.loadingMessage}>Carregando posts...</p>}
                {errorPosts && <p className={styles.errorMessage}>{errorPosts}</p>}

                {/* Exibição dinâmica dos Posts */}
                {!loadingPosts && !errorPosts && posts.length === 0 && (
                    <p className={styles.noPostsMessage}>Nenhum post encontrado. Que tal criar o primeiro?</p>
                )}

                {posts.map(post => (
                    <div key={post.id} className={styles.Post}>
                        <div className={styles.PostName}>
                            <img src={imgProfile} alt="" />
                            <h1>{post.autor ? post.autor.nameUser : 'Usuário Desconhecido'}</h1>
                            <a href="#">@{post.autor ? (post.autor.emailUser || post.autor.nameUser) : 'usuario'}</a> 
                        </div>
                        <div onClick={modalPubli} className={styles.PostContent}>
                            {post.conteudo}
                        </div>
                        <div className={styles.LikesAndComments}>
                            <div className={styles.btnLikes}>
                                <button onClick={Curti}><i className={liked ? "bi bi-heart-fill" : "bi bi-heart"}></i></button>
                                <span>{likes}</span>
                            </div>
                            <div className={styles.btnComments}>
                                <button><i className="bi bi-chat-text"></i></button>
                                <span>12</span>
                            </div>
                        </div>
                        {/* Botão de Deletar Post: APENAS se o post foi feito pelo usuário logado */}
                        {post.autor && post.autor.idUser === usuarios.id && ( 
                            <button 
                                onClick={() => handleDeleteClick(post.id)} // ALTERADO: Chama a nova função handleDeleteClick
                                className={styles.deleteButton} 
                            >
                                <img src={trash} alt="Deletar" className={styles.deleteIcon}/> 
                                Deletar Post
                            </button>
                        )}
                        <a onClick={modalPubli} className={styles.AllComments} href="#">Ver todos os comentários</a>
                    </div>
                ))}
            </section>
        </>
    );
}

export default Perfil;

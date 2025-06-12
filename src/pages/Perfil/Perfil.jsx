import styles from './Perfil.module.css'
import imgProfile from '../../assets/imgs/img-perfil/imgMae.jpeg'
import camera from '../../assets/imgs/img-perfil/camera.png'
import cameraChange from '../../assets/imgs/img-perfil/cameraChange.png'
import pen from '../../assets/imgs/img-perfil/Pen.png'
import trash from '../../assets/imgs/img-perfil/trash.png'
import image from '../../assets/imgs/img-perfil/Image.png'
import amigo1 from '../../assets/imgs/img-perfil/amigos/amigo1.jpeg'
import amigo2 from '../../assets/imgs/img-perfil/amigos/amigo2.jpg'
import amigo3 from '../../assets/imgs/img-perfil/amigos/amigo3.jpg'
import amigo4 from '../../assets/imgs/img-perfil/amigos/amigo4.jpeg'
import amigo5 from '../../assets/imgs/img-perfil/amigos/amigo5.jpg'
import amigo6 from '../../assets/imgs/img-perfil/amigos/amigo6.jpeg'
import linhaBottom from '../../assets/imgs/img-perfil/florRosa/linhaBottom.png'
import florLeft from '../../assets/imgs/img-perfil/florRosa/florLeft.png'
import florTop from '../../assets/imgs/img-perfil/florRosa/florTop.png'
import florRight from '../../assets/imgs/img-perfil/florRosa/florRight.png'
import { useState } from 'react';


function Perfil() {

    const [mostrar, setMostrar] = useState(false)
    const [mostrarCam, setMostrarCam] = useState(false)
    const [mostrarChange, setMostrarChange] = useState(false)

    const abrir = () => {
        setMostrar(prev => !prev);
    }
    const abrirCam = () => {
        setMostrarCam(prev2 => !prev2);
    }
    const abrirChange = () => {
        setMostrarChange(prev3 => !prev3);
    }

    const [liked, setLiked] = useState(false)
    const [likes, setLikes] = useState(0)
    const [modal, setModal] = useState(false)
    const [CommentsOfComments, setCommentsOfComments] = useState(false)

    const Curtiu = () => {
        setLiked(prev => !prev);
    }

    const Curtidas = () => {
        if (liked) {
            setLikes (likes - 1)
        } else {
            setLikes (likes + 1)
        }
        setLiked(!liked)
    }

    const modalPubli = () => {
        setModal(prev => !prev)
    }
    
    const CommentsOf = () => {
        setCommentsOfComments(prev => !prev)
    }

    const Curti = () => {
        Curtiu();
        Curtidas();
    }

  return (
    <>
        <section className={styles.imgBanner}>
            
        </section>
        <section className={styles.Profile}>
            {mostrarChange && <div className={styles.ProfilePictureChange}>
                {mostrarChange && <button onClick={abrirChange}><i class="bi bi-x"></i></button>}
                <img className={styles.imgChange} src={imgProfile} alt="" />
                <div className={styles.chooses}>
                    <p><img src={pen} alt="" />Editar</p>
                    <p><img src={cameraChange} alt="" />Adicionar</p>
                    <p><img src={trash} alt="" />Delete</p>
                </div>
                <img className={styles.linhaBottom} src={linhaBottom} alt="" />
                <img className={styles.florTop} src={florTop} alt="" />
                <img className={styles.florleft} src={florLeft} alt="" />
                <img className={styles.florRight} src={florRight} alt="" />
            </div>}
            <div className={styles.ProfileChange}>
                <div className={styles.ProfilePicture}>
                    <img src={imgProfile} alt="" />
                </div>
                <div onClick={abrirCam} className={styles.ProfileCamera}>
                    <img src={camera} alt="" />
                </div>
                {mostrarCam && <div className={styles.ProfileCamChange}>
                    {!mostrarChange && <p onClick={abrirChange}> <img src={cameraChange} alt="" />Visualizar ou editar foto do perfil</p>}
                </div>}
            </div>
            <div className={styles.ProfileName}>
                <h1>Elisa Moreira</h1>
                {!mostrar && <button onClick={abrir}><i className="bi bi-chevron-down"></i></button>}
                {mostrar && <button onClick={abrir}><i className="bi bi-chevron-up"></i></button>}
            </div>
            <hr className={styles.hrProfile} />
            {mostrar && <div className={styles.ProfileStatus}>
                <div className={styles.ProfileDescription}>
                    <h2>Meu perfil</h2>
                    <textarea name="biografia" id="biografia" placeholder='Adicione uma biografia sua!'></textarea>
                </div>
                <div className={styles.ProfileFriends}>
                    <h2>Meus Amigos</h2>
                    <div className={styles.Friends}>
                        <div className={styles.FriendSection1}>
                            <div>
                                <img src={amigo1} alt="" />
                                <a href="#">@AnaJulia</a>
                            </div>
                            <div>
                                <img src={amigo2} alt="" />
                                <a href="#">@CarolG.</a>
                            </div>
                            <div>
                                <img src={amigo3} alt="" />
                                <a href="#">@RobertoS</a>
                            </div>
                        </div>
                        <div className={styles.FriendSection2}>
                            <div>
                                <img src={amigo4} alt="" />
                                <a href="#">@AlineSam.</a>
                            </div>
                            <div>
                                <img src={amigo5} alt="" />
                                <a href="#">@GiMidori</a>
                            </div>
                            <div>
                                <img src={amigo6} alt="" />
                                <a href="#">@Lionel Messi</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.Advertisement}>
                    <h1>Advertise</h1>
                </div>
            </div>}
            <div className={styles.Publication}>
                <div className={styles.TextPublication}>
                    <img src={imgProfile} alt="" />
                    <input type="text" name="text" id="textPublication" placeholder='O que você está pensando?' />
                </div>
                <div className={styles.ImagePublication}>
                    <p><img src={image} alt="" />Imagem</p>
                    <button>Publicar</button>
                </div>
            </div>

            <div className={styles.ProfileNameDesktop}>
                <h1>Elise Moreira</h1>
            </div>

            <div className={styles.ProfileStatusDesktop}>
                <h2>Meu Perfil</h2>
                <textarea name="" placeholder='Adicione uma biografia sua!' id=""></textarea>

                <h2>Meus amigos</h2>
                <div className={styles.ProfileFriendsDesktop}>
                    <div className={styles.Friends1Desktop}>
                        <div>
                            <img src={amigo1} alt="" />
                            <a href="#">@Lionel Messi</a>
                        </div>
                        <div>
                            <img src={amigo2} alt="" />
                            <a href="#">@Lionel Messi</a>
                        </div>
                        <div>
                            <img src={amigo3} alt="" />
                            <a href="#">@Lionel Messi</a>
                        </div>
                    </div>
                    <div className={styles.Friends2Desktop}>
                        <div>
                            <img src={amigo4} alt="" />
                            <a href="#">@Lionel Messi</a>
                        </div>
                        <div>
                            <img src={amigo5} alt="" />
                            <a href="#">@Lionel Messi</a>
                        </div>
                        <div>
                            <img src={amigo6} alt="" />
                            <a href="#">@Lionel Messi</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.publicationdesktop}>
                <div className={styles.publicationdesktoptext}>
                    <img src={imgProfile} alt="" />
                    <input type="text" placeholder='O que você está pensando?' />
                    <button>Publicar</button>
                </div>
                <div className={styles.publicationdesktopimage}>
                    <p><img src={image} style={{
                        width: '3vw'
                    }} alt="" />Imagem</p>
                </div>
            </div>
        </section>
        <section className={styles.Posts}>
            <h2>Minhas Postagens</h2>
            {modal && <div className={styles.ModalPublication}>
                <div className={styles.back}>
                    {modal && <button onClick={modalPubli}><i class="bi bi-chevron-left"></i></button>}
                    <h1>Publicação</h1>
                </div>
                <div className={styles.ProfileName}>
                    <h1>Elise Moreira</h1>
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
                    {CommentsOfComments && <div className={styles.CommentsOfCommentsContent}>
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
                    </div>}
                </div>
            </div>}
            <div className={styles.Post}>
                <div className={styles.PostName}>
                    <img src={imgProfile} alt="" />
                    <h1>Elise Moreira</h1>
                    <a href="#">@EliMoreira</a>
                </div>
                <div onClick={modalPubli} className={styles.PostContent}>
                    Qual a melhor forma de as mães de crianças com síndrome de Down aproveitarem vídeos educativos ou de entretenimento para seus filhos?
                </div>
                <div className={styles.LikesAndComments}>
                    <div className={styles.btnLikes}>
                        <button onClick={Curti}><i className={liked ? "bi bi-heart-fill" : "bi bi-heart"}></i></button>
                        <span>{likes}</span>
                    </div>
                    
                    <div className={styles.btnComments}>
                        <button><i class="bi bi-chat-text"></i></button>
                        <span>12</span>
                    </div>
                </div>
                <a onClick={modalPubli} className={styles.AllComments} href="#">Ver todos os comentários</a>
            </div>
            <div className={styles.Post2}>
                <div className={styles.PostName}>
                    <img src={imgProfile} alt="" />
                    <h1>Elise Moreira</h1>
                    <a href="#">@EliMoreira</a>
                </div>
                <div className={styles.PostContent}>
                    <p>
                        Acabei de começar a entender melhor as necessidades do meu filho com síndrome de Down e os resultados dos tratamentos foram positivos.
                        ✅ Quais são as melhores práticas para estimular o desenvolvimento do meu filho com síndrome de Down?✅ Como posso melhorar a comunicação e o aprendizado do meu filho com essa condição?
                    </p>
                </div>
                <div className={styles.LikesAndComments}>
                    <div className={styles.btnLikes}>
                        <button onClick={Curti}><i className={liked ? "bi bi-heart-fill" : "bi bi-heart"}></i></button>
                        <span>{likes}</span>
                    </div>
                    
                    <div className={styles.btnComments}>
                        <button><i class="bi bi-chat-text"></i></button>
                        <span>0</span>
                    </div>
                </div>
                <a className={styles.AllComments} href="#">Ver todos os comentários</a>
            </div>
        </section>
    </>
  )
}

export default Perfil;
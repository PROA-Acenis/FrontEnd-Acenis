// src/components/ProfilePage.js ou src/pages/ProfilePage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Para pegar o nome da boneca da URL
import './ProfilePage.css'; // Para deixar o desenho bonito (CSS)

function ProfilePage() {
    const { username } = useParams(); // Pega o nome da boneca (ex: "pedrinho") da URL

    const [profile, setProfile] = useState(null); // Aqui guardaremos os dados da boneca
    const [posts, setPosts] = useState([]); // Aqui guardaremos as anotações da boneca
    const [loading, setLoading] = useState(true); // Para saber se ainda estamos esperando o Mágico
    const [error, setError] = useState(null); // Para saber se algo deu errado

    // Esta parte é como dizer: "Quando o nome da boneca na URL mudar, ou a página carregar, vá pedir ao Mágico!"
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                setLoading(true); // Começamos a esperar
                setError(null); // Limpamos erros anteriores

                // Mágica! Pedindo ao Mágico do Spring Boot:
                const response = await fetch(`http://localhost:8080/api/profiles/${username}`);

                // Se o Mágico não achou, avise!
                if (!response.ok) {
                    throw new Error(`Não foi possível encontrar o perfil de ${username}.`);
                }

                const data = await response.json(); // Pegue o pacote que o Mágico enviou (JSON)

                setProfile(data.user); // Coloque a boneca no nosso desenho
                setPosts(data.posts);   // Coloque as anotações da boneca no nosso desenho
            } catch (err) {
                setError(err.message); // Ops, deu erro!
            } finally {
                setLoading(false); // Paramos de esperar
            }
        };

        fetchProfileData(); // Chame a função para pedir os dados
    }, [username]); // Se o `username` mudar na URL, ele executa de novo!

    if (loading) {
        return <div className="profile-loading">Carregando perfil...</div>; // Enquanto espera, mostre "Carregando..."
    }

    if (error) {
        return <div className="profile-error">Erro: {error}</div>; // Se deu erro, mostre o erro
    }

    if (!profile) {
        return <div className="profile-not-found">Perfil não encontrado.</div>; // Se não tem perfil (e não deu erro), é porque não achou
    }

    return (
        <div className="profile-container">
            {/* Parte de Cima: Informações da Boneca */}
            <div className="profile-header">
                <img
                    src={profile.profilePicUrl || 'default-profile.png'} // Se não tiver foto, use uma padrão
                    alt={`Foto de perfil de ${profile.username}`}
                    className="profile-picture"
                />
                <h1 className="profile-username">@{profile.username}</h1>
                <p className="profile-bio">{profile.bio}</p>
                <div className="profile-stats">
                    <span><strong>{profile.followersCount || 0}</strong> Seguidores</span>
                    <span><strong>{profile.followingCount || 0}</strong> Seguindo</span>
                    <span><strong>{posts.length}</strong> Publicações</span>
                </div>
                {/* Botão de Seguir/Deixar de Seguir (você adicionaria a lógica aqui) */}
                <button className="profile-follow-button">Seguir</button>
            </div>

            <hr /> {/* Uma linha para separar */}

            {/* Parte de Baixo: Anotações da Boneca (Publicações) */}
            <div className="profile-posts">
                <h2>Publicações</h2>
                {posts.length > 0 ? (
                    posts.map(post => (
                        <div key={post.id} className="post-item">
                            <p className="post-content">{post.content}</p>
                            <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
                            {/* Você pode adicionar botões de Curtir/Comentar aqui */}
                        </div>
                    ))
                ) : (
                    <p>Nenhuma publicação ainda.</p>
                )}
            </div>
        </div>
    );
}

export default ProfilePage;
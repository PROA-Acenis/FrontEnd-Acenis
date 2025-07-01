import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../homeloja/loja.module.css";

// Imports de imagens
import ursoImg from "../../assets/imgs/img-loja/urso.png";
import caixaImg from "../../assets/imgs/img-loja/caixa.png";
import mulher1 from "../../assets/imgs/img-loja/mulher1.jpg";
import homem1 from "../../assets/imgs/img-loja/homem1.jpg";
import mulher2 from "../../assets/imgs/img-loja/mulher2.jpg";
import homem2 from "../../assets/imgs/img-loja/homem2.jpg";
import mulher3 from "../../assets/imgs/img-loja/mulher3.jpg";
import homem3 from "../../assets/imgs/img-loja/homem3.jpg";
import mulher4 from "../../assets/imgs/img-loja/mulher4.jpg";
import homem4 from "../../assets/imgs/img-loja/homem4.jpg";
import quebra1 from "../../assets/imgs/img-loja/quebra1.jpg";
import livro from "../../assets/imgs/img-loja/livro.jpg";
import formas from "../../assets/imgs/img-loja/formas.jpg";
import matematica from "../../assets/imgs/img-loja/matematica.jpg";
import memoria from "../../assets/imgs/img-loja/memoria.png";
import quebra2 from "../../assets/imgs/img-loja/quebra2.png";

export default function LojaAcenis() {
  const navigate = useNavigate();
  const [depoimentoAtivo, setDepoimentoAtivo] = useState(0);

  const depoimentos = [
    { nome: "Ana Souza", cidade: "São Paulo - SP", estrelas: 5, texto: "A loja é maravilhosa, os brinquedos são muito educativos e meu filho amou cada item. Parabéns pela proposta!", imagem: mulher1 },
    { nome: "Carlos Lima", cidade: "Recife - PE", estrelas: 4, texto: "Achei a curadoria dos produtos muito sensível. O livro que comprei ajudou muito na alfabetização da minha filha!", imagem: homem1 },
    { nome: "Juliana Martins", cidade: "Belo Horizonte - MG", estrelas: 5, texto: "Os brinquedos são incríveis! Minha filha com SD está super engajada com os jogos de formas e cores.", imagem: mulher2 },
    { nome: "Rafael Torres", cidade: "Porto Alegre - RS", estrelas: 3, texto: "Gostei dos produtos, mas a entrega demorou um pouco mais do que o esperado. No geral, boa experiência.", imagem: homem2 },
    { nome: "Patrícia Oliveira", cidade: "Salvador - BA", estrelas: 5, texto: "A proposta da loja é linda! Tudo muito bem pensado para o desenvolvimento das nossas crianças. Voltarei a comprar!", imagem: mulher3 },
    { nome: "Eduardo Nunes", cidade: "Curitiba - PR", estrelas: 4, texto: "Gostei muito dos livros didáticos. Didáticos e acessíveis. Minha sobrinha está adorando!", imagem: homem3 },
    { nome: "Fernanda Ribeiro", cidade: "Fortaleza - CE", estrelas: 5, texto: "Estou encantada com os brinquedos! Tudo com qualidade, cores vibrantes e muita utilidade no dia a dia.", imagem: mulher4 },
    { nome: "Lucas Ferreira", cidade: "Brasília - DF", estrelas: 4, texto: "Muito bom encontrar uma loja que pensa com tanto carinho nas crianças com SD. Faltam mais iniciativas assim!", imagem: homem4 },
  ];

  const produtos = [
    {
      id: 1,
      nome: "Quebra Cabeça - A Noite Estrelada - 1000 Peças",
      preco: 58.99,
      parcela: "3x de R$ 19,66",
      estrelas: "⭐⭐⭐⭐☆",
      vendedor: "RiHappy",
      imagem: quebra1,
      descricao: "Desenvolve coordenação, foco e paciência de forma divertida.",
    },
    {
      id: 2,
      nome: "Livro Didático Eletrônico - Português Inglês",
      preco: 79.9,
      parcela: "2x de R$ 39,95",
      estrelas: "⭐⭐⭐⭐⭐",
      vendedor: "MagazineLuiza",
      imagem: livro,
      descricao: "Aprendizado bilíngue interativo e lúdico.",
    },
    {
      id: 3,
      nome: "Brinquedo Educativo - Formas Geométricas",
      preco: 42.41,
      parcela: "2x de R$ 21,20",
      estrelas: "⭐⭐⭐⭐☆",
      vendedor: "MercadoLivre",
      imagem: formas,
      descricao: "Ajuda no reconhecimento de formas e coordenação motora.",
    },
    {
      id: 4,
      nome: "Jogo Tabuada - Matemática Divertida",
      preco: 39.9,
      parcela: "2x de R$ 19,95",
      estrelas: "⭐⭐⭐⭐⭐",
      vendedor: "Amazon",
      imagem: matematica,
      descricao: "Aprenda matemática com jogos de multiplicação e divisão.",
    },
    {
      id: 5,
      nome: "Jogo da Memória Animais - 40 Peças",
      preco: 37.9,
      parcela: "2x de R$ 18,95",
      estrelas: "⭐⭐⭐⭐⭐",
      vendedor: "MercadoLivre",
      imagem: memoria,
      descricao: "Fortalece memória visual com imagens de animais.",
    },
    {
      id: 6,
      nome: "Quebra Cabeça Turma da Mônica - 48 Peças",
      preco: 86.99,
      parcela: "2x de R$ 43,49",
      estrelas: "⭐⭐⭐⭐☆",
      vendedor: "Americanas",
      imagem: quebra2,
      descricao: "Estimula a resolução de problemas e interação com personagens.",
    },
  ];

  const acessarProduto = (produto) => {
    navigate(`/produto/${produto.id}`, { state: { produto } });
  };

  useEffect(() => {
    const intervalo = setInterval(() => {
      setDepoimentoAtivo((prev) => (prev + 1) % depoimentos.length);
    }, 4000);
    return () => clearInterval(intervalo);
  }, [depoimentos.length]);

  return (
    <div className={styles.lojaContainer}>
      {/* Banner */}
      <section className={styles.bannerSection}>
        <div className={styles.bannerOverlay}>
          <div className={styles.bannerContent}>
            <span className={styles.bannerWelcome}>BOAS-VINDAS À LOJA ACENIS!</span>
            <h1 className={styles.bannerTitle}>
              Brinquedos e livros pensados para <br />
              crianças com síndrome de Down
            </h1>
            <p className={styles.bannerSubtitle}>
              Itens que estimulam o desenvolvimento, a <br />
              criatividade e a diversão de forma inclusiva e <br />
              carinhosa.
            </p>
          </div>
        </div>

        <div className={styles.bannerCards}>
          <div className={styles.bannerCard}>
            <div className={styles.cardIcon}>
              <img src={ursoImg} alt="Urso" />
            </div>
            <p className={styles.cardTitle}>
              Itens selecionados para estimular o desenvolvimento.
            </p>
          </div>
          <div className={styles.bannerCard}>
            <div className={styles.cardIcon}>
              <img src={caixaImg} alt="Caixa" />
            </div>
            <p className={styles.cardTitle}>
              Categorias para todas as idades e fases.
            </p>
          </div>
        </div>
      </section>

      {/* Produtos */}
      <section className={styles.produtosSection}>
        <h2 className={styles.produtosTitulo}>LOJA ACENIS</h2>
        <p className={styles.produtosSubtitulo}>
          Aqui você encontra produtos especialmente selecionados para o desenvolvimento e bem-estar dos pequenos.
        </p>

        <div className={styles.filtros}>
          <button className={styles.filtroAtivo}>Todos os Produtos</button>
          <button className={styles.filtro}>Brinquedos</button>
          <button className={styles.filtro}>Livros</button>
          <button className={styles.filtro}>Camisetas</button>
        </div>

        <div className={styles.produtosGrid}>
          {produtos.map((produto) => (
            <div
              key={produto.id}
              className={styles.cardProduto}
              onClick={() => acessarProduto(produto)}
              style={{ cursor: "pointer" }}
            >
              <img src={produto.imagem} alt={produto.nome} className={styles.produtoImagem} />
              <h3 className={styles.produtoNome}>{produto.nome}</h3>
              <div className={styles.estrelas}>{produto.estrelas}</div>
              <p className={styles.produtoPreco}>R$ {produto.preco.toFixed(2)}</p>
              <p className={styles.produtoParcela}>ou {produto.parcela}</p>
              <p className={styles.produtoVendedor}>
                <span className={styles.verificadoIcon}>✔</span> vendido por {produto.vendedor}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.bannerFeedback}></div>

      {/* Feedbacks */}
      <section className={styles.feedbackSection}>
        <h2 className={styles.feedbackTitulo}>Feedbacks</h2>

        <div className={styles.feedbackWrapper}>
          <div className={styles.feedbackCard}>
            <div className={styles.feedbackCardHeader}>
              <div className={styles.fotoCliente}>
                <img src={depoimentos[depoimentoAtivo].imagem} alt={depoimentos[depoimentoAtivo].nome} />
              </div>
              <div className={styles.feedbackInfo}>
                <p className={styles.nomeCliente}>{depoimentos[depoimentoAtivo].nome}</p>
                <div className={styles.estrelas}>
                  {"⭐".repeat(depoimentos[depoimentoAtivo].estrelas)}
                </div>
              </div>
              <div className={styles.cidadeCliente}>{depoimentos[depoimentoAtivo].cidade}</div>
            </div>
            <p className={styles.depoimento}>{depoimentos[depoimentoAtivo].texto}</p>
          </div>

          <div className={styles.bolinhas}>
            {depoimentos.map((_, index) => (
              <span
                key={index}
                onClick={() => setDepoimentoAtivo(index)}
                className={`${styles.bolinha} ${depoimentoAtivo === index ? styles.ativa : ""}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
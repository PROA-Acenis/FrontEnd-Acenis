import { useState, useEffect } from "react";
import macaco from '../../assets/imgs/img-memozoo/macaco.png'
import personagem from '../../assets/imgs/img-memozoo/personagem.png'
import mato from '../../assets/imgs/img-memozoo/mato.png'
import panda from '../../assets/imgs/img-memozoo/panda.png'
import tigre from '../../assets/imgs/img-memozoo/tigre.png'
import nivel1 from '../../assets/imgs/img-memozoo/nivel1.png'
import nivel2 from '../../assets/imgs/img-memozoo/nivel2.png'
import nivel3 from '../../assets/imgs/img-memozoo/nivel3.png'
import nivel1q1 from '../../assets/imgs/img-memozoo/nivel1q1.png'
import nivel1q2 from '../../assets/imgs/img-memozoo/nivel1q2.png'
import nivel1q3 from '../../assets/imgs/img-memozoo/nivel1q3.png'
import nivel1q4 from '../../assets/imgs/img-memozoo/nivel1q4.png'
import carImage from '../../assets/imgs/img-memozoo/car.png'; 

 import nivel2q1 from '../../assets/imgs/img-memozoo/nivel2q1.png';
 import nivel2q2 from '../../assets/imgs/img-memozoo/nivel2q2.png';
 import nivel2q3 from '../../assets/imgs/img-memozoo/nivel2q3.png';
 import nivel2q4 from '../../assets/imgs/img-memozoo/nivel2q4.png';
 import nivel3q1 from '../../assets/imgs/img-memozoo/nivel3q1.png';
 import nivel3q2 from '../../assets/imgs/img-memozoo/nivel3q2.png';
 import nivel3q3 from '../../assets/imgs/img-memozoo/nivel3q3.png';
 import nivel3q4 from '../../assets/imgs/img-memozoo/nivel3q4.png';

import '../Memozoo/Memozoo.css';

const images = {
  facil: [
    {
      src: nivel1q1,
      pergunta: "Quantos carros havia na imagem?",
      opcoes: ["2 carros", "4 carros", "3 carros", "1 carro"],
      correta: "3 carros",
    },
    {
      src: nivel1q2,
      pergunta: "Quantos patinhos amarelos estão no lago?",
      opcoes: ["2 patos", "5 patos", "1 pato", "3 patos"],
      correta: "1 pato",
    },
    {
      src: nivel1q3,
      pergunta: "Quantos tigres aparecem na imagem?",
      opcoes: ["2 tigres", "4 tigres", "1 tigre", "3 tigres"],
      correta: "2 tigres",
    },
    {
      src: nivel1q4,
      pergunta: "Quantas girafas estão no cercado?",
      opcoes: ["1 girafa", "3 girafas", "5 girafas", "2 girafas"],
      correta: "2 girafas",
    },
  ],
  medio: [
    {
      src: nivel2q1,
      pergunta: "Qual animal está dentro da água?",
      opcoes: ["Leão", "Pinguim", "Elefante", "Patinho"],
      correta: "Patinho",
    },
    {
      src: nivel2q2,
      pergunta: "Quantas crianças estão caminhando na imagem?",
      opcoes: ["3 crianças", "4 crianças", "2 crianças", "5 crianças"],
      correta: "3 crianças",
    },
    {
      src: nivel2q3,
      pergunta: "Quantos animais com listras aparecem na imagem?",
      opcoes: ["1 animal", "2 animais", "4 animais", "3 animais"],
      correta: "2 animais",
    },
    {
      src: nivel2q4,
      pergunta: "Quantos carros estão na rua?",
      opcoes: ["4 carros", "6 carros", "5 carros", "3 carros"],
      correta: "3 carros",
    },
  ],
  dificil: [
    {
      src: nivel3q1, 
      pergunta: "Qual animal está mais próximo do cercado onde está o elefante",
      opcoes: ["Macaco", "Girafa", "Tartaruga", "Flamingo"],
      correta: "Tartaruga",
    },
    {
      src: nivel3q2,
      pergunta: "Quantas crianças estão perto do carrosel??",
      opcoes: ["2 crianças", "1 criança", "3 crianças", "4 crianças"],
      correta: "1 criança",
    },
    {
      src: nivel3q3,
      pergunta: "Qual é a comida à venda na barraca",
      opcoes: ["Bananas", "Uvas", "Laranjas", "Maçâs"],
      correta: "Bananas",
    },
    {
      src: nivel3q4,
      pergunta: "Quantas crianças estão andando de bicicleta?",
      opcoes: ["1 criança", "8 crianças", "2 crianças", "3 crianças"],
      correta: "2 crianças",
    },
  ],
};

function Memozoo() {
  const [tela, setTela] = useState("inicio");
  const [nivel, setNivel] = useState("");
  const [fase, setFase] = useState(0);
  const [mostrarImagem, setMostrarImagem] = useState(true);
  const [tempo, setTempo] = useState(30);
  const [respostaCorreta, setRespostaCorreta] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);

  const imagensNivel = images[nivel];

  useEffect(() => {
    let timer;
    if (tela === "jogo" && mostrarImagem) {
      timer = setInterval(() => {
        setTempo((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setMostrarImagem(false);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [tela, mostrarImagem]);

  const reiniciarFase = () => {
    setMostrarImagem(true);
    setTempo(30);
    setTela("jogo");
    setRespostaCorreta(false);
    setSelectedOption(null);
    setAnswered(false);
  };

  const acertou = (resposta) => {
    if (answered) return;
    setSelectedOption(resposta);
    setAnswered(true);

    if (resposta === imagensNivel[fase].correta) {
      setRespostaCorreta(true);
      setTimeout(() => setTela("parabens"), 1000);
    } else {
      setRespostaCorreta(false);
      setTimeout(() => setTela("errou"), 1000);
    }
  };

  const proximaFase = () => {
    if (fase < imagensNivel.length - 1) {
      setFase(fase + 1);
      setRespostaCorreta(false);
      setMostrarImagem(true);
      setTempo(30);
      setTela("jogo");
      setSelectedOption(null);
      setAnswered(false);
    } else {
      setTela("fim");
    }
  };

  const openModal = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage("");
  };

  return (
    <div className="container" >
      {tela === "inicio" && (
        <div className="tela" >
          <img className="personagem" src={personagem} alt="Personagem" />
          <img className="macaco" src={macaco} alt="Macaco" />
          <img className="panda" src={panda} alt="Panda" />
          <img className="tigre" src={tigre} alt="Tigre" />
          <img className="mato" src={mato} alt="Mato" />
          <img className="mato2" src={mato} alt="Mato" />
          <img className="mato3" src={mato} alt="Mato" />
          <h1>MemoZo</h1>
          <button style={{backgroundColor: 'green'}} onClick={() => setTela("niveis")}>Começar</button>
        </div>
      )}

      {tela === "niveis" && (
        <div className="tela">
          <h2 style={{ fontSize: '4.5vw', fontFamily: 'Baloo Thambi', fontWeight: 'bold' }}>Níveis</h2>
          <div className="niveis">
            <div className="nivel1">
              <img src={nivel1} alt="Nível Fácil" />
              <button style={{ rotate: '0deg' }} onClick={() => { setNivel("facil"); setTela("jogo"); }}>Iniciar</button>
            </div>
            <div className="nivel2">
              <img src={nivel2} alt="Nível Médio" />
              <button style={{ rotate: '0deg' }} onClick={() => { setNivel("medio"); setFase(0); setTela("jogo"); }}>Iniciar</button> {/* Enabled Medium level */}
            </div>
            <div className="nivel3">
              <img src={nivel3} alt="Nível Difícil" />
              <button style={{ rotate: '0deg' }} onClick={() => { setNivel("dificil"); setFase(0); setTela("jogo"); }}>Iniciar</button> {/* Enabled Difficult level */}
            </div>
          </div>
        </div>
      )}

      {tela === "jogo" && (
        <div className="tela jogo-tela">
          {mostrarImagem ? (
            <div className="observacao-container">
              <h2 className="observe-title">Observe a imagem</h2>
              <div className="timer-display">{tempo}</div>
              <img src={imagensNivel[fase].src} alt="Imagem" className="game-image" />
            </div>
          ) : (
            <div className="question-container">
              <h2 className="question-title">Agora responda...</h2>
              <p className="question-text">{imagensNivel[fase].pergunta}</p>
              <div className="opcoes">
                {imagensNivel[fase].opcoes.map((op, i) => (
                  <button
                    key={i}
                    onClick={() => acertou(op)}
                    className={
                      answered && op === imagensNivel[fase].correta
                        ? "correta"
                        : answered && op === selectedOption && op !== imagensNivel[fase].correta
                        ? "errada"
                        : ""
                    }
                    disabled={answered}
                  >
                    {op}
                  </button>
                ))}
              </div>
              <img src={carImage} alt="Carro" className="question-image" />
            </div>
          )}
        </div>
      )}

      {tela === "errou" && (
        <div className="tela">
          <h2>Você errou 😢</h2>
          <button onClick={reiniciarFase} style={{backgroundColor: 'green'}} >Tentar novamente</button>
        </div>
      )}

      {tela === "parabens" && (
        <div className="tela">
          <h2>Parabéns 🎉</h2>
          <button onClick={proximaFase} style={{backgroundColor: 'green'}} >Próxima fase</button>
        </div>
      )}

      {tela === "fim" && (
        <div className="tela">
          <h2>Você concluiu o nível! 🏁</h2>
          <button onClick={() => {
            setTela("inicio");
            setFase(0);
            setNivel("");
          }}>Voltar ao início</button>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={closeModal}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Memozoo;

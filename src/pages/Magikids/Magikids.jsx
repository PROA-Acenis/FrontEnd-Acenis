import React, { useState, useEffect } from 'react';
import './Magikids.css'; 
import fairyGirlTopRight from '../../assets/imgs/img-magikids/fairy-girl-top-right.png'; 
import wizardGirlLeft from '../../assets/imgs/img-magikids/wizard-girl-left.png'; 
import wizardBoyRight from '../../assets/imgs/img-magikids/wizard-boy-right.png';
import wizardBoyBottomLeft from '../../assets/imgs/img-magikids/wizard-boy-bottom-left.png';
import brainIcon from '../../assets/imgs/img-magikids/brain-icon.png'; 
import wizardHat from '../../assets/imgs/img-magikids/wizard-hat.png'; 
import fairyLevel1 from '../../assets/imgs/img-magikids/fairy-level1.png'; 
import fairyLevel2 from '../../assets/imgs/img-magikids/fairy-level2.png'; 
import fairyLevel3 from '../../assets/imgs/img-magikids/fairy-level3.png'; 
import questionMark from '../../assets/imgs/img-magikids/question-mark.png';
import blueBall from '../../assets/imgs/img-magikids/blue-ball.png';
import redBall from '../../assets/imgs/img-magikids/red-ball.png';
import yellowBall from '../../assets/imgs/img-magikids/yellow-ball.png';
import greenBall from '../../assets/imgs/img-magikids/green-ball.png';
import blueSquare from '../../assets/imgs/img-magikids/blue-square.png';
import redSquare from '../../assets/imgs/img-magikids/red-square.png';
import yellowSquare from '../../assets/imgs/img-magikids/yellow-square.png';
import greenSquare from '../../assets/imgs/img-magikids/green-square.png';
import blueTriangle from '../../assets/imgs/img-magikids/blue-triangle.png';
import redTriangle from '../../assets/imgs/img-magikids/red-triangle.png';
import yellowTriangle from '../../assets/imgs/img-magikids/yellow-triangle.png';
import greenTriangle from '../../assets/imgs/img-magikids/green-triangle.png';
import wizardBoyFeedback from '../../assets/imgs/img-magikids/wizard-boy-feedback.png'; 
import fairyGirlFeedback from '../../assets/imgs/img-magikids/fairy-girl-feedback.png';


const levels = {
  facil: [
    {
      sequence: [blueBall, redBall, blueBall],
      options: [blueBall, yellowBall, greenBall, redBall],
      correct: redBall,
      hint: "Veja só! Depois da bola azul vem a vermelha, depois a azul de novo. Qual bola vem agora? Toque na cor certa!",
    },
    {
      sequence: [greenSquare, yellowSquare, greenSquare],
      options: [yellowSquare, redSquare, blueSquare, greenSquare],
      correct: yellowSquare,
      hint: "Veja só! Depois do quadrado verde vem o amarelo, depois o verde de novo. Qual quadrado vem agora? Toque na cor certa!",
    },
    {
      sequence: [yellowTriangle, blueTriangle, yellowTriangle],
      options: [redTriangle, greenTriangle, yellowTriangle, blueTriangle],
      correct: blueTriangle,
      hint: "Veja só! Depois do triangulo amarelo vem o azul, depois o amarelo de novo. Qual bola vem agora? Toque na cor certa!",
    },
  ],
  medio: [
    {
      sequence: [blueBall, yellowSquare, blueBall, yellowSquare],
      options: [redBall, yellowSquare, blueBall, greenSquare, blueTriangle],
      correct: blueBall,
      hint: "Veja só! Depois da bola azul vem o quadrado amarelo, depois a bola azul de novo, e então o quadrado amarelo. Qual forma vem agora? Toque na forma correta!",
    },
    {
      sequence: [yellowTriangle, redSquare, yellowTriangle, redSquare],
      options: [greenSquare, yellowTriangle, redSquare, blueBall, yellowSquare],
      correct: yellowTriangle,
      hint: "Veja só! Depois do triangulo amarelo vem o quadrado vermelho, depois o triangulo amarelo de novo, e então o quadrado vermelho. Qual forma vem agora? Toque na forma correta!",
    },
    {
      sequence: [blueSquare, greenTriangle, blueSquare, greenTriangle],
      options: [yellowSquare, redBall, greenSquare, redTriangle, blueSquare],
      correct: blueSquare,
      hint: "Veja só! Depois do quadrado azul vem o triangulo verde, depois o quadrado azul de novo, e então o triangulo verde. Qual forma vem agora? Toque na forma correta!",
    },
  ],
  dificil: [
    {
      sequence: [blueBall, redTriangle, yellowSquare, blueBall, redTriangle],
      options: [redTriangle, yellowSquare, greenSquare, yellowBall, blueBall, greenTriangle],
      correct: yellowSquare,
      hint: "Veja só! Depois da bola azul vem o triângulo vermelho, depois o quadrado amarelo, depois a bola azul e, por fim, o triângulo vermelho. Qual forma vem agora? Toque na forma correta!",
    },
    {
      sequence: [greenSquare, blueBall, redTriangle, greenSquare, blueBall],
      options: [redTriangle, yellowSquare, greenSquare, yellowBall, blueBall, greenTriangle],
      correct: redTriangle,
      hint: "A sequência é: quadrado verde, bola azul, triângulo vermelho. Qual o próximo?",
    },
    {
      sequence: [yellowTriangle, greenBall, blueSquare, yellowTriangle, greenBall],
      options: [redTriangle, yellowSquare, greenSquare, yellowBall, blueBall, blueSquare],
      correct: blueSquare,
      hint: "A sequência é: triângulo amarelo, bola verde, quadrado azul. Qual o próximo?",
    },
  ],
};

function Magikids() {
  const [screen, setScreen] = useState("home"); 
  const [level, setLevel] = useState(""); 
  const [phase, setPhase] = useState(0); 
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentLevelData = level ? levels[level] : [];
  const currentPhaseData = currentLevelData[phase];

  const handleOptionClick = (option) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    if (option === currentPhaseData.correct) {
      setTimeout(() => setScreen("correct"), 1000); 
    } else {
      setTimeout(() => setScreen("incorrect"), 1000); 
    }
  };

  const goToNextPhase = () => {
    if (phase < currentLevelData.length - 1) {
      setPhase(phase + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setScreen("game");
    } else {
      setScreen("end"); 
    }
  };

  const retryPhase = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setScreen("game"); 
  };

  const resetGame = () => {
    setScreen("home");
    setLevel("");
    setPhase(0);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  return (
    <section className='magikidsSection'>
        <div className="magikids-container">
          {screen === "home" && (
            <div className="magikids-screen home-screen">
              <img src={fairyGirlTopRight} alt="Fada" className="fairy-top-right" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/150x150?text=Fada'; }} />
              <img src={wizardGirlLeft} alt="Menina Bruxa" className="wizard-girl-left" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/250x250?text=Bruxa'; }} />
              <img src={wizardBoyRight} alt="Menino Bruxo" className="wizard-boy-right" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/250x250?text=Bruxo'; }} />
              <img src={brainIcon} alt="Cérebro" className="brain-icon-left" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/80x80?text=Brain'; }} />
              <img src={brainIcon} alt="Cérebro" className="brain-icon-right" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/80x80?text=Brain'; }} />
              <img src={wizardHat} alt="Chapéu de Bruxo" className="wizard-hat" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x100?text=Hat'; }} />
              <h1 className="game-title">MAGIKIDS</h1>
              <button className="start-button" onClick={() => setScreen("intro")}>Começar</button>
            </div>
          )}
          {screen === "intro" && (
            <div className="magikids-screen intro-screen">
              <div className="intro-message-box">
                <p>Oi, amiguinho(a)! Vamos brincar junto?</p>
                <p>Aqui a gente vai descobrir o que vem depois na sequência.</p>
                <p>Você pode ir no seu ritmo, e eu vou te ajudar sempre que precisar!</p>
              </div>
              <img src={wizardBoyRight} alt="Menino Bruxo" className="wizard-boy-intro" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/250x250?text=Bruxo'; }} />
              <button className="start-adventure-button" onClick={() => setScreen("levels")}>Começar a Aventura</button>
            </div>
          )}
          {screen === "levels" && (
            <div className="magikids-screen levels-screen">
              <h2 className="levels-title">Fases</h2>
              <div className="level-cards-container">
                <div className="level-card level-card-pink">
                  <img src={fairyLevel1} alt="Fada Nível 1" className="level-fairy" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/180x180?text=Nivel1'; }} />
                  <button className="level-button" onClick={() => { setLevel("facil"); setPhase(0); setScreen("game"); }} style={{marginTop: '-40%'}}>Iniciar</button>
                </div>
                <div className="level-card level-card-green">
                  <img src={fairyLevel2} alt="Fada Nível 2" className="level-fairy" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/180x180?text=Nivel2'; }} />
                  <button className="level-button" onClick={() => { setLevel("medio"); setPhase(0); setScreen("game"); }} style={{backgroundColor: 'green'}}>Iniciar</button>
                </div>
                <div className="level-card level-card-yellow">
                  <img src={fairyLevel3} alt="Fada Nível 3" className="level-fairy" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/180x180?text=Nivel3'; }} />
                  <button className="level-button" onClick={() => { setLevel("dificil"); setPhase(0); setScreen("game"); }} style={{backgroundColor: 'yellow'}}>Iniciar</button>
                </div>
              </div>
            </div>
          )}
          {screen === "game" && currentPhaseData && (
            <div className="magikids-screen game-screen">
              <h2 className="game-instruction">Complete a sequência</h2>
              <div className="sequence-display">
                {currentPhaseData.sequence.map((item, index) => (
                  <div key={index} className="sequence-item">
                    <img src={item} alt={`Item ${index}`} onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x100?text=Img'; }} />
                  </div>
                ))}
                <div className="sequence-item question-mark-box">
                  <img src={questionMark} alt="?" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x100?text=?'; }} />
                </div>
              </div>
              <h3 className="game-instruction">Toque na cor certa</h3>
              <div className="options-display">
                {currentPhaseData.options.map((option, index) => (
                  <div
                    key={index}
                    className={`option-item ${isAnswered ? (option === currentPhaseData.correct ? 'correct-answer' : (option === selectedOption ? 'incorrect-answer' : '')) : ''}`}
                    onClick={() => handleOptionClick(option)}
                  >
                    <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                    <img src={option} alt={`Opção ${index}`} onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x100?text=Op'; }} />
                  </div>
                ))}
              </div>
              <div className="hint-box">
                <img src={wizardBoyBottomLeft} alt="Menino Bruxo" className="wizard-boy-hint" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/120x120?text=Bruxo'; }} />
                <p className="hint-text">{currentPhaseData.hint}</p>
              </div>
            </div>
          )}
          {screen === "correct" && (
            <div className="magikids-screen feedback-screen correct-screen">
              <div className="feedback-screen-content">
                <div className="feedback-message-box correct-message">
                  <p>"Você acertou! Muito bem! Vamos para o próximo passo!"</p>
                </div>
                <img src={wizardBoyFeedback} alt="Menino Bruxo Feliz" className="feedback-image wizard-boy-feedback" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/200x200?text=Bruxo+Feliz'; }} />
              </div>
              <button className="feedback-button feedback-button-correct" onClick={goToNextPhase}>Próxima fase</button>
            </div>
          )}
          {screen === "incorrect" && (
            <div className="magikids-screen feedback-screen incorrect-screen">
              <div className="feedback-screen-content">
                <div className="feedback-message-box incorrect-message">
                  <p>"Tudo bem, amiguinho(a)! Vamos tentar de novo com calma. Você consegue!"</p>
                </div>
                <img src={fairyGirlFeedback} alt="Fada Triste" className="feedback-image fairy-girl-feedback" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/200x200?text=Fada+Triste'; }} />
              </div>
              <button className="feedback-button feedback-button-incorrect" onClick={retryPhase}>Tentar de novo</button>
            </div>
          )}
          {screen === "end" && (
            <div className="magikids-screen end-screen">
              <h2>Você completou o nível! 🌟</h2>
              <p>Parabéns por sua jornada mágica!</p>
              <button className="feedback-button" onClick={resetGame}>Voltar ao Início</button>
            </div>
          )}
        </div>
    </section>
  );
}

export default Magikids;

import React, { useState, useEffect } from 'react';
import './QuemSouEu.css'; // O arquivo CSS para este jogo

// Imagens genéricas para as telas
import homeBackground from '../../assets/imgs/img-quemsoueu/homeBackground.png'; 
import bearHome from '../../assets/imgs/img-quemsoueu/bear-home.png'; // Urso na tela inicial
import bearLevel1 from '../../assets/imgs/img-quemsoueu/bear-level1.png'; // Urso para Nível 1
import bearLevel2 from '../../assets/imgs/img-quemsoueu/bear-level2.png'; // Urso para Nível 2
import bearLevel3 from '../../assets/imgs/img-quemsoueu/bear-level3.png'; // Urso para Nível 3
import bearHint from '../../assets/imgs/img-quemsoueu/bear-hint.png'; // Urso para a caixa de dica

// Imagens dos objetos (placeholders - substitua pelas suas imagens reais)
import imgCama from '../../assets/imgs/img-quemsoueu/cama.png'; // Ex: cama.png
import imgBola from '../../assets/imgs/img-quemsoueu/bola.png'; // Ex: bola.png
import imgLivro from '../../assets/imgs/img-quemsoueu/livro.png'; // Ex: livro.png
import imgMeia from '../../assets/imgs/img-quemsoueu/meia.png'; // Ex: meia.png
import imgPrato from '../../assets/imgs/img-quemsoueu/prato.png'; // Ex: prato.png
import imgCopo from '../../assets/imgs/img-quemsoueu/copo.png'; // Ex: copo.png
import imgPanela from '../../assets/imgs/img-quemsoueu/panela.png'; // Ex: panela.png
import imgGeladeira from '../../assets/imgs/img-quemsoueu/geladeira.png'; // Ex: geladeira.png

// Novas imagens para as telas de feedback
import bearHappyFeedback from '../../assets/imgs/img-quemsoueu/bear-happy-feedback.png'; // Urso feliz para feedback de acerto
import bearSadFeedback from '../../assets/imgs/img-quemsoueu/bear-sad-feedback.png';   // Urso triste para feedback de erro


const levels = {
  facil: [
    {
      word: "CAMA",
      image: imgCama,
      missingIndices: [3], // A letra 'A' está faltando (índice 3)
      options: ["A", "I", "P", "O"],
      hint: "Olha só! Temos uma cama aqui, mas parece que algumas letras desapareceram... Será que você consegue me ajudar a completá-la?",
    },
    {
      word: "BOLA",
      image: imgBola,
      missingIndices: [1], // A letra 'O' está faltando
      options: ["A", "L", "G", "O"],
      hint: "Olha só! Temos uma bola aqui, mas parece que algumas letras desapareceram... Será que você consegue me ajudar a completá-la?",
    },
    {
      word: "LIVRO",
      image: imgLivro,
      missingIndices: [2], // A letra 'V' está faltando
      options: ["V", "H", "A", "U"],
      hint: "Olha só! Temos um livro aqui, mas parece que algumas letras desapareceram... Será que você consegue me ajudar a completá-la?",
    },
  ],
  medio: [
    {
      word: "MEIA",
      image: imgMeia,
      missingIndices: [2], // A letra 'I' está faltando
      options: ["E", "I", "U", "D"],
      hint: "Olha só! Temos uma meia aqui, mas parece que algumas letras desapareceram... Será que você consegue me ajudar a completá-la?",
    },
    {
      word: "PRATO",
      image: imgPrato,
      missingIndices: [2, 4], // As letras 'A' e 'O' estão faltando
      options: ["A", "F", "W", "O"],
      hint: "Olha só! Temos um prato aqui, mas parece que algumas letras desapareceram... Será que você consegue me ajudar a completá-la?",
    },
    {
      word: "COPO",
      image: imgCopo,
      missingIndices: [1, 3], // As letras 'O' e 'O' estão faltando
      options: ["I", "O", "H", "O"],
      hint: "Olha só! Temos um copo aqui, mas parece que algumas letras desapareceram... Será que você consegue me ajudar a completá-la?",
    },
  ],
  dificil: [
    {
      word: "PANELA",
      image: imgPanela,
      missingIndices: [1, 3], // As letras 'A' e 'E' estão faltando
      options: ["V", "A", "B", "E"],
      hint: "Olha só! Temos uma panela aqui, mas parece que algumas letras desapareceram... Será que você consegue me ajudar a completá-la?",
    },
    {
      word: "GELADEIRA",
      image: imgGeladeira,
      missingIndices: [2, 5, 7], // As letras 'L', 'D', 'I' estão faltando
      options: ["Ç", "I", "L", "D", "P", "T"],
      hint: "Olha só! Temos uma geladeira aqui, mas parece que algumas letras desapareceram... Será que você consegue me ajudar a completá-la?",
    },
    // Adicione mais fases conforme necessário
  ],
};

function App() {
  const [screen, setScreen] = useState("home"); // home, levels, game, feedback (correct/incorrect), end
  const [level, setLevel] = useState(""); // facil, medio, dificil
  const [phase, setPhase] = useState(0); // Current phase index within the level
  const [currentWordState, setCurrentWordState] = useState([]); // Array para o estado atual da palavra (letras preenchidas)
  const [availableOptions, setAvailableOptions] = useState([]); // Letras disponíveis para arrastar/clicar
  const [selectedLetter, setSelectedLetter] = useState(null); // Letra selecionada para arrastar/clicar
  const [isCorrect, setIsCorrect] = useState(false); // Para feedback de acerto/erro
  const [showFeedback, setShowFeedback] = useState(false); // Para mostrar a tela de feedback

  const currentLevelData = level ? levels[level] : [];
  const currentPhaseData = currentLevelData[phase];

  useEffect(() => {
    if (screen === "game" && currentPhaseData) {
      // Inicializa o estado da palavra com underscores para letras faltando
      const initialWordState = currentPhaseData.word.split('').map((char, index) =>
        currentPhaseData.missingIndices.includes(index) ? '_' : char
      );
      setCurrentWordState(initialWordState);
      // Cria uma cópia das opções para que possamos modificá-las
      setAvailableOptions([...currentPhaseData.options]);
      setSelectedLetter(null);
      setIsCorrect(false);
      setShowFeedback(false);
    }
  }, [screen, level, phase, currentPhaseData]);

  // Função para lidar com o clique em uma letra da opção
  const handleOptionLetterClick = (letter) => {
    setSelectedLetter(letter);
  };

  // Função para lidar com o clique em um slot vazio da palavra
  const handleSlotClick = (slotIndex) => {
    // Verifica se uma letra foi selecionada e se o slot está vazio e é um slot que falta
    if (selectedLetter && currentWordState[slotIndex] === '_' && currentPhaseData.missingIndices.includes(slotIndex)) {
      const newWordState = [...currentWordState];
      newWordState[slotIndex] = selectedLetter; // Coloca a letra selecionada no slot

      // Remove APENAS A PRIMEIRA OCORRÊNCIA da letra usada das opções disponíveis
      const newOptions = [...availableOptions];
      const usedLetterIndexInOptions = newOptions.indexOf(selectedLetter);
      if (usedLetterIndexInOptions > -1) {
        newOptions.splice(usedLetterIndexInOptions, 1);
      }
      setAvailableOptions(newOptions);

      setCurrentWordState(newWordState);
      setSelectedLetter(null); // Limpa a letra selecionada após o uso

      // Verifica se a palavra está completa após a inserção
      checkWordCompletion(newWordState);
    }
  };

  const checkWordCompletion = (wordState) => {
    const completedWord = wordState.join('');
    // Verifica se todos os slots que deveriam ser preenchidos estão preenchidos
    const allMissingFilled = currentPhaseData.missingIndices.every(index => wordState[index] !== '_');

    console.log("--- checkWordCompletion called ---");
    console.log("Current Word State (passed):", wordState);
    console.log("Completed Word (joined):", completedWord);
    console.log("Target Word:", currentPhaseData.word);
    console.log("Missing Indices:", currentPhaseData.missingIndices);
    console.log("All Missing Filled:", allMissingFilled);

    if (allMissingFilled) {
      if (completedWord === currentPhaseData.word) {
        setIsCorrect(true);
        console.log("Result: CORRECT. Setting showFeedback to true.");
        setTimeout(() => setShowFeedback(true), 500);
      } else {
        setIsCorrect(false);
        console.log("Result: INCORRECT. Setting showFeedback to true.");
        setTimeout(() => setShowFeedback(true), 500);
      }
    } else {
      console.log("Result: NOT ALL MISSING SLOTS FILLED YET.");
    }
  };

  const handleNextPhase = () => {
    // Esconder feedback antes de mudar de fase
    setShowFeedback(false);
    if (phase < currentLevelData.length - 1) {
      setPhase(phase + 1);
      setScreen("game");
    } else {
      setScreen("end");
    }
  };

  const handleRetryPhase = () => {
    // Esconder feedback antes de reiniciar a fase
    setShowFeedback(false);
    setScreen("game"); // Reinicia a fase atual
  };

  const resetGame = () => {
    setShowFeedback(false); // Esconder feedback ao voltar para o início
    setScreen("home");
    setLevel("");
    setPhase(0);
  };

  return (
    <div className="quem-sou-eu-container">
      {/* Home Screen */}
      {screen === "home" && (
        <div className="qse-screen home-screen">
          {/* A imagem de fundo agora é definida no CSS */}
          <h1 className="qse-title">QUEM SOU EU?</h1>
          <button className="qse-button start-button" onClick={() => setScreen("levels")}>Começar</button>
          <img src={bearHome} alt="Urso" className="bear-home" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/200x200?text=Urso'; }} />
        </div>
      )}

      {/* Levels Screen */}
      {screen === "levels" && (
        <div className="qse-screen levels-screen">
          <h2 className="qse-title levels-title">Fases</h2>
          <div className="level-cards-container">
            <div className="level-card level-card-pink">
              <img src={bearLevel1} alt="Urso Nível 1" className="level-bear" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/150x150?text=Nivel1'; }} />
              <button className="qse-button level-button" onClick={() => { setLevel("facil"); setPhase(0); setScreen("game"); }}>Iniciar</button>
            </div>
            <div className="level-card level-card-purple">
              <img src={bearLevel2} alt="Urso Nível 2" className="level-bear" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/150x150?text=Nivel2'; }} />
              <button className="qse-button level-button" onClick={() => { setLevel("medio"); setPhase(0); setScreen("game"); }}>Iniciar</button>
            </div>
            <div className="level-card level-card-blue">
              <img src={bearLevel3} alt="Urso Nível 3" className="level-bear" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/150x150?text=Nivel3'; }} />
              <button className="qse-button level-button" onClick={() => { setLevel("dificil"); setPhase(0); setScreen("game"); }}>Iniciar</button>
            </div>
          </div>
        </div>
      )}

      {/* Game Screen */}
      {screen === "game" && currentPhaseData && (
        <div className="qse-screen game-screen">
          <div className="word-image-container">
            <p className="word-name">{currentPhaseData.word}</p>
            <img src={currentPhaseData.image} alt={currentPhaseData.word} className="game-object-image" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/200x200?text=Objeto'; }} />
          </div>

          <div className="word-completion-area">
            {currentWordState.map((char, index) => (
              <div
                key={`slot-${index}`} // Chave única para slots
                className={`letter-slot ${char === '_' ? 'empty' : ''}`}
                onClick={() => handleSlotClick(index)} // Chama handleSlotClick
              >
                {char === '_' ? '' : char}
              </div>
            ))}
          </div>

          <div className="letter-options">
            {availableOptions.map((letter, index) => (
              <div
                key={`${letter}-${index}`} // Chave mais robusta
                className={`option-letter-box ${selectedLetter === letter ? 'selected' : ''}`}
                onClick={() => handleOptionLetterClick(letter)} // Chama handleOptionLetterClick
              >
                {letter}
              </div>
            ))}
          </div>

          <div className="hint-box">
            <p className="hint-text">{currentPhaseData.hint}</p>
            <img src={bearHint} alt="Urso Dica" className="bear-hint" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x100?text=Urso+Dica'; }} />
          </div>
        </div>
      )}

      {/* Feedback Overlay - Sempre renderizado, visibilidade controlada por CSS */}
      <div className={`qse-screen feedback-overlay ${showFeedback ? '' : 'hidden'}`}>
        {/* Conteúdo para feedback de acerto */}
        {isCorrect && (
          <div className="feedback-modal correct-modal">
            <div className="feedback-content">
              <div className="feedback-message-box correct-message-box">
                <p>"Você acertou! Muito bem! Vamos para o próximo passo"</p>
              </div>
              <img src={bearHappyFeedback} alt="Urso Feliz" className="feedback-bear happy-bear" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/200x200?text=Urso+Feliz'; }} />
            </div>
            <button className="qse-button feedback-button correct" onClick={handleNextPhase}>Próxima fase</button>
          </div>
        )}

        {/* Conteúdo para feedback de erro */}
        {!isCorrect && (
          <div className="feedback-modal incorrect-modal">
            <div className="feedback-content">
              <div className="feedback-message-box incorrect-message-box">
                <p>"Tudo bem, amiguinho(a)! Vamos tentar de novo com calma. Você consegue!"</p>
              </div>
              <img src={bearSadFeedback} alt="Urso Triste" className="feedback-bear sad-bear" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/200x200?text=Urso+Triste'; }} />
            </div>
            <button className="qse-button feedback-button incorrect" onClick={handleRetryPhase}>Tentar de novo</button>
          </div>
        )}
      </div>

      {/* End Game Screen */}
      {screen === "end" && (
        <div className="qse-screen end-screen">
          <h2 className="qse-title">Você completou o nível! 🎉</h2>
          <p className="end-message">Parabéns por sua jornada de aprendizado!</p>
          <button className="qse-button start-button" onClick={resetGame}>Voltar ao Início</button>
        </div>
      )}
    </div>
  );
}

export default App;

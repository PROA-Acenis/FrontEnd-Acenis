// ChatbotModal.jsx
import { useState, useRef } from "react";
import mascotImg from "../../assets/imgs/img-chatbot/clara.png";

const API_KEY = "AIzaSyCba1wZMgd49BkXum8eGs2dHp9vvkJSeBM"; // ATENÇÃO: Chave de API exposta, considere mover para variáveis de ambiente!

const INITIAL_PROMPT = {
  role: "user",
  parts: [{
    text: '[PERSONA E IDENTIDADE]Você é Clara, a assistente virtual da Acenis. A Acenis é uma plataforma digital de acolhimento, criada para apoiar mães, pais e responsáveis por crianças com Síndrome de Down, transformando desafios em conquistas através de informação de qualidade e conexões valiosas.Seus atributos principais são:Acolhedora: Você sempre valida os sentimentos do usuário antes de responder.Empática: Você entende o contexto emocional do usuário(medo, dúvida, cansaço) e responde com sensibilidade.Clara e Objetiva: Suas respostas são curtas, diretas e fáceis de entender.Confiável e Capacitadora: Você fornece informações práticas e recursos que dão poder e autonomia ao usuário, sem nunca soar robótica ou impositiva.Serena: Seu tom de voz é sempre calmo, positivo e respeitoso.[OBJETIVO PRINCIPAL]Seu objetivo é ser o primeiro ponto de contato de apoio, oferecendo orientação inicial, recursos práticos e um ombro amigo digital.Você deve guiar o usuário, esclarecer dúvidas e, quando não souber a resposta, direcioná- lo de forma eficiente para o suporte humano qualificado.[REGRAS RÍGIDAS E INQUEBRÁVEIS]LIMITE DE CARACTERES: Cada resposta individual sua NUNCA deve exceder 100 caracteres.NÃO USE EMOJIS: Em nenhuma circunstância.Sua comunicação é limpa e profissional.PROIBIDO ACONSELHAMENTO MÉDICO: Você NUNCA deve dar conselhos médicos, sugerir tratamentos, medicamentos ou interpretar sintomas.Se um usuário pedir um conselho médico, sua única resposta permitida é:  Essa é uma dúvida muito importante para conversar com o médico que acompanha seu filho.PROIBIDO ACONSELHAMENTO LEGAL OU FINANCEIRO: Pelas mesmas razões, não dê conselhos sobre leis, direitos ou finanças.NÃO INVENTE INFORMAÇÕES: Se a pergunta for sobre um tópico que não está na sua Base de Conhecimento ou se você não tiver certeza, use IMEDIATAMENTE o Protocolo de Escalada.Não tente adivinhar.[BASE DE CONHECIMENTO E TÓPICOS DE DOMÍNIO]Você é treinada para fornecer informações e recursos sobre:Educação Inclusiva:Como encontrar escolas preparadas.Direitos da criança no ambiente escolar.Como conversar com professores e coordenadores.Saúde e Terapias:O que fazem fonoaudiólogos, terapeutas ocupacionais, psicopedagogos, etc.Informações sobre terapias de estímulo(motora, cognitiva, de fala).Como encontrar profissionais e instituições parceiras da Acenis.Desenvolvimento Infantil:Sugestão de jogos, livros e atividades lúdicas para cada fase.Marcos do desenvolvimento e a importância de celebrar cada conquista.Redes de Apoio:Como se conectar com outras mães na plataforma.Informações sobre ONGs e grupos de apoio parceiros.Cuidados e Rotina:Dicas sobre alimentação, sono e rotinas diárias.Informações gerais sobre cuidados de saúde(ex: importância do acompanhamento cardiológico).[PROTOCOLO DE INTERAÇÃO E FLUXO DE CONVERSA]Siga este fluxo em todas as conversas:Saudação Inicial: No primeiro contato, apresente - se: Olá, sou a Clara, assistente virtual da Acenis.Como posso te ajudar a transformar um desafio em conquista hoje ?Validação Empática: Antes de responder diretamente, comece com uma frase curta que valide a pergunta ou o sentimento do usuário.Exemplos: - Entendo sua dúvida., -Essa é uma pergunta muito importante., -Imagino como isso pode ser desafiador.Resposta Objetiva: Forneça a informação solicitada, baseada em sua Base de Conhecimento e respeitando o limite de 100 caracteres.Estímulo ao Diálogo: Sempre termine sua resposta com uma pergunta curta para manter a conversa fluindo.Exemplos: -Isso ajuda ?, -Posso detalhar mais ?, -Gostaria de saber sobre outro tópico?.Protocolo de Escalada(Fallback): Se você não souber a resposta, use esta frase exata: -Não tenho essa informação específica.Você gostaria de conversar com um de nossos especialistas do suporte ?[EXEMPLOS DE INTERAÇÃO PERFEITA]Exemplo 1 - Pedido de Informação:Usuário: -O que é terapia ocupacional ?Clara : -Entendo sua dúvida.É uma terapia que ajuda no desenvolvimento de atividades diárias, como comer e brincar.Clara: -Isso ajuda a esclarecer ? Posso falar sobre os benefícios.Exemplo 2 - Acolhimento Emocional:Usuário: -Estou com medo do futuro do meu filho.Clara: -Imagino como se sente.É um sentimento comum.Saiba que existem muitas redes de apoio para te ajudar.Clara: -Gostaria que eu falasse sobre os grupos de mães ?Exemplo 3 - Uso do Fallback:Usuário: -Qual o melhor leite em pó para um bebê com Down ?Clara : -Essa é uma dúvida muito importante para conversar com o médico que acompanha seu filho.Clara: -Posso te ajudar com informações sobre a rotina alimentar.'
  }]
};

export default function ChatbotModal() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  const conversationHistory = [INITIAL_PROMPT, ...messages.map(m => ({
    role: m.sender === "user" ? "user" : "model",
    parts: [{ text: m.text }]
  }))];

  const scrollToBottom = () => {
    setTimeout(() => {
      if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, 100);
  };

  const addMessage = (sender, text) => {
    setMessages(prev => [...prev, { sender, text }]);
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    addMessage("user", trimmed);
    setInput("");
    addMessage("bot", "Digitando...");
    scrollToBottom();

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: conversationHistory })
        }
      );
      const data = await response.json();
      const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Desculpe, não consegui entender.";

      setMessages(prev => {
        const newMessages = [...prev];
        if (newMessages[newMessages.length - 1].sender === "bot" && newMessages[newMessages.length - 1].text === "Digitando...") {
          newMessages[newMessages.length - 1] = { sender: "bot", text: botReply };
        } else {
          newMessages.push({ sender: "bot", text: botReply });
        }
        return newMessages;
      });
      scrollToBottom();
    } catch (error) {
      console.error("Erro ao conectar com a IA:", error);
      setMessages(prev => {
        const newMessages = [...prev];
        if (newMessages[newMessages.length - 1].sender === "bot" && newMessages[newMessages.length - 1].text === "Digitando...") {
          newMessages[newMessages.length - 1] = { sender: "bot", text: "Erro ao se conectar à IA." };
        } else {
          newMessages.push({ sender: "bot", text: "Erro ao se conectar à IA." });
        }
        return newMessages;
      });
      scrollToBottom();
    }
  };

  return (
    <>
      <button
        className="chatbot-toggle-button"
        aria-label={open ? "Fechar chat" : "Abrir chat"}
        onClick={() => setOpen(!open)}
      >
        {!open && <img src={mascotImg} alt="Mascote Clara" className="chatbot-mascot-icon" />}
        {open && <span className="chatbot-close-icon">×</span>}
      </button>

      {open && (
        <div className="chatbot-container">
          <div className="chatbot-header">Clara - Assistente Virtual</div>
          <div ref={chatRef} className="chatbot-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chatbot-message ${m.sender === "user" ? "user" : "bot"}`}>
                {m.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem..."
              onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
            />
            <button onClick={handleSend}>Enviar</button>
          </div>
        </div>
      )}

      {/* LINHA 115 CORRIGIDA ABAIXO */}
      <style>{`
        .chatbot-toggle-button {
          position: fixed;
          bottom: 16px;
          right: 16px;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          border: none;
          background-color: #003;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          transition: background-color 0.3s ease, transform 0.2s ease;
          color: white;
          font-size: 40px;
          font-weight: bold;
          user-select: none;
        }
        .chatbot-toggle-button:hover {
          transform: scale(1.1);
          background-color: rgba(16, 185, 129, 0.2);
        }
        .chatbot-mascot-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
        }
        .chatbot-close-icon {
          line-height: 1;
          font-size: 48px;
          pointer-events: none;
          user-select: none;
        }
        .chatbot-container {
          position: fixed;
          bottom: 90px;
          right: 16px;
          width: 360px;
          max-width: 90vw;
          height: 70vh;
          max-height: 480px;
          background-color: #1e293b;
          color: white;
          display: flex;
          flex-direction: column;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          z-index: 1001;
          animation: fadeIn 0.3s ease forwards;
        }
        @media (max-width: 480px) {
          .chatbot-container {
            bottom: 80px;
            right: 12px;
            width: 95vw;
            height: 80vh;
            border-radius: 10px;
          }
          .chatbot-mascot-icon {
            width: 60px;
            height: 60px;
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .chatbot-header {
          background-color: #334155;
          padding: 12px 16px;
          font-size: 18px;
          font-weight: bold;
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
        }
        .chatbot-messages {
          flex: 1;
          padding: 12px 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 8px;
          scrollbar-width: thin;
          scrollbar-color: #10b981 transparent;
        }
        .chatbot-messages::-webkit-scrollbar {
          width: 6px;
        }
        .chatbot-messages::-webkit-scrollbar-thumb {
          background-color: #10b981;
          border-radius: 4px;
        }
        .chatbot-message {
          max-width: 75%;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 14px;
          word-wrap: break-word;
        }
        .chatbot-message.user {
          background-color: #2563eb;
          align-self: flex-end;
          color: white;
        }
        .chatbot-message.bot {
          background-color: #475569;
          align-self: flex-start;
          color: white;
        }
        .chatbot-input-area {
          display: flex;
          padding: 12px 16px;
          border-top: 1px solid #334155;
          gap: 8px;
        }
        .chatbot-input-area input {
          flex: 1;
          padding: 8px 12px;
          border-radius: 8px;
          border: none;
          font-size: 14px;
          background-color: #334155;
          color: white;
          outline: none;
        }
        .chatbot-input-area input::placeholder {
          color: #94a3b8;
        }
        .chatbot-input-area button {
          background-color: #10b981;
          border: none;
          border-radius: 8px;
          color: white;
          padding: 8px 14px;
          font-weight: 600;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
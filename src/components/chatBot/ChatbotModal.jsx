import { useState, useRef, useEffect } from "react";
import mascotImg from "../../assets/imgs/img-chatbot/clara.png";

// ATENÇÃO: Mova esta chave para um arquivo .env.local para não expô-la publicamente.
const API_KEY = "AIzaSyCba1wZMgd49BkXum8eGs2dHp9vvkJSeBM";

// INSTRUÇÕES DA PERSONA (Agora em uma constante separada)
const SYSTEM_INSTRUCTION = `
[PERSONA E IDENTIDADE]
Você é Clara, a assistente virtual da Acenis. A Acenis é uma plataforma digital de acolhimento, criada para apoiar mães, pais e responsáveis por crianças com Síndrome de Down, transformando desafios em conquistas através de informação de qualidade e conexões valiosas.

Seus atributos principais são:
Acolhedora: Você sempre valida os sentimentos do usuário antes de responder.
Empática: Você entende o contexto emocional do usuário (medo, dúvida, cansaço) e responde com sensibilidade.
Clara e Objetiva: Suas respostas são curtas, diretas e fáceis de entender.
Confiável e Capacitadora: Você fornece informações práticas e recursos que dão poder e autonomia ao usuário, sem nunca soar robótica ou impositiva.
Serena: Seu tom de voz é sempre calmo, positivo e respeitoso.

[OBJETIVO PRINCIPAL]
Seu objetivo é ser o primeiro ponto de contato de apoio, oferecendo orientação inicial, recursos práticos e um ombro amigo digital. Você deve guiar o usuário, esclarecer dúvidas e, quando não souber a resposta, direcioná-lo de forma eficiente para o suporte humano qualificado.

[REGRAS RÍGIDAS E INQUEBRÁVEIS]
LIMITE DE CARACTERES: Cada resposta individual sua não deve exceder 100 caracteres, porém, CASO for CONVENIENTE, pode exceder.
NÃO USE EMOJIS: Em nenhuma circunstância. Sua comunicação é limpa e profissional.
PROIBIDO ACONSELHAMENTO MÉDICO: Você NUNCA deve dar conselhos médicos, sugerir tratamentos, medicamentos ou interpretar sintomas. Se um usuário pedir um conselho médico, sua única resposta permitida é: "Essa é uma dúvida muito importante para conversar com o médico que acompanha seu filho."
PROIBIDO ACONSELHAMENTO LEGAL OU FINANCEIRO: Pelas mesmas razões, não dê conselhos sobre leis, direitos ou finanças.
NÃO INVENTE INFORMAÇÕES: Se a pergunta for sobre um tópico que não está na sua Base de Conhecimento ou se você não tiver certeza, use IMEDIATAMENTE o Protocolo de Escalada. Não tente adivinhar.

[BASE DE CONHECIMENTO E TÓPICOS DE DOMÍNIO]
Você é treinada para fornecer informações e recursos sobre: Educação Inclusiva, Saúde e Terapias, Desenvolvimento Infantil, Redes de Apoio e Cuidados e Rotina.

[BASE DE CONHECIMENTO SOBRE A PLATAFORMA]
Você sabe explicar o que é cada seção do site Acenis:
- Home: É nossa página principal, com informações básicas sobre o site, podendo levar para as outras funcionalidades.
- Instituições: É uma área para encontrar instituições parceiras, como ONGs e associações que oferecem apoio.
- Profissionais: Aqui, você pode buscar por especialistas como fonoaudiólogos, terapeutas e psicólogos perto de você.
- Jogos: É a nossa seção com jogos educativos, pensados para estimular o desenvolvimento das crianças de forma divertida.
- Rede Social: É o coração da Acenis. Um feed onde você pode compartilhar experiências, ler posts de outras famílias, curtir e comentar.
- Loja: Um espaço com produtos, como brinquedos e livros, selecionados por nossos fornecedores parceiros para auxiliar no desenvolvimento.

[PROTOCOLO DE INTERAÇÃO E FLUXO DE CONVERSA]
Siga este fluxo em todas as conversas:
1. Saudação Inicial: No primeiro contato, apresente-se: "Olá, sou a Clara, assistente virtual da Acenis. Como posso te ajudar a transformar um desafio em conquista hoje?"
2. Validação Empática: Antes de responder, valide o sentimento com uma frase curta (Ex: "Entendo sua dúvida.", "Imagino como isso pode ser desafiador.").
3. Resposta Objetiva: Forneça a informação solicitada (limite de 100 caracteres).
4. Estímulo ao Diálogo: Sempre termine com uma pergunta curta (Ex: "Isso ajuda?", "Posso detalhar mais?").
5. Protocolo de Escalada (Fallback): Se não souber a resposta, use a frase exata: "Não tenho essa informação específica. Você gostaria de conversar com um de nossos especialistas do suporte?"
6. Seja amigavel, não seja robotica, pareça uma amiga.

[PROTOCOLO DE SUPORTE]
- Caso solicitem o suporte, peça para entrar em contato com os desenvolvedores no email: sup.acenis@acenis.com
`;

export default function ChatbotModal() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  // Efeito para rolar para a última mensagem
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (sender, text) => {
    setMessages(prev => [...prev, { sender, text }]);
  };

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    addMessage("user", trimmedInput);
    setInput("");
    
    // Adiciona a mensagem "Digitando..." e atualiza o estado para que ela apareça
    setMessages(prev => [...prev, { sender: "bot", text: "Digitando..." }]);

    // Constrói o histórico da conversa para enviar à API
    const conversationHistory = [
        ...messages,
        { sender: 'user', text: trimmedInput }
    ].map(m => ({
        role: m.sender === "user" ? "user" : "model",
        parts: [{ text: m.text }]
    }));
    
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: conversationHistory,
                    // --- CORREÇÃO AQUI: Enviando a Persona como uma instrução de sistema ---
                    systemInstruction: {
                      role: "model",
                      parts: [{ text: SYSTEM_INSTRUCTION }]
                    }
                })
            }
        );

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Desculpe, não consegui entender.";

        // Substitui a mensagem "Digitando..." pela resposta real da IA
        setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = { sender: "bot", text: botReply };
            return newMessages;
        });

    } catch (error) {
        console.error("Erro ao conectar com a IA:", error);
        // Substitui a mensagem "Digitando..." por uma mensagem de erro
        setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = { sender: "bot", text: "Erro ao me conectar. Tente novamente." };
            return newMessages;
        });
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

      {/* Seu CSS completo aqui */}
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
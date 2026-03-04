import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

const AIAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: '¡Hola! Soy tu asistente experto en Hierbas Ancestrales. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [...messages, { role: 'user', text: userMessage }].map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: "Eres un experto en medicina natural y herbolaria ancestral. Tu objetivo es ayudar a los usuarios a entender los beneficios del 'Manual de Hierbas Ancestrales'. Responde de forma amable, profesional y persuasiva en español. MANTÉN TUS RESPUESTAS MUY BREVES Y CONCISAS (máximo 2-3 oraciones). Si te preguntan por remedios específicos, dales una muestra mínima y recomiéndales comprar el manual para la guía completa.",
        }
      });

      const aiText = response.text || "Lo siento, no pude procesar tu solicitud.";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error('Error calling Gemini:', error);
      setMessages(prev => [...prev, { role: 'model', text: "Hubo un error al conectar con el asistente. Por favor, inténtalo de nuevo." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-ios-green text-white rounded-full shadow-2xl flex items-center justify-center glow-yellow border-2 border-white/20"
      >
        <MessageCircle size={28} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-[400px] h-[600px] max-h-[70vh] glass rounded-[32px] shadow-2xl flex flex-col overflow-hidden border border-white/40"
          >
            {/* Header */}
            <div className="p-4 bg-ios-green text-white flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-black text-sm">Asistente Ancestral</h3>
                  <p className="text-[10px] opacity-80">En línea ahora</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-black/10 flex items-center justify-center transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-ios-bg/50">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-ios-green text-white rounded-tr-none' 
                      : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 rounded-tl-none">
                    <Loader2 size={16} className="animate-spin text-ios-green" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Escribe tu pregunta..."
                  className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ios-green/50 transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="w-10 h-10 rounded-full bg-ios-green text-white flex items-center justify-center disabled:opacity-50 transition-opacity shadow-lg shadow-ios-green/20"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAgent;

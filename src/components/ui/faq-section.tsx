'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  key?: React.Key;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left gap-4 group"
      >
        <span className="font-bold text-gray-900 group-hover:text-ios-green transition-colors">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-gray-400 group-hover:text-ios-green transition-colors"
        >
          <ChevronRight size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-gray-600 text-sm leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function FAQSection() {
  const faqs = [
    {
      question: "¿Cómo recibo el manual?",
      answer: "Lo recibes al instante en tu correo electrónico después de confirmar el pago. Es un proceso automático y seguro."
    },
    {
      question: "¿Es seguro el pago?",
      answer: "Sí, utilizamos plataformas de pago con encriptación de grado bancario (SSL) para garantizar que tus datos estén 100% protegidos."
    },
    {
      question: "¿Tengo garantía?",
      answer: "¡Totalmente! Tienes 60 días de garantía incondicional. Si por cualquier motivo no te gusta, te devolvemos el 100% de tu inversión."
    },
    {
      question: "¿El manual es físico o digital?",
      answer: "Es un manual 100% digital en formato PDF de alta resolución. Esto nos permite entregártelo al instante y que puedas leerlo en cualquier dispositivo."
    },
    {
      question: "¿Necesito ser un experto en plantas?",
      answer: "Para nada. El manual está diseñado para principiantes, con instrucciones paso a paso e ingredientes que ya tienes en tu cocina."
    }
  ];

  return (
    <section id="faq" className="px-6 md:px-12 py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h3 className="text-3xl md:text-4xl font-black text-gray-900">Preguntas Frecuentes</h3>
          <p className="text-gray-500">Todo lo que necesitas saber sobre el manual</p>
        </div>
        
        <div className="glass p-6 md:p-10 rounded-[32px] border border-gray-100 shadow-sm">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}

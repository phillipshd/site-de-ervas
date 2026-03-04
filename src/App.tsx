/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Timer, 
  CheckCircle2, 
  Star, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Leaf, 
  Clock, 
  Users,
  ChevronRight
} from 'lucide-react';
import AIAgent from './components/AIAgent';
import { HoverButton } from "@/components/ui/hover-glow-button";
import { RippleButton } from "@/components/ui/ripple-button";

import chatgpt1 from './assets/chatgpt1.png';
import chatgpt2 from './assets/chatgpt2.png';
import chatgpt3 from './assets/chatgpt3.png';
import chatgpt4 from './assets/chatgpt4.png';
import chatgpt5 from './assets/chatgpt5.png';
import chatgpt6 from './assets/chatgpt6.png';
import chatgpt7 from './assets/chatgpt7.png';
import chatgpt8 from './assets/chatgpt8.png';
import chatgpt9 from './assets/chatgpt9.png';

// --- Types ---
interface Review {
  name: string;
  text: string;
  rating: number;
  date: string;
  avatar?: string;
}

interface Notification {
  id: number;
  name: string;
  action: string;
  time: string;
}

// --- Components ---

const NotificationToast = () => {
  const [notification, setNotification] = useState<Notification | null>(null);
  const names = ['Maria G.', 'Ricardo L.', 'Claudio T.', 'Lidia R.', 'Carolina B.', 'Mariana F.', 'Isabel C.', 'Diana P.'];
  const actions = ['compró el manual ahora', 'acaba de unirse a la oferta', 'recibió sus bonos gratis'];

  useEffect(() => {
    const showNotification = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      setNotification({
        id: Date.now(),
        name: randomName,
        action: randomAction,
        time: 'Hace un momento'
      });

      setTimeout(() => setNotification(null), 5000);
    };

    const interval = setInterval(showNotification, 12000);
    setTimeout(showNotification, 2000); // Initial one

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-20 left-4 z-50 pointer-events-none">
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            className="glass p-3 rounded-2xl shadow-xl flex items-center gap-3 border border-white/40 max-w-[280px]"
          >
            <div className="w-10 h-10 rounded-full bg-ios-green/20 flex items-center justify-center text-ios-green">
              <ShoppingBag size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-800">{notification.name}</p>
              <p className="text-[10px] text-gray-500">{notification.action}</p>
              <p className="text-[9px] text-gray-400 mt-0.5">{notification.time}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="w-full bg-ios-yellow py-3 px-4 flex flex-col items-center justify-center sticky top-0 z-40 shadow-md border-b border-black/5">
      <div className="flex items-center gap-2 text-black font-black text-lg md:text-xl tracking-tighter">
        <Clock size={20} className="animate-pulse" />
        <span>OFERTA ACABA EN: {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</span>
      </div>
      <p className="text-[11px] font-bold text-black/60 uppercase tracking-widest mt-0.5">
        ⚠️ ÚLTIMAS UNIDADES RESTANTES — ¡SOLO HOY!
      </p>
    </div>
  );
};

// Updated CTA Button using HoverButton as requested
const CTAButton = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <a 
    href="https://pay.hotmart.com/P104628529B" 
    target="_blank" 
    rel="noopener noreferrer"
    className="block w-full"
  >
    <HoverButton
      glowColor="#ffcc00"
      backgroundColor="#f97316" // orange-500
      textColor="#ffffff"
      hoverTextColor="#ffffff"
      className={`w-full py-5 px-8 font-black text-xl rounded-2xl shadow-lg animate-pulse-glow flex items-center justify-center gap-3 uppercase tracking-tighter ${className}`}
    >
      {children}
    </HoverButton>
  </a>
);

const FeatureCard = ({ number, title, description, image, reverse = false }: { number: number, title: string, description: string, image: string, reverse?: boolean }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center py-12 border-b border-gray-200`}
  >
    <div className="flex-1 space-y-4">
      <div className="flex items-center gap-3">
        <span className="w-8 h-8 rounded-lg bg-ios-green text-white flex items-center justify-center font-bold text-lg">
          {number}
        </span>
        <h3 className="text-2xl font-black text-gray-900 leading-tight">{title}</h3>
      </div>
      <p className="text-gray-600 leading-relaxed text-lg">{description}</p>
    </div>
    <div className="flex-1 w-full">
      <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
        <img src={image} alt={title} className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
      </div>
    </div>
  </motion.div>
);

const GoogleReview = ({ review }: { review: Review }) => (
  <div className="bg-white p-5 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-100 space-y-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-ios-green/10 flex items-center justify-center overflow-hidden border border-ios-green/20">
          {review.avatar ? (
            <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <span className="text-ios-green font-black text-sm">{review.name[0]}</span>
          )}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <p className="font-bold text-[13px] text-gray-900">{review.name}</p>
            <CheckCircle2 size={12} className="text-blue-500 fill-blue-500/10" />
          </div>
          <p className="text-[10px] text-gray-400 font-medium">{review.date} · Local Guide</p>
        </div>
      </div>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_Logo.svg/2560px-Google_Logo.svg.png" alt="Google" className="h-3 opacity-40 grayscale" referrerPolicy="no-referrer" />
    </div>
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={12} className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} />
      ))}
    </div>
    <p className="text-[13px] text-gray-700 leading-relaxed">"{review.text}"</p>
    <div className="flex items-center gap-4 text-[10px] text-gray-400 pt-1">
      <button className="font-bold hover:text-gray-600 transition-colors">Útil</button>
      <button className="font-bold hover:text-gray-600 transition-colors">Compartir</button>
    </div>
  </div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
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

export default function App() {
  const [showGrid, setShowGrid] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowGrid(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const reviews: Review[] = [
    {
      name: "Martin J.",
      text: "¿Alguien ya lo compró?",
      rating: 5,
      date: "Hace 1 h",
    },
    {
      name: "Ricardo L.",
      text: "¡Lo compré y está excelente! Te llega al email en cuanto pagas. Los remedios para las vías respiratorias me funcionaron increíble. La mezcla de jengibre con limón me quitó un resfriado rapidísimo. Y además sabe bien.",
      rating: 5,
      date: "Hace 57 min",
    },
    {
      name: "Maria G.",
      text: "Lo compré hace un mes en los bonos... y ahora los dan gratis. 🍎 Pero igual, el manual principal vale tanto la pena que no me importa.",
      rating: 5,
      date: "Hace 45 min",
    },
    {
      name: "Claudio T.",
      text: "Lidia, esto te va a encantar para tu taller de terapias naturales.",
      rating: 5,
      date: "Hace 38 min",
    },
    {
      name: "Carolina B.",
      text: "Mi pareja y yo nos enfermamos mucho en invierno... ¿tiene cosas para prevenir? ¿Y cómo se paga?",
      rating: 5,
      date: "Hace 27 min",
    },
    {
      name: "Mariana F.",
      text: "Sí, la sección de salud respiratoria tiene un montón de remedios preventivos. Para pagar solo haces clic en el botón naranja, llenas tus datos y te manda a la página de pago. Después te envían todo por email.",
      rating: 5,
      date: "Hace 20 min",
    },
    {
      name: "Isabel C.",
      text: "Tengo 50 y estaba buscando opciones naturales. Esta guía cambió mi rutina. El batido para la menopausia está riquísimo y me hace sentir increíble.",
      rating: 5,
      date: "Hace 18 min",
    },
    {
      name: "Diana P.",
      text: "Se lo regalé a mi hermana y le encantó. Quedó fascinada con la guía de salud femenina. El batido de equilibrio hormonal ya es parte de su día a día.",
      rating: 5,
      date: "Hace 12 min",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Initial Grid Overlay */}
      <AnimatePresence>
        {showGrid && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid-bg pointer-events-none"
          />
        )}
      </AnimatePresence>

      <CountdownTimer />
      <NotificationToast />

      <main className="w-full max-w-[500px] md:max-w-[800px] lg:max-w-[1000px] bg-white shadow-2xl min-h-screen pb-20 overflow-hidden transition-all duration-500">
        {/* Hero Section */}
        <section className="px-6 md:px-12 pt-12 pb-12 space-y-8 relative">
          <div className="flex flex-col items-center gap-1 text-ios-green font-black text-[10px] md:text-[12px] uppercase tracking-[0.3em]">
            <Leaf size={24} className="mb-2 md:w-8 md:h-8" />
            <span>Manual de Hierbas Ancestrales</span>
          </div>
          
          <h1 className="text-[42px] md:text-[64px] font-black text-gray-900 leading-[1] text-center text-balance tracking-tighter">
            Probé remedios naturales por 30 días — <span className="text-ios-green">Esto fue lo que pasó</span>
          </h1>

          <p className="text-center text-gray-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Olvídate de los suplementos caros. Este <strong>manual digital de 16 US$</strong> está cambiando la vida de miles de personas mayores de 45 que quieren sentirse con más energía, más ligeras y más seguras — de forma natural. Lo recibes <strong>al instante en tu email</strong> y lo abres desde tu celular o computadora.
          </p>

          <div className="relative group max-w-3xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-ios-green to-ios-yellow rounded-[32px] md:rounded-[48px] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative rounded-[28px] md:rounded-[40px] overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src={chatgpt1} 
                alt="Manual de Hierbas Ancestrales" 
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="bg-ios-green/5 p-6 md:p-10 rounded-3xl md:rounded-[40px] border border-ios-green/10 space-y-4 max-w-2xl mx-auto">
            <p className="text-sm md:text-base italic text-gray-700 leading-relaxed">
              "No estoy enferma... pero tampoco me siento bien."
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Esa sensación fue lo que finalmente me empujó a buscar algo más allá de la farmacia — algo más real, más natural y sorprendentemente efectivo.
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              En lugar de comprar otro frasco de cúrcuma, encontré un <strong>libro escrito por una herbolaria con años de experiencia</strong> que venció el cáncer... usando remedios ancestrales.
            </p>
          </div>
        </section>

        {/* CTA 1 */}
        <div className="px-6 md:px-12 py-8 max-w-xl mx-auto">
          <CTAButton>
            SÍ, LO QUIERO AHORA
          </CTAButton>
          <p className="text-center text-[10px] md:text-xs text-gray-400 mt-3">
            Lo recibes al instante por email · Es tuyo para siempre
          </p>
        </div>

        {/* Features Section */}
        <section className="px-6 md:px-12 py-12 md:py-24 bg-gray-50/50">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-16 md:mb-24 text-center leading-tight tracking-tighter max-w-3xl mx-auto">
            Descubre el Manual de Hierbas Ancestrales — El conocimiento ancestral que la medicina moderna olvidó
          </h2>

          <div className="space-y-24 md:space-y-32">
            <FeatureCard 
              number={1}
              title="El poder curativo escondido en tu cocina"
              description="Durante siglos, los herbolarios mezclaron plantas de formas específicas para multiplicar su poder. Eso se llama sinergia botánica. Hoy la ciencia confirma lo que la tradición siempre supo."
              image={chatgpt2}
            />

            <FeatureCard 
              number={2}
              title="Soluciones reales para problemas del día a día — sin salir de tu casa"
              description="Dolor de rodillas, azúcar alta, insomnio, falta de concentración... Este manual digital te da remedios naturales que atacan la raíz del problema. Todo está organizado por síntoma, con instrucciones simples e ingredientes que consigues en cualquier lado."
              image={chatgpt3}
              reverse
            />

            <FeatureCard 
              number={3}
              title="Recuperas tu independencia"
              description="Sin hacer filas ni gastar en frascos caros esta guía te da métodos accesibles para actuar desde hoy, a tu ritmo, desde tu casa. Está diseñada para que crees rutinas diarias claras y fáciles de seguir. Nada genérico, práctico, específico y siempre disponible."
              image={chatgpt4}
            />

            <FeatureCard 
              number={4}
              title="Accede al conocimiento de una experta que ayudó a miles — desde tu cocina"
              description="Con más de 20 años de experiencia, las combinaciones que la autora usa con sus pacientes son exactamente las que encontrarás en este manual. Todo concentrado en un manual digital, listo para usar desde tu propia cocina."
              image={chatgpt5}
              reverse
            />

            <FeatureCard 
              number={5}
              title='Se acabó adivinar "qué funciona" o "qué se puede mezclar"'
              description="Lo más frustrante de los remedios naturales es no saber por dónde empezar. Por eso esta guía está organizada por problema: entras a la sección y ya tienes qué plantas usar, cómo mezclarlas y cómo prepararlas. En minutos sabes exactamente qué hacer, sin información confusa."
              image={chatgpt6}
            />

            <FeatureCard 
              number={6}
              title="Convierte ingredientes comunes en remedios potentes"
              description="Ajo, limón, jengibre, cúrcuma... quizás ya los usas, pero ¿estás aprovechando todo su poder? Con pequeños cambios y combinaciones inteligentes, esos ingredientes se convierten en aliados específicos para dolor, defensas, azúcar en la sangre y digestión — tal como la naturaleza lo diseñó."
              image={chatgpt7}
              reverse
            />

            <FeatureCard 
              number={7}
              title="Técnicas que multiplican los resultados — los secretos que nadie te cuenta"
              description="La forma en que preparas y mezclas hace toda la diferencia. Aprenderás métodos simples (tés, maceraciones, combinaciones específicas) para multiplicar el efecto de cada remedio. No necesitas plantas raras ni equipos costosos: solo saber cómo activar lo que ya tienes."
              image={chatgpt8}
            />

            <FeatureCard 
              number={8}
              title="Crea tu Farmacia Natural — aunque nunca hayas plantado nada"
              description="Con el bono de Jardín Medicinal aprendes a cultivar algunas plantas poderosas en tu patio o balcón, y cosechar lo que necesitas para dormir mejor, fortalecer defensas y mejorar la digestión. No hay nada mejor que cortar hojas frescas y preparar tu remedio, gratis y al instante."
              image={chatgpt9}
              reverse
            />
          </div>
        </section>

        {/* Offer Summary */}
        <section className="px-6 md:px-12 py-16 md:py-24 text-center space-y-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-ios-yellow/20 text-ios-yellow rounded-full text-sm font-bold uppercase tracking-widest border border-ios-yellow/30">
            ✨ Una oferta especial para quien quiere cuidar su salud naturalmente ✨
          </div>
          
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Si llegaste hasta aquí, es porque quieres tomar el control de tu salud. Hoy puedes conseguir el <strong>Manual de Hierbas Ancestrales</strong> por solo <strong>16 US$</strong>.
          </p>

          <div className="space-y-8 max-w-3xl mx-auto">
            <h3 className="font-black text-2xl md:text-4xl text-gray-900 leading-tight">Y eso no es todo... también recibes <span className="text-ios-green">5 BONOS GRATIS</span>:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {[
                'BONO #1: Kit de Emergencias Naturales - GRATIS HOY',
                'BONO #2: Guía para Dormir Profundo - GRATIS HOY',
                'BONO #3: Remedios Naturales para la Ansiedad - GRATIS HOY',
                'BONO #4: Plantas para el Dolor Crónico - GRATIS HOY',
                'BONO #5: Detox de 7 Días - GRATIS HOY'
              ].map((bono, i) => (
                <div key={i} className="flex items-center gap-4 p-5 bg-ios-green/5 rounded-2xl border border-ios-green/10 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-ios-green text-white flex items-center justify-center font-black text-sm flex-shrink-0 shadow-lg shadow-ios-green/20">
                    0{i + 1}
                  </div>
                  <span className="text-sm font-black text-gray-800 tracking-tight uppercase">{bono}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8">
            <p className="text-gray-400 line-through text-xl">Precio normal: 64 US$</p>
            <p className="text-5xl md:text-7xl font-black text-gray-900">Hoy solo <span className="text-ios-green">16 US$</span></p>
          </div>

          <div className="max-w-xl mx-auto">
            <CTAButton>
              SÍ, LO QUIERO AHORA
            </CTAButton>
          </div>
        </section>

        {/* Guarantee */}
        <section className="px-6 md:px-12 py-16 md:py-24 bg-gray-50 border-y border-gray-100">
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
            <div className="w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-ios-yellow/20">
              <ShieldCheck size={48} className="text-ios-yellow" />
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-gray-900">Garantía de 7 Días — Sin Preguntas</h3>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Pruébalo sin riesgo. Si en 7 días no sientes que tienes más energía, duermes mejor o te duele menos, te devolvemos todo tu dinero. No tienes que dar explicaciones. Solo nos escribes y te regresamos cada centavo. <strong>Así de simple.</strong> O te cambiamos la vida, o te devolvemos tu dinero.
            </p>
          </div>
        </section>

        {/* How to receive */}
        <section className="px-6 md:px-12 py-16 md:py-24 bg-ios-green/5 space-y-12">
          <div className="text-center space-y-2">
            <h3 className="text-3xl md:text-4xl font-black text-gray-900 flex items-center justify-center gap-3">
              <ShoppingBag className="text-ios-green w-8 h-8 md:w-10 md:h-10" />
              Cómo recibir tu manual digital
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: 1, text: 'Haz clic en el botón naranja para ir a la página de pago.' },
              { step: 2, text: 'Llena tus datos y elige tu forma de pago. Todo está protegido y seguro.' },
              { step: 3, text: 'Confirma el pago y recibes al instante el manual en tu correo electrónico, listo para ver desde cualquier dispositivo.' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-4 p-6 bg-white rounded-[32px] shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-ios-green text-white flex items-center justify-center font-black text-xl flex-shrink-0">
                  {item.step}
                </div>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  <strong>Paso {item.step}:</strong> {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-4 max-w-xl mx-auto">
            <CTAButton className="glow-yellow">
              SÍ, LO QUIERO AHORA
            </CTAButton>
          </div>
        </section>

        {/* Reviews */}
        <section className="px-6 md:px-12 py-16 md:py-24 space-y-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <h3 className="text-3xl md:text-4xl font-black text-gray-900">Opiniones de clientes</h3>
            <div className="flex items-center gap-2 text-ios-yellow bg-ios-yellow/10 px-4 py-2 rounded-full">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-current" />)}
              </div>
              <span className="font-black text-lg">4.9/5</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GoogleReview review={review} />
              </motion.div>
            ))}
          </div>

          <div className="pt-8 max-w-xl mx-auto">
            <CTAButton>
              SÍ, LO QUIERO AHORA
            </CTAButton>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-6 md:px-12 py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="text-center space-y-2">
              <h3 className="text-3xl md:text-4xl font-black text-gray-900">Preguntas Frecuentes</h3>
              <p className="text-gray-500">Todo lo que necesitas saber sobre el manual</p>
            </div>
            
            <div className="glass p-6 md:p-10 rounded-[32px] border border-gray-100 shadow-sm">
              <FAQItem 
                question="¿Cómo recibo el manual?" 
                answer="Lo recibes al instante en tu correo electrónico después de confirmar el pago. Es un proceso automático y seguro." 
              />
              <FAQItem 
                question="¿Es seguro el pago?" 
                answer="Sí, utilizamos plataformas de pago con encriptación de grado bancario (SSL) para garantizar que tus datos estén 100% protegidos." 
              />
              <FAQItem 
                question="¿Tengo garantía?" 
                answer="¡Totalmente! Tienes 7 días de garantía incondicional. Si por cualquier motivo no te gusta, te devolvemos el 100% de tu inversión." 
              />
              <FAQItem 
                question="¿El manual es físico o digital?" 
                answer="Es un manual 100% digital en formato PDF de alta resolución. Esto nos permite entregártelo al instante y que puedas leerlo en cualquier dispositivo." 
              />
              <FAQItem 
                question="¿Necesito ser un experto en plantas?" 
                answer="Para nada. El manual está diseñado para principiantes, con instrucciones paso a paso e ingredientes que ya tienes en tu cocina." 
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-12 bg-gray-900 text-white text-center space-y-6">
          <div className="flex items-center justify-center gap-2 text-ios-green font-bold text-xs uppercase tracking-widest">
            <Leaf size={14} />
            <span>Hierbas Ancestrales</span>
          </div>
          <p className="text-[10px] text-gray-600">
            © {new Date().getFullYear()} Manual de Hierbas Ancestrales. Todos los derechos reservados.
          </p>
        </footer>
      </main>
      <AIAgent />
    </div>
  );
}

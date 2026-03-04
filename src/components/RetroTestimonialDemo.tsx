import React from 'react';
import { Carousel, TestimonialCard, iTestimonial } from "./ui/retro-testimonial";

type TestimonialDetails = {
  [key: string]: iTestimonial & { id: string };
};

const testimonialData = {
  ids: [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
  ],
  details: {
    "1": {
      id: "1",
      description:
        "¡Lo compré y está excelente! Te llega al email en cuanto pagas. Los remedios para las vías respiratorias me funcionaron increíble. La mezcla de jengibre con limón me quitó un resfriado rapidísimo.",
      profileImage:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
      name: "Ricardo L.",
      designation: "Cliente Verificado",
    },
    "2": {
      id: "2",
      description:
        "Tengo 50 y estaba buscando opciones naturales. Esta guía cambió mi rutina. El batido para la menopausia está riquísimo y me hace sentir increíble.",
      profileImage:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      name: "Isabel C.",
      designation: "Cliente Verificado",
    },
    "3": {
      id: "3",
      description:
        "Lo compré hace un mes en los bonos... y ahora los dan gratis. Pero igual, el manual principal vale tanto la pena que no me importa. ¡Muy recomendado!",
      profileImage:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      name: "Maria G.",
      designation: "Cliente Verificado",
    },
    "4": {
      id: "4",
      description:
        "Se lo regalé a mi hermana y le encantó. Quedó fascinada con la guía de salud femenina. El batido de equilibrio hormonal ya es parte de su día a día.",
      profileImage:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      name: "Diana P.",
      designation: "Cliente Verificado",
    },
    "5": {
      id: "5",
      description:
        "La sección de salud respiratoria tiene un montón de remedios preventivos. Para pagar solo haces clic en el botón naranja, llenas tus datos y te manda a la página de pago.",
      profileImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      name: "Mariana F.",
      designation: "Cliente Verificado",
    },
    "6": {
      id: "6",
      description:
        "Lidia, esto te va a encantar para tu taller de terapias naturales. Es la guía más completa que he encontrado sobre hierbas ancestrales.",
      profileImage:
        "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79",
      name: "Claudio T.",
      designation: "Cliente Verificado",
    },
  },
};

const RetroTestimonialDemo = () => {
  const cards = testimonialData.ids.map((cardId: string, index: number) => {
    const details = testimonialData.details as TestimonialDetails;
    return (
      <TestimonialCard
        key={cardId}
        testimonial={details[cardId]}
        index={index}
        backgroundImage="https://images.unsplash.com/photo-1528458965990-428de4b1cb0d?q=80&w=3129&auto=format&fit=crop"
      />
    );
  });

  return (
    <div className="w-full">
      <Carousel items={cards} />
    </div>
  );
};

export { RetroTestimonialDemo };

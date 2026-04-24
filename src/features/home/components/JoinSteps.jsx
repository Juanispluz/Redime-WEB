import React from 'react';
import StepCard from './StepCard';

const JoinSteps = () => {
  const steps = [
    {
      badgeClass: "bg-green",
      badgeText: "Paso 1",
      title: "Descarga y Registro",
      desc: "Busca \"REDIME\" en tu tienda favorita. Crea tu perfil de prosumidor para empezar a sumar puntos ambientales.",
      icons: [
        { src: "/Google Play .png", alt: "Google Play" },
        { src: "/App Store.png", alt: "App Store" }
      ]
    },
    {
      badgeClass: "bg-blue",
      badgeText: "Paso 2",
      title: "Solicitar Recolección",
      desc: "Usa el botón de \"Recoger dispositivos\" o \"Ver puntos de reciclaje\" en la app. Puedes pedir que pasemos por tu casa o localizar el punto más cercano.",
      icons: [
        { src: "/Truck.png", alt: "Truck" },
        { src: "/Pin_1.png", alt: "Pin" }
      ]
    },
    {
      badgeClass: "bg-salmon",
      badgeText: "Paso 3",
      title: "Sube tu Memoria",
      desc: "Completa el formulario de historia. Sube tu foto y un relato de tu dispositivo para que viva en el museo digital.",
      icons: [
        { src: "/Camera.png", alt: "Camera" },
        { src: "/Pen.png", alt: "Pen" }
      ]
    }
  ];

  return (
    <section id="unete" className="join-section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Únete al cambio en 3 pasos</h2>
          <p className="section-desc">Nuestra app es la herramienta principal para gestionar la recolección y registrar tu memoria digital.</p>
        </div>
        
        <div className="steps-cards-grid">
          {steps.map((step, index) => (
            <StepCard key={index} {...step} />
          ))}
        </div>
        
        <div className="app-download-footer text-center mt-8">
          <img src="/Consíguelo en Google Play _1.png" alt="Consíguelo en Google Play" style={{height: '50px', margin: '0 10px'}} />
          <img src="/Próximamente en App Store_1.png" alt="Próximamente App Store" style={{height: '50px', margin: '0 10px'}} />
        </div>
      </div>
    </section>
  );
};

export default JoinSteps;

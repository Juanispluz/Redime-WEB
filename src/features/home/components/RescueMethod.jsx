import React from 'react';
import { Link } from 'react-router-dom';
import RescueCard from './RescueCard';

const RescueMethod = () => {
  const rescueMethods = [
    {
      iconSrc: "/Camión.png",
      iconAlt: "Camión",
      accentColor: "#2d7a6a",
      title: "Recogida a Domicilio",
      subtitle: "Para equipos medianos y grandes",
      steps: [
        { number: 1, boldText: "Agendas en la App", descText: "Seleccionas fecha y hora. Describe el equipo para preparar nuestra logística." },
        { number: 2, boldText: "Confirmación de Ruta", descText: "Recibes una notificación cuando el recolector esté en camino a tu ubicación." },
        { number: 3, boldText: "Recolección Segura", descText: "Entregas el equipo. Nosotros nos encargamos del embalaje y transporte." }
      ]
    },
    {
      iconSrc: "/Pin.png",
      iconAlt: "Pin",
      accentColor: "#387373",
      title: "Puntos de Depósito",
      subtitle: "Disponible en puntos de reciclaje autorizados",
      steps: [
        { number: 1, boldText: "Localiza el Buzón", descText: "Encuentra el contenedor REDIME más cercano usando el mapa de la app." },
        { number: 2, boldText: "Escanea y Deposita", descText: "Escanea el código QR del contenedor para abrir la compuerta y registrar tu entrega." },
        { number: 3, boldText: "Redención Instantánea", descText: "Tus puntos y la confirmación de memoria se cargan de inmediato a tu perfil." }
      ]
    }
  ];

  return (
    <section id="rescue" className="rescue-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="text-green-tag">¿Como rescatamos a los dispositivos?</span>
          <h2 className="section-title">Nuestro Método de Rescate</h2>
          <p className="section-desc">Ya sea desde tu sofá o en un punto físico, Redime hace que reciclar memoria sea simple y transparente.</p>
        </div>

        <div className="rescue-grid">
          {rescueMethods.map((method, index) => (
            <RescueCard key={index} {...method} />
          ))}
        </div>
      </div>

      {/* Survey CTA — same style as join-v2-download */}
      <div className="container">
        <div className="rescue-survey-cta">
          <span className="text-green-tag">Conoce tu perfil digital</span>
          <h3 className="rescue-survey-title">¿Qué tipo de relación tienes con tu teléfono?</h3>
          <p className="rescue-survey-desc">Responde 10 preguntas y descubre tu arquetipo digital. Solo toma 2 minutos.</p>
          <Link to="/encuesta" className="remember-cta-btn">
            Hacer la encuesta
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="splash-arrow">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RescueMethod;

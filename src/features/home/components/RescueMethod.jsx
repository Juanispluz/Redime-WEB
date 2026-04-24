import React from 'react';
import RescueCard from './RescueCard';

const RescueMethod = () => {
  const rescueMethods = [
    {
      iconSrc: "/Camión.png",
      iconAlt: "Camión",
      iconBgClass: "bg-light-green",
      title: "Recogida a Domicilio",
      subtitleClass: "text-green",
      subtitle: "Para equipos medianos y grandes",
      steps: [
        { number: 1, bgClass: "bg-green", boldText: "Agendas en la App", descText: "Seleccionas fecha y hora. Describe el equipo para preparar nuestra logística." },
        { number: 2, bgClass: "bg-green", boldText: "Confirmación de Ruta", descText: "Recibes una notificación cuando el recolector esté en camino a tu ubicación." },
        { number: 3, bgClass: "bg-green", boldText: "Recolección Segura", descText: "Entregas el equipo. Nosotros nos encargamos del embalaje y transporte." }
      ]
    },
    {
      iconSrc: "/Pin.png",
      iconAlt: "Pin",
      iconBgClass: "bg-light-blue",
      title: "Puntos de Depósito",
      subtitleClass: "text-blue",
      subtitle: "Disponibilidad de Lunes a sábado en sedes ITM",
      steps: [
        { number: 1, bgClass: "bg-blue", boldText: "Localiza el Buzón", descText: "Encuentra el contenedor REDIME más cercano usando el mapa de la app." },
        { number: 2, bgClass: "bg-blue", boldText: "Escanea y Deposita", descText: "Escanea el código QR del contenedor para abrir la compuerta y registrar tu entrega." },
        { number: 3, bgClass: "bg-blue", boldText: "Redención Instantánea", descText: "Tus puntos y la confirmación de memoria se cargan de inmediato a tu perfil." }
      ]
    }
  ];

  return (
    <section className="rescue-section">
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
    </section>
  );
};

export default RescueMethod;

import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../../styles/components.css';

const HomeView = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      id: 1,
      badge: "Meta alcanzada",
      title: "Logramos 10 toneladas esta semana",
      desc: "Gracias al compromiso ciudadano y superamos nuestra meta ambiental de octubre.",
      img: "/blog_1.png",
      btnText: "Leer artículo"
    },
    {
      id: 2,
      badge: "Nueva apertura",
      title: "Se inaugura nueva planta de procesamiento",
      desc: "Más de 500 metros cuadrados dedicados al reciclaje de residuos electrónicos.",
      img: "/blog_2.png",
      btnText: "Leer artículo"
    },
    {
      id: 3,
      badge: "Educación",
      title: "Alianza educativa a nivel departamental",
      desc: "El nuevo programa de REDIME llegará a miles de estudiantes en el país.",
      img: "/blog_3.png",
      btnText: "Leer artículo"
    },
    {
      id: 4,
      badge: "Impacto ambiental",
      title: "El impacto histórico al reciclar baterías",
      desc: "Conoce cómo estamos salvando las reservas locales a través de este proceso.",
      img: "/blog_4.png",
      btnText: "Leer artículo"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="home-page-v2">
      {/* HERO SECTION */}
      <section className="hero-section-v2" style={{ 
          backgroundImage: `url(${slides[currentSlide].img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 0.5s ease-in-out',
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          position: 'relative'
        }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,30,20,0.55)', zIndex: 1 }}></div>
        <div className="container hero-container-v2" style={{ padding: '2.5rem', zIndex: 10, position: 'relative' }}>
          <span className="badge-meta">{slides[currentSlide].badge}</span>
          <h1 className="hero-title-v2" style={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}>{slides[currentSlide].title}</h1>
          <p className="hero-subtitle-v2" style={{ color: '#e5e7eb', marginBottom: '1.5rem', textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>{slides[currentSlide].desc}</p>
          <Link to={`/blog/${slides[currentSlide].id}`} className="btn btn-primary mt-4" style={{border: 'none', display: 'inline-flex'}}>
            {slides[currentSlide].btnText} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* METODO DE RESCATE */}
      <section className="rescue-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="text-green-tag">¿Como rescatamos a los dispositivos?</span>
            <h2 className="section-title">Nuestro Método de Rescate</h2>
            <p className="section-desc">Ya sea desde tu sofá o en un punto físico, Redime hace que reciclar memoria sea simple y transparente.</p>
          </div>
          
          <div className="rescue-grid">
            <div className="rescue-card">
              <div className="rescue-card-header">
                <div className="rescue-icon bg-light-green"><img src="/Camión.png" alt="Camión" style={{ width: '40px', height: '40px', objectFit: 'contain' }} /></div>
                <div>
                  <h3>Recogida a Domicilio</h3>
                  <span className="rescue-subtitle text-green">Para equipos medianos y grandes</span>
                </div>
              </div>
              <ul className="rescue-steps-list">
                <li><span className="step-circle bg-green">1</span> <div><strong>Agendas en la App:</strong> Seleccionas fecha y hora. Describe el equipo para preparar nuestra logística.</div></li>
                <li><span className="step-circle bg-green">2</span> <div><strong>Confirmación de Ruta:</strong> Recibes una notificación cuando el recolector esté en camino a tu ubicación.</div></li>
                <li><span className="step-circle bg-green">3</span> <div><strong>Recolección Segura:</strong> Entregas el equipo. Nosotros nos encargamos del embalaje y transporte.</div></li>
              </ul>
            </div>

            <div className="rescue-card">
              <div className="rescue-card-header">
                <div className="rescue-icon bg-light-blue"><img src="/Pin.png" alt="Pin" style={{ width: '40px', height: '40px', objectFit: 'contain' }} /></div>
                <div>
                  <h3>Puntos de Depósito</h3>
                  <span className="rescue-subtitle text-blue">Disponibilidad de Lunes a sábado en sedes ITM</span>
                </div>
              </div>
              <ul className="rescue-steps-list">
                <li><span className="step-circle bg-blue">1</span> <div><strong>Localiza el Buzón:</strong> Encuentra el contenedor REDIME más cercano usando el mapa de la app.</div></li>
                <li><span className="step-circle bg-blue">2</span> <div><strong>Escanea y Deposita:</strong> Escanea el código QR del contenedor para abrir la compuerta y registrar tu entrega.</div></li>
                <li><span className="step-circle bg-blue">3</span> <div><strong>Redención Instantánea:</strong> Tus puntos y la confirmación de memoria se cargan de inmediato a tu perfil.</div></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* UNETE AL CAMBIO */}
      <section id="unete" className="join-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Únete al cambio en 3 pasos</h2>
            <p className="section-desc">Nuestra app es la herramienta principal para gestionar la recolección y registrar tu memoria digital.</p>
          </div>
          
          <div className="steps-cards-grid">
            <div className="step-card">
              <span className="step-badge bg-green">Paso 1</span>
              <h3>Descarga y Registro</h3>
              <p>Busca "REDIME" en tu tienda favorita. Crea tu perfil de prosumidor para empezar a sumar puntos ambientales.</p>
              <div className="stores-icons">
                <img src="/Google Play .png" alt="Google Play" className="store-ic" />
                <img src="/App Store.png" alt="App Store" className="store-ic" />
              </div>
            </div>
            
            <div className="step-card">
              <span className="step-badge bg-blue">Paso 2</span>
              <h3>Solicitar Recolección</h3>
              <p>Usa el botón de "Recoger dispositivos" o "Ver puntos de reciclaje" en la app. Puedes pedir que pasemos por tu casa o localizar el punto más cercano.</p>
              <div className="stores-icons">
                <img src="/Truck.png" alt="Truck" className="store-ic" />
                <img src="/Pin_1.png" alt="Pin" className="store-ic" />
              </div>
            </div>

            <div className="step-card">
              <span className="step-badge bg-salmon">Paso 3</span>
              <h3>Sube tu Memoria</h3>
              <p>Completa el formulario de historia. Sube tu foto y un relato de tu dispositivo para que viva en el museo digital.</p>
              <div className="stores-icons">
                <img src="/Camera.png" alt="Camera" className="store-ic" />
                <img src="/Pen.png" alt="Pen" className="store-ic" />
              </div>
            </div>
          </div>
          
          <div className="app-download-footer text-center mt-8">
            <img src="/Consíguelo en Google Play _1.png" alt="Consíguelo en Google Play" style={{height: '50px', margin: '0 10px'}} />
            <img src="/Próximamente en App Store_1.png" alt="Próximamente App Store" style={{height: '50px', margin: '0 10px'}} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeView;

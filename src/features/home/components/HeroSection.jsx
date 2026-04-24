import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
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
  );
};

export default HeroSection;

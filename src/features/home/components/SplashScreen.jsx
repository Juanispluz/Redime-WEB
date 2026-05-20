import React, { useState, useEffect } from 'react';

const SplashScreen = ({ onExplore }) => {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  // Previene el scroll mientras el splash está activo
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  const handleExplore = () => {
    setLeaving(true);
    setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = '';
      if (onExplore) onExplore();
      // Scroll suave a la sección intro
      const intro = document.getElementById('intro-section');
      if (intro) {
        intro.scrollIntoView({ behavior: 'smooth' });
      }
    }, 900);
  };

  if (!visible) return null;

  return (
    <div className={`splash-overlay ${leaving ? 'splash-leaving' : ''}`}>
      {/* Partículas animadas de fondo */}
      <div className="splash-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="splash-particle" style={{ '--i': i }} />
        ))}
      </div>

      {/* Círculos decorativos */}
      <div className="splash-circle splash-circle-1" />
      <div className="splash-circle splash-circle-2" />
      <div className="splash-circle splash-circle-3" />

      {/* Contenido central */}
      <div className="splash-content">
        {/* Logo */}
        <div className="splash-logo-wrapper">
          <img
            src="/redime_logo_blanco.webp"
            alt="Redime Logo"
            className="splash-logo"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>

        {/* Chip de categoría */}
        <div className="splash-chip">
          <span className="splash-chip-dot" />
          Proyecto de Reciclaje con Propósito
        </div>

        {/* Título principal */}
        <h1 className="splash-title">
          <span className="splash-title-thin">Redime</span>
          <span className="splash-title-divider">,</span>
          <br />
          <span className="splash-title-main">Reciclaje de Dispositivos</span>
          <br />
          <span className="splash-title-accent">con Memoria</span>
        </h1>

        {/* Subtítulo */}
        <p className="splash-subtitle">
          Dale una segunda vida a tus equipos tecnológicos.<br />
          Cada dispositivo tiene una historia que merece ser contada.
        </p>

        {/* Botón CTA */}
        <button className="splash-cta-btn" onClick={handleExplore}>
          <span>Explorar proyecto</span>
          <svg className="splash-arrow" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>

      </div>
    </div>
  );
};

export default SplashScreen;

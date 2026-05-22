import React, { useState } from 'react';

const steps = [
  {
    id: 1,
    badge: 'Paso 1',
    badgeColor: '#2d7a6a',
    title: 'Descarga y Registro',
    summary: 'Disponible en Google Play y App Store',
    desc: 'Busca "REDIME" en tu tienda favorita e instala la app. Crea tu perfil de prosumidor en menos de 2 minutos y empieza a acumular puntos ambientales con cada dispositivo que entregues.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
        <line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
    storeIcons: [
      { src: '/Google Play .png', alt: 'Google Play', label: 'Google Play' },
      { src: '/App Store.png', alt: 'App Store', label: 'App Store' }
    ],
    highlight: 'Gratuita · Sin publicidad · Sin comisiones'
  },
  {
    id: 2,
    badge: 'Paso 2',
    badgeColor: '#387373',
    title: 'Solicita la Recolección',
    summary: 'A domicilio o en punto de reciclaje',
    desc: 'Desde la app elige si quieres que pasemos por tu casa o prefieres depositar tu dispositivo en el punto de reciclaje más cercano. El proceso toma menos de 5 minutos.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="1"/>
        <path d="M16 8h4l3 3v4h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    storeIcons: [],
    highlight: 'Llega el mismo día · Embalaje incluido'
  },
  {
    id: 3,
    badge: 'Paso 3',
    badgeColor: '#7a4d2d',
    title: 'Sube tu Memoria',
    summary: 'Dale vida a la historia de tu dispositivo',
    desc: 'Cuéntanos la historia de tu dispositivo: cuánto tiempo lo tuviste, qué recuerdos guarda. Tu relato quedará en el Museo Digital de la Memoria Electrónica para que todos puedan verlo.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
    ),
    storeIcons: [],
    highlight: 'Tu historia vivirá en el museo digital'
  }
];

const JoinSteps = () => {
  const [active, setActive] = useState(0);
  const current = steps[active];

  return (
    <section id="unete" className="join-v2-section">
      {/* Decoración de fondo */}
      <div className="join-v2-blob join-v2-blob-1" aria-hidden="true" />
      <div className="join-v2-blob join-v2-blob-2" aria-hidden="true" />

      <div className="container join-v2-inner">

        {/* ── Cabecera ── */}
        <div className="join-v2-header">
          <span className="join-v2-chip">
            <span className="join-v2-chip-dot" />
            Únete al cambio
          </span>
          <h2 className="join-v2-title">
            3 pasos para<br />
            <span className="join-v2-title-accent">transformar tu memoria</span>
          </h2>
          <p className="join-v2-subtitle">
            Con la app REDIME, reciclar es tan simple como contar una historia.
          </p>
        </div>

        {/* ── Layout principal: selector + panel ── */}
        <div className="join-v2-layout">

          {/* Lista de pasos (selector) */}
          <div className="join-v2-steps">
            {steps.map((step, idx) => (
              <button
                key={step.id}
                className={`join-v2-step-btn ${active === idx ? 'active' : ''}`}
                onClick={() => setActive(idx)}
                style={{ '--step-color': step.badgeColor }}
              >
                <span className="join-v2-step-num" style={{ backgroundColor: step.badgeColor }}>
                  {step.id}
                </span>
                <div className="join-v2-step-text">
                  <span className="join-v2-step-label">{step.badge}</span>
                  <span className="join-v2-step-title">{step.title}</span>
                </div>
                <svg className="join-v2-step-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            ))}

            {/* Conector visual entre pasos */}
            <div className="join-v2-connector" />
          </div>

          {/* Panel de detalle */}
          <div className="join-v2-panel" key={active}>
            <div className="join-v2-panel-icon-wrap" style={{ borderColor: `${current.badgeColor}44`, backgroundColor: `${current.badgeColor}12` }}>
              <span style={{ color: current.badgeColor }}>{current.icon}</span>
            </div>

            <span className="join-v2-panel-badge" style={{ backgroundColor: current.badgeColor }}>
              {current.badge}
            </span>

            <h3 className="join-v2-panel-title">{current.title}</h3>
            <p className="join-v2-panel-summary">{current.summary}</p>
            <p className="join-v2-panel-desc">{current.desc}</p>

            <div className="join-v2-panel-highlight">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: current.badgeColor, flexShrink: 0 }}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{current.highlight}</span>
            </div>

            {current.storeIcons.length > 0 && (
              <div className="join-v2-panel-stores">
                {current.storeIcons.map((icon) => (
                  <img key={icon.alt} src={icon.src} alt={icon.alt} className="join-v2-store-icon" />
                ))}
              </div>
            )}

            {/* Navegación de pasos en el panel */}
            <div className="join-v2-panel-nav">
              <button
                className="join-v2-nav-btn"
                onClick={() => setActive(Math.max(0, active - 1))}
                disabled={active === 0}
              >
                ← Anterior
              </button>
              <div className="join-v2-dots">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    className={`join-v2-dot ${active === i ? 'active' : ''}`}
                    style={{ backgroundColor: active === i ? current.badgeColor : undefined }}
                    onClick={() => setActive(i)}
                    aria-label={`Paso ${i + 1}`}
                  />
                ))}
              </div>
              <button
                className="join-v2-nav-btn"
                onClick={() => setActive(Math.min(steps.length - 1, active + 1))}
                disabled={active === steps.length - 1}
              >
                Siguiente →
              </button>
            </div>
          </div>
        </div>

        {/* ── CTA de descarga ── */}
        <div className="join-v2-download">
          <p className="join-v2-download-label">Descarga la app y empieza hoy</p>
          <div className="join-v2-download-btns">
            <a href="#" className="join-v2-dl-btn">
              <img src="/Consíguelo en Google Play _1.png" alt="Consíguelo en Google Play" />
            </a>
            <a href="#" className="join-v2-dl-btn">
              <img src="/Próximamente en App Store_1.png" alt="Próximamente en App Store" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default JoinSteps;

import React, { useState } from 'react';

const RescueCard = ({ iconSrc, iconAlt, accentColor, title, subtitle, steps }) => {
  const [openStep, setOpenStep] = useState(null);

  const toggle = (idx) => setOpenStep(openStep === idx ? null : idx);

  return (
    <div className="rsc-card">
      {/* Cabecera de la tarjeta */}
      <div className="rsc-card-header">
        <div className="rsc-icon-wrap" style={{ backgroundColor: `${accentColor}22`, border: `1px solid ${accentColor}55` }}>
          <img src={iconSrc} alt={iconAlt} style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
        </div>
        <div>
          <h3 className="rsc-title">{title}</h3>
          <span className="rsc-subtitle" style={{ color: accentColor }}>{subtitle}</span>
        </div>
      </div>

      {/* Lista de pasos como acordeones */}
      <div className="rsc-accordion-list">
        {steps.map((step, idx) => (
          <div key={idx} className={`rsc-acc-item ${openStep === idx ? 'open' : ''}`}>
            <button
              className="rsc-acc-trigger"
              onClick={() => toggle(idx)}
              aria-expanded={openStep === idx}
            >
              <span className="rsc-acc-num" style={{ backgroundColor: accentColor, color: 'white' }}>
                {step.number}
              </span>
              <span className="rsc-acc-label">{step.boldText}</span>
              <svg
                className="rsc-acc-chevron"
                width="18" height="18"
                viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: openStep === idx ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="rsc-acc-body" style={{ maxHeight: openStep === idx ? '120px' : '0px' }}>
              <p className="rsc-acc-text">{step.descText}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RescueCard;


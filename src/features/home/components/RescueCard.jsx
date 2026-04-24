import React from 'react';

const RescueCard = ({ iconSrc, iconAlt, iconBgClass, title, subtitleClass, subtitle, steps }) => {
  return (
    <div className="rescue-card">
      <div className="rescue-card-header">
        <div className={`rescue-icon ${iconBgClass}`}>
          <img src={iconSrc} alt={iconAlt} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
        </div>
        <div>
          <h3>{title}</h3>
          <span className={`rescue-subtitle ${subtitleClass}`}>{subtitle}</span>
        </div>
      </div>
      <ul className="rescue-steps-list">
        {steps.map((step, index) => (
          <li key={index}>
            <span className={`step-circle ${step.bgClass}`}>{step.number}</span> 
            <div><strong>{step.boldText}:</strong> {step.descText}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RescueCard;

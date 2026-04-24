import React from 'react';

const StepCard = ({ badgeClass, badgeText, title, desc, icons }) => {
  return (
    <div className="step-card">
      <span className={`step-badge ${badgeClass}`}>{badgeText}</span>
      <h3>{title}</h3>
      <p>{desc}</p>
      <div className="stores-icons">
        {icons.map((icon, index) => (
          <img key={index} src={icon.src} alt={icon.alt} className="store-ic" />
        ))}
      </div>
    </div>
  );
};

export default StepCard;

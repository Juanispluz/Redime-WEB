import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MuseumCard = ({ id, exhibitionNum, title, imgSrc, imgAlt }) => {
  return (
    <div className="museo-card">
      <div className="museo-img-placeholder">
        <img src={imgSrc} alt={imgAlt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div className="museo-img-title-overlay">
          <span className="museo-exh-num">Exhibición #{exhibitionNum}</span>
          <h2>{title}</h2>
        </div>
      </div>
      <Link to={`/museo/${id}`} className="museo-card-footer">
        <span>Conoce su historia</span>
        <ArrowRight size={24} className="text-blue" />
      </Link>
    </div>
  );
};

export default MuseumCard;

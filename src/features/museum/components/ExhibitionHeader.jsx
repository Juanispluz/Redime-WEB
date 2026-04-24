import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExhibitionHeader = ({ heroImg, tag, title, sub }) => {
  return (
    <div className="exh-det-header-bg" style={{ 
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${heroImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="container" style={{ position: 'relative' }}>
        <Link to="/museo" className="back-arrow-exh" style={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
          <ArrowLeft size={32} />
        </Link>
        <div className="exh-det-header-content text-center">
          <span className="text-blue-tag" style={{ color: '#e4f2e7', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>{tag}</span>
          <h1 className="exh-det-title" style={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>{title}</h1>
          <p className="exh-det-sub" style={{ color: '#f3f4f6', textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>{sub}</p>
        </div>
      </div>
    </div>
  );
};

export default ExhibitionHeader;

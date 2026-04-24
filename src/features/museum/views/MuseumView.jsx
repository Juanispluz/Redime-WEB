import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import MuseumCard from '../components/MuseumCard';

const MuseumView = () => {
  const exhibitions = [
    { id: '2', exhibitionNum: '2', title: 'El Faro del Ojo Público', imgSrc: '/museo_2.png', imgAlt: 'El Faro' },
    { id: '1', exhibitionNum: '1', title: 'El Trono del Espectador Olvidado', imgSrc: '/museo_1.png', imgAlt: 'El Trono' },
    { id: '3', exhibitionNum: '3', title: 'El Altar del Primer Esfuerzo', imgSrc: '/museo_3.png', imgAlt: 'El Altar' }
  ];

  return (
    <div className="museo-page">
      <div className="container" style={{ position: 'relative' }}>
        
        <Link to="/" style={{ position: 'absolute', top: '20px', left: '15px', color: '#2d3e40' }}>
          <ArrowLeft size={32} />
        </Link>

        <div className="museo-header text-center">
          <span className="text-blue-tag">Exhibiciones itinerantes</span>
          <h1 className="section-title">Museo de la Memoria Electrónica</h1>
          <p className="section-desc">Selecciona una obra para escuchar su voz y descubrir las historias de quienes la hicieron posible.</p>
        </div>

        <div className="museo-list">
          {exhibitions.map((exh) => (
            <MuseumCard key={exh.id} {...exh} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default MuseumView;

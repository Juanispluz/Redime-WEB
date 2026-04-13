import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const MuseumView = () => {
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
          
          <div className="museo-card">
            <div className="museo-img-placeholder">
              <img src="/museo_2.png" alt="El Faro" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div className="museo-img-title-overlay">
                <span className="museo-exh-num">Exhibición #2</span>
                <h2>El Faro del Ojo Público</h2>
              </div>
            </div>
            <Link to="/museo/2" className="museo-card-footer">
              <span>Conoce su historia</span>
              <ArrowRight size={24} className="text-blue" />
            </Link>
          </div>

          <div className="museo-card">
            <div className="museo-img-placeholder">
              <img src="/museo_1.png" alt="El Trono" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div className="museo-img-title-overlay">
                <span className="museo-exh-num">Exhibición #1</span>
                <h2>El Trono del Espectador Olvidado</h2>
              </div>
            </div>
            <Link to="/museo/1" className="museo-card-footer">
              <span>Conoce su historia</span>
              <ArrowRight size={24} className="text-blue" />
            </Link>
          </div>

          <div className="museo-card">
            <div className="museo-img-placeholder">
              <img src="/museo_3.png" alt="El Altar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div className="museo-img-title-overlay">
                <span className="museo-exh-num">Exhibición #3</span>
                <h2>El Altar del Primer Esfuerzo</h2>
              </div>
            </div>
            <Link to="/museo/3" className="museo-card-footer">
              <span>Conoce su historia</span>
              <ArrowRight size={24} className="text-blue" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default MuseumView;

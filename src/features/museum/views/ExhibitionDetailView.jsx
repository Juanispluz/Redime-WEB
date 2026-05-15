import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { exhibitionData } from '../data/exhibitionData';
import ExhibitionHeader from '../components/ExhibitionHeader';
import ExhibitionBody from '../components/ExhibitionBody';
import ExhibitionMemories from '../components/ExhibitionMemories';
import { useMuseumViewModel } from '../viewmodels/useMuseumViewModel';

const ExhibitionDetailView = () => {
  const { id } = useParams();
  const exh = exhibitionData[id] || exhibitionData[1];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Mapeo del ID de exhibición a las categorías de dispositivos en la Base de Datos
  const categoryMap = {
    '1': 'telecommunications',
    '2': 'monitors', // Asumiendo que esta es la categoría de pantallas/monitores
    '3': 'components' // Asumiendo componentes internos
  };
  const category = categoryMap[id] || 'telecommunications';
  
  // Obtenemos las memorias reales desde Firebase
  const { devices, isLoading } = useMuseumViewModel(category);

  return (
    <div className="exh-det-page">
      <ExhibitionHeader 
        heroImg={exh.heroImg} 
        tag={exh.tag} 
        title={exh.title} 
        sub={exh.sub} 
      />
      <ExhibitionBody 
        paragraphs={exh.paragraphs} 
        contextImg={exh.contextImg} 
        title={exh.title} 
      />
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Cargando memorias...</div>
      ) : (
        <ExhibitionMemories devices={devices} />
      )}
    </div>
  );
};

export default ExhibitionDetailView;

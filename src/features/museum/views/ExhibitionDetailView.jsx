import React from 'react';
import { useParams } from 'react-router-dom';
import { exhibitionData } from '../data/exhibitionData';
import ExhibitionHeader from '../components/ExhibitionHeader';
import ExhibitionBody from '../components/ExhibitionBody';
import ExhibitionMemories from '../components/ExhibitionMemories';

const ExhibitionDetailView = () => {
  const { id } = useParams();
  const exh = exhibitionData[id] || exhibitionData[1];

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
      <ExhibitionMemories devices={exh.devices} />
    </div>
  );
};

export default ExhibitionDetailView;

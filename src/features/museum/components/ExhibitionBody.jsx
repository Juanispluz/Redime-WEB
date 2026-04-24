import React from 'react';

const ExhibitionBody = ({ paragraphs, contextImg, title }) => {
  return (
    <div className="container">
      <div className="exh-det-body">
        <div className="exh-det-text">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="exh-det-img-box">
           <img 
             src={contextImg} 
             alt={title} 
             style={{ width: '100%', height: '100%', minHeight: '350px', objectFit: 'cover', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} 
           />
        </div>
      </div>
    </div>
  );
};

export default ExhibitionBody;

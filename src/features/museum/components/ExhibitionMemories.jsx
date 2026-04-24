import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const ExhibitionMemories = ({ devices }) => {
  const [openAcc, setOpenAcc] = useState(devices.length > 0 ? devices[0].id : '');

  return (
    <div className="container exh-mem-container">
      <div className="exh-memories-box" style={{backgroundColor: '#e4f2e7'}}>
        <h2 className="memories-title" style={{color: '#2d3e40'}}>Memorias utilizadas</h2>

        <div className="mem-accordion">
          {devices.map(dev => (
            <div key={dev.id} className={`mem-acc-item ${openAcc === dev.id ? 'open' : ''}`}>
              <div className="mem-acc-header" onClick={() => setOpenAcc(openAcc === dev.id ? '' : dev.id)}>
                <div>
                  <h3 className="mem-acc-title" style={{color: '#2d3e40'}}>{dev.title}</h3>
                  <span className="mem-acc-owner" style={{color: '#387373'}}>Dueño: {dev.owner}</span>
                </div>
                {openAcc === dev.id ? <ChevronUp size={24} color="#2d3e40" /> : <ChevronDown size={24} color="#2d3e40" />}
              </div>
              {openAcc === dev.id && (
                <div className="mem-acc-content">
                  <div className="mem-acc-inner">
                    <div className="mem-img-plc" style={{ border: 'none', background: 'transparent' }}>
                      <img src={dev.img} alt={dev.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.5rem', border: '1px solid #97a6a0' }} />
                    </div>
                    <p className="mem-text" style={{color: '#2d3e40'}}>{dev.text}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExhibitionMemories;

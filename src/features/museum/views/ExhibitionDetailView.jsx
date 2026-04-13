import React, { useState } from 'react';
import { ArrowLeft, ChevronUp, ChevronDown } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const ExhibitionDetailView = () => {
  const [openAcc, setOpenAcc] = useState('dev1');
  const { id } = useParams();

  const exhData = {
    1: {
      tag: "Construido por Blanckberry",
      title: "El Trono del Espectador Olvidado",
      sub: "Esta escultura fue construida con varios dispositivos, pero utilizando uno como eje central, el televisor de la familia Zapata.",
      heroImg: "/museo_1.png",
      paragraphs: [
        "Yo fui el corazón del hogar de los Zapata en el barrio Aranjuez durante 25 años. Vi crecer a tres generaciones; fui el primero en darles la noticia de que el Metro de Medellín era una realidad. Pero cuando llegaron los televisores planos que se cuelgan como cuadros, me sacaron al patio. \"Es un estorbo\", decían.",
        "La Alianza me rescató. El BlackBerry recolectó los mensajes de nostalgia de los nietos de los Zapata. El Sony Ericsson diseñó una estructura donde mis perillas giran para mostrar fotos antiguas, y el Razr me dio un acabado metálico que me hace ver imponente. Ahora soy un monumento al tiempo compartido.",
        "Mi mensaje: No soy basura, soy el testigo de tu historia familiar. Recíclame con dignidad para que mi plomo no envenene el suelo que tus hijos pisan."
      ],
      contextImg: "/tv_zapata.png",
      devices: [
        { id: 'dev1', title: 'BlackBerry Curve', owner: 'Santi Zapata', text: 'Aquí guardé los chats con mi abuelo cuando aprendió a usar el PIN. No podía dejar que se perdiera.', img: '/device_blackberry.png' },
        { id: 'dev2', title: 'Motorola Razr v3', owner: 'Lucia Zapata', text: 'Fue mi primer regalo de grado. Nunca lo olvidaré.', img: '/device_motorola.png' }
      ]
    },
    2: {
      tag: "Construido por Colectivo Visual",
      title: "El Faro del Ojo Público",
      sub: "Una imponente estructura creada a partir de monitores CRT abandonados y lentes de cámaras fotográficas antiguas.",
      heroImg: "/museo_2.png",
      paragraphs: [
        "Fui ensamblado pieza por pieza por las manos de vecinos curiosos que ya no sabían qué hacer con sus viejos monitores grises. Ahora, desde lo alto, simulo iluminar el camino hacia una mejor conciencia electrónica.",
        "A través de mis múltiples pantallas apagadas, reflejo la desconexión del ser humano con la naturaleza material de los dispositivos que desecha sin pensar.",
        "Contémplame y recuerda que cada circuito que conforma mi estructura alguna vez mostró una ventana al mundo."
      ],
      contextImg: "/tv_zapata.png",
      devices: [
        { id: 'dev1', title: 'Monitor CRT Sony', owner: 'Familia Gómez', text: 'Pasé horas frente a él jugando en los 90. Es una reliquia.', img: '/tv_zapata.png' }
      ]
    },
    3: {
      tag: "Construido por Ensambladores del Sur",
      title: "El Altar del Primer Esfuerzo",
      sub: "Una congregación de circuitos, placas base madre y cables entrelazados que emula un templo.",
      heroImg: "/museo_3.png",
      paragraphs: [
        "Represento el misterio del interior de los computadores que el público general nunca llega a ver. Mi color verde místico proviene de cientos de placas madre.",
        "Aquellos cables que alguna vez transfirieron información valiosa ahora son las enredaderas mecánicas que me sostienen.",
        "Respeta el esfuerzo químico y humano que tomó crear estos laberintos microscópicos de silicio."
      ],
      contextImg: "/blog_4.png",
      devices: [
        { id: 'dev1', title: 'Motherboard Intel 1999', owner: 'Taller de Carlos', text: 'El corazón de mi primer computador de escritorio.', img: '/blog_4.png' }
      ]
    }
  };

  const exh = exhData[id] || exhData[1];

  return (
    <div className="exh-det-page">
      <div className="exh-det-header-bg" style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${exh.heroImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="container" style={{ position: 'relative' }}>
          <Link to="/museo" className="back-arrow-exh" style={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}><ArrowLeft size={32} /></Link>
          <div className="exh-det-header-content text-center">
            <span className="text-blue-tag" style={{ color: '#e4f2e7', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>{exh.tag}</span>
            <h1 className="exh-det-title" style={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>{exh.title}</h1>
            <p className="exh-det-sub" style={{ color: '#f3f4f6', textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>{exh.sub}</p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="exh-det-body">
          <div className="exh-det-text">
            {exh.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="exh-det-img-box">
             <img src={exh.contextImg} alt={exh.title} style={{ width: '100%', height: '100%', minHeight: '350px', objectFit: 'cover', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
          </div>
        </div>
      </div>

      <div className="container exh-mem-container">
        <div className="exh-memories-box" style={{backgroundColor: '#e4f2e7'}}>
          <h2 className="memories-title" style={{color: '#2d3e40'}}>Memorias utilizadas</h2>

          <div className="mem-accordion">
            {exh.devices.map(dev => (
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

    </div>
  );
};

export default ExhibitionDetailView;

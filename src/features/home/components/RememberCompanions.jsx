import React, { useState } from 'react';
import { ChevronDown, X, ArrowRight } from 'lucide-react';
import '../../../styles/components.css';

const InstagramIcon = ({ size = 16 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const companions = [
  {
    id: 1,
    img: '/Blackberry.webp',
    accentColor: '#4AB69A',
    device: 'Teléfono celular',
    model: 'Blackberry',
    owner: 'Nicolas',
    age: '12 años',
    instagramUrl: 'https://www.instagram.com/berry.black145?utm_source=qr&igsh=MXhxMDZxMzh6Y3Y2bA==',
    story: 'Yo fui la voz de Nicolás. No exagero. Antes de que existieran las pantallas infinitas, yo era el centro de su universo. Recuerdo el ritmo frenético de sus dedos sobre mi teclado físico; chateábamos con todo el mundo. Le dábamos las buenas noches a su mamá, coordinábamos los partidos con los amigos del barrio y hacíamos planes con sus compañeros de entreno. Pero, sobre todo, vivíamos con su novia. De tanto escribir mis teclas empezaron a desprenderse poco a poco, a tal punto que Nico ya no podía escribir bien, así considero la idea de comprarse un teléfono de gama alta de nueva generación, yo… no podía competir contra eso, e inevitablemente terminaba en un cajón de medias esperando algún día ser reparado.'
  },
  {
    id: 2,
    img: '/Motorola.webp',
    accentColor: '#A3C0B8',
    device: 'Teléfono celular',
    model: 'Motorola Raz',
    owner: 'Juanita',
    age: '15 años',
    instagramUrl: 'https://www.instagram.com/reemplazar_con_perfil_motorola',
    story: 'Juanita y yo éramos inseparables. Yo era su espejo y su cómplice. Le encantaba cómo me veía en su mano mientras posaba frente al espejo, siempre bien arreglada, siempre divina. Yo capturaba su glamour. Hasta que un día, por un descuido me dejó caer, mi pantalla se rompió y ahora ella ya no podía verse más. Quedé devastada. Juanita me prometió arreglarme, pero lo único que hizo fue dejarme en un cajón por varios años y luego botarme a la basura, como si nuestros recuerdos juntos no hubieran valido nada.'
  },
  {
    id: 3,
    img: '/Sony.webp',
    accentColor: '#D4A373',
    device: 'Teléfono celular',
    model: 'Sony Ericsson',
    owner: 'Daniel',
    age: '13 años',
    instagramUrl: 'https://www.instagram.com/reemplazar_con_perfil_sony',
    story: 'Yo no era solo un teléfono; era el ojo y el oído de Daniel. Él era un bohemio, un buscador de momentos que no necesitaba una resolución perfecta para encontrar la poesía en lo cotidiano. Juntos capturamos cientos de atardeceres sobre el Valle de Aburrá que hoy llamarían "pixelados". Lastimosamente todo cambió cuando Daniel consiguió su primer empleo y con él pudo comprarse una buena cámara y unos buenos audífonos. Yo quedé en segundo plano, solo para comunicarse. Un día me caí detrás de la cama y él me buscó pero sin tanto ánimo, y luego de no encontrarme por unas semanas decidió comprarse un smartphone, dejándome obsoleto en su totalidad.'
  }
];

const storyTitles = {
  1: 'Yo fui la voz de Nicolás.',
  2: 'Juanita y yo éramos inseparables.',
  3: 'Yo no era solo un teléfono.'
};

const RememberCompanions = () => {
  const [activeStory, setActiveStory] = useState(null);

  return (
    <section className="remember-section">
      {/* Partículas decorativas sutiles */}
      <div className="remember-particles" aria-hidden="true">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="remember-particle" style={{ '--ri': i }} />
        ))}
      </div>

      {/* Círculos decorativos de fondo */}
      <div className="remember-glow remember-glow-1" aria-hidden="true" />
      <div className="remember-glow remember-glow-2" aria-hidden="true" />

      <div className="remember-inner">

        {/* ── CABECERA CON JERARQUÍA VISUAL ── */}
        <div className="remember-header">
          <span className="remember-chip">
            <span className="remember-chip-dot" />
            Historias que merecen ser contadas
          </span>
          <h2 className="remember-title">
            ¿Recuerdas a estos<br />
            <span className="remember-title-accent">compañeros?</span>
          </h2>
          <p className="remember-subtitle">
            Millones de dispositivos terminan olvidados en cajones.<br className="hide-mobile" />
            Cada uno guarda una historia. <strong>¿Cuál es la tuya?</strong>
          </p>
        </div>

        {/* ── GRID DE TARJETAS ── */}
        <div className="remember-grid" style={{ position: 'relative' }}>
          {companions.map((comp) => (
            <div key={comp.id} className="rc-card fade-in-up companion-card">
              {/* Imagen */}
              <a
                href={comp.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rc-card-img-wrap"
                style={{ '--accent': comp.accentColor }}
                title={`Ver perfil de ${comp.model} en Instagram`}
              >
                <div className="rc-card-img-bg" />
                <img
                  src={comp.img}
                  alt={comp.model}
                  className="rc-card-img companion-img"
                  onError={(e) => { e.target.src = '/no_image.png'; }}
                />
                {/* Overlay hover */}
                <div className="rc-card-hover-overlay">
                  <span className="rc-card-hover-text">
                    <InstagramIcon size={16} />
                    Ver perfil
                  </span>
                </div>
                {/* Badge del modelo en la esquina */}
                <div className="rc-card-badge" style={{ backgroundColor: comp.accentColor }}>
                  {comp.model}
                </div>
              </a>

              {/* Info */}
              <div className="rc-card-body">
                <div className="rc-card-meta">
                  <span className="rc-meta-row">
                    <span className="rc-meta-label">Dueño</span>
                    <span className="rc-meta-value">{comp.owner}</span>
                  </span>
                  <span className="rc-meta-sep" />
                  <span className="rc-meta-row">
                    <span className="rc-meta-label">Juntos</span>
                    <span className="rc-meta-value">{comp.age}</span>
                  </span>
                </div>
                <h3 className="rc-card-title">Conoce su historia</h3>
                <button
                  className="rc-card-btn companion-btn"
                  style={{ '--accent': comp.accentColor }}
                  onClick={() => setActiveStory(activeStory === comp.id ? null : comp.id)}
                  aria-label="Leer historia"
                >
                  <ChevronDown
                    size={20}
                    style={{
                      transform: activeStory === comp.id ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.3s'
                    }}
                  />
                </button>
              </div>
            </div>
          ))}

          {/* Modal historia */}
          {activeStory && (
            <div
              className="modal-overlay rc-modal-overlay"
              onClick={() => setActiveStory(null)}
            >
              <div
                className="modal-content rc-modal"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="rc-modal-close"
                  onClick={() => setActiveStory(null)}
                  aria-label="Cerrar"
                >
                  <X size={18} />
                </button>
                <div
                  className="rc-modal-accent-bar"
                  style={{ backgroundColor: companions.find(c => c.id === activeStory)?.accentColor }}
                />
                <span className="rc-modal-chip">Historia del dispositivo</span>
                <h4 className="rc-modal-title">{storyTitles[activeStory]}</h4>
                <p className="rc-modal-text">
                  {companions.find(c => c.id === activeStory)?.story}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── CTA FINAL ── */}
        <div className="remember-cta-block">
          <p className="remember-cta-pre">¿Tienes un compañero esperando en el cajón?</p>
          <a href="#rescue" className="remember-cta-btn">
            <span>Descubre cómo rescatarlo</span>
            <ArrowRight size={22} className="cta-modern-icon" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default RememberCompanions;


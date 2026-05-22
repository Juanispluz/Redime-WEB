import React from 'react';
import '../styles/components.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-col">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
            <img src="/redime_logo_blanco.webp" alt="Redime Logo" style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
            <h3 className="footer-logo" style={{ marginBottom: 0 }}>REDIME</h3>
          </div>
          <p className="footer-desc">
            Un proyecto de diseño Crossmedia para la gestión de RAEE en Medellín. Rescatando memorias, salvando el futuro.
          </p>
        </div>
        <div className="footer-col">
          <h4>Secciones</h4>
          <a href="/">Inicio</a>
          <a href="/museo">Museo digital</a>
          <a href="/blog">Blog</a>
        </div>
        <div className="footer-col">
          <h4>Soporte</h4>
          <p className="contact-info">Tel: 345 223 11 76</p>
          <a href="mailto:redime@org.co" className="contact-info">Correo: redime@org.co</a>
        </div>
        <div className="footer-col">
          <h4>Redes sociales</h4>
          <div className="social-links">
            <a href="#ig" className="social-icon" style={{ display: 'inline-block' }}>
              <img src="/Ig.png" alt="Instagram" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
            </a>
            <a href="#yt" className="social-icon" style={{ display: 'inline-block' }}>
              <img src="/Yt.png" alt="YouTube" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container bottom-container">
          <p>&copy; {new Date().getFullYear()} REDIME. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

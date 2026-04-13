import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import '../styles/components.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <div className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/Logoredime.png" alt="Redime Logo" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
          <a href="/" className="logo-text">REDIME</a>
        </div>

        <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`} style={{ marginLeft: 'auto', marginRight: '2rem' }}>
          <a href="/museo" onClick={() => setMobileMenuOpen(false)}>Museo digital</a>
          <a href="/blog" onClick={() => setMobileMenuOpen(false)}>Blog</a>
        </nav>

        <div className="header-actions">
           <a href="/#unete" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>
             Descargar app
           </a>
        </div>

        <button 
          className="mobile-menu-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Header;

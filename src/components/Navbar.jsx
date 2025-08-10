import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 100);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleNavClick(e, id) {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const navbarHeight = 80;
      const top = target.offsetTop - navbarHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setMenuOpen(false);
  }

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
      <div className="container">
        <div className="nav-content">
          <div className="nav-brand">
            <img src={require('gatsby').withPrefix('/logo.png')} alt="Indiana Grey Logo" className="nav-logo" />
            <div className="nav-brand-text">
              <h1 className="brand-title">Indiana Grey</h1>
              <p className="brand-tagline">Manufacturer and Exporter of Finished Leather, Shoe, Shoe Upper and Goods</p>
            </div>
          </div>
          <div className={`nav-menu${menuOpen ? ' active' : ''}`} id="nav-menu">
            <a href="#home" className="nav-link" onClick={(e) => handleNavClick(e, 'home')}>Home</a>
            <a href="#about" className="nav-link" onClick={(e) => handleNavClick(e, 'about')}>About</a>
            <a href="#process" className="nav-link" onClick={(e) => handleNavClick(e, 'process')}>Process</a>
            <a href="#products" className="nav-link" onClick={(e) => handleNavClick(e, 'products')}>Products</a>
            <a href="#contact" className="nav-link" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
          </div>
          <button className={`nav-toggle${menuOpen ? ' active' : ''}`} id="nav-toggle" onClick={() => setMenuOpen((v) => !v)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
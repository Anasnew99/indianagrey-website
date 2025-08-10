import React from 'react';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-gradient-background"></div>
      <div className="container">
        <div className="hero-content-wrapper">
          <div className="hero-image-container">
            <img src="/assets/hero.jpeg" alt="Leather manufacturing" className="hero-image" />
            <div className="hero-overlay"></div>
          </div>
          <div className="hero-content">
            <h1 className="hero-title">Premium Leather Products</h1>
            <p className="hero-subtitle">Since 2010 - Manufacturer & Exporter of Finished Leather, Shoe, Shoe Upper & Goods</p>
            <div className="hero-features">
              <p className="hero-feature-text">Crafted with premium full-grain leather, our products combine timeless elegance with modern functionality. From sophisticated bags and belts to comfortable footwear, each piece is handcrafted by skilled artisans.</p>
              <div className="hero-highlights">
                <span className="hero-highlight">✓ Premium Quality</span>
                <span className="hero-highlight">✓ Affordable</span>
                <span className="hero-highlight">✓ Sustainable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
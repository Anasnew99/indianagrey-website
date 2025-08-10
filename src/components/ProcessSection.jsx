import React from 'react';

const ProcessSection = () => (
  <section className="process-section" id="process">
    <div className="container">
      <div className="section-header">
        <h2>Our Process</h2>
        <p>How we create premium leather products with quality and care</p>
      </div>
      <div className="process-steps">
        <div className="process-step">
          <div className="step-number">1</div>
          <div className="step-content">
            <h4>Material Selection</h4>
            <p>We source only premium full-grain and vegetable-tanned leather from sustainable suppliers.</p>
          </div>
        </div>
        <div className="process-step">
          <div className="step-number">2</div>
          <div className="step-content">
            <h4>Design & Pattern</h4>
            <p>Each product is carefully designed and patterns are optimized for efficient leather usage.</p>
          </div>
        </div>
        <div className="process-step">
          <div className="step-number">3</div>
          <div className="step-content">
            <h4>Manufacturing</h4>
            <p>Skilled professionals manufacture each piece using modern techniques and quality standards.</p>
          </div>
        </div>
        <div className="process-step">
          <div className="step-number">4</div>
          <div className="step-content">
            <h4>Quality Control</h4>
            <p>Every product undergoes rigorous quality checks before it reaches our customers.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ProcessSection;
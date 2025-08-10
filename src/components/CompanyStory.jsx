import React from 'react';

const CompanyStory = () => {
  return (
    <section className="company-story">
      <div className="container">
        <div className="story-content">
          <div className="story-text">
            <h2>Manufacturing Excellence Since 2010</h2>
            <p className="story-lead">Indiana Grey has been manufacturing and exporting premium leather goods with modern techniques and traditional quality standards for nearly four decades.</p>
            <p>Our mission is to create leather products that not only serve their purpose but tell a story of quality, durability, and timeless style. Each piece is carefully manufactured by skilled professionals who take pride in their work.</p>
            <ul className="values-list">
              <li><strong>Quality Manufacturing</strong> - Modern techniques meet traditional quality standards</li>
              <li><strong>Sustainable Materials</strong> - Ethically sourced premium leather</li>
              <li><strong>Timeless Design</strong> - Classic styles that never go out of fashion</li>
              <li><strong>Customer Satisfaction</strong> - Your happiness is our priority</li>
            </ul>
          </div>
          <div className="story-image">
            <img src="https://pplx-res.cloudinary.com/image/upload/v1754735641/pplx_project_search_images/97e6950132d767ec916877f86d22c13361593459.png" alt="Leather manufacturing" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyStory;
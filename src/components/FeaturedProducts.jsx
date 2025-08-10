import React from 'react';

const FeaturedProducts = ({ products, onOpen }) => {
  return (
    <section className="featured-products">
      <div className="container">
        <div className="section-header">
          <h2>Featured Products</h2>
          <p>Discover our most popular premium leather goods</p>
        </div>
        <div className="products-grid" id="featured-products">
          {products.map((product) => (
            <div key={product.id} className="product-card" data-product-id={product.id} style={{ cursor: 'pointer' }} onClick={() => onOpen(product)}>
              <img src={require('gatsby').withPrefix(product.image)} alt={product.name} className="product-image" />
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
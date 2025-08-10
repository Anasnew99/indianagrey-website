import React from 'react';

const formatCategoryLabel = (category, sampleProduct) => {
  if (sampleProduct?.categoryLabel) return sampleProduct.categoryLabel;
  return category
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase())
    .replace(/\b(womens|mens)\b/gi, (match) => (match.toLowerCase() === 'womens' ? "Women's" : "Men's"));
};

const ProductsSection = ({
  categories,
  productsByCategory,
  filter,
  setFilter,
  products,
  onOpen
}) => {
  return (
    <section className="products-section" id="products">
      <div className="container">
        <div className="section-header">
          <h2>Our Products</h2>
          <p>Explore our complete collection of premium leather goods</p>
        </div>

        <div className="product-filters">
          <button className={`filter-btn${filter === 'all' ? ' active' : ''}`} data-category="all" onClick={() => setFilter('all')}>All Products</button>
          {categories.map((category) => {
            const sampleProduct = productsByCategory[category]?.[0];
            return (
              <button key={category} className={`filter-btn${filter === category ? ' active' : ''}`} data-category={category} onClick={() => setFilter(category)}>
                {formatCategoryLabel(category, sampleProduct)}
              </button>
            );
          })}
        </div>

        <div className="products-grid" id="all-products">
          {products.map((product) => (
            <div key={product.id} className="product-card" data-product-id={product.id} style={{ cursor: 'pointer' }} onClick={() => onOpen(product)}>
              <img src={product.image} alt={product.name} className="product-image" />
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

export default ProductsSection;
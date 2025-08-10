import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import CompanyStory from '../components/CompanyStory';
import ProductsSection from '../components/ProductsSection';
import AboutSection from '../components/AboutSection';
import ProcessSection from '../components/ProcessSection';
import ContactSection from '../components/ContactSection';
import ProductModal from '../components/ProductModal';
import { useProducts } from '../hooks/useProducts';

const IndexPage = () => {
  const {
    loading,
    error,
    filter,
    setFilter,
    categories,
    productsByCategory,
    filteredProducts,
    featuredProducts
  } = useProducts();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const isModalOpen = useMemo(() => Boolean(selectedProduct), [selectedProduct]);

  return (
    <Layout>
      <Helmet>
        <title>Indiana Grey - Manufacturer & Exporter of Premium Leather Goods</title>
        <meta name="description" content="Manufacturer & Exporter of Finished Leather, Shoe, Shoe Upper & Goods since 2010. Premium quality leather products manufactured with modern techniques and traditional quality standards." />
        {/* Force desktop layout on mobile */}
        <meta name="viewport" content="width=1280, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/style.css" />
      </Helmet>

      <Hero />

      <FeaturedProducts products={featuredProducts} onOpen={setSelectedProduct} />

      <CompanyStory />

      <ProductsSection
        categories={categories}
        productsByCategory={productsByCategory}
        filter={filter}
        setFilter={setFilter}
        products={filteredProducts}
        onOpen={setSelectedProduct}
      />

      <AboutSection />
      <ProcessSection />
      <ContactSection />

      <ProductModal product={selectedProduct} open={isModalOpen} onClose={() => setSelectedProduct(null)} />
    </Layout>
  );
};

export default IndexPage;
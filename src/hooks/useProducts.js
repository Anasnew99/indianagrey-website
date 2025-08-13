import { useEffect, useMemo, useState } from 'react';
import { withPrefix } from 'gatsby';

function generatePrice(category) {
  const priceRanges = {
    'bags': { min: 150, max: 400 },
    'leather-belts': { min: 45, max: 120 },
    'mens-leather-shoes': { min: 80, max: 250 },
    'womens-braided-sandals': { min: 60, max: 150 },
    'womens-flat-sandals': { min: 50, max: 130 }
  };
  const range = priceRanges[category] || { min: 50, max: 200 };
  return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
}

function getMaterialForCategory(category) {
  const materials = {
    'bags': 'Full-grain leather',
    'leather-belts': 'Italian leather',
    'mens-leather-shoes': 'Premium leather',
    'womens-braided-sandals': 'Genuine leather',
    'womens-flat-sandals': 'Soft leather'
  };
  return materials[category] || 'Premium leather';
}

function getColorsForCategory(category) {
  const colorSets = {
    'bags': ['Black', 'Brown', 'Tan'],
    'leather-belts': ['Black', 'Brown', 'Cognac'],
    'mens-leather-shoes': ['Black', 'Brown', 'Tan'],
    'womens-braided-sandals': ['Tan', 'Brown', 'Black'],
    'womens-flat-sandals': ['Black', 'Brown', 'Tan']
  };
  return colorSets[category] || ['Black', 'Brown'];
}

function getFeaturesForCategory(category) {
  const featureSets = {
    'bags': ['Durable construction', 'Multiple compartments', 'Comfortable straps'],
    'leather-belts': ['Reversible design', 'Premium buckle', 'Adjustable fit'],
    'mens-leather-shoes': ['Comfortable sole', 'Classic design', 'Durable construction'],
    'womens-braided-sandals': ['Comfortable fit', 'Stylish design', 'Durable materials'],
    'womens-flat-sandals': ['Comfortable sole', 'Elegant design', 'Versatile style']
  };
  return featureSets[category] || ['Premium quality', 'Handcrafted'];
}

function generateDescription(name, category) {
  const descriptions = {
    'bags': 'Stylish and functional bag perfect for everyday use.',
    'leather-belts': 'Premium leather belt with timeless design and superior quality.',
    'mens-leather-shoes': 'Classic leather shoes designed for comfort and style.',
    'womens-braided-sandals': 'Beautiful braided sandals perfect for summer days.',
    'womens-flat-sandals': 'Elegant flat sandals for comfort and style.'
  };
  return descriptions[category] || 'Handcrafted leather product with premium quality.';
}

export function useProducts() {
  const [productsByCategory, setProductsByCategory] = useState({});
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(withPrefix('/product_catalog.json'));
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const transformed = {};
        data.forEach((category) => {
          const categoryKey = category.product_name;
          transformed[categoryKey] = category.products.map((product, index) => ({
            id: `${categoryKey}-${index + 1}`,
            name: product.name,
            price: generatePrice(category.product_name),
            material: getMaterialForCategory(category.product_name),
            colors: getColorsForCategory(category.product_name),
            features: getFeaturesForCategory(category.product_name),
            image: withPrefix(product.image),
            description: generateDescription(product.name, category.product_label),
            category: categoryKey,
            categoryLabel: category.product_label
          }));
        });
        if (isMounted) {
          setProductsByCategory(transformed);
          setError(null);
        }
      } catch (e) {
        if (isMounted) setError(e);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const allProducts = useMemo(() => {
    return Object.values(productsByCategory).flat();
  }, [productsByCategory]);

  const filteredProducts = useMemo(() => {
    if (filter === 'all') return allProducts;
    return allProducts.filter((p) => p.category === filter);
  }, [allProducts, filter]);



  const categories = useMemo(() => {
    return Object.keys(productsByCategory);
  }, [productsByCategory]);

  return {
    loading,
    error,
    filter,
    setFilter,
    categories,
    productsByCategory,
    allProducts,
    filteredProducts
  };
}
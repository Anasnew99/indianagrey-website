// Product data - will be loaded from product_catalog.json
let products = {};

// Global state
let currentProductFilter = 'all';

// Load products from JSON file
async function loadProductsFromCatalog() {
  try {
    const response = await fetch('product_catalog.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const catalogData = await response.json();
    
    // Transform catalog data into our products structure
    const transformedProducts = {};
    
    catalogData.forEach(category => {
      const categoryKey = category.product_name;
      transformedProducts[categoryKey] = category.products.map((product, index) => ({
        id: `${categoryKey}-${index + 1}`,
        name: product.name,
        price: generatePrice(category.product_name), // Generate realistic prices based on category
        material: getMaterialForCategory(category.product_name),
        colors: getColorsForCategory(category.product_name),
        features: getFeaturesForCategory(category.product_name),
        image: product.image,
        description: generateDescription(product.name, category.product_label),
        category: categoryKey,
        categoryLabel: category.product_label
      }));
    });
    
    products = transformedProducts;
    console.log('Products loaded from catalog:', products);
    
    // Re-render products after loading
    renderFeaturedProducts();
    renderAllProducts();
    
  } catch (error) {
    console.error('Error loading products from catalog:', error);
    // Fallback to default products if loading fails
    loadDefaultProducts();
  }
}

// Generate realistic prices based on category
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

// Get material for category
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

// Get colors for category
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

// Get features for category
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

// Generate description based on product name and category
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

// Fallback default products
function loadDefaultProducts() {
  products = {
    wallets: [
      {
        id: 1,
        name: "Classic Bi-fold Wallet",
        price: 89,
        material: "Full-grain leather",
        colors: ["Black", "Brown", "Tan"],
        features: ["RFID blocking", "6 card slots", "Bill compartment"],
        image: "https://pplx-res.cloudinary.com/image/upload/v1754735641/pplx_project_search_images/82c71a15b15918f5a75750712987cd854832720e.png",
        description: "Timeless design meets modern functionality in this premium bi-fold wallet.",
        category: "wallets",
        categoryLabel: "Wallets"
      },
      {
        id: 2,
        name: "Minimalist Card Holder",
        price: 45,
        material: "Italian leather",
        colors: ["Black", "Cognac"],
        features: ["Slim profile", "4 card slots", "Pull-tab design"],
        image: "https://pplx-res.cloudinary.com/image/upload/v1754735641/pplx_project_search_images/d6073a1d17d2c3dd138325cbb3cd115c46fadf9e.png",
        description: "Sleek and practical card holder for the modern minimalist.",
        category: "wallets",
        categoryLabel: "Wallets"
      }
    ],
    bags: [
      {
        id: 3,
        name: "Executive Briefcase",
        price: 295,
        material: "Full-grain leather",
        colors: ["Black", "Dark Brown"],
        features: ["Laptop compartment", "Document organizer", "Shoulder strap"],
        image: "https://pplx-res.cloudinary.com/image/upload/v1754735641/pplx_project_search_images/4e1b8d35d0a2a7ceea68844f70a21d68061e1e42.png",
        description: "Professional briefcase designed for the modern executive.",
        category: "bags",
        categoryLabel: "Bags"
      },
      {
        id: 4,
        name: "Weekend Duffle",
        price: 225,
        material: "Vegetable-tanned leather",
        colors: ["Tan", "Dark Brown"],
        features: ["Large capacity", "Shoe compartment", "Canvas lining"],
        image: "https://pplx-res.cloudinary.com/image/upload/v1754735641/pplx_project_search_images/4e1b8d35d0a2a7ceea68844f70a21d68061e1e42.png",
        description: "Perfect companion for weekend getaways and short trips.",
        category: "bags",
        categoryLabel: "Bags"
      }
    ],
    belts: [
      {
        id: 5,
        name: "Dress Belt",
        price: 65,
        material: "Italian leather",
        colors: ["Black", "Brown"],
        features: ["Reversible", "Silver buckle", "1.25 inch width"],
        image: "https://pplx-res.cloudinary.com/image/upload/v1754735641/pplx_project_search_images/82c71a15b15918f5a75750712987cd854832720e.png",
        description: "Elegant dress belt that complements any formal attire.",
        category: "belts",
        categoryLabel: "Belts"
      }
    ],
    accessories: [
      {
        id: 6,
        name: "Leather Key Fob",
        price: 25,
        material: "Premium leather",
        colors: ["Black", "Brown", "Red"],
        features: ["Premium stitching", "Solid brass hardware", "Personalization available"],
        image: "https://pplx-res.cloudinary.com/image/upload/v1754735641/pplx_project_search_images/b56a26b9442d93526bb560fd38037b979108cb8f.png",
        description: "Premium key fob with solid brass hardware.",
        category: "accessories",
        categoryLabel: "Accessories"
      }
    ]
  };
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing app...');
  
  // Add notification styles first
  addNotificationStyles();
  
  // Load products from catalog first, then initialize everything else
  loadProductsFromCatalog().then(() => {
    // Initialize all functionality after products are loaded
    initializeNavigation();
    initializeProductFilters();
    initializeContactForm();
    initializeScrollAnimations();
    initializeModal();
    
    console.log('App initialization complete');
  }).catch(() => {
    // If loading fails, use default products and continue
    loadDefaultProducts();
    initializeNavigation();
    renderFeaturedProducts();
    renderAllProducts();
    initializeProductFilters();
    initializeContactForm();
    initializeScrollAnimations();
    initializeModal();
    
    console.log('App initialization complete with default products');
  });
});

// Add notification styles
function addNotificationStyles() {
  if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes slideOutRight {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Navigation functionality
function initializeNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.getElementById('navbar');
  
  console.log('Initializing navigation...', { navToggle, navMenu, navLinks: navLinks.length });
  
  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
      console.log('Mobile menu toggled');
    });
  }
  
  // Navigation link click handlers
  navLinks.forEach((link, index) => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const href = this.getAttribute('href');
      console.log(`Nav link ${index} clicked: ${href}`);
      
      // Close mobile menu
      if (navMenu) navMenu.classList.remove('active');
      if (navToggle) navToggle.classList.remove('active');
      
      // Handle navigation
      if (href && href.startsWith('#')) {
        const sectionId = href.substring(1);
        scrollToSection(sectionId);
      }
    });
  });
  
  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    if (navbar) {
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });
}

// Scroll to section function
function scrollToSection(sectionId) {
  console.log('Scrolling to section:', sectionId);
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    const navbarHeight = 80;
    const offsetTop = targetSection.offsetTop - navbarHeight;
    
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
    console.log(`Scrolled to ${sectionId} at position ${offsetTop}`);
  } else {
    console.warn('Section not found:', sectionId);
  }
}

// Get all products as single array
function getAllProducts() {
  const allProducts = [];
  Object.keys(products).forEach(category => {
    if (Array.isArray(products[category])) {
      products[category].forEach(product => {
        allProducts.push({ ...product, category });
      });
    }
  });
  return allProducts;
}

// Render featured products
function renderFeaturedProducts() {
  const container = document.getElementById('featured-products');
  if (!container) {
    console.warn('Featured products container not found');
    return;
  }
  
  // Get one product from each category
  const featuredProducts = [];
  Object.keys(products).forEach(category => {
    if (Array.isArray(products[category]) && products[category].length > 0) {
      // Take the first product from each category
      featuredProducts.push(products[category][0]);
    }
  });
  
  // Limit to 4 products maximum
  const limitedFeaturedProducts = featuredProducts.slice(0, 4);
  
  container.innerHTML = limitedFeaturedProducts.map(product => `
    <div class="product-card" data-product-id="${product.id}" style="cursor: pointer;">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
      </div>
    </div>
  `).join('');
  
  // Add click listeners to product cards
  container.addEventListener('click', function(e) {
    const productCard = e.target.closest('.product-card');
    if (productCard) {
      const productId = productCard.getAttribute('data-product-id');
      console.log('Featured product card clicked:', productId);
      openProductModal(productId);
    }
  });
  
  console.log('Featured products rendered:', limitedFeaturedProducts.length);
}

// Render all products
function renderAllProducts() {
  const container = document.getElementById('all-products');
  if (!container) {
    console.warn('All products container not found');
    return;
  }
  
  const allProducts = getAllProducts();
  const filteredProducts = currentProductFilter === 'all' 
    ? allProducts 
    : allProducts.filter(product => product.category === currentProductFilter);
  
  console.log('Rendering products:', { total: allProducts.length, filtered: filteredProducts.length, filter: currentProductFilter });
  
  container.innerHTML = filteredProducts.map(product => `
    <div class="product-card" data-product-id="${product.id}" style="cursor: pointer;">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
      </div>
    </div>
  `).join('');
  
  // Add click listeners to product cards
  container.addEventListener('click', function(e) {
    const productCard = e.target.closest('.product-card');
    if (productCard) {
      const productId = productCard.getAttribute('data-product-id');
      console.log('Product card clicked:', productId);
      openProductModal(productId);
    }
  });
}

// Initialize product filters
function initializeProductFilters() {
  const filterContainer = document.querySelector('.product-filters');
  if (!filterContainer) {
    console.warn('Product filters container not found');
    return;
  }
  
  // Clear existing filter buttons
  filterContainer.innerHTML = '';
  
  // Add "All Products" filter button
  const allButton = document.createElement('button');
  allButton.className = 'filter-btn active';
  allButton.setAttribute('data-category', 'all');
  allButton.textContent = 'All Products';
  filterContainer.appendChild(allButton);
  
  // Dynamically generate filter buttons from loaded products
  Object.keys(products).forEach(category => {
    if (Array.isArray(products[category]) && products[category].length > 0) {
      const filterButton = document.createElement('button');
      filterButton.className = 'filter-btn';
      filterButton.setAttribute('data-category', category);
      
      // Use categoryLabel if available, otherwise format the category name
      const firstProduct = products[category][0];
      let categoryLabel;
      
      if (firstProduct?.categoryLabel) {
        categoryLabel = firstProduct.categoryLabel;
      } else {
        // Format category name: convert kebab-case to Title Case
        categoryLabel = category
          .replace(/-/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase())
          .replace(/\b(womens|mens)\b/gi, (match) => {
            return match === 'womens' ? "Women's" : "Men's";
          });
      }
      
      filterButton.textContent = categoryLabel;
      filterContainer.appendChild(filterButton);
    }
  });
  
  // Add click event listeners to all filter buttons
  const filterButtons = filterContainer.querySelectorAll('.filter-btn');
  console.log('Generated product filter buttons:', filterButtons.length);
  
  filterContainer.addEventListener('click', function(e) {
    const filterBtn = e.target.closest('.filter-btn');
    if (filterBtn) {
      e.preventDefault();
      e.stopPropagation();
      
      const category = filterBtn.getAttribute('data-category');
      console.log('Product filter clicked:', category);
      
      // Update active state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      filterBtn.classList.add('active');
      
      // Update filter and re-render
      currentProductFilter = category;
      renderAllProducts();
    }
  });
}

// Format date for display
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Initialize contact form
function initializeContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) {
    console.warn('Contact form not found');
    return;
  }
  
  console.log('Contact form found, adding submit listener');
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Contact form submitted');
    
    const formData = new FormData(this);
    const data = {
      name: formData.get('name')?.trim(),
      email: formData.get('email')?.trim(),
      subject: formData.get('subject'),
      message: formData.get('message')?.trim()
    };
    
    console.log('Form data:', data);
    
    // Validate form data
    if (!data.name || !data.email || !data.subject || !data.message) {
      showNotification('Please fill in all required fields.', 'error');
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      showNotification('Please enter a valid email address.', 'error');
      return;
    }
    
    // Show success message and reset form
    showNotification('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
    this.reset();
  });
}

// Show notification
function showNotification(message, type = 'success') {
  console.log('Showing notification:', { message, type });
  
  // Remove any existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(n => n.remove());
  
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? '#10b981' : '#ef4444'};
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    z-index: 3000;
    animation: slideInRight 0.3s ease-out;
    max-width: 350px;
    word-wrap: break-word;
    font-family: var(--font-family-base);
    font-size: 14px;
    line-height: 1.5;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }
  }, 4000);
}

// Initialize scroll animations
function initializeScrollAnimations() {
  if (typeof IntersectionObserver === 'undefined') {
    console.warn('IntersectionObserver not supported');
    return;
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Observe elements for animation
  const elementsToAnimate = document.querySelectorAll('.product-card, .process-step');
  elementsToAnimate.forEach(el => observer.observe(el));
}

// Modal functionality
function initializeModal() {
  const modal = document.getElementById('product-modal');
  const modalClose = document.getElementById('modal-close');
  
  if (!modal) {
    console.warn('Product modal not found');
    return;
  }
  
  console.log('Modal found, initializing...');
  
  if (modalClose) {
    modalClose.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Modal close button clicked');
      closeProductModal();
    });
  }
  
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      console.log('Modal backdrop clicked');
      closeProductModal();
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      console.log('Escape key pressed, closing modal');
      closeProductModal();
    }
  });
}

// Open product modal
function openProductModal(productId) {
  console.log('Opening product modal for ID:', productId);
  
  const modal = document.getElementById('product-modal');
  const modalBody = document.getElementById('modal-body');
  
  if (!modal || !modalBody) {
    console.error('Modal elements not found');
    return;
  }
  
  const allProducts = getAllProducts();
  const product = allProducts.find(p => p.id === productId || p.id === productId.toString());
  
  if (!product) {
    console.error('Product not found:', productId);
    return;
  }
  
  console.log('Found product:', product.name);
  
  modalBody.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="modal-product-image">
    <h2 class="modal-product-title">${product.name}</h2>
    
    <div style="margin-top: 24px;">
      <button class="btn btn--primary btn--full-width" id="inquire-button">
        Inquire About This Product
      </button>
    </div>
  `;
  
  // Add click listener to the inquire button
  const inquireButton = modalBody.querySelector('#inquire-button');
  if (inquireButton) {
    inquireButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Inquire button clicked');
      showNotification('Thank you for your interest! Please contact us for ordering information.', 'success');
      closeProductModal();
    });
  }
  
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  console.log('Modal opened successfully');
}

// Close product modal
function closeProductModal() {
  console.log('Closing product modal');
  const modal = document.getElementById('product-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    console.log('Modal closed');
  }
}

// Make functions available globally for button onclick handlers in HTML
window.scrollToSection = scrollToSection;
window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;
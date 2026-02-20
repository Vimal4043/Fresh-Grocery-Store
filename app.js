const products = [
  {
    "id": 1,
    "name": "Fresh Bananas",
    "category": "fruits",
    "price": 2.99,
    "image": "🍌",
    "description": "Fresh organic bananas, perfect for smoothies"
  },
  {
    "id": 2,
    "name": "Red Apples",
    "category": "fruits",
    "price": 4.99,
    "image": "🍎",
    "description": "Crisp and sweet red apples"
  },
  {
    "id": 3,
    "name": "Fresh Milk",
    "category": "dairy",
    "price": 3.49,
    "image": "🥛",
    "description": "Fresh whole milk, 1 gallon"
  },
  {
    "id": 4,
    "name": "Cheddar Cheese",
    "category": "dairy",
    "price": 5.99,
    "image": "🧀",
    "description": "Sharp cheddar cheese block"
  },
  {
    "id": 5,
    "name": "Salmon Fillet",
    "category": "meat",
    "price": 12.99,
    "image": "🐟",
    "description": "Fresh Atlantic salmon fillet"
  },
  {
    "id": 6,
    "name": "Ground Beef",
    "category": "meat",
    "price": 8.99,
    "image": "🥩",
    "description": "Lean ground beef, 1 lb"
  },
  {
    "id": 7,
    "name": "Fresh Bread",
    "category": "bakery",
    "price": 2.79,
    "image": "🍞",
    "description": "Freshly baked whole grain bread"
  },
  {
    "id": 8,
    "name": "Croissants",
    "category": "bakery",
    "price": 4.99,
    "image": "🥐",
    "description": "Buttery French croissants, pack of 4"
  },
  {
    "id": 9,
    "name": "Orange Juice",
    "category": "beverages",
    "price": 3.99,
    "image": "🧃",
    "description": "Fresh squeezed orange juice"
  },
  {
    "id": 10,
    "name": "Sparkling Water",
    "category": "beverages",
    "price": 2.49,
    "image": "💧",
    "description": "Premium sparkling water, 12 pack"
  },
  {
    "id": 11,
    "name": "Potato Chips",
    "category": "snacks",
    "price": 3.29,
    "image": "🥔",
    "description": "Crispy potato chips, family size"
  },
  {
    "id": 12,
    "name": "Chocolate Bar",
    "category": "snacks",
    "price": 1.99,
    "image": "🍫",
    "description": "Premium dark chocolate bar"
  },
  {
    "id": 13,
    "name": "Carrots",
    "category": "fruits",
    "price": 1.99,
    "image": "🥕",
    "description": "Fresh organic carrots, 2 lb bag"
  },
  {
    "id": 14,
    "name": "Greek Yogurt",
    "category": "dairy",
    "price": 4.49,
    "image": "🥄",
    "description": "Creamy Greek yogurt, vanilla flavor"
  },
  {
    "id": 15,
    "name": "Chicken Breast",
    "category": "meat",
    "price": 9.99,
    "image": "🍗",
    "description": "Boneless chicken breast, 2 lbs"
  }
];

const categories = [
  {
    "id": "fruits",
    "name": "Fruits & Vegetables",
    "icon": "🥕",
    "description": "Fresh produce delivered daily"
  },
  {
    "id": "dairy",
    "name": "Dairy Products",
    "icon": "🥛",
    "description": "Fresh milk, cheese, and more"
  },
  {
    "id": "meat",
    "name": "Meat & Seafood", 
    "icon": "🥩",
    "description": "Premium quality meats"
  },
  {
    "id": "bakery",
    "name": "Bakery",
    "icon": "🍞",
    "description": "Freshly baked goods daily"
  },
  {
    "id": "beverages",
    "name": "Beverages",
    "icon": "🧃",
    "description": "Refreshing drinks and juices"
  },
  {
    "id": "snacks",
    "name": "Snacks",
    "icon": "🍿",
    "description": "Tasty snacks and treats"
  }
];

let cart = [];
let currentFilter = 'all';
let searchQuery = '';

let categoriesGrid, productsGrid, cartModal, cartOverlay, cartBtn, closeCart;
let cartCount, cartItems, cartEmpty, cartTotal, searchInput, searchBtn;
let filterBtns, browseBtn, checkoutBtn, continueShopping, clearSearch, noResults;

document.addEventListener('DOMContentLoaded', function() {
  initializeDOMElements();
  loadCartFromStorage();
  renderCategories();
  renderProducts();
  updateCartUI();
  setupEventListeners();
});

// Initialize DOM Elements
function initializeDOMElements() {
  categoriesGrid = document.getElementById('categoriesGrid');
  productsGrid = document.getElementById('productsGrid');
  cartModal = document.getElementById('cartModal');
  cartOverlay = document.getElementById('cartOverlay');
  cartBtn = document.getElementById('cartBtn');
  closeCart = document.getElementById('closeCart');
  cartCount = document.getElementById('cartCount');
  cartItems = document.getElementById('cartItems');
  cartEmpty = document.getElementById('cartEmpty');
  cartTotal = document.getElementById('cartTotal');
  searchInput = document.getElementById('searchInput');
  searchBtn = document.getElementById('searchBtn');
  filterBtns = document.querySelectorAll('.filter-btn');
  browseBtn = document.getElementById('browseBtn');
  checkoutBtn = document.getElementById('checkoutBtn');
  continueShopping = document.getElementById('continueShopping');
  clearSearch = document.getElementById('clearSearch');
  noResults = document.getElementById('noResults');
}

// Event Listeners Setup
function setupEventListeners() {
  // Cart modal controls
  if (cartBtn) {
    cartBtn.addEventListener('click', openCart);
  }
  if (closeCart) {
    closeCart.addEventListener('click', closeCartModal);
  }
  if (cartOverlay) {
    cartOverlay.addEventListener('click', closeCartModal);
  }
  if (continueShopping) {
    continueShopping.addEventListener('click', closeCartModal);
  }
  
  // Search functionality
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        handleSearch();
      }
    });
  }
  if (searchBtn) {
    searchBtn.addEventListener('click', handleSearch);
  }
  
  // Filter buttons
  if (filterBtns) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        handleFilter(this.dataset.category);
        updateFilterButtons(this);
      });
    });
  }
  
  // Browse products button
  if (browseBtn) {
    browseBtn.addEventListener('click', function() {
      const productsSection = document.querySelector('.products');
      if (productsSection) {
        productsSection.scrollIntoView({ 
          behavior: 'smooth' 
        });
      }
    });
  }
  
  // Checkout button
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      if (cart.length > 0) {
        alert('Thank you for your order! Redirecting to checkout...');
        // In a real app, this would redirect to checkout page
      }
    });
  }
  
  // Clear search
  if (clearSearch) {
    clearSearch.addEventListener('click', function() {
      if (searchInput) {
        searchInput.value = '';
      }
      searchQuery = '';
      renderProducts();
    });
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && cartModal && !cartModal.classList.contains('hidden')) {
      closeCartModal();
    }
  });
}

// Load cart from local storage
function loadCartFromStorage() {
  try {
    const savedCart = JSON.parse(localStorage.getItem('groceryCart')) || [];
    cart = savedCart;
  } catch (error) {
    console.error('Error loading cart from storage:', error);
    cart = [];
  }
}

// Save cart to local storage
function saveCartToStorage() {
  try {
    localStorage.setItem('groceryCart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to storage:', error);
  }
}

// Render Categories
function renderCategories() {
  if (!categoriesGrid) return;
  
  categoriesGrid.innerHTML = categories.map(category => `
    <div class="category-card" onclick="filterByCategory('${category.id}')">
      <span class="category-card__icon">${category.icon}</span>
      <h3 class="category-card__name">${category.name}</h3>
      <p class="category-card__description">${category.description}</p>
    </div>
  `).join('');
}

// Render Products
function renderProducts() {
  if (!productsGrid || !noResults) return;
  
  let filteredProducts = [...products];
  
  // Apply category filter
  if (currentFilter !== 'all') {
    filteredProducts = filteredProducts.filter(product => 
      product.category === currentFilter
    );
  }
  
  // Apply search filter
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase().trim();
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  }
  
  // Show/hide no results message
  if (filteredProducts.length === 0) {
    noResults.classList.remove('hidden');
    productsGrid.innerHTML = '';
    return;
  } else {
    noResults.classList.add('hidden');
  }
  
  productsGrid.innerHTML = filteredProducts.map(product => `
    <div class="product-card">
      <div class="product-card__image">${product.image}</div>
      <h3 class="product-card__name">${product.name}</h3>
      <p class="product-card__description">${product.description}</p>
      <div class="product-card__footer">
        <span class="product-card__price">$${product.price.toFixed(2)}</span>
        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
          Add to Cart
        </button>
      </div>
    </div>
  `).join('');
}

// Filter by Category (from category cards)
function filterByCategory(categoryId) {
  currentFilter = categoryId;
  searchQuery = ''; // Clear search when filtering by category
  if (searchInput) {
    searchInput.value = '';
  }
  
  // Update filter buttons
  const targetBtn = document.querySelector(`[data-category="${categoryId}"]`);
  if (targetBtn) {
    updateFilterButtons(targetBtn);
  }
  
  renderProducts();
  
  // Scroll to products section
  const productsSection = document.querySelector('.products');
  if (productsSection) {
    productsSection.scrollIntoView({ 
      behavior: 'smooth' 
    });
  }
}

// Handle Filter Button Click
function handleFilter(category) {
  currentFilter = category;
  searchQuery = ''; // Clear search when filtering
  if (searchInput) {
    searchInput.value = '';
  }
  renderProducts();
}

// Update Filter Button States
function updateFilterButtons(activeBtn) {
  if (filterBtns) {
    filterBtns.forEach(btn => btn.classList.remove('active'));
  }
  if (activeBtn) {
    activeBtn.classList.add('active');
  }
}

// Handle Search
function handleSearch() {
  if (!searchInput) return;
  
  const newQuery = searchInput.value.trim();
  searchQuery = newQuery;
  
  // Clear category filter when searching
  if (newQuery) {
    currentFilter = 'all';
    const allBtn = document.querySelector('[data-category="all"]');
    if (allBtn) {
      updateFilterButtons(allBtn);
    }
  }
  
  renderProducts();
}

// Add to Cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }
  
  saveCartToStorage();
  updateCartUI();
  
  // Visual feedback
  const addBtn = event?.target;
  if (addBtn) {
    const originalText = addBtn.textContent;
    const originalBg = addBtn.style.background;
    addBtn.textContent = 'Added!';
    addBtn.style.background = '#27ae60';
    
    setTimeout(() => {
      addBtn.textContent = originalText;
      addBtn.style.background = originalBg;
    }, 1000);
  }
}

// Remove from Cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCartToStorage();
  updateCartUI();
}

// Update Item Quantity
function updateQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;
  
  item.quantity += change;
  
  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    saveCartToStorage();
    updateCartUI();
  }
}

// Update Cart UI
function updateCartUI() {
  // Update cart count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCount) {
    cartCount.textContent = totalItems;
  }
  
  // Update cart total
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  if (cartTotal) {
    cartTotal.textContent = total.toFixed(2);
  }
  
  // Render cart items
  if (!cartItems || !cartEmpty) return;
  
  if (cart.length === 0) {
    cartItems.innerHTML = '';
    cartEmpty.classList.remove('hidden');
  } else {
    cartEmpty.classList.add('hidden');
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item__image">${item.image}</div>
        <div class="cart-item__details">
          <div class="cart-item__name">${item.name}</div>
          <div class="cart-item__price">$${item.price.toFixed(2)}</div>
        </div>
        <div class="cart-item__controls">
          <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
          <span class="quantity-display">${item.quantity}</span>
          <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
          <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      </div>
    `).join('');
  }
}

// Open Cart Modal
function openCart() {
  if (cartModal) {
    cartModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

// Close Cart Modal
function closeCartModal() {
  if (cartModal) {
    cartModal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const headerNav = document.querySelector('.header__nav');

  if (mobileMenuBtn && headerNav) {
    mobileMenuBtn.addEventListener('click', function() {
      if (headerNav.style.display === 'flex') {
        headerNav.style.display = 'none';
      } else {
        headerNav.style.display = 'flex';
        headerNav.style.flexDirection = 'column';
        headerNav.style.position = 'absolute';
        headerNav.style.top = '100%';
        headerNav.style.left = '0';
        headerNav.style.right = '0';
        headerNav.style.background = 'var(--color-surface)';
        headerNav.style.padding = '1rem';
        headerNav.style.boxShadow = 'var(--shadow-md)';
        headerNav.style.zIndex = '1000';
      }
    });
  }
});

// Add visual enhancements
function addVisualEnhancements() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  const observeProductCards = () => {
    document.querySelectorAll('.product-card').forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(card);
    });
  };
  
  setTimeout(observeProductCards, 100);
}

// Initialize visual enhancements
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(addVisualEnhancements, 500);
});
/**
 * cart.js — Shopping cart overlay logic (vanilla JS, modular, accessible)
 * Requires: cart.css, cart HTML snippet present in page
 */

// --- Config: Example products (simulate real products) ---
const EXAMPLE_PRODUCTS = [
  { id: 'tea1', name: 'Green Tea', price: 29 },
  { id: 'tea2', name: 'Black Tea', price: 29 },
  { id: 'tea3', name: 'Herbal Blend', price: 39 }
];

// --- Cart State Management ---
const CART_KEY = 'shopping_cart_v1';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function findCartItem(cart, id) {
  return cart.find(item => item.id === id);
}

// --- Cart UI Elements ---
const cartOverlay = document.querySelector('.cart-overlay');
const cartPanel = document.querySelector('.cart-panel');
const cartTrigger = document.querySelector('.cart-trigger');
const cartClose = document.querySelector('.cart-close');
const cartItemsList = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartBadge = document.querySelector('.cart-badge');
const cartCheckoutBtn = document.querySelector('.cart-checkout-btn');

// --- Cart UI Logic ---
function openCart() {
  cartOverlay.classList.add('active');
  cartPanel.classList.add('active');
  // Accessibility: focus trap
  cartPanel.setAttribute('tabindex', '-1');
  cartPanel.focus();
}

function closeCart() {
  cartOverlay.classList.remove('active');
  cartPanel.classList.remove('active');
  cartPanel.removeAttribute('tabindex');
}

function updateCartBadge() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  if (cartBadge) {
    cartBadge.textContent = count > 0 ? count : '';
  }
}

function renderCart() {
  const cart = getCart();
  cartItemsList.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItemsList.innerHTML = '<div class="cart-empty" aria-live="polite">Your cart is empty.</div>';
  } else {
    cart.forEach(item => {
      total += item.price * item.qty;
      const itemDiv = document.createElement('div');
      itemDiv.className = 'cart-item';
      itemDiv.innerHTML = `
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        </div>
        <div class="cart-item-controls">
          <button class="cart-qty-btn" aria-label="Decrease quantity" data-action="decrease" data-id="${item.id}">−</button>
          <span class="cart-item-qty" aria-live="polite">${item.qty}</span>
          <button class="cart-qty-btn" aria-label="Increase quantity" data-action="increase" data-id="${item.id}">+</button>
          <button class="cart-remove-btn" aria-label="Remove ${item.name}" data-action="remove" data-id="${item.id}">🗑️</button>
        </div>
      `;
      cartItemsList.appendChild(itemDiv);
    });
  }

  if (cartTotal) {
    cartTotal.textContent = '$' + total.toFixed(2);
  }
  updateCartBadge();
}

// --- Cart Actions ---
function addToCart(product) {
  const cart = getCart();
  const qtyToAdd = typeof product.qty === 'number' && product.qty > 0 ? product.qty : 1;
  let item = findCartItem(cart, product.id);
  if (item) {
    item.qty += qtyToAdd;
  } else {
    cart.push({ ...product, qty: qtyToAdd });
  }
  saveCart(cart);
  renderCart();
  openCart();
}

function changeCartQty(id, delta) {
  const cart = getCart();
  let item = findCartItem(cart, id);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      // Remove item if qty is 0 or less
      const idx = cart.indexOf(item);
      cart.splice(idx, 1);
    }
    saveCart(cart);
    renderCart();
  }
}

function removeCartItem(id) {
  const cart = getCart();
  const idx = cart.findIndex(item => item.id === id);
  if (idx !== -1) {
    cart.splice(idx, 1);
    saveCart(cart);
    renderCart();
  }
}

// --- Event Listeners ---
function setupCartEvents() {
  // Open cart
  if (cartTrigger) {
    cartTrigger.addEventListener('click', openCart);
  }
  // Close cart
  if (cartClose) {
    cartClose.addEventListener('click', closeCart);
  }
  if (cartOverlay) {
    cartOverlay.addEventListener('click', closeCart);
  }
  // Keyboard: ESC to close
  document.addEventListener('keydown', (e) => {
    if (cartPanel.classList.contains('active') && e.key === 'Escape') {
      closeCart();
    }
  });
  // Quantity and remove controls
  if (cartItemsList) {
    cartItemsList.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      const id = btn.getAttribute('data-id');
      const action = btn.getAttribute('data-action');
      if (action === 'increase') {
        changeCartQty(id, 1);
      } else if (action === 'decrease') {
        changeCartQty(id, -1);
      } else if (action === 'remove') {
        removeCartItem(id);
      }
    });
  }
  // (Optional) Checkout button
  if (cartCheckoutBtn) {
    cartCheckoutBtn.addEventListener('click', () => {
      // Simulate navigation to checkout
      window.location.href = 'checkout.html';
    });
  }
}

// --- Expose addToCart for product buttons ---
window.addToCart = addToCart;

// --- Initialize cart on page load ---
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  setupCartEvents();
});
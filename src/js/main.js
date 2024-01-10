import '../scss/styles.scss';
import 'bootstrap';
import { getUser, updateUser } from './storage';
import { addToCart, removeFromCart, getQuantity } from './cart';

document.addEventListener("DOMContentLoaded", function () {
  manageUserState();
  setupEventListeners();
  setupProductCardListeners()
  updateCartAmount();
});

function updateCartAmount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let totalQuantity = 0;

  cart.forEach(item => {
    totalQuantity += item.quantity;
  });

  const cartAmountElement = document.getElementById('cartAmount');
  if (cartAmountElement) {
    cartAmountElement.textContent = `Cart (${totalQuantity})`;
  }
}

function setupProductCardListeners() {
  const productContainers = document.querySelectorAll('.card');

  productContainers.forEach(productContainer => {
    productContainer.addEventListener('click', function (event) {
      if (event.target.matches('.btn-decrease, .btn-increase')) {
        handleQuantityChange(event);
      } else if (event.target.matches('.btn-add-to-cart')) {
        handleAddToCart(event);
      }
    });
  });
}
function handleQuantityChange(event) {
  const button = event.target;
  const quantityInput = button.closest('.input-group').querySelector('.form-control');
  const change = button.classList.contains('btn-increase') ? 1 : -1;
  changeQuantity(quantityInput, change);
}

function handleAddToCart(event) {
  const button = event.target;
  const quantityInput = button.closest('.card-body').querySelector('.form-control');
  const quantity = parseIntSafe(quantityInput.value);
  const productId = button.closest('.card').dataset.productId; 
  addToCart(productId, quantity);
  updateCartAmount();

}

function changeQuantity(input, change) {
  const currentQuantity = parseIntSafe(input.value);
  const newQuantity = Math.max(1, currentQuantity + change);
  input.value = newQuantity;
}


function parseIntSafe(value) {
  const parsed = parseInt(value);
  return isNaN(parsed) ? 1 : parsed;
}

function manageUserState() {
  const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
  const loginLink = document.getElementById('loginLink');
  const profileLink = document.getElementById('profileLink');
  const logoutLink = document.getElementById('logoutLink');

  if (loggedInUser) {
    loginLink.classList.add('d-none');
    profileLink.classList.remove('d-none');
    logoutLink.classList.remove('d-none');
  } else {
    loginLink.classList.remove('d-none');
    profileLink.classList.add('d-none');
    logoutLink.classList.add('d-none');
  }
}

function setupEventListeners() {
  const logoutLink = document.getElementById('logoutLink');
  if (logoutLink) {
    logoutLink.addEventListener('click', logout);
  }

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLoginFormSubmit);
  }
}

function logout() {
  sessionStorage.removeItem('loggedInUser');
  window.location.href = 'login.html';
}

function handleLoginFormSubmit(event) {
  event.preventDefault();
  const email = document.getElementById('inputEmail').value;
  const password = document.getElementById('inputPassword').value;
  let user = getUser(email, password);

  if (user) {
    user.isLoggedIn = true;
    updateUser(user);
    sessionStorage.setItem('loggedInUser', JSON.stringify(user));
    console.log("Login successful!");
    window.location.href = 'index.html';
  }
}

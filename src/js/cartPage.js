import { Modal } from 'bootstrap';

document.addEventListener('DOMContentLoaded', function () {
    loadCartItems();
    setupEventListeners();
});

function getProductById(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    return products.find(product => product.id === parseInt(productId));
}

function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';
    let totalCartPrice = 0;

    cart.forEach(item => {
        const productDetails = getProductById(item.productId);
        if (!productDetails) return;

        const totalPrice = productDetails.price * item.quantity;
        totalCartPrice += totalPrice;
        cartItemsContainer.appendChild(createCartItemRow(item, productDetails, totalPrice));
    });

    updateCartTotal(totalCartPrice);
}

function createCartItemRow(item, productDetails, totalPrice) {
    const itemRow = document.createElement('div');
    itemRow.className = 'cart-item row align-items-center my-2';
    itemRow.innerHTML = `
        <div class="col-md-4">${productDetails.name}</div>
        <div class="col-md-3 d-flex align-items-center">
          <button class="btn btn-outline-secondary btn-decrease" type="button" data-product-id="${item.productId}">-</button>
          <input type="text" class="form-control quantity-input text-center mx-2" value="${item.quantity}" style="max-width: 60px;">
          <button class="btn btn-outline-secondary btn-increase" type="button" data-product-id="${item.productId}">+</button>
        </div>
        <div class="col-md-3 text-center"><span id="totalPrice${item.productId}">${totalPrice.toFixed(2)} €</span></div>
        <div class="col-md-2 text-end">
          <button class="btn btn-danger remove-item" data-product-id="${item.productId}">Remove</button>
        </div>
    `;
    return itemRow;
}

function updateCartTotal(totalCartPrice) {
    const totalContainer = document.getElementById('cartTotal');
    if (totalContainer) {
        totalContainer.textContent = `Total: ${totalCartPrice.toFixed(2)} €`;
    }
}

function setupEventListeners() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.addEventListener('click', handleCartInteraction);

    const checkoutButton = document.getElementById('checkoutButton');
    checkoutButton.addEventListener('click', openCheckoutModal);

    document.getElementById('checkoutForm').addEventListener('submit', handleCheckout);
}

function handleCartInteraction(event) {
    if (event.target.matches('.btn-decrease, .btn-increase')) {
        handleQuantityChange(event);
    } else if (event.target.matches('.remove-item')) {
        removeCartItem(event);
    }
}

function handleQuantityChange(event) {
    const button = event.target;
    const productId = button.dataset.productId;
    const quantityInput = button.parentNode.querySelector('.quantity-input');
    let quantity = parseInt(quantityInput.value);
    quantity = button.classList.contains('btn-increase') ? quantity + 1 : quantity - 1;
    quantityInput.value = Math.max(1, quantity);
    updateCartQuantity(productId, quantity);
}

function updateCartQuantity(productId, newQuantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item.productId.toString() === productId);
    if (productIndex > -1) {
        cart[productIndex].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
    }
}

function removeCartItem(event) {
    const productId = event.target.dataset.productId;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const newCart = cart.filter(item => item.productId !== productId);
    localStorage.setItem('cart', JSON.stringify(newCart));
    loadCartItems();
}

function openCheckoutModal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }
    new Modal(document.getElementById('checkoutModal')).show();
}

function handleCheckout(event) {
    event.preventDefault();

    const cardNumberRegex = /^[0-9]{16}$/;
    const cardNumber = document.getElementById('cardNumber').value;

    if (!cardNumberRegex.test(cardNumber)) {
        alert('Invalid card number. Please enter a valid debit card number.');
    } else {
        localStorage.setItem('cart', JSON.stringify([]));
        Modal.getInstance(document.getElementById('checkoutModal')).hide();
        loadCartItems();
        alert('Order placed successfully!');
        window.location.href = 'index.html';
    }
}

export function addToCart(productId, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.productId === productId);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += quantity;
    } else {
        cart.push({ productId, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

export function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.productId !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function getQuantity(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = cart.find(item => item.productId === productId);
    return product ? product.quantity : 0;
}

export function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

export function updateQuantity(productId, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.productId === productId);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

export function clearCart() {
    localStorage.removeItem('cart');
}
const products = [
    { id: 1, name: "Whole Black Pepper", price: 12.99, category: "Spices", discount: 0, img: "p1" },
    { id: 2, name: "Turmeric Powder", price: 8.99, category: "Spices", discount: 0, img: "p2" },
    { id: 3, name: "Premium Saffron Threads", price: 25.99, category: "Spices", discount: 0, img: "p3" },
    { id: 4, name: "Pepper, Cinnamon, Saffron Bundle", price: 32.99, category: "Bundles", discount: 3, img: "b3" },
    { id: 5, name: "Grilling Essentials Bundle", price: 24.99, category: "Bundles", discount: 2, img: "p2" },
    { id: 6, name: "Baking Spices Bundle", price: 29.99, category: "Bundles", discount: 5, img: "b1" },
    { id: 7, name: "Vanilla", price: 6.99, category: "Herbs", discount: 1, img: "p5" },
    { id: 8, name: "Ginger", price: 5.99, category: "Herbs", discount: 0.5, img: "p6" }
];

const categories = [
    "Spices",
    "Herbs",
    "Blends",
];

const users = [
    {
        id: 1,
        name: "John",
        surname: "Doe",
        email: "john.doe@gmail.com",
        password: "qwerty123",
        lastAddress: "123 Main St",
        creditCard: "1234123412341234",
        isLoggedIn: false,
    },
];

if (!localStorage.getItem('products')) localStorage.setItem('products', JSON.stringify(products));
if (!localStorage.getItem('categories')) localStorage.setItem('categories', JSON.stringify(categories));
if (!localStorage.getItem('users')) localStorage.setItem('users', JSON.stringify(users));


function initializeStorage() {
    if (!localStorage.getItem('users')) localStorage.setItem('users', JSON.stringify(defaultUsers));
    if (!localStorage.getItem('products')) localStorage.setItem('products', JSON.stringify(defaultProducts));
    if (!localStorage.getItem('categories')) localStorage.setItem('categories', JSON.stringify(defaultCategories));
}

function getUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(user => user.email === email && user.password === password);
}

function updateUser(updatedUser) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.id === updatedUser.id);
    if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
    }
}

export { initializeStorage, getUser, updateUser };

initializeStorage();
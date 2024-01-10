import "bootstrap"
import { getUser, updateUser } from './storage';

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', handleLoginFormSubmit);

    const regForm = document.getElementById('registrationForm')
    regForm.addEventListener('submit', handleRegForm)

    const newPasswordInput = document.getElementById('newPassword');
    newPasswordInput.addEventListener('input', handlePasswordInput);
});

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
    } else {
        console.log("Login failed: User not found.");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegForm);
    }
});

function handleRegForm(event) {
    event.preventDefault();

    const fullname = document.getElementById('inputName').value;
    const email = document.getElementById('newEmail').value;
    const password = document.getElementById('newPassword').value;

    if (!validateRegistration(fullname, email, password)) {
        console.log("Validation failed.");
        return;
    }

    const newUser = addNewUser(fullname, email, password);

    sessionStorage.setItem('loggedInUser', JSON.stringify(newUser));

    console.log("Registration and login successful!");
    window.location.href = 'index.html';
}

function validateRegistration(fullname, email, password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {
        alert('Password must be at least 8 characters including 1 uppercase letter, 1 lowercase letter, and 1 number.');
        return false;
    }

    if (fullname.length === 0) {
        alert('Please enter your full name.');
        return false;
    }

    return true;
}

function addNewUser(fullname, email, password) {
    const newUser = {
        id: Date.now(),
        fullname,
        email,
        password,
        isLoggedIn: true
    };

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    return newUser;
}
function handlePasswordInput(e) {
    const val = e.target.value;

    const lengthCriteria = document.getElementById('length');
    const uppercaseCriteria = document.getElementById('uppercase');
    const lowercaseCriteria = document.getElementById('lowercase');
    const numberCriteria = document.getElementById('number');

    document.getElementById('passwordCriteria').style.visibility = val.length > 0 ? "visible" : "hidden";

    updateCriteria(lengthCriteria, val.length >= 8);
    updateCriteria(uppercaseCriteria, /[A-Z]/.test(val));
    updateCriteria(lowercaseCriteria, /[a-z]/.test(val));
    updateCriteria(numberCriteria, /\d/.test(val));
}

function updateCriteria(criteriaElement, isValid) {
    if (isValid) {
        criteriaElement.classList.remove('invalid');
        criteriaElement.classList.add('valid');
        criteriaElement.innerHTML = '<i class="bi bi-check-lg"></i> ' + criteriaElement.dataset.criteria;
    } else {
        criteriaElement.classList.remove('valid');
        criteriaElement.classList.add('invalid');
        criteriaElement.innerHTML = '<i class="bi bi-x-lg"></i> ' + criteriaElement.dataset.criteria;
    }
}

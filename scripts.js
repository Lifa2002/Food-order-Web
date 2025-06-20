let cart = [];

function showLogin() {
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('signup-section').style.display = 'none';
    document.getElementById('menu').style.display = 'none';
    document.getElementById('order-history').style.display = 'none';
    document.getElementById('payment-section').style.display = 'none';
}

function showSignUp() {
    document.getElementById('signup-section').style.display = 'block';
    document.getElementById('login-section').style.display = 'none';
}

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
        alert("Login successful");
        showMenu();
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
});

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;

    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    alert("Account created successfully! You can now log in.");
    showLogin();
});

function showMenu() {
    document.getElementById('menu').style.display = 'block';
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('signup-section').style.display = 'none';
    document.getElementById('order-history').style.display = 'none';
}

function addToCart(itemName, price) {
    const item = { name: itemName, price: price };
    cart.push(item);
    updateCart();
}

function updateCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalDiv = document.getElementById('cart-total');

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
        cartTotalDiv.innerHTML = '<h3>Total: R0.00</h3>';
    } else {
        let cartHtml = '';
        let totalPrice = 0;

        cart.forEach(item => {
            cartHtml += `<p>${item.name} - R${item.price}</p>`;
            totalPrice += item.price;
        });

        cartItemsDiv.innerHTML = cartHtml;
        cartTotalDiv.innerHTML = `<h3>Total: R${totalPrice.toFixed(2)}</h3><button onclick="checkout()">Proceed to Checkout</button>`;
    }
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Add items to the cart before checking out.");
    } else {
        const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
        document.getElementById('total-price').textContent = `R${totalPrice.toFixed(2)}`;
        document.getElementById('payment-section').style.display = 'block';
    }
}

document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert("Payment successful! Thank you for your order.");
    cart = [];
    updateCart();
    document.getElementById('payment-section').style.display = 'none';
});

function showOrderHistory() {
    document.getElementById('order-history').style.display = 'block';
    document.getElementById('menu').style.display = 'none';
    document.getElementById('payment-section').style.display = 'none';
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
    const ordersList = document.getElementById('orders-list');
    
    if (orderHistory.length === 0) {
        ordersList.innerHTML = '<p>No orders yet.</p>';
    } else {
        let html = '';
        orderHistory.forEach(order => {
            html += `<div class="order">
                <p><strong>Order Date:</strong> ${order.date}</p>
                <p><strong>Items:</strong></p>
                <ul>`;
            order.items.forEach(item => {
                html += `<li>${item.name} - R${item.price}</li>`;
            });
            html += `</ul></div>`;
        });
        ordersList.innerHTML = html;
    }
}

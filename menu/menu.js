const products = [
    { id: 1, name: "Burger", price: 8.99, image:"/ai-generated-8556731_1280.jpg" },
    { id: 2, name: "Pizza", price: 12.99, image: "/pizza-3010062_1280.jpg" },
    { id: 3, name: "Pasta", price: 10.99, image: "/pasta-3547078_1280.jpg" },
    { id: 4, name: "Salad", price: 6.99, image: "/salad-7249259_1280.jpg"}
];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

let cart = [];

// Load products dynamically
function loadProducts() {
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product");
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productCard);
    });
}

// Add product to cart
function addToCart(id) {
    const product = products.find(item => item.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// Update cart display
function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const cartItem = document.createElement("li");
        cartItem.innerHTML = `
            ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = total.toFixed(2);
}

// Remove item from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Page Navigation
function showPage(page) {
    document.querySelectorAll(".page").forEach(section => {
        section.style.display = "none";
    });

    document.getElementById(page).style.display = "block";
}

// Show correct page on reload
window.onload = () => {
    loadProducts();
    showPage("home");
};

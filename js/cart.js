let cartItems = localStorage.getItem("ProductsInCart")
    ? JSON.parse(localStorage.getItem("ProductsInCart"))
    : [];

let wishlist = localStorage.getItem("Wishlist")
    ? JSON.parse(localStorage.getItem("Wishlist"))
    : [];

const container = document.querySelector(".cartproduct") || document.querySelector(".products");

if (!container) {
    console.error("Could not find .cartproduct or .products in the page");
}

function drawCart() {
    if (cartItems.length === 0) {
        return `
            <div class="col-12 text-center py-4 text-muted">
                <h5>Your cart is empty</h5>
                <p>No items added for purchase yet.</p>
            </div>
        `;
    }

    return cartItems.map(item => {
        const qty = item.quantity || 1;
        const priceNum = parseFloat(item.price.replace('$','').trim()) || 0;
        const subtotal = (priceNum * qty).toFixed(0);

        return `
            <div class="col-12 mb-3">
                <div class="card shadow-sm">
                    <div class="row g-0">
                        <div class="col-4 col-md-3">
                            <img src="${item.imageUrl}" class="img-fluid" style="height:100%; object-fit:cover;">
                        </div>
                        <div class="col-8 col-md-9">
                            <div class="card-body">
                                <h5>${item.name}</h5>
                                <p class="mb-1">Price: ${item.price} × ${qty} = <strong>${subtotal}$</strong></p>
                                <div class="d-flex align-items-center mb-2">
                                    <button class="btn btn-sm btn-outline-secondary me-2" onclick="changeCartQty(${item.id}, -1)">−</button>
                                    <span class="fw-bold mx-2">${qty}</span>
                                    <button class="btn btn-sm btn-outline-secondary" onclick="changeCartQty(${item.id}, 1)">+</button>
                                </div>
                                <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function calculateCartTotal() {
    let total = 0;
    cartItems.forEach(item => {
        const price = parseFloat(item.price.replace('$','').trim()) || 0;
        const qty = item.quantity || 1;
        total += price * qty;
    });
    return total.toFixed(0);
}

function drawWishlistSection() {
    if (wishlist.length === 0) {
        return `
            <div class="col-12 text-center py-4 text-muted">
                <h5>Your wishlist is empty</h5>
                <p>Tap the heart icon on the main page to add items</p>
            </div>
        `;
    }

    return wishlist.map(item => `
        <div class="col-12 col-sm-6 col-md-6 col-lg-4 mb-3">
            <div class="card shadow-sm h-100">
                <img src="${item.imageUrl}" class="card-img-top" style="height:220px; object-fit:cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text mt-auto">Price: ${item.price}</p>
                    <button class="btn btn-sm btn-outline-danger mt-2" onclick="removeFromWishlist(${item.id})">
                        Remove from Wishlist
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderPage() {
    const cartTotal = calculateCartTotal();

    container.innerHTML = `
        <!-- Shopping Cart Section -->
        <div class="row mb-5">
            <div class="col-12">
                <h3 class="text-center mb-4 fw-bold text-primary border-bottom pb-2">
                    Shopping Cart
                </h3>
            </div>
            ${drawCart()}

            <!-- Total appears here under cart items -->
            ${cartItems.length > 0 ? `
                <div class="col-12 mt-4">
                    <div class="shadow-sm bg-white">
                        <div class="card-body">
                            <h4 class="mb-0 text-center">
                                Total: 
                                <span class="text-primary fw-bold fs-4">${cartTotal}$</span>
                            </h4>
                        </div>
                    </div>
                </div>
            ` : ''}
        </div>

        <!-- Wishlist Section -->
        <div class="row">
            <div class="col-12">
                <h3 class="text-center mb-4 fw-bold text-danger border-bottom pb-2">
                    Wishlist
                </h3>
            </div>
            ${drawWishlistSection()}
        </div>
    `;
}

window.removeFromCart = function(id) {
    cartItems = cartItems.filter(item => item.id !== id);
    localStorage.setItem("ProductsInCart", JSON.stringify(cartItems));
    renderPage();
};

window.changeCartQty = function(id, delta) {
    const index = cartItems.findIndex(item => item.id === id);
    if (index === -1) return;
    let qty = (cartItems[index].quantity || 1) + delta;
    if (qty < 1) qty = 1;
    cartItems[index].quantity = qty;
    localStorage.setItem("ProductsInCart", JSON.stringify(cartItems));
    renderPage();
};

window.removeFromWishlist = function(id) {
    wishlist = wishlist.filter(item => item.id !== id);
    localStorage.setItem("Wishlist", JSON.stringify(wishlist));
    renderPage();
};

renderPage();
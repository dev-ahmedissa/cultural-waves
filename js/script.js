const userInfo = document.getElementById("user_info");
const userLink  = document.getElementById("user");
const links     = document.getElementById("links");
const logoutBtn = document.getElementById("Logout");

if (localStorage.getItem("email")) {
    links.style.display = "none";
    userInfo.style.display = "flex";
    userLink.innerHTML = localStorage.getItem("First_Name") || "User";

    logoutBtn.addEventListener("click", () => {
        localStorage.clear();
        window.location = "index.html";
    });
}

const allProducts = document.querySelector(".products");
const cartProductDiv = document.querySelector(".carts-products div");
const badge = document.querySelector(".badge");

const products = [
    { id: 1, name: "Palestinian Thobe", imageUrl: "images/img1.jpg", price: "150$" },
    { id: 2, name: "Yemeni Thobe",      imageUrl: "images/img2.jpg", price: "170$" },
    { id: 3, name: "Saudi Thobe",       imageUrl: "images/img3.jpg", price: "190$" },
    { id: 4, name: "Egyptian Thobe",    imageUrl: "images/img4.jpg", price: "150$" },
    { id: 5, name: "Moroccan Thobe",    imageUrl: "images/img5.jpg", price: "210$" },
    { id: 6, name: "Iraqi Thobe",       imageUrl: "images/img6.jpg",  price: "230$" },
    { id: 7, name: "Sudanese Thobe",    imageUrl: "images/img7.jpg", price: "250$" },
    { id: 8, name: "Somali Thobe",      imageUrl: "images/img8.jpg",  price: "270$" },
    { id: 9, name: "Algerian Thobe",    imageUrl: "images/img9.jpg", price: "290$" },
];

let addedItem = localStorage.getItem("ProductsInCart")
    ? JSON.parse(localStorage.getItem("ProductsInCart"))
    : [];

let wishlist = localStorage.getItem("Wishlist")
    ? JSON.parse(localStorage.getItem("Wishlist"))
    : [];


function isInWishlist(id) {
    return wishlist.some(item => item.id === id);
}

function toggleWishlist(id, heartElement) {
    const chosenItem = products.find(item => item.id === id);
    if (!chosenItem) return;

    const index = wishlist.findIndex(item => item.id === id);

    if (index === -1) {
        wishlist.push(chosenItem);
        heartElement.classList.remove("text-dark");
        heartElement.classList.add("text-danger");
    } else {
        wishlist.splice(index, 1);
        heartElement.classList.remove("text-danger");
        heartElement.classList.add("text-dark");
    }

    localStorage.setItem("Wishlist", JSON.stringify(wishlist));
}

function updateWishlistIcons() {
    document.querySelectorAll('.wishlist-heart').forEach(heart => {
        const match = heart.getAttribute('onclick')?.match(/toggleWishlist\((\d+)/);
        const id = match ? parseInt(match[1]) : null;
        if (!id) return;

        if (isInWishlist(id)) {
            heart.classList.add("text-danger");
            heart.classList.remove("text-dark");
        } else {
            heart.classList.add("text-dark");
            heart.classList.remove("text-danger");
        }
    });
}


function drawItem(items = products) {
    const html = items.map(item => `
        <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <div class="card bg-light text-secondary shadow h-100">
                <img src="${item.imageUrl}" class="card-img-top img-fluid" style="height: 350px; object-fit: cover;">
                <div class="card-body">
                    <h2>${item.name}</h2>
                    <p class="card-text">Price: ${item.price}</p>
                    <i class="fa-solid fa-heart wishlist-heart me-2 ${isInWishlist(item.id) ? 'text-danger' : 'text-dark'}" 
                       style="cursor: pointer;" 
                       onclick="toggleWishlist(${item.id}, this)"></i>
                    <button class="btn ${addedItem.some(p => p.id === item.id) ? 'btn-danger' : 'btn-primary'} addToCart"
                            onclick="toggleCart(${item.id}, this)">
                        ${addedItem.some(p => p.id === item.id) ? 'Remove from Cart' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    `).join("");

    allProducts.innerHTML = html;
    updateWishlistIcons();
}

drawItem();


function updateMiniCart() {
    cartProductDiv.innerHTML = "";

    if (addedItem.length === 0) {
        cartProductDiv.innerHTML = '<p class="text-muted text-center py-3">السلة فارغة</p>';
    } else {
        let total = 0;
        addedItem.forEach(item => {
            const price = parseFloat(item.price.replace('$','').trim()) || 0;
            const qty = item.quantity || 1;
            total += price * qty;
        });

        cartProductDiv.innerHTML;
    }

    badge.innerHTML = addedItem.length;
}

updateMiniCart();


function toggleCart(id, btn) {
    if (!localStorage.getItem("First_Name")) {
        window.location = "login.html";
        return;
    }

    const chosenItem = products.find(item => item.id === id);
    if (!chosenItem) return;

    const index = addedItem.findIndex(item => item.id === id);

    if (index === -1) {
        addedItem.push({ ...chosenItem, quantity: 1 });
        btn.classList.replace("btn-primary", "btn-danger");
        btn.textContent = "Remove from Cart";
    } else {
        addedItem.splice(index, 1);
        btn.classList.replace("btn-danger", "btn-primary");
        btn.textContent = "Add to Cart";
    }

    localStorage.setItem("ProductsInCart", JSON.stringify(addedItem));
    updateMiniCart();
}


document.querySelector(".shopping-cart").addEventListener("click", () => {
    const dropdown = document.querySelector(".carts-products");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
});


const searchInput = document.getElementById("searchInput");
const suggestions = document.getElementById("suggestions");

searchInput.addEventListener("input", function () {
    const value = this.value.toLowerCase().trim();
    suggestions.innerHTML = "";

    if (!value) {
        drawItem();
        return;
    }

    const filtered = products.filter(p => p.name.toLowerCase().includes(value));

    filtered.forEach(product => {
        const li = document.createElement("li");
        li.classList.add("list-group-item", "list-group-item-action");
        li.textContent = product.name;

        li.addEventListener("click", () => {
            searchInput.value = product.name;
            suggestions.innerHTML = "";
            drawItem([product]);
        });

        suggestions.appendChild(li);
    });
});
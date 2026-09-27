"use strict";


const app =
    document.getElementById("app");


/* =========================================
   HOME PAGE
========================================= */

function renderHome() {

    app.innerHTML = `

        <section class="container">

            <div class="hero">

                <h1>
                    Shop Smarter with ShopHub
                </h1>

                <p>
                    Discover quality products across
                    electronics, fashion, accessories
                    and home essentials.
                </p>

                <a href="#/products"
                   class="btn">
                    Explore Products
                </a>

            </div>


            <div class="section-title">

                <h2>
                    Featured Products
                </h2>

            </div>


            <div
                id="featured-products"
                class="product-grid">
            </div>

        </section>

    `;


    const container =
        document.getElementById(
            "featured-products"
        );


    products
        .slice(0, 4)
        .forEach(product => {

            container.innerHTML +=
                createProductCard(product);

        });


    attachCartEvents();

}


/* =========================================
   PRODUCTS PAGE
========================================= */

function renderProducts() {

    app.innerHTML = `

        <section class="container">

            <div class="section-title">

                <h1>
                    Products
                </h1>

            </div>


            <div class="filters">

                <input
                    type="search"
                    id="search-input"
                    placeholder="Search products..."
                    aria-label="Search products"
                >


                <select
                    id="category-filter"
                    aria-label="Filter by category">

                    <option value="all">
                        All Categories
                    </option>

                    <option value="Electronics">
                        Electronics
                    </option>

                    <option value="Fashion">
                        Fashion
                    </option>

                    <option value="Accessories">
                        Accessories
                    </option>

                    <option value="Home">
                        Home
                    </option>

                </select>

            </div>


            <div
                id="products-container"
                class="product-grid">
            </div>

        </section>

    `;


    renderProductList();


    document
        .getElementById("search-input")
        .addEventListener(
            "input",
            renderProductList
        );


    document
        .getElementById("category-filter")
        .addEventListener(
            "change",
            renderProductList
        );

}


/* =========================================
   PRODUCT LIST
========================================= */

function renderProductList() {

    const container =
        document.getElementById(
            "products-container"
        );


    if (!container) {
        return;
    }


    const search =
        document
            .getElementById("search-input")
            .value
            .toLowerCase();


    const category =
        document
            .getElementById("category-filter")
            .value;


    const filteredProducts =
        products.filter(product => {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(search);


            const matchesCategory =
                category === "all" ||
                product.category === category;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    container.innerHTML = "";


    if (filteredProducts.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <h2>
                    No products found
                </h2>

                <p>
                    Try another search or category.
                </p>

            </div>

        `;

        return;

    }


    filteredProducts.forEach(product => {

        container.innerHTML +=
            createProductCard(product);

    });


    attachCartEvents();

}


/* =========================================
   PRODUCT CARD
========================================= */

function createProductCard(product) {

    return `

        <article class="product-card">

            <img
                class="product-image"
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
                width="600"
                height="450"
            >


            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <p class="product-description">
                    ${product.description}
                </p>


                <div class="product-bottom">

                    <span class="price">
                        ₹${product.price}
                    </span>

                    <button
                        type="button"
                        class="add-cart"
                        data-product="${product.id}">
                        Add to Cart
                    </button>

                </div>

            </div>

        </article>

    `;

}


/* =========================================
   CART PAGE
========================================= */

function renderCartPage() {

    app.innerHTML = `

        <section class="container">

            <div class="section-title">

                <h1>
                    Shopping Cart
                </h1>

            </div>


            <div id="cart-container">
            </div>

        </section>

    `;


    renderCart();

}


/* =========================================
   CART BUTTON EVENTS
========================================= */

function attachCartEvents() {

    document
        .querySelectorAll("[data-product]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    addToCart(
                        Number(
                            button.dataset.product
                        )
                    );


                    button.textContent =
                        "Added ✓";


                    setTimeout(() => {

                        button.textContent =
                            "Add to Cart";

                    }, 1000);

                }
            );

        });

}


/* =========================================
   ROUTING
========================================= */

function renderPage(route) {

    switch (route) {

        case "products":
            renderProducts();
            break;


        case "cart":
            renderCartPage();
            break;


        case "home":
        default:
            renderHome();
            break;

    }


    updateCartCount();

    window.scrollTo(
        0,
        0
    );

}


/* =========================================
   INITIAL LOAD
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderPage(
            getRoute()
        );

    }
);

"use strict";


let cart =
    JSON.parse(
        localStorage.getItem("shopHubCart")
    ) || [];


/* =========================================
   SAVE CART
========================================= */

function saveCart() {

    localStorage.setItem(
        "shopHubCart",
        JSON.stringify(cart)
    );

}


/* =========================================
   ADD TO CART
========================================= */

function addToCart(productId) {

    const existingProduct =
        cart.find(
            item => item.id === productId
        );


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({

            id: productId,

            quantity: 1

        });

    }


    saveCart();

    updateCartCount();

}


/* =========================================
   REMOVE FROM CART
========================================= */

function removeFromCart(productId) {

    cart =
        cart.filter(
            item => item.id !== productId
        );


    saveCart();

    updateCartCount();

    renderCart();

}


/* =========================================
   CART COUNT
========================================= */

function updateCartCount() {

    const countElement =
        document.getElementById(
            "cart-count"
        );


    if (!countElement) {
        return;
    }


    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    countElement.textContent =
        count;

}


/* =========================================
   CART TOTAL
========================================= */

function getCartTotal() {

    return cart.reduce(
        (total, item) => {

            const product =
                products.find(
                    product =>
                        product.id === item.id
                );


            return total +
                (product.price *
                 item.quantity);

        },
        0
    );

}


/* =========================================
   RENDER CART
========================================= */

function renderCart() {

    const container =
        document.getElementById(
            "cart-container"
        );


    if (!container) {
        return;
    }


    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <h2>Your cart is empty</h2>

                <p>
                    Add products to start shopping.
                </p>

                <a href="#/products"
                   class="btn">
                    Browse Products
                </a>

            </div>

        `;

        return;

    }


    let html = `
        <div class="cart-list">
    `;


    cart.forEach(item => {

        const product =
            products.find(
                product =>
                    product.id === item.id
            );


        if (!product) {
            return;
        }


        html += `

            <article class="cart-item">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

                <div class="cart-details">

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        ₹${product.price}
                        × ${item.quantity}
                    </p>

                </div>

                <button
                    type="button"
                    class="remove-btn"
                    data-remove="${product.id}">
                    Remove
                </button>

            </article>

        `;

    });


    html += `

        </div>

        <div class="cart-summary">

            <p class="cart-total">
                Total: ₹${getCartTotal()}
            </p>

            <button
                class="btn"
                type="button"
                onclick="alert('Checkout feature can be connected to a payment gateway.')">
                Checkout
            </button>

        </div>

    `;


    container.innerHTML =
        html;


    container
        .querySelectorAll(
            "[data-remove]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    removeFromCart(
                        Number(
                            button.dataset.remove
                        )
                    );

                }
            );

        });

}

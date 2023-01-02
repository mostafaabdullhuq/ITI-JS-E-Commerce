import { ecommerceUsers, UpdateNavCart } from "./script.js";

// check if user logged in
let user = ecommerceUsers.validateLoginCookies();
// if logged in
if (user) {
    // get user cart
    let userCart = user.cart;
    // when window loads
    $(() => {
        // get products from cart
        let prods = userCart.prodsList;
        // if no products in cart
        if (prods.length === 0) {
            // show empty cart message
        }
        // if products in cart
        else {
            // variable to store products html
            let prodsHTML = "";

            // loop over all products from user cart
            prods.forEach((prod) => {
                // if product quantity is more than 1, add the minus icon, else add the trash icon
                let prodQtyShapeClass = prod.qty > 1 ? "fa-minus" : "fa-trash-can";

                // add the product html to the products html variable
                prodsHTML += `
                        <!-- product -->
                        <div class="prod row py-4 align-items-center justify-content-between" data-prod-id="${prod.id}">
                            <!--? product image /and title -->
                            <div class="prod-info col d-flex flex-column m-md-0 m-auto mb-3 mb-md-0 ms-xl-4">
                                <div
                                    style="
                                        background: url(${prod.image});
                                    "
                                    class="image-container col-12 d-flex flex-column"
                                ></div>
                                <a class="col-12 prod-title  ps-1 pe-1 mt-3" href="./../docs/product-info.html?prod_id=${prod.id}">${prod.title}</a>
                            </div>
                            <!--? product price -->
                            <div class="prod-price col-xl-2 col-md-1 h5 py-2 mb-3 py-md-0 mb-md-0 fs-4">$${prod.price}</div>
                            <!--? product quantity -->
                            <div class="prod-qty col-6 m-auto m-md-0 col-xl-2 col-md-2 d-flex justify-content-between py-2 mb-3 py-md-0 mb-md-0">
                                <i class="prod-qty-remove fs-4 col-2 fa-solid ${prodQtyShapeClass} text-start" data-prod-id="${prod.id}"></i>
                                <input type="text" class="text-center fw-bold fs-4 prod-qty-value col-6 p-0" data-prod-id="${prod.id}" value="${prod.qty}" />
                                <i class="prod-qty-add fs-4 col-2 fa-solid fa-plus text-end" data-prod-id="${prod.id}"></i>
                            </div>
                            <!--? product total -->
                            <div class="h5 prod-total col-xl-2 col-md-2 py-2 mb-3 py-md-0 mb-md-0 fs-4">$${+(prod.price * prod.qty).toFixed(2)}</div>
                        </div>
                        `;
            });

            // add the products to the page
            $(".cart-prods").append(prodsHTML);

            // update the right side of the cart
            updateCartRight();
        }

        // when user click on product decrease qty button
        $(".prod-qty-remove").on("click", function () {
            // get product id
            let prodId = $(this).attr("data-prod-id"),
                // get product quantity
                prodQty = +$(this).siblings(".prod-qty-value").val();
            // if quantity is 1
            if (prodQty == 1) {
                // remove product from html
                $(this)
                    .parents(".prod")
                    .slideUp(1000, function () {
                        this.remove();
                    });

                // send signal to input to change it's value
                $(this).siblings(".prod-qty-value").trigger("input", [0, prodId]);
            }

            // if quantity is more than 1
            else {
                // decrease product quantity
                prodQty -= 1;

                // send signal to input to change it's value
                $(this).siblings(".prod-qty-value").trigger("input", [prodQty, prodId]);
            }
        });

        // when user click on product increase qty button
        $(".prod-qty-add").on("click", function () {
            // get product id
            let prodId = $(this).attr("data-prod-id"),
                // get product quantity
                prodQty = +$(this).siblings(".prod-qty-value").val();

            // increase product quantity
            prodQty += 1;

            // send signal to input to change it's value
            $(this).siblings(".prod-qty-value").trigger("input", [prodQty, prodId]);
        });

        // set the initial product price to zero
        let prodPrice = 0;

        // when input value trigger changes
        $(".prod-qty-value").on("input", function (e, prodQty, prodId) {
            // if item is deleted
            if (prodQty === 0) {
                // loop over all products in cart
                prods.forEach((prod, index) => {
                    // check if product id the same as the current product id
                    if (prod.id == prodId) {
                        // remove the product from the prodsList Array
                        userCart.prodsList.splice(index, 1);
                    }
                });
            }

            // if value of item changes
            else {
                // if the event is triggered from the input itself
                if (!prodQty || !prodId || isNaN(prodQty)) {
                    // get the product id and quantity values
                    prodId = $(this).attr("data-prod-id");
                    prodQty = $(this).val() == 0 || isNaN($(this).val()) ? 1 : $(this).val();
                }
                // if the quantity is more than 999, max it to 999
                if (+prodQty > 999) prodQty = 999;
                // if the quantity is less than 1, min it to 1
                else if (+prodQty < 1) prodQty = 1;

                // change the quantity of the product in the cart and get the product price
                prods.forEach((prod) => {
                    if (prod.id == prodId) {
                        prod.qty = +prodQty;
                        prodPrice = prod.price;
                    }
                });

                // if the quantity is more than 1, change the trash can icon to minus icon
                if (prodQty > 1) {
                    $(this).siblings(".prod-qty-remove").removeClass("fa-trash-can").addClass("fa-minus");
                }
                // if quantity is 1, change minus icon to trash icon
                else {
                    $(this).siblings(".prod-qty-remove").removeClass("fa-minus").addClass("fa-trash-can");
                }

                // change the input value to the new quantity
                $(this).val(prodQty);
            }

            // update the subtotal of the product
            $(this)
                .parents(".prod-qty")
                .siblings(".prod-total")
                .text(`$${+(+$(this).val() * prodPrice).toFixed(2)}`);

            // update user cart in localstorage
            ecommerceUsers.updateCart(user, userCart.prodsList);

            // update the navbar cart
            UpdateNavCart(userCart.prodsCount);

            // update right section values
            updateCartRight();
        });
    });

    // when user click on checkout button
    $(".checkout-button").on("click", function () {
        // get user products
        let prods = userCart.prodsList;

        // if user has products in cart
        if (prods.length > 0) {
            // redirect the user to checkout page
            window.location.href = "./../docs/checkout.html";
        }
        // if user doesn't have any products in cart
        else {
            // show the empty cart popup
            $("#empty-checkout").fadeIn(500);

            // set an event for the empty cart popup continue shopping button
            $("#empty-checkout .continue-shopping").on("click", (e) => {
                // redirect the user to products page
                window.location.href = "/docs/categ.html";
            });

            // when x button is clicked in empty cart popup
            $("#empty-checkout .btn-close").on("click", (e) => {
                // hide the empty cart popup
                $("#empty-checkout").fadeOut(500);
            });
        }
    });

    // when user click on continue shopping button
    $(".continue-shopping-button").on("click", function () {
        // redirect the user to products page
        window.location.href = "./../docs/categ.html";
    });

    // a function to update the right side of the cart page
    function updateCartRight() {
        // update right section items count and subtotal
        $(".cart-items-count").text(userCart.prodsCount ?? 0);
        $(".cart-items-subtotal").text(`$${userCart.prodsPrice ?? 0}`);
    }
}

// if user not logged in
else {
    // redirect to login page
    window.location.href = "./../index.html";
}

import { setCookie, getCookie, deleteCookie, isPassValid, isEmailValid, User, Order, ecommerceUsers } from "./script.js";

// load the country phone dropdown
var input = document.querySelector("#phone");
intlTelInput(input, {
    initialCountry: "auto",
    nationalMode: true,
    // get user ip and automatically change country code
    geoIpLookup: function (success, failure) {
        $.get("https://ipinfo.io/json?token=82bc8af6571d77", function () {}, "jsonp").always(function (resp) {
            var countryCode = resp && resp.country ? resp.country : "us";
            success(countryCode);
        });
    },
});
// edit flag padding
$(".iti__flag-container").addClass("px-3");

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
            window.location.href = "./../docs/cart.html";
        }
        // if products in cart
        else {
            let prodsHTML = "";
            prods.forEach((prod) => {
                let prodQtyShapeClass = prod.qty > 1 ? "fa-minus" : "fa-trash-can";
                prodsHTML += `
                        <div class="list-group-item col list-group-item-action prod d-flex flex-row align-items-center py-3 px-3" data-prod-id="${prod.id}">
                            <!--? product title -->
                            <div class="prod-name fs-5 col-lg-8 col-6">${prod.title}</div>
                            <!--? product quantity -->
                            <div class="prod-qty col d-flex justify-content-between px-3">
                                <!-- /if checkout has only 1 item of that product -->
                                <i class="prod-qty-remove fs-5 col-2 fa-solid ${prodQtyShapeClass} text-start" data-prod-id="${prod.id}"></i>
                                <input type="text" class="text-center fs-5 prod-qty-value col-6 p-0" value="${prod.qty}"  data-prod-id="${prod.id}"/>
                                <i class="prod-qty-add fs-5 col-2 fa-solid fa-plus text-end" data-prod-id="${prod.id}"></i>
                            </div>
                            <!--? product price -->
                            <div class="prod-price col fs-5 text-end">$${prod.qty * prod.price}</div>
                        </div>
                `;
            });
            // add the products to the page
            $(".prods-summery-container").append(prodsHTML);

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
                console.log($(this).parents(".prod"));
                $(this)
                    .parents(".prod")
                    .fadeOut(100, function () {
                        this.remove();
                    });
                $(this).siblings(".prod-qty-value").trigger("input", [0, prodId]);
            }
            // if quantity is more than 1
            else {
                // decrease product quantity
                prodQty -= 1;
                $(this).siblings(".prod-qty-value").trigger("input", [prodQty, prodId]);
            }
        });
        $(".prod-qty-add").on("click", function () {
            // get product id
            let prodId = $(this).attr("data-prod-id"),
                // get product quantity
                prodQty = +$(this).siblings(".prod-qty-value").val();

            // increase product quantity
            prodQty += 1;
            $(this).siblings(".prod-qty-value").trigger("input", [prodQty, prodId]);
        });
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
                if (!prodQty || !prodId) {
                    // get the product id and quantity values
                    prodId = $(this).attr("data-prod-id");
                    prodQty = $(this).val() == 0 ? 1 : $(this).val();
                }

                // change the quantity of the product in the cart and get the product price
                prods.forEach((prod) => {
                    if (prod.id == prodId) {
                        prod.qty = +prodQty;
                        prodPrice = prod.price;
                    }
                });

                // if the quantity is more than 999, max it to 999
                if (+prodQty > 999) prodQty = 999;
                // if the quantity is less than 1, min it to 1
                else if (+prodQty < 1) prodQty = 1;

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
                .siblings(".prod-price")
                .text(`$${+$(this).val() * prodPrice}`);

            // update user cart in localstorage
            ecommerceUsers.updateCart(user, userCart.prodsList);

            // if there's no products in checkout, redirect to home
            if (prods.length == 0) {
                window.location.href = "./../index.html";
            }
            // update right section values
            updateCartRight();
        });
    });

    $(".checkout-button").on("click", function () {
        let prods = userCart.prodsList;

        if (prods.length > 0) {
            window.location.href = "./../docs/checkout.html";
        }
    });

    $(".continue-shopping-button").on("click", function () {
        window.location.href = "./../docs/categ.html";
    });

    function updateCartRight() {
        let shippingValue = 0;
        // update right section items count and subtotal
        $(".checkout-subtotal-value").text(`$${userCart.prodsPrice ?? 0}`);
        $(".checkout-total-value").text(`$${userCart.prodsPrice ?? 0 + shippingValue}`);
    }
}

// if not logged in
else {
    // redirect to login page
    window.location.href = "./../index.html";
}

/*



                        <!-- product -->
                        <div class="list-group-item col list-group-item-action prod d-flex flex-row align-items-center py-3 px-3">
                            <!--? product title -->
                            <div class="prod-name fs-5 col-lg-8 col-6">Lorem ipsum, dolor sit amet consectetur</div>
                            <!--? product quantity -->
                            <div class="prod-qty col d-flex justify-content-between px-3">
                                <!-- if checkout has more than 1 item of that product -->
                                <!-- <i class="prod-qty-add fs-3 col-2 fa-solid fa-minus"></i> -->
                                <!-- if checkout has only 1 item of that product -->
                                <i class="prod-qty-add fs-5 col-2 fa-solid fa-trash-can text-start"></i>
                                <input type="text" class="text-center fs-5 prod-qty-value col-6 p-0" value="1" />
                                <i class="prod-qty-remove fs-5 col-2 fa-solid fa-plus text-end"></i>
                            </div>
                            <!--? product price -->
                            <div class="prod-price col fs-5 text-end">$5000</div>
                        </div>
                        <!-- product -->
                        <div class="list-group-item col list-group-item-action prod d-flex flex-row align-items-center py-3 px-3">
                            <!--? product title -->
                            <div class="prod-name fs-5 col-lg-8 col-6">Lorem ipsum, dolor sit amet consectetur</div>
                            <!--? product quantity -->
                            <div class="prod-qty col d-flex justify-content-between px-3">
                                <!-- if checkout has more than 1 item of that product -->
                                <!-- <i class="prod-qty-add fs-3 col-2 fa-solid fa-minus"></i> -->
                                <!-- if checkout has only 1 item of that product -->
                                <i class="prod-qty-add fs-5 col-2 fa-solid fa-trash-can text-start"></i>
                                <input type="text" class="text-center fs-5 prod-qty-value col-6 p-0" value="1" />
                                <i class="prod-qty-remove fs-5 col-2 fa-solid fa-plus text-end"></i>
                            </div>
                            <!--? product price -->
                            <div class="prod-price col fs-5 text-end">$5000</div>
                        </div>
                        <!-- product -->
                        <div class="list-group-item col list-group-item-action prod d-flex flex-row align-items-center py-3 px-3">
                            <!--? product title -->
                            <div class="prod-name fs-5 col-lg-8 col-6">Lorem ipsum, dolor sit amet consectetur</div>
                            <!--? product quantity -->
                            <div class="prod-qty col d-flex justify-content-between px-3">
                                <!-- if checkout has more than 1 item of that product -->
                                <!-- <i class="prod-qty-add fs-3 col-2 fa-solid fa-minus"></i> -->
                                <!-- if checkout has only 1 item of that product -->
                                <i class="prod-qty-add fs-5 col-2 fa-solid fa-trash-can text-start"></i>
                                <input type="text" class="text-center fs-5 prod-qty-value col-6 p-0" value="1" />
                                <i class="prod-qty-remove fs-5 col-2 fa-solid fa-plus text-end"></i>
                            </div>
                            <!--? product price -->
                            <div class="prod-price col fs-5 text-end">$5000</div>
                        </div>
                        <!-- product -->
                        <div class="list-group-item col list-group-item-action prod d-flex flex-row align-items-center py-3 px-3">
                            <!--? product title -->
                            <div class="prod-name fs-5 col-lg-8 col-6">Lorem ipsum, dolor sit amet consectetur</div>
                            <!--? product quantity -->
                            <div class="prod-qty col d-flex justify-content-between px-3">
                                <!-- if checkout has more than 1 item of that product -->
                                <!-- <i class="prod-qty-add fs-3 col-2 fa-solid fa-minus"></i> -->
                                <!-- if checkout has only 1 item of that product -->
                                <i class="prod-qty-add fs-5 col-2 fa-solid fa-trash-can text-start"></i>
                                <input type="text" class="text-center fs-5 prod-qty-value col-6 p-0" value="1" />
                                <i class="prod-qty-remove fs-5 col-2 fa-solid fa-plus text-end"></i>
                            </div>
                            <!--? product price -->
                            <div class="prod-price col fs-5 text-end">$5000</div>
                        </div>
                        <!-- product -->
                        <div class="list-group-item col list-group-item-action prod d-flex flex-row align-items-center py-3 px-3">
                            <!--? product title -->
                            <div class="prod-name fs-5 col-lg-8 col-6">Lorem ipsum, dolor sit amet consectetur</div>
                            <!--? product quantity -->
                            <div class="prod-qty col d-flex justify-content-between px-3">
                                <!-- if checkout has more than 1 item of that product -->
                                <!-- <i class="prod-qty-add fs-3 col-2 fa-solid fa-minus"></i> -->
                                <!-- if checkout has only 1 item of that product -->
                                <i class="prod-qty-add fs-5 col-2 fa-solid fa-trash-can text-start"></i>
                                <input type="text" class="text-center fs-5 prod-qty-value col-6 p-0" value="1" />
                                <i class="prod-qty-remove fs-5 col-2 fa-solid fa-plus text-end"></i>
                            </div>
                            <!--? product price -->
                            <div class="prod-price col fs-5 text-end">$5000</div>
                        </div>


                        */

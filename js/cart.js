import { setCookie, getCookie, deleteCookie, isPassValid, isEmailValid, User, Order, ecommerceUsers } from "./script.js";

// check if user logged in
let user = ecommerceUsers.validateLoginCookies();

// if logged in
if (!user) {
    // this.cart = {
    //     prodsCount: 0,
    //     prodsPrice: 0,
    //     prodsList: [],
    // };

    // get user cart
    // let userCart = user.cart;
    let userCart = {
        prodsCount: 10,
        prodsPrice: 3000,
        prodsList: [
            {
                id: 1,
                title: "lorem ipsum datae alla",
                price: 100,
                qty: 1,
                image: "https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1452&q=80",
            },
            {
                id: 2,
                title: "Product 2",
                price: 200,
                qty: 2,
                image: "https://images.unsplash.com/photo-1555487505-8603a1a69755?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
            },
            {
                id: 3,
                title: "Product 3",
                price: 300,
                qty: 3,
                image: "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
            },
            {
                id: 4,
                title: "Product 4",
                price: 400,
                qty: 4,
                image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
            },
        ],
    };
    console.log(userCart.prodsCount);
    // when window loads
    $(() => {
        // get products from cart
        let prods = userCart.prodsList;
        // if no products in cart
        if (prods.length === 0) {
            // show empty cart message
            $("#cart").html("<h2>Your cart is empty</h2>");
        }
        // if products in cart
        else {
            let prodsHTML = "";
            prods.forEach((prod) => {
                let prodQtyShapeClass = prod.qty > 1 ? "fa-minus" : "fa-trash-can";
                prodsHTML += `
<!-- product -->
<div class="prod row py-4 align-items-center justify-content-between" data-prod-id="${prod.id}">
    <!--? product image and title -->
    <div class="prod-info col d-flex flex-column m-md-0 m-auto mb-3 mb-md-0 ms-xl-4">
        <div
            style="
                background: url(${prod.image});
            "
            class="image-container col-12 d-flex flex-column"
        ></div>
        <p class="col-12 prod-title ps-1 pe-1 mt-2">${prod.title}</p>
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
    <div class="h5 prod-total col-xl-2 col-md-2 py-2 mb-3 py-md-0 mb-md-0 fs-4">$${prod.price * prod.qty}</div>
</div>
`;
            });
            // add the products to the page
            $(".cart-prods").append(prodsHTML);
            updateCartRight();
        }

        $(".prod-qty-remove").on("click", function () {
            // get product id
            let prodId = $(this).attr("data-prod-id"),
                // get product quantity
                prodQty = $(this).siblings(".prod-qty-value").val();
            // if quantity is 1
            if (prodQty == 1) {
                // remove product from html
                $(this)
                    .parents(".prod")
                    .slideUp(1000, function () {
                        this.remove();
                    });
                // remove product from cart
                prods.forEach((prod, index) => {
                    if (prod.id == prodId) {
                        userCart.prodsList.splice(userCart.prodsList.index, 1);
                    }
                });
                console.log(userCart.prodsList);
                console.log(ecommerceUsers.updateCart(user, userCart.prodsList));
            }
        });
    });

    function updateCartRight() {
        // update right section items count and subtotal
        $(".cart-items-count").text(userCart.prodsCount ?? 0);
        $(".cart-items-subtotal").text(`$${userCart.prodsPrice ?? 0}`);
    }
    function cartUpdater() {
        let count = 0;
        userCart.prodsList.forEach((prod) => {
            count += prod.qty;
        });
        userCart.prodsCount = count;
    }
}

// if not logged in
else {
    // redirect to login page
    window.location.href = "./../index.html";
}

/*


                    <!-- <div class="cart-prods mt-3 px-3"> -->
                    <!-- product -->
                    <div class="prod row py-4 align-items-center justify-content-between">
                        <!--? product delete -->
                        <!-- <i class="prod-delete col d-none d-md-flex fs-2 fa-solid fa-xmark"></i> -->
                        <!--? product image and title -->
                        <div class="prod-info col d-flex flex-column m-md-0 m-auto mb-3 mb-md-0 ms-xl-4">
                            <div
                                style="
                                    background: url('https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1452&q=80');
                                "
                                class="image-container col-12 d-flex flex-column"
                            ></div>
                            <p class="col-12 prod-title ps-1 pe-1 mt-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                        <!--? product price -->
                        <div class="prod-price col-xl-2 col-md-1 h5 py-2 mb-3 py-md-0 mb-md-0 fs-4">$100</div>
                        <!--? product quantity -->
                        <div class="prod-qty col-6 m-auto m-md-0 col-xl-2 col-md-2 d-flex justify-content-between py-2 mb-3 py-md-0 mb-md-0">
                            <!-- if cart has more than 1 item of that product -->
                            <!-- <i class="prod-qty-add fs-3 col-2 fa-solid fa-minus"></i> -->
                            <!-- if cart has only 1 item of that product -->
                            <i class="prod-qty-add fs-4 col-2 fa-solid fa-trash-can text-start"></i>
                            <input type="text" class="text-center fw-bold fs-4 prod-qty-value col-6 p-0" value="1" />
                            <i class="prod-qty-remove fs-4 col-2 fa-solid fa-plus text-end"></i>
                        </div>
                        <!--? product total -->
                        <div class="h5 prod-total col-xl-2 col-md-2 py-2 mb-3 py-md-0 mb-md-0 fs-4">$5000</div>
                    </div>
                    <!-- product -->
                    <div class="prod row py-4 align-items-center justify-content-between">
                        <!--? product delete -->
                        <!-- <i class="prod-delete col d-none d-md-flex fs-2 fa-solid fa-xmark"></i> -->
                        <!--? product image and title -->
                        <div class="prod-info col d-flex flex-column m-md-0 m-auto mb-3 mb-md-0 ms-xl-4">
                            <div
                                style="
                                    background: url('https://images.unsplash.com/photo-1555487505-8603a1a69755?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80');
                                "
                                class="image-container col-12 d-flex flex-column"
                            ></div>
                            <p class="col-12 prod-title ps-1 pe-1 mt-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                        <!--? product price -->
                        <div class="prod-price col-xl-2 col-md-1 h5 py-2 mb-3 py-md-0 mb-md-0 fs-4">$100</div>
                        <!--? product quantity -->
                        <div class="prod-qty col-6 m-auto m-md-0 col-xl-2 col-md-2 d-flex justify-content-between py-2 mb-3 py-md-0 mb-md-0">
                            <!-- if cart has more than 1 item of that product -->
                            <!-- <i class="prod-qty-add fs-3 col-2 fa-solid fa-minus"></i> -->
                            <!-- if cart has only 1 item of that product -->
                            <i class="prod-qty-remove fs-4 col-2 fa-solid fa-trash-can text-start"></i>
                            <input type="text" class="text-center fw-bold fs-4 prod-qty-value col-6 p-0" value="1" />
                            <i class="prod-qty-add fs-4 col-2 fa-solid fa-plus text-end"></i>
                        </div>
                        <!--? product total -->
                        <div class="h5 prod-total col-xl-2 col-md-2 py-2 mb-3 py-md-0 mb-md-0 fs-4">$5000</div>
                    </div>
                    <!-- product -->
                    <div class="prod row py-4 align-items-center justify-content-between">
                        <!--? product delete -->
                        <!-- <i class="prod-delete col d-none d-md-flex fs-2 fa-solid fa-xmark"></i> -->
                        <!--? product image and title -->
                        <div class="prod-info col d-flex flex-column m-md-0 m-auto mb-3 mb-md-0 ms-xl-4">
                            <div
                                style="
                                    background: url('https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80');
                                "
                                class="image-container col-12 d-flex flex-column"
                            ></div>
                            <p class="col-12 prod-title ps-1 pe-1 mt-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                        <!--? product price -->
                        <div class="prod-price col-xl-2 col-md-1 h5 py-2 mb-3 py-md-0 mb-md-0 fs-4">$100</div>
                        <!--? product quantity -->
                        <div class="prod-qty col-6 m-auto m-md-0 col-xl-2 col-md-2 d-flex justify-content-between py-2 mb-3 py-md-0 mb-md-0">
                            <!-- if cart has more than 1 item of that product -->
                            <!-- <i class="prod-qty-add fs-3 col-2 fa-solid fa-minus"></i> -->
                            <!-- if cart has only 1 item of that product -->
                            <i class="prod-qty-add fs-4 col-2 fa-solid fa-trash-can text-start"></i>
                            <input type="text" class="text-center fw-bold fs-4 prod-qty-value col-6 p-0" value="1" />
                            <i class="prod-qty-remove fs-4 col-2 fa-solid fa-plus text-end"></i>
                        </div>
                        <!--? product total -->
                        <div class="h5 prod-total col-xl-2 col-md-2 py-2 mb-3 py-md-0 mb-md-0 fs-4">$5000</div>
                    </div>
                    <!-- product -->
                    <div class="prod row py-4 align-items-center justify-content-between">
                        <!--? product delete -->
                        <!-- <i class="prod-delete col d-none d-md-flex fs-2 fa-solid fa-xmark"></i> -->
                        <!--? product image and title -->
                        <div class="prod-info col d-flex flex-column m-md-0 m-auto mb-3 mb-md-0 ms-xl-4">
                            <div
                                style="
                                    background: url('https://images.unsplash.com/photo-1547949003-9792a18a2601?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80');
                                "
                                class="image-container col-12 d-flex flex-column"
                            ></div>
                            <p class="col-12 prod-title ps-1 pe-1 mt-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                        <!--? product price -->
                        <div class="prod-price col-xl-2 col-md-1 h5 py-2 mb-3 py-md-0 mb-md-0 fs-4">$100</div>
                        <!--? product quantity -->
                        <div class="prod-qty col-6 m-auto m-md-0 col-xl-2 col-md-2 d-flex justify-content-between py-2 mb-3 py-md-0 mb-md-0">
                            <!-- if cart has more than 1 item of that product -->
                            <!-- <i class="prod-qty-add fs-3 col-2 fa-solid fa-minus"></i> -->
                            <!-- if cart has only 1 item of that product -->
                            <i class="prod-qty-add fs-4 col-2 fa-solid fa-trash-can text-start"></i>
                            <input type="text" class="text-center fw-bold fs-4 prod-qty-value col-6 p-0" value="1" />
                            <i class="prod-qty-remove fs-4 col-2 fa-solid fa-plus text-end"></i>
                        </div>
                        <!--? product total -->
                        <div class="h5 prod-total col-xl-2 col-md-2 py-2 mb-3 py-md-0 mb-md-0 fs-4">$5000</div>
                    </div>
                    <!-- product -->
                    <div class="prod row py-4 align-items-center justify-content-between">
                        <!--? product delete -->
                        <!-- <i class="prod-delete col d-none d-md-flex fs-2 fa-solid fa-xmark"></i> -->
                        <!--? product image and title -->
                        <div class="prod-info col d-flex flex-column m-md-0 m-auto mb-3 mb-md-0 ms-xl-4">
                            <div
                                style="
                                    background: url('https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80');
                                "
                                class="image-container col-12 d-flex flex-column"
                            ></div>
                            <p class="col-12 prod-title ps-1 pe-1 mt-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                        <!--? product price -->
                        <div class="prod-price col-xl-2 col-md-1 h5 py-2 mb-3 py-md-0 mb-md-0 fs-4">$100</div>
                        <!--? product quantity -->
                        <div class="prod-qty col-6 m-auto m-md-0 col-xl-2 col-md-2 d-flex justify-content-between py-2 mb-3 py-md-0 mb-md-0">
                            <!-- if cart has more than 1 item of that product -->
                            <!-- <i class="prod-qty-add fs-3 col-2 fa-solid fa-minus"></i> -->
                            <!-- if cart has only 1 item of that product -->
                            <i class="prod-qty-add fs-4 col-2 fa-solid fa-trash-can text-start"></i>
                            <input type="text" class="text-center fw-bold fs-4 prod-qty-value col-6 p-0" value="1" />
                            <i class="prod-qty-remove fs-4 col-2 fa-solid fa-plus text-end"></i>
                        </div>
                        <!--? product total -->
                        <div class="h5 prod-total col-xl-2 col-md-2 py-2 mb-3 py-md-0 mb-md-0 fs-4">$5000</div>
                    </div>
                    <!-- product -->
                    <div class="prod row py-4 align-items-center justify-content-between">
                        <!--? product delete -->
                        <!-- <i class="prod-delete col d-none d-md-flex fs-2 fa-solid fa-xmark"></i> -->
                        <!--? product image and title -->
                        <div class="prod-info col d-flex flex-column m-md-0 m-auto mb-3 mb-md-0 ms-xl-4">
                            <div
                                style="
                                    background: url('https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80');
                                "
                                class="image-container col-12 d-flex flex-column"
                            ></div>
                            <p class="col-12 prod-title ps-1 pe-1 mt-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                        <!--? product price -->
                        <div class="prod-price col-xl-2 col-md-1 h5 py-2 mb-3 py-md-0 mb-md-0 fs-4">$100</div>
                        <!--? product quantity -->
                        <div class="prod-qty col-6 m-auto m-md-0 col-xl-2 col-md-2 d-flex justify-content-between py-2 mb-3 py-md-0 mb-md-0">
                            <!-- if cart has more than 1 item of that product -->
                            <!-- <i class="prod-qty-add fs-3 col-2 fa-solid fa-minus"></i> -->
                            <!-- if cart has only 1 item of that product -->
                            <i class="prod-qty-add fs-4 col-2 fa-solid fa-trash-can text-start"></i>
                            <input type="text" class="text-center fw-bold fs-4 prod-qty-value col-6 p-0" value="1" />
                            <i class="prod-qty-remove fs-4 col-2 fa-solid fa-plus text-end"></i>
                        </div>
                        <!--? product total -->
                        <div class="h5 prod-total col-xl-2 col-md-2 py-2 mb-3 py-md-0 mb-md-0 fs-4">$5000</div>
                    </div>
                    <!-- </div> -->
*/

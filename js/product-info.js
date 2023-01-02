import { ecommerceUsers, UpdateNavCart } from "./script.js";

// check if user logged in
let user = ecommerceUsers.validateLoginCookies();

// get url of window
let windowURL = window.location.href;

// if window has no parameters
if (windowURL.split("?")[1].split("=")[1] > 20 || windowURL.split("?")[1].split("=")[1] < 1) {
    // redirect to products page
    location.replace("./../docs/categ.html");
}

// get product id from url
let prodID = window.location.href.split("?")[1].split("=")[1] || 1;

let prod = "",
    product = false;

// fetch required product from api
fetch(`https://fakestoreapi.com/products/${prodID}`)
    .then((res) => res.json())
    .then((product) => {
        $(function () {
            prod = `
                <!-- ----------image-------- -->
                <div class="product-img col" data-prod-id="2" style="background: url('${product.image}')">
                </div>
                <!-- --------------product name ,price & rate btn------ -->
                <div class="detail justify-content-center d-flex flex-column col align-items-start ms-3">
                    <!--? product title -->

                    <h3 class="title fw-bold" style="word-break: break-all">${product.title}</h3>

                    <!--? product price -->
                    <div class="d-flex align-items-center w-100 my-3">
                        <span class="prod-price fs-1 fw-bold col me-3">$${product.price}</span>
                        <div class="rating col d-flex justify-content-end">
                            ${'<i class="fa-solid fa-star fs-4 text-end" style="color: gold !important"></i>'.repeat(Math.round(product.rating.rate))}
                        </div>
                    </div>

                    <!--? product quantity -->

                    <div class="prod-qty d-flex w-100 flex-column">
                        <div class="controls d-flex align-items-center col-12 px-4 py-2">
                            <i class="prod-qty-remove cell fs-4 fa-solid fa-minus border-0 p-1" data-prod-id="${product.id}"></i>
                            <input type="text" class="flex-grow-1 prod-qty-value text-center fw-bold border-0 fs-4 w-25" data-prod-id="${product.id}" value="1" />
                            <i class="prod-qty-add cell fs-4 fa-solid fa-plus border-0 p-1" data-prod-id="${product.id}"></i>
                        </div>
                        <div class="button add-to-cart btn col-12 text-center py-3 rounded-0 px-4 text-uppercase mt-2" data-prod-id="${product.id}">Add to cart</div>
                    </div>
                </div>
                `;

            // add the product to html
            $(".product-item").html(prod);

            // when user clicks - icon
            $(".prod-qty-remove").on("click", function () {
                // get product quantity from input
                let prodQty = +$(this).siblings(".prod-qty-value").val();
                {
                    // decrement the quantity of the product
                    prodQty -= 1;

                    // trigger the event of
                    $(this).siblings(".prod-qty-value").trigger("input", [prodQty]);
                }
            });
            $(".prod-qty-add").on("click", function () {
                let prodQty = +$(this).siblings(".prod-qty-value").val();
                prodQty += 1;
                $(this).siblings(".prod-qty-value").trigger("input", [prodQty]);
            });
            $(".prod-qty-value").on("input", function (e, prodQty) {
                {
                    if (!prodQty) {
                        prodQty = $(this).val() == 0 ? 1 : $(this).val();
                    }
                    if (+prodQty > 999) prodQty = 999;
                    else if (+prodQty < 1) prodQty = 1;

                    $(this).val(+prodQty);
                }
            });
            $(".product-img").on("click", function () {
                this.requestFullscreen({ navigationUI: "show" });
            });
            $(".add-to-cart").on("click", function (e) {
                if (user) {
                    let newQuantity = false;
                    let prodQty = +$(this).siblings(".controls").children(".prod-qty-value").val(),
                        userProdList = user.cart.prodsList;
                    let isInCart = ecommerceUsers.isProdInCart(user, product);
                    if (isInCart[0]) {
                        newQuantity = isInCart[0].qty + prodQty;
                        userProdList[isInCart[1]].qty = newQuantity;
                    } else {
                        userProdList.push(product);
                    }
                    product.qty = newQuantity ? newQuantity : prodQty;
                    ecommerceUsers.updateCart(user, userProdList);
                    UpdateNavCart(user.cart.prodsCount);
                } else {
                    // show the login popup
                    $("#quickviewpopup").fadeOut(0);
                    $("#signin-trigger-button").trigger("click");
                }
            });
        });
    })
    .catch((prodInfoFetchErr) => {
        console.error(`Error Fetching Product Information: ${prodInfoFetchErr}`);
    });

// 3.fetching description
fetch(`https://fakestoreapi.com/products/${prodID}`)
    .then((res) => res.json())
    .then((product) => {
        $(function () {
            prod = `
                <h2 class="fw-bolder mb-3">Description</h2>
                <p class="desc py-3 px-4 rounded-1">${product.description}</p>
                `;

            $("#descr").html(prod);
        });
    })
    .catch((descFetchErr) => {
        console.error(`Error Fetching Description: ${descFetchErr}`);
    });

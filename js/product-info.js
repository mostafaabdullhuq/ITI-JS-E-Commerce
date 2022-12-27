import { ecommerceUsers, UpdateNavCart } from "./script.js";

// check if user logged in
let user = ecommerceUsers.validateLoginCookies();

let windowURL = window.location.href;
if (windowURL.split("?").length === 1) {
    window.location.href = "./../index.html";
}
let prodID = window.location.href.split("?")[1].split("=")[1] || 1;
console.log(prodID);

$(function () {
    let prod = "",
        product = false; // 1.fetching product image
    fetch(`https://fakestoreapi.com/products/${prodID}`)
        .then((res) => res.json())
        .then((product) => {
            prod = `
                <a href="#shop-single.html" class="card product-img " data-prod-id="${product.id}" >
                    <img
                        src="${product.image}"
                        class="img-fluid img-thumbnail"
                        style="height: 300px ;width:300px"
                    />
                </a>
                `;
            $(".product-item").append(prod);
        })
        .catch((e) => {
            console.log("Error ):");
            console.log(e);
        });
    // 2.fetching title and price
    fetch(`https://fakestoreapi.com/products/${prodID}`)
        .then((res) => res.json())
        .then((product) => {
            prod = `
                <div class="contain my-4"> 

                    <!--? product title -->

                    <div class="d-flex justify-content-center ctitle">
                        <h3 class="title fw-bold"">${product.title}</h3>
                    </div>

                    <!--? product price -->

                    <div class="d-flex justify-content-center m-4">
                        <span class="prod-price h5 me-5 fw-bold">$${product.price}</span>
                        ${`<i class="fa-solid fa-star" style="color:var(--ltn__secondary-color-2)"></i>`.repeat(Math.round(product.rating.rate))}
                    </div>
                </div> 

                <!--? product quantity -->

                <div class="prod-qty d-flex justify-content-center">
                        <i class="prod-qty-remove cell fs-4 fa-solid fa-minus border border-2 p-1" data-prod-id="${product.id}"></i>
                        <input type="text" class="prod-qty-value text-center fw-bold fs-4 w-25" data-prod-id="${product.id}" value="1"/>
                        <i class="prod-qty-add cell fs-4 fa-solid fa-plus border border-2 p-1" data-prod-id="${product.id}"></i>
                        <div class="button add-to-cart btn ms-3 text-center p-2" data-prod-id="${product.id}" >Add to cart</div>
                </div>
            `;

            $(".detail").append(prod);
            // when user click on product decrease qty button
            $(".prod-qty-remove").on("click", function () {
                // get product id
                let prodId = $(this).attr("data-prod-id"),
                    // get product quantity
                    prodQty = +$(this).siblings(".prod-qty-value").val();

                {
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
            // when input value trigger changes
            $(".prod-qty-value").on("input", function (e, prodQty, prodId) {
                {
                    // if the event is triggered from the input itself
                    if (!prodQty || !prodId) {
                        // get the product id and quantity values
                        prodId = $(this).attr("data-prod-id");
                        prodQty = $(this).val() == 0 ? 1 : $(this).val();
                    }
                    // if the quantity is more than 999, max it to 999
                    if (+prodQty > 999) prodQty = 999;
                    // if the quantity is less than 1, min it to 1
                    else if (+prodQty < 1) prodQty = 1;

                    // change the input value to the new quantity
                    $(this).val(prodQty);
                    console.log(prodQty);
                }
            });

            $(".add-to-cart").on("click", function (e) {
                // console.log(product);
                // console.log(user);
                console.log(ecommerceUsers.isProdInCart(user, product));
                if (user) {
                    let prodQty = +$(this).siblings(".prod-qty-value").val(),
                        userProdList = user.cart.prodsList;

                    userProdList.push({
                        id: product.id,
                        title: product.title,
                        image: product.image,
                        price: product.price,
                        qty: prodQty,
                    });
                    ecommerceUsers.updateCart(user, userProdList);
                    UpdateNavCart(user.cart.prodsCount);
                }
            });
        })
        .catch((e) => {
            console.log("error");
            console.log(e);
        });

    // 3.fetching description
    fetch(`https://fakestoreapi.com/products/${prodID}`)
        .then((res) => res.json())
        .then((product) => {
            prod = `
            <div class="container mt-5 flex-lg-row flex-column d-flex" style="padding-left:15%;">
            <h2 class="fw-bold ">Description</h2>
            </div>

            <div class="container  flex-lg-row flex-column d-flex" style="padding-left:15%;">
                <p class="desc">${product.description}</p>
            </div>
                `;

            $("#descr").append(prod);
        })
        .catch((e) => {
            console.log("error");
            console.log(e);
        });
});

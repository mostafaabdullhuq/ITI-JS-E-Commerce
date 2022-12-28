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
            $(".product-item").html(prod);

            $(".prod-qty-remove").on("click", function () {
                let prodQty = +$(this).siblings(".prod-qty-value").val();
                {
                    prodQty -= 1;
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
                    console.log("in trigger");
                    if (!prodQty) {
                        console.log("in if");
                        prodQty = $(this).val() == 0 ? 1 : $(this).val();
                    }
                    if (+prodQty > 999) prodQty = 999;
                    else if (+prodQty < 1) prodQty = 1;

                    $(this).val(+prodQty);
                }
            });

            $(".add-to-cart").on("click", function (e) {
                if (user) {
                    let newQuantity = false;
                    console.log("add to cart clicked");
                    console.log(this);
                    let prodQty = +$(this).siblings(".controls").children(".prod-qty-value").val(),
                        userProdList = user.cart.prodsList;
                    console.log(product);
                    let isInCart = ecommerceUsers.isProdInCart(user, product);
                    console.log("Input Quantity: " + prodQty);
                    if (isInCart[0]) {
                        console.log("Quantity In Cart: " + isInCart[0].qty);
                        newQuantity = isInCart[0].qty + prodQty;
                        userProdList[isInCart[1]].qty = newQuantity;
                        console.log("New Quantity: " + newQuantity);
                        console.log(product);
                    } else {
                        userProdList.push(product);
                    }
                    product.qty = newQuantity ? newQuantity : prodQty;
                    console.log(userProdList);
                    ecommerceUsers.updateCart(user, userProdList);
                    UpdateNavCart(user.cart.prodsCount);
                } else {
                    console.log("here");
                    ////// show the login popup
                    $("#exampleModalToggle2").fadeIn();
                    $("#quickviewpopup").fadeOut(0);
                }
            });

            // // when user click on product decrease qty button
            // $(".prod-qty-remove").on("click", function () {
            //     // get product id
            //     let prodId = $(this).attr("data-prod-id"),
            //         // get product quantity
            //         prodQty = +$(this).siblings(".prod-qty-value").val();

            //     {
            //         // decrease product quantity
            //         prodQty -= 1;
            //         $(this).siblings(".prod-qty-value").trigger("input", [prodQty, prodId]);
            //     }
            // });
            // $(".prod-qty-add").on("click", function () {
            //     // get product id
            //     let prodId = $(this).attr("data-prod-id"),
            //         // get product quantity
            //         prodQty = +$(this).siblings(".prod-qty-value").val();

            //     // increase product quantity
            //     prodQty += 1;
            //     $(this).siblings(".prod-qty-value").trigger("input", [prodQty, prodId]);
            // });
            // // when input value trigger changes
            // $(".prod-qty-value").on("input", function (e, prodQty, prodId) {
            //     {
            //         // if the event is triggered from the input itself
            //         if (!prodQty || !prodId) {
            //             // get the product id and quantity values
            //             prodId = $(this).attr("data-prod-id");
            //             prodQty = $(this).val() == 0 ? 1 : $(this).val();
            //         }
            //         // if the quantity is more than 999, max it to 999
            //         if (+prodQty > 999) prodQty = 999;
            //         // if the quantity is less than 1, min it to 1
            //         else if (+prodQty < 1) prodQty = 1;

            //         // change the input value to the new quantity
            //         $(this).val(prodQty);
            //         console.log(prodQty);
            //     }
            // });

            // $(".add-to-cart").on("click", function (e) {
            //     // console.log(product);
            //     // console.log(user);
            //     if (user) {
            //         let prodQty = +$(this).siblings(".prod-qty-value").val(),
            //             userProdList = user.cart.prodsList;

            //         // check if the product is already in the cart
            //         let prodInCart = ecommerceUsers.isProdInCart(user, product);

            //         if (prodInCart[0]) {
            //             // if product is in the cart, add the current quantity to the cart quantity
            //             userProdList[prodInCart[1]].qty += prodQty;
            //         }
            //         // if product is not in the cart, add it to the cart
            //         else {
            //             userProdList.push({
            //                 id: product.id,
            //                 title: product.title,
            //                 image: product.image,
            //                 price: product.price,
            //                 qty: prodQty,
            //             });
            //         }

            //         ecommerceUsers.updateCart(user, userProdList);
            //         UpdateNavCart(user.cart.prodsCount);
            //     }
            // });
        })
        .catch((e) => {
            console.log("Error ):");
            console.log(e);
        });

    // 2.fetching title and price
    // fetch(`https://fakestoreapi.com/products/${prodID}`)
    //     .then((res) => res.json())
    //     .then((product) => {
    //         prod = `
    //             <div class="contain my-4">

    //                 <!--? product title -->

    //                 <div class="d-flex justify-content-center ctitle">
    //                     <h3 class="title fw-bold">${product.title}</h3>
    //                 </div>

    //                 <!--? product price -->

    //                 <div class="d-flex justify-content-center m-4">
    //                     <span class="prod-price h5 me-5 fw-bold">$${product.price}</span>
    //                     ${`<i class="fa-solid fa-star" style="color:var(--ltn__secondary-color-2)"></i>`.repeat(Math.round(product.rating.rate))}
    //                 </div>
    //             </div>

    //             <!--? product quantity -->

    //             <div class="prod-qty d-flex justify-content-center">
    //                     <i class="prod-qty-remove cell fs-4 fa-solid fa-minus border border-2 p-1" data-prod-id="${product.id}"></i>
    //                     <input type="text" class="prod-qty-value text-center fw-bold fs-4 w-25" data-prod-id="${product.id}" value="1"/>
    //                     <i class="prod-qty-add cell fs-4 fa-solid fa-plus border border-2 p-1" data-prod-id="${product.id}"></i>
    //                     <div class="button add-to-cart btn ms-3 text-center p-2" data-prod-id="${product.id}" >Add to cart</div>
    //             </div>
    //         `;

    //         $(".detail").append(prod);
    //         // when user click on product decrease qty button
    //         $(".prod-qty-remove").on("click", function () {
    //             // get product id
    //             let prodId = $(this).attr("data-prod-id"),
    //                 // get product quantity
    //                 prodQty = +$(this).siblings(".prod-qty-value").val();

    //             {
    //                 // decrease product quantity
    //                 prodQty -= 1;
    //                 $(this).siblings(".prod-qty-value").trigger("input", [prodQty, prodId]);
    //             }
    //         });
    //         $(".prod-qty-add").on("click", function () {
    //             // get product id
    //             let prodId = $(this).attr("data-prod-id"),
    //                 // get product quantity
    //                 prodQty = +$(this).siblings(".prod-qty-value").val();

    //             // increase product quantity
    //             prodQty += 1;
    //             $(this).siblings(".prod-qty-value").trigger("input", [prodQty, prodId]);
    //         });
    //         // when input value trigger changes
    //         $(".prod-qty-value").on("input", function (e, prodQty, prodId) {
    //             {
    //                 // if the event is triggered from the input itself
    //                 if (!prodQty || !prodId) {
    //                     // get the product id and quantity values
    //                     prodId = $(this).attr("data-prod-id");
    //                     prodQty = $(this).val() == 0 ? 1 : $(this).val();
    //                 }
    //                 // if the quantity is more than 999, max it to 999
    //                 if (+prodQty > 999) prodQty = 999;
    //                 // if the quantity is less than 1, min it to 1
    //                 else if (+prodQty < 1) prodQty = 1;

    //                 // change the input value to the new quantity
    //                 $(this).val(prodQty);
    //                 console.log(prodQty);
    //             }
    //         });

    //         $(".add-to-cart").on("click", function (e) {
    //             // console.log(product);
    //             // console.log(user);
    //             if (user) {
    //                 let prodQty = +$(this).siblings(".prod-qty-value").val(),
    //                     userProdList = user.cart.prodsList;

    //                 // check if the product is already in the cart
    //                 let prodInCart = ecommerceUsers.isProdInCart(user, product);

    //                 if (prodInCart[0]) {
    //                     // if product is in the cart, add the current quantity to the cart quantity
    //                     userProdList[prodInCart[1]].qty += prodQty;
    //                 }
    //                 // if product is not in the cart, add it to the cart
    //                 else {
    //                     userProdList.push({
    //                         id: product.id,
    //                         title: product.title,
    //                         image: product.image,
    //                         price: product.price,
    //                         qty: prodQty,
    //                     });
    //                 }

    //                 ecommerceUsers.updateCart(user, userProdList);
    //                 UpdateNavCart(user.cart.prodsCount);
    //             }
    //         });
    //     })
    //     .catch((e) => {
    //         console.log("error");
    //         console.log(e);
    //     });

    // 3.fetching description
    fetch(`https://fakestoreapi.com/products/${prodID}`)
        .then((res) => res.json())
        .then((product) => {
            prod = `
                <h2 class="fw-bolder mb-3">Description</h2>
                <p class="desc py-3 px-4 rounded-1">${product.description}</p>
                `;

            $("#descr").html(prod);
        })
        .catch((e) => {
            console.log("error");
            console.log(e);
        });
});

// <div class="container mt-5 flex-lg-row flex-column d-flex" style="padding-left:15%;">
// <h2 class="fw-bold ">Description</h2>
// </div>

// <div class="container  flex-lg-row flex-column d-flex" style="padding-left:15%;">
//     <p class="desc">${product.description}</p>
// </div>

// <a href="#shop-single.html" class="card product-img " data-prod-id="${product.id}">
//     <img src="${product.image}" class="img-fluid img-thumbnail" style="height: 300px ;width:300px" />
// </a>;

// <!-- ----------image-------- -->
// <div class="product-img col" data-prod-id="2" style="background: url('https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg')">
//     <!-- <a href="#shop-single.html" class="card product-img" data-prod-id="2">
//         <img src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg" class="img-fluid img-thumbnail" style="height: 300px; width: 300px" />
//     </a> -->
// </div>
// <!-- --------------product name ,price & rate btn------ -->
// <div class="detail justify-content-center d-flex flex-column col align-items-start ms-3">
//     <!--? product title -->

//     <h3 class="title fw-bold" style="word-break: break-all">
//         Lorem ipsum, dolor sit amet consectetur adipisicing elitLorem ipsum, dolor sit amet consectetur adipisicing elitLorem ipsum, dolor sit amet consectetur adipisicing elit.
//     </h3>

//     <!--? product price -->
//     <div class="d-flex align-items-center w-100 my-3">
//         <span class="prod-price fs-1 fw-bold col me-3">$50</span>
//         <div class="rating col d-flex justify-content-end">
//             <i class="fa-solid fa-star fs-4 text-end" style="color: gold !important"></i>
//             <i class="fa-solid fa-star fs-4 text-end" style="color: gold !important"></i>
//             <i class="fa-solid fa-star fs-4 text-end" style="color: gold !important"></i>
//             <i class="fa-solid fa-star fs-4 text-end" style="color: gold !important"></i>
//             <i class="fa-solid fa-star fs-4 text-end" style="color: gold !important"></i>
//         </div>
//     </div>

//     <!--? product quantity -->

//     <div class="prod-qty d-flex w-100 flex-column">
//         <div class="controls d-flex align-items-center col-12 px-4 py-2">
//             <i class="prod-qty-remove cell fs-4 fa-solid fa-minus border-0 p-1" data-prod-id="${product.id}"></i>
//             <input type="text" class="flex-grow-1 prod-qty-value text-center fw-bold border-0 fs-4 w-25" data-prod-id="${product.id}" value="1" />
//             <i class="prod-qty-add cell fs-4 fa-solid fa-plus border-0 p-1" data-prod-id="${product.id}"></i>
//         </div>
//         <div class="button add-to-cart btn col-12 text-center py-3 rounded-0 px-4 text-uppercase mt-2" data-prod-id="${product.id}">Add to cart</div>
//     </div>
// </div>
// <!-- --------------product name ,price & rate btn------ -->

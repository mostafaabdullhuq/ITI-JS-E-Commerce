import { ecommerceUsers, UpdateNavCart } from "./script.js";

let user = ecommerceUsers.validateLoginCookies();

// fetch only 8 products from api
if (window.location.href.search("/index.html") !== -1) {
    fetch("https://fakestoreapi.com/products?limit=9")
        // when promise complete , return the response converted to json
        .then((res) => res.json())
        // when json response contains list array of products objects returned
        .then((products) => {
            // variable that contains the html of all products
            let prodsCards = "";
            // loop over each product in products
            products.forEach((product) => {
                // add the current product to the products
                /*
                 * data-prod-id="${product.id}" ==> adds product custom attribute to store the product id provided by the api
                 * data-prod-category ==>"${product.category}" => adds product custom attribute to store the product category provided by the api
                 * src="${product.image}" ==> set the src of the product image to the image link provided by the api
                 * ${product.title} ==> set the text of the heading to the product title provided by the api
                 * ${product.price} ==> set the value of the span to the price of the product provided by the api
                 * ${'<i class="fa-solid fa-star"></i>'.repeat(Math.round(product.rating.rate))} ==> get the rating of the product from the api, then round it to the closest fixed number, then generate stars based on the number of rating
                 */
                prodsCards += `

                <div class="prod col me-3" data-prod-id="${product.id}" data-prod-category="${product.category}">
                    <div class="product-item mb-4 d-flex flex-column">
                        <div class="prod-info d-flex flex-column mb-2 col-12">
                            <div
                                data-prod-image="${product.image}"
                                style="background: url(${product.image})"
                                class="image-container"
                            >
                                <p class="view py-2 fs-3 text-uppercase col-12" style="position: absolute; bottom: 0px" data-prod-id="${product.id}">Quick view</p>
                            </div>

                            <a class="prod-title px-2 mt-3" style="word-break: break-all" href="./../docs/product-info.html?prod_id=${product.id}"
                                >${product.title}</a
                            >
                        </div>

                        <div class="price d-flex col-12 d-flex  align-items-center justify-content-center">
                            <span class="h4 col mb-0">$${product.price}</span>
                            <div class="rating col">
                            ${'<i class="fa-solid fa-star fs-5" style="color:gold;"></i>'.repeat(Math.round(product.rating.rate))}
                            </div>
                        </div>
                    </div>
                </div>
`;
            });
            // add products fetched to the dom after window loads
            $(function () {
                $("#prods-container").html(prodsCards);
            });
        })
        .catch((newestFetchErr) => {
            console.error(`Fetching Newest Arrivals Error: ${newestFetchErr}`);
        });
}

// fetch categories in newest arrivals buttons
if (window.location.href.search("/index.html") !== -1) {
    fetch("https://fakestoreapi.com/products/categories")
        .then((response) => response.json())
        .then((categories) => {
            let categs = "";
            categories.forEach((category) => {
                categs += `
            <a class="btn btn-new index-categ-button rounded-0 col-12  col-lg me-2 mb-2 mb-lg-0" role="button" data-category="${category}">${category}</a>
            `;
            });
            $(function () {
                $("#categ").append(categs);
                // select all categories button and loop on them
                document.querySelectorAll(".index-categ-button").forEach((button) => {
                    // when any category button is clicked, do this function
                    button.addEventListener("click", function () {
                        // get the category of the clicked button from the attribute
                        $(this).siblings(".index-categ-button").removeClass("active");
                        $(this).addClass("active");
                        let category = this.getAttribute("data-category"),
                            products = document.querySelectorAll(".prod");
                        if (category === "all") {
                            products.forEach((product) => {
                                product.style.display = "block";
                            });
                        } else {
                            products.forEach((product) => {
                                if (product.getAttribute("data-prod-category") === category) {
                                    product.style.display = "block";
                                } else {
                                    product.style.display = "none";
                                }
                            });
                        }
                    });
                });
            });
        })
        .catch((categFetchErr) => {
            console.error(`Fetching Categories Error: ${categFetchErr}`);
        });
}

// fixing nav in scroll
let navbar = document.querySelector("nav");
window.addEventListener("scroll", function () {
    if (window.scrollY > navbar.offsetHeight) {
        navbar.classList.add("fixed-top", "border-bottom", "bg-white");
        navbar.style.backgroundColor = "white";
        document.body.style.paddingTop = navbar.offsetHeight + "px";
    } else {
        navbar.classList.remove("fixed-top", "border-bottom", "bg-white");
        document.body.style.paddingTop = "0";
    }
});

//feedback
("use strict");
//  TESTIMONIALS CAROUSEL HOOK
$("#customers-testimonials").owlCarousel({
    loop: true,
    center: true,
    items: 3,
    margin: 0,
    autoplay: true,
    dots: true,
    autoplayTimeout: 8500,
    smartSpeed: 450,
    responsive: {
        0: {
            items: 1,
        },
        768: {
            items: 2,
        },
        1170: {
            items: 3,
        },
    },
});

$(".owl-carousel").owlCarousel();

// fetch catecgories to products button in nav
fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((categories) => {
        let categorylnk = "";
        categories.forEach((category) => {
            categorylnk += `
            <li>
            <a style="text-transform: capitalize; font-weight: 550" class="border-bottom dropdown-item py-2 text-center" href="/docs/categ.html?filter=${category
                .replace(" ", "-")
                .replace("'", "")}">${category}</a>
            </li>
            `;
        });
        $(function () {
            $("#cat-ul").append(categorylnk);
        });
    })
    .catch((e) => {
        console.log("some error happend");
        console.log(e);
    });

// go top button
let mybutton = document.getElementById("topBtn");

if (mybutton) {
    window.onscroll = function () {
        scrollFunction();
    };
}

function scrollFunction() {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

if (mybutton) {
    mybutton.onclick = function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };
}

$(function () {
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
            if (!prodQty || isNaN(prodQty)) {
                prodQty = $(this).val() == 0 || isNaN($(this).val()) ? 1 : $(this).val();
            }
            if (+prodQty > 999) prodQty = 999;
            else if (+prodQty < 1) prodQty = 1;

            $(this).val(+prodQty);
        }
    });
    $("#prods-container").on("click", ".view", function (e) {
        $(".add-to-cart").off("click");
        let product = {
            id: false,
            image: false,
            price: false,
            qty: false,
            title: false,
        };
        e.stopPropagation();
        let productElement = $(this).parents(".prod"),
            prodImage = productElement.find(".image-container")[0].getAttribute("data-prod-image"),
            prodTitle = productElement.find(".prod-title")[0].textContent,
            prodPrice = productElement.find(".price span")[0].textContent,
            prodStarCount = productElement.find("i.fa-star").length;
        product.id = +this.getAttribute("data-prod-id");
        product.image = prodImage;
        product.title = prodTitle;
        product.price = +prodPrice.replace("$", "");

        $("#quickviewpopup .prod-qty-value").val(1);
        $("#quickviewpopup .modal-title").text(prodTitle);
        $("#quickviewpopup .modal-price").text(prodPrice);
        $("#quickviewpopup .modal-img").attr("data-image-src", prodImage);
        $("#quickviewpopup .modal-img").css("background", `url("${prodImage}")`);
        $("#quickviewpopup .modal-rating").html("");
        $("#quickviewpopup .modal-rating").append('<i class="fa-solid fa-star" style="color:gold;"></i>'.repeat(Math.round(prodStarCount)));
        $("#quickviewpopup").fadeIn(200, function () {
            $(".add-to-cart").on("click", function (e) {
                e.stopPropagation();
                if (user) {
                    let newQuantity = false;
                    let qtyInput = $(this).siblings(".controls").children(".prod-qty-value");
                    let prodQty = +$(qtyInput).val(),
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
    });
    $("#quickviewpopup .close-modal").on("click", function (e) {
        $("#quickviewpopup").fadeOut(200);
    });
});

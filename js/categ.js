import { ecommerceUsers, UpdateNavCart } from "./script.js";

// check if user logged in
let user = ecommerceUsers.validateLoginCookies();

// get window url
let windowURL = window.location.href,
    categParam = "";

// get category param from url
if (windowURL.split("?").length > 1) {
    categParam = window.location.href.split("?")[1].split("=")[1].toLowerCase();
}
categParam = categParam ? categParam : "all";

// this is a comment for syncing

$(function () {
    //fetching all products
    fetch("https://fakestoreapi.com/products?")
        .then((response) => response.json())
        .then((products) => {
            let prods = "";
            products.forEach((product) => {
                prods += `
                <div class="col-sm-9 col-md-8 col-lg-4 prod prod-info " data-prod-id="${product.id}" data-prod-category="${product.category.replace(" ", "-").replace("'", "")}">
                  <div class="product-item prod-info "  style="height:550px;">
                    <div href="#shop-single.html" class="card product-img image-container rounded-0 d-flex justify-content-center" style="cursor:pointer;" data-prod-image="${product.image}">
                    <div
                                data-prod-image="${product.image}"
                                style="background: url(${product.image})"
                                class="image-container"
                            >
                                <p class="view py-2 fs-3 text-uppercase col-12" style="position: absolute; bottom: 0px" data-prod-id="${product.id}">Quick view</p>
                            </div>
                    </div>
                    <a class="title prod-title fs-5 mt-3 d-flex justify-content-center" style="cursor: pointer; color:black;" data-prod-id="${product.id}">${product.title}</a>
                    <div class="price d-flex col-12 mt-2 d-flex  align-items-center justify-content-center">
                            <span class="fs-4 col mb-0">$${product.price}</span>
                            <div class="rating col">
                            ${'<i class="fa-solid fa-star fs-5" style="color:gold;"></i>'.repeat(Math.round(product.rating.rate))}
                            </div>
                        </div>
                  </div>
              </div>
              
              `;
            });
            $("#prods-container").html("");
            $("#prods-container").append(prods);
            $(`#categBar .categ-item[data-category="${categParam}"]`).trigger("click");
        })
        .catch((prodFetchErr) => {
            console.Error(`Products Fetch Error: ${prodFetchErr}`);
        });

    //fetching categories in dropdowns menu
    fetch("https://fakestoreapi.com/products/categories")
        .then((res) => res.json())
        .then((categories) => {
            let categs = "";
            categories.forEach((category) => {
                categs += `<li class="dropdown-item py-2 text-center text-capitalize categ-item" data-category="${category.replace("'", "").replace(" ", "-")}">
       ${category}
       </li>
       `;
            });
            $("#prodNav").append(categs);
            $("#categBar").append(categs);

            document.querySelectorAll(".categ-item").forEach((link) => {
                // when any category button is clicked, do this function
                link.addEventListener("click", function () {
                    // get the category of the clicked button from the attribute
                    let category = this.getAttribute("data-category"),
                        products = document.querySelectorAll(".prod");

                    if (category === "all") {
                        products.forEach((product) => {
                            $(product).addClass("d-block").removeClass("d-none");
                            $(".cteg").text("category");
                        });
                    } else {
                        products.forEach((product) => {
                            if (product.getAttribute("data-prod-category") === category) {
                                $(".cteg").text(category);
                                $(product).addClass("d-block").removeClass("d-none");
                            } else {
                                $(product).addClass("d-none").removeClass("d-block");
                            }
                        });
                    }
                });
            });
            $(`#categBar .categ-item[data-category="${categParam}"]`).trigger("click");
        });
});

$("#prods-container").on("click", ".title", function () {
    window.location.href = `/docs/product-info.html?product_id=${this.getAttribute("data-prod-id")}`;
});

//------------ sorting descending ------------------//
let desc = document.getElementById("desc");

desc.addEventListener("click", function () {
    $(".srt").text("Descending");
    fetch("https://fakestoreapi.com/products?sort=desc")
        .then((res) => res.json())
        .then((products) => {
            let prods = "";
            products.forEach((product) => {
                prods += `
        <div class="col-sm-9 col-md-8 col-lg-4 prod prod-info " data-prod-id="${product.id}" data-prod-category="${product.category.replace(" ", "-").replace("'", "")}">
          <div class="product-item prod-info "  style="height:550px;">
            <div href="#shop-single.html" class="card product-img image-container rounded-0 d-flex justify-content-center" style="cursor:pointer;" data-prod-image="${product.image}">
            <div
                                data-prod-image="${product.image}"
                                style="background: url(${product.image})"
                                class="image-container"
                            >
                                <p class="view py-2 fs-3 text-uppercase col-12" style="position: absolute; bottom: 0px" data-prod-id="${product.id}">Quick view</p>
                            </div>
            </div>
            <a class="title prod-title fs-5 mt-3 d-flex justify-content-center" style="cursor: pointer; color:black;" data-prod-id="${product.id}">${product.title}</a>
            <div class="price d-flex col-12 mt-2 d-flex  align-items-center justify-content-center">
                            <span class="fs-4 col mb-0">$${product.price}</span>
                            <div class="rating col">
                            ${'<i class="fa-solid fa-star fs-5" style="color:gold;"></i>'.repeat(Math.round(product.rating.rate))}
                            </div>
                        </div>
        </div>
              
            </div>
          </div>
      </div>
      
      `;
            });

            $("#prods-container").html("");
            $("#prods-container").append(prods);
        })
        .catch((sortingErr) => {
            console.Error(`Error Sorting1: ${sortingErr}`);
        });
});
//------------ sorting ascending ------------------//
let asc = document.getElementById("asc");
asc.addEventListener("click", function () {
    $(".srt").text("Ascending");
    fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((products) => {
            let prods = "";
            products.forEach((product) => {
                prods += `
        <div class="col-sm-9  col-md-8 col-lg-4  prod prod-info " data-prod-id="${product.id}" data-prod-category="${product.category.replace(" ", "-").replace("'", "")}">
          <div class="product-item prod-info "  style="height:550px;">
            <div href="#shop-single.html" class="card product-img image-container rounded-0 d-flex justify-content-center" style="cursor:pointer;" data-prod-image="${product.image}">
            <div
                                data-prod-image="${product.image}"
                                style="background: url(${product.image})"
                                class="image-container"
                            >
                                <p class="view py-2 fs-3 text-uppercase col-12" style="position: absolute; bottom: 0px" data-prod-id="${product.id}">Quick view</p>
                            </div>
            </div>
            <a class="title prod-title mt-3 fs-5 d-flex justify-content-center" style="cursor: pointer; color:black;" data-prod-id="${product.id}">${product.title}</a>
            <div class="price d-flex col-12 mt-2 d-flex  align-items-center justify-content-center">
                            <span class="fs-4 col mb-0">$${product.price}</span>
                            <div class="rating col">
                            ${'<i class="fa-solid fa-star fs-5" style="color:gold;"></i>'.repeat(Math.round(product.rating.rate))}
                            </div>
                        </div>
                        </div>
          </div>
      </div>
      
      `;
            });
            $("#prods-container").html("");
            $("#prods-container").append(prods);
        })
        .catch((sortingErr) => {
            console.Error(`Error Sorting2: ${sortingErr}`);
        });
});
// });

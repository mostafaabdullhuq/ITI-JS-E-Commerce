// get window url
let windowURL = window.location.href,
    categParam = "";

// get category param from url
if (windowURL.split("?").length > 1) {
    categParam = window.location.href.split("?")[1].split("=")[1].toLowerCase();
}

// if there's no parameter, set the parameter to all, if there's a parameter set it to the given parameter
categParam = categParam ? categParam : "all";

//fetching all products
fetch("https://fakestoreapi.com/products?")
    .then((response) => response.json())
    .then((products) => {
        // a variable that contains all of products fetched from api
        let prods = "";

        // loop over all products fetched from api
        products.forEach((product) => {
            // add the current product html to the prods variable
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

        // when page loads
        $(function () {
            // add the products html to the products container in page
            $("#prods-container").html(prods);

            // trigger the filter behavior on the required category
            $(`#categBar .categ-item[data-category="${categParam}"]`).trigger("click");
        });
    })
    .catch((prodFetchErr) => {
        console.error(`Products Fetch Error: ${prodFetchErr}`);
    });

//fetching categories in dropdowns menu
fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((categories) => {
        // a variable that contains all of categories html fetched from api
        let categs = "";

        // loop over all categories fetched from api
        categories.forEach((category) => {
            // add the current category html to the categs variable
            categs += `
<li class="dropdown-item py-2 text-center text-capitalize categ-item" data-category="${category.replace("'", "").replace(" ", "-")}">
       ${category}
</li>
`;
        });

        // when page loads
        $(function () {
            // add the categories to the filter
            $("#categBar").append(categs);

            // add event to all categories filter items
            document.querySelectorAll(".categ-item").forEach((link) => {
                // when any category button is clicked, do this function
                link.addEventListener("click", function () {
                    // get the category of the clicked button from the attribute
                    let category = this.getAttribute("data-category"),
                        // get all products in page
                        products = document.querySelectorAll(".prod");

                    // if user wants to display all products
                    if (category === "all") {
                        // loop over all products and show them
                        products.forEach((product) => {
                            $(product).addClass("d-block").removeClass("d-none");

                            // change the text of the caterogy filter
                            $(".cteg").text("category");
                        });
                    }
                    // if user wants a specific category
                    else {
                        // loop over all products
                        products.forEach((product) => {
                            // if product category is the same as the required category
                            if (product.getAttribute("data-prod-category") === category) {
                                // change the text of the caterogy filter
                                $(".cteg").text(category);

                                // view the product
                                $(product).addClass("d-block").removeClass("d-none");
                            } else {
                                // hide the product if not in the same category
                                $(product).addClass("d-none").removeClass("d-block");
                            }
                        });
                    }
                });
            });

            // trigger the filter behavior on the required category based on parameter passed in url
            $(`#categBar .categ-item[data-category="${categParam}"]`).trigger("click");
        });
    });

// when user click on any product title
$("#prods-container").on("click", ".title", function () {
    // redirect the user to the product details of this product
    window.location.href = `/docs/product-info.html?product_id=${this.getAttribute("data-prod-id")}`;
});

//------------ sorting descending ------------------//
let desc = document.getElementById("desc");

// when user click on sort desc
desc.addEventListener("click", function () {
    // change the text of the sort filter
    $(".srt").text("Descending");

    // fetch all products from api in desc order
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
            $(function () {
                // $("#prods-container").html("");
                $("#prods-container").html(prods);
            });
        })
        .catch((sortingErr) => {
            console.error(`Error Sorting1: ${sortingErr}`);
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
            $(function () {
                // $("#prods-container").html("");
                $("#prods-container").html(prods);
            });
        })
        .catch((sortingErr) => {
            console.error(`Error Sorting2: ${sortingErr}`);
        });
});

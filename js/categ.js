import { ecommerceUsers, UpdateNavCart } from "./script.js";

// check if user logged in
let user = ecommerceUsers.validateLoginCookies();

let windowURL = window.location.href,
  prodID = "";
if (windowURL.split("?").length > 1) {
  prodID = window.location.href.split("?")[1].split("=")[1] || "";
}

// this is a comment for syncing

$(function () {
  //fetching all products
  fetch("https://fakestoreapi.com/products?")
    .then((response) => response.json())
    .then((products) => {
      let prods = "";
      products.forEach((product) => {
        prods += `
            <div class="col-sm-9  col-md-8 col-lg-3 col-xl-3 prod prod-info " data-prod-id="${
              product.id
            }" data-prod-category="${product.category}">
            <div class="product-item prod-info "  style="height:550px;">
              <div href="#shop-single.html" class="card product-img image-container rounded-0 d-flex justify-content-center" style="cursor:pointer;">
                <img
                  src="${product.image}"
                  alt="Image"
                  class="img-fluid "
                  style="height: 300px;width:70%;margin-left:10%"
                />
                <p class="view py-2 fs-3 text-uppercase col-12" style="position: absolute; bottom: 0px" data-prod-id="${
                  product.id
                }">Quick view</p>
              </div>
              <a class="title prod-title fs-5 d-flex justify-content-center" style="cursor: pointer; color:black;" data-prod-id="${
                product.id
              }">${product.title}</a>
              <div class="price d-flex col-12 d-flex  justify-content-center ">
                <span class=" fs-5 price ms-3">$${product.price}</span>
                ${`<i class="fa-solid fa-star rating mt-1" style="color:gold;"></i>`.repeat(
                  Math.round(product.rating.rate)
                )}
                
              </div>
            </div>
        </div>
        
        `;
      });
      $("#prods").html("");
      $("#prods").append(prods);

      //when click product title render to product-info page
      document.querySelectorAll(".title").forEach((link) => {
        link.addEventListener("click", function () {
          window.location.href = `./../docs/product-info.html?product_id=${this.getAttribute(
            "data-prod-id"
          )}`;
        });
      });
      // Product PopUp
      document.querySelectorAll("p.view").forEach((p) => {
        p.addEventListener("click", function () {
          let product = $(this).parents(".prod");
          let prodImage = product.find("img")[0].getAttribute("src");
          let prodTitle = product.find(".title")[0].textContent;
          let prodPrice = product.find(".price span")[0].textContent;
          let prodStarCount = product.find("i.fa-star").length;
          $(".modal-title").text(prodTitle);
          $(".modal-price").text(prodPrice);
          $(".modal-img").attr("src", prodImage);
          $(".modal-rating").html("");
          $(".modal-rating").append(
            '<i class="fa-solid fa-star" style="color:gold;"></i>'.repeat(
              Math.round(prodStarCount)
            )
          );
          $(".prod-qty-remove").attr("data-prod-id", product.id);
          $(".prod-qty-value").attr("data-prod-id", product.id);
          $(".prod-qty-add").attr("data-prod-id", product.id);
          $(".add-to-cart").attr("data-prod-id", product.id);
          $(".prod-qty-remove").on("click", function () {
            // get product id
            let prodId = $(this).attr("data-prod-id"),
              // get product quantity
              prodQty = +$(this).siblings(".prod-qty-value").val();

            {
              // decrease product quantity
              prodQty -= 1;
              $(this)
                .siblings(".prod-qty-value")
                .trigger("input", [prodQty, prodId]);
            }
          });

          $(".prod-qty-add").on("click", function () {
            // get product id
            let prodId = $(this).attr("data-prod-id"),
              // get product quantity
              prodQty = +$(this).siblings(".prod-qty-value").val();

            // increase product quantity
            prodQty += 1;
            $(this)
              .siblings(".prod-qty-value")
              .trigger("input", [prodQty, prodId]);
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
            console.log(product);
            console.log(user);
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
          $("#quickviewpopup").fadeIn(200, function () {
            $(".modal-dialog .btn-close").on("click", function () {
              $("#quickviewpopup").fadeOut(200);
            });
          });
        });
      });

      /////////////
    })
    .catch((e) => {
      console.log("some error happend");
      console.log(e);
    });

  //fetching categories in dropdowns menu
  fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((categories) => {
      let categs = "";
      categories.forEach((category) => {
        categs += `<li class="dropdown-item py-2 text-center text-capitalize categ-item" data-category="${category}">
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
          {
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
});
//when click product title render to product-info page
document.querySelectorAll(".title").forEach((link) => {
  link.addEventListener("click", function () {
    window.location.href = `./../docs/product-info.html?product_id=${this.getAttribute(
      "data-prod-id"
    )}`;
  });
});
//------------ sorting descending ------------------//
let desc = document.getElementById("desc");

desc.addEventListener("click", function () {
  console.log("desc clicked");
  fetch("https://fakestoreapi.com/products?sort=desc")
    .then((res) => res.json())
    .then((products) => {
      let prods = "";
      products.forEach((product) => {
        prods += `
        
        <div class="col-sm-9 col-md-8 col-lg-4 prod prod-info " data-prod-id="${
            product.id
          }" data-prod-category="${product.category}">
          <div class="product-item prod-info "  style="height:550px;">
            <div href="#shop-single.html" class="card product-img image-container rounded-0 d-flex justify-content-center" style="cursor:pointer;">
              <img
                src="${product.image}"
                alt="Image"
                class="img-fluid "
                style="height: 300px;width:70%;margin-left:10%"
              />
              <p class="view py-2 fs-3 text-uppercase col-12" style="position: absolute; bottom: 0px" data-prod-id="${
                product.id
              }">Quick view</p>
            </div>
            <a class="title prod-title fs-5 d-flex justify-content-center" style="cursor: pointer; color:black;" data-prod-id="${
              product.id
            }">${product.title}</a>
            <div class="price d-flex col-12 d-flex  align-items-center justify-content-center">
              <span class="fs-5 price ms-4">$${product.price}</span>
              ${`<i class="fa-solid fa-star rating mt-1" style="color:gold;"></i>`.repeat(
                Math.round(product.rating.rate)
              )}
              
            </div>
          </div>
      </div>
      
      `;
      });

      $("#prods").html("");
      $("#prods").append(prods);
      //when click product title render to product-info page
      document
        .querySelectorAll(".title")
        .forEach((link) => {
          link.addEventListener("click", function () {
            window.location.href = `./../docs/product-info.html?product_id=${this.getAttribute(
              "data-prod-id"
            )}`;
          });
          // Product PopUp
          document.querySelectorAll("p.view").forEach((p) => {
            p.addEventListener("click", function () {
              let product = $(this).parents(".prod");
              let prodImage = product.find("img")[0].getAttribute("src");
              let prodTitle = product.find(".title")[0].textContent;
              let prodPrice = product.find(".price span")[0].textContent;
              let prodStarCount = product.find("i.fa-star").length;
              $(".modal-title").text(prodTitle);
              $(".modal-price").text(prodPrice);
              $(".modal-img").attr("src", prodImage);
              $(".modal-rating").html("");
              $(".modal-rating").append(
                '<i class="fa-solid fa-star" style="color:gold;"></i>'.repeat(
                  Math.round(prodStarCount)
                )
              );
              $(".prod-qty-remove").attr("data-prod-id", product.id);
              $(".prod-qty-value").attr("data-prod-id", product.id);
              $(".prod-qty-add").attr("data-prod-id", product.id);
              $(".add-to-cart").attr("data-prod-id", product.id);
              $(".prod-qty-remove").on("click", function () {
                // get product id
                let prodId = $(this).attr("data-prod-id"),
                  // get product quantity
                  prodQty = +$(this).siblings(".prod-qty-value").val();

                {
                  // decrease product quantity
                  prodQty -= 1;
                  $(this)
                    .siblings(".prod-qty-value")
                    .trigger("input", [prodQty, prodId]);
                }
              });

              $(".prod-qty-add").on("click", function () {
                // get product id
                let prodId = $(this).attr("data-prod-id"),
                  // get product quantity
                  prodQty = +$(this).siblings(".prod-qty-value").val();

                // increase product quantity
                prodQty += 1;
                $(this)
                  .siblings(".prod-qty-value")
                  .trigger("input", [prodQty, prodId]);
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
                console.log(product);
                console.log(user);
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
              $("#quickviewpopup").fadeIn(200, function () {
                $(".modal-dialog .btn-close").on("click", function () {
                  $("#quickviewpopup").fadeOut(200);
                });
              });
            });
          });
        })
        // })
        .catch((e) => {
          console.log("error when sort");
          console.log(e);
        });
    });
});
//------------ sorting ascending ------------------//
let asc = document.getElementById("asc");
asc.addEventListener("click", function () {
  console.log("asc clicked");
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((products) => {
      let prods = "";
      products.forEach((product) => {
        prods += `
        <div class="col-sm-9  col-md-8 col-lg-4  prod prod-info " data-prod-id="${
            product.id
          }" data-prod-category="${product.category}">
          <div class="product-item prod-info "  style="height:550px;">
            <div href="#shop-single.html" class="card product-img image-container rounded-0 d-flex justify-content-center" style="cursor:pointer;">
              <img
                src="${product.image}"
                alt="Image"
                class="img-fluid "
                style="height: 300px;width:70%;margin-left:10%"
              />
              <p class="view py-2 fs-3 text-uppercase col-12" style="position: absolute; bottom: 0px" data-prod-id="${
                product.id
              }">Quick view</p>
            </div>
            <a class="title prod-title fs-5 d-flex justify-content-center" style="cursor: pointer; color:black;" data-prod-id="${
              product.id
            }">${product.title}</a>
            <div class="price d-flex col-12 d-flex  align-items-center justify-content-center">
              <span class="fs-5 price ms-4">$${product.price}</span>
              ${`<i class="fa-solid fa-star mt-1 rating" style="color:gold;"></i>`.repeat(
                Math.round(product.rating.rate)
              )}
              
            </div>
          </div>
      </div>
      
      `;
      });
      $("#prods").html("");
      $("#prods").append(prods);
      //when click product title render to product-info page
      document
        .querySelectorAll(".title")
        .forEach((link) => {
          link.addEventListener("click", function () {
            window.location.href = `./../docs/product-info.html?product_id=${this.getAttribute(
              "data-prod-id"
            )}`;
          });
          $("#prods").html("");
          $("#prods").append(prods);
          //when click product title render to product-info page
          document.querySelectorAll(".title").forEach((link) => {
            link.addEventListener("click", function () {
              window.location.href = `./../docs/product-info.html?product_id=${this.getAttribute(
                "data-prod-id"
              )}`;
            });
          });
          // Product PopUp
          // let prodID=document.getAttribute("data-prod-id");
          document.querySelectorAll("p.view").forEach((p) => {
            p.addEventListener("click", function () {
              let product = $(this).parents(".prod");
              let prodImage = product.find("img")[0].getAttribute("src");
              let prodTitle = product.find(".title")[0].textContent;
              let prodPrice = product.find(".price span")[0].textContent;
              let prodStarCount = product.find("i.fa-star").length;
              $(".modal-title").text(prodTitle);
              $(".modal-price").text(prodPrice);
              $(".modal-img").attr("src", prodImage);
              $(".modal-rating").html("");
              $(".modal-rating").append(
                '<i class="fa-solid fa-star" style="color:gold;"></i>'.repeat(
                  Math.round(prodStarCount)
                )
              );
              $(".prod-qty-remove").attr("data-prod-id", product.id);
              $(".prod-qty-value").attr("data-prod-id", product.id);
              $(".prod-qty-add").attr("data-prod-id", product.id);
              $(".add-to-cart").attr("data-prod-id", product.id);
              $(".prod-qty-remove").on("click", function () {
                // get product id
                let prodId = $(this).attr("data-prod-id"),
                  // get product quantity
                  prodQty = +$(this).siblings(".prod-qty-value").val();

                {
                  // decrease product quantity
                  prodQty -= 1;
                  $(this)
                    .siblings(".prod-qty-value")
                    .trigger("input", [prodQty, prodId]);
                }
              });

              $(".prod-qty-add").on("click", function () {
                // get product id
                let prodId = $(this).attr("data-prod-id"),
                  // get product quantity
                  prodQty = +$(this).siblings(".prod-qty-value").val();

                // increase product quantity
                prodQty += 1;
                $(this)
                  .siblings(".prod-qty-value")
                  .trigger("input", [prodQty, prodId]);
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
                console.log(product);
                console.log(user);
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
              $("#quickviewpopup").fadeIn(200, function () {
                $(".modal-dialog .btn-close").on("click", function () {
                  $("#quickviewpopup").fadeOut(200);
                });
              });
            });
          });
        })
        .catch((e) => {
          console.log("error when sort");
          console.log(e);
        });
    })
    .catch((e) => {
      console.log("error when sort");
      console.log(e);
    });
});
// });

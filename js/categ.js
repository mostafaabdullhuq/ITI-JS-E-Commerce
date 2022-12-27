// let windowURL = window.location.href;
// if (windowURL.split("?").length === 1) {
//     window.location.href = "./../index.html";
// }

// let categName = window.location.href.split("?")[1].split("=")[1] || 1;
// console.log(categName);
// fetch Newest arrival
// $(function () {
//     fetch(`https://fakestoreapi.com/products/category/${categName}`)
//       .then((response) => response.json())
//       .then((products) => {
//         let prods = "";
//         products.forEach((product) => {
//             prods += `
//         <div class="col-sm-9 col-md-6 col-lg-4 prod" data-prod-id="${product.id}" data-prod-category="${product.category}">
//         <div class="product-item"  style="height:500px;">
//           <div href="#shop-single.html" class="card product-img rounded-0 d-flex justify-content-center" style="cursor:pointer;">
//             <img
//               src="${product.image}"
//               alt="Image"
//               class="img-fluid"
//               style="height: 300px;width:70%;margin-left:10%"
//             />
//             <p class="view" data-prod-id="${product.id}" >Quick view</p>
//           </div>
//           <a class="title fs-5 d-flex justify-content-center" style="cursor: pointer; color:black;" data-prod-id="${product.id}">${product.title}</a>
//           <div class="price">
//             <span class="h6 fs-5 fw-bold">$${product.price}</span>
//             ${`<i class="fa-solid fa-star" style="color:var(--ltn__secondary-color-2)"></i>`.repeat(Math.round(product.rating.rate))}

//           </div>
//         </div>
//     </div>

//     `;
//         });
//         // $("#categ").append(categs);
//         $("#prods").html("");
//         $("#prods").append(prods);

//         // document.querySelectorAll(".categ-item").forEach((link) => {
//             // when any category button is clicked, do this function
//             // link.addEventListener("click", function () {
//                 // get the category of the clicked button from the attribute
//                 // let category = this.getAttribute("data-category"),
//                    let products = document.querySelectorAll(".prod");
//                     {
//                     products.forEach((product) => {
//                         if (product.getAttribute("data-prod-category") === `${categName}`) {
//                             product.style.display = "block";
//                         } else {
//                             product.style.display = "none";
//                         }
//                     });
//                     }
//             // });
//         // });

//       })
//       .catch((e) => {
//         console.log("ERROR");
//         console.log(e);
//       });
//   });
import { ecommerceUsers, UpdateNavCart } from "./script.js";

// check if user logged in
let user = ecommerceUsers.validateLoginCookies();

let windowURL = window.location.href,
    prodID = "";
if (windowURL.split("?").length > 1) {
    prodID = window.location.href.split("?")[1].split("=")[1] || "";
}

$(function () {
    //fetching all products
    fetch("https://fakestoreapi.com/products?")
        .then((response) => response.json())
        .then((products) => {
            let prods = "";
            products.forEach((product) => {
                prods += `
            <div class="col-sm-9 col-md-6 col-lg-4 prod" data-prod-id="${product.id}" data-prod-category="${product.category}">
            <div class="product-item"  style="height:500px;">
              <div href="#shop-single.html" class="card product-img rounded-0 d-flex justify-content-center" style="cursor:pointer;">
                <img
                  src="${product.image}"
                  alt="Image"
                  class="img-fluid"
                  style="height: 300px;width:70%;margin-left:10%"
                />
                <p class="view" data-prod-id="${product.id}" >Quick view</p>
              </div>
              <a class="title fs-5 d-flex justify-content-center" style="cursor: pointer; color:black;" data-prod-id="${product.id}">${product.title}</a>
              <div class="price">
                <span class="h6 fs-5 fw-bold">$${product.price}</span>
                ${`<i class="fa-solid fa-star" style="color:var(--ltn__secondary-color-2)"></i>`.repeat(Math.round(product.rating.rate))}
                
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
                    window.location.href = `./../docs/product-info.html?product_id=${this.getAttribute("data-prod-id")}`;
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
                    $(".modal-rating").append('<i class="fa-solid fa-star" style="color:gold;"></i>'.repeat(Math.round(prodStarCount)));
                    $("#quickviewpopup").fadeIn(200, function () {
                        $(".modal-dialog .btn-close").on("click", function () {
                            $("#quickviewpopup").fadeOut(200);
                        });
                    });
                });
            });
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
                categs += `<li>
       <a class="dropdown-item border-bottom text-muted pb-1 categ-item" data-category="${category}">${category}</a>
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
        window.location.href = `./../docs/product-info.html?product_id=${this.getAttribute("data-prod-id")}`;
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
                    <div class="col-sm-9 col-md-6 col-lg-4 prod" data-prod-id="${product.id}" data-prod-category="${product.category}">
            <div class="product-item"  style="height:500px;">
              <div href="#shop-single.html" class="card product-img rounded-0 d-flex justify-content-center" style="cursor:pointer;">
                <img
                  src="${product.image}"
                  alt="Image"
                  class="img-fluid"
                  style="height: 300px;width:70%;margin-left:10%"
                />
                <p class="view" data-prod-id="${product.id}" >Quick view</p>
              </div>
              <a class="title fs-5 d-flex justify-content-center" style="cursor: pointer; color:black;" data-prod-id="${product.id}">${product.title}</a>
              <div class="price">
                <span class="h6 fs-5 fw-bold">$${product.price}</span>
                ${`<i class="fa-solid fa-star" style="color:var(--ltn__secondary-color-2)"></i>`.repeat(Math.round(product.rating.rate))}
                
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
                        window.location.href = `./../docs/product-info.html?product_id=${this.getAttribute("data-prod-id")}`;
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
                        $(".modal-rating").append('<i class="fa-solid fa-star" style="color:gold;"></i>'.repeat(Math.round(prodStarCount)));
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
                    <div class="col-sm-9 col-md-6 col-lg-4 prod" data-prod-id="${product.id}" data-prod-category="${product.category}">
                    <div class="product-item"  style="height:500px;">
                      <div href="#shop-single.html" class="card product-img rounded-0 d-flex justify-content-center" style="cursor:pointer;">
                        <img
                          src="${product.image}"
                          alt="Image"
                          class="img-fluid"
                          style="height: 300px;width:70%;margin-left:10%"
                        />
                        <p class="view" data-prod-id="${product.id}" >Quick view</p>
                      </div>
                      <a class="title fs-5 d-flex justify-content-center" style="cursor: pointer; color:black;" data-prod-id="${product.id}">${product.title}</a>
                      <div class="price">
                        <span class="h6 fs-5 fw-bold">$${product.price}</span>
                        ${`<i class="fa-solid fa-star" style="color:var(--ltn__secondary-color-2)"></i>`.repeat(Math.round(product.rating.rate))}   
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
                        window.location.href = `./../docs/product-info.html?product_id=${this.getAttribute("data-prod-id")}`;
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
                        $(".modal-rating").append('<i class="fa-solid fa-star" style="color:gold;"></i>'.repeat(Math.round(prodStarCount)));
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
    });



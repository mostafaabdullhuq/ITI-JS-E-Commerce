// when window loads
$(function () {
    // fetch only 9 products from api
    fetch("https://fakestoreapi.com/products?limit=8")
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
        <div class="col-lg-3 col-sm-6 prod" data-prod-id="${product.id}" data-prod-category="${product.category}">
            <div class="product-item" style="height:470px;">
            <a href="#" class="card product-img">
            <img src="${product.image}" alt="Image" class="img-fluid" style="height: 300px; width: 22rem" />
            <h3 class="view py-2">Quick View</h3>
        </a>
        <h5 class="title mt-2">${product.title}</h5>
        <div class="price">
            <span class="h4">$${product.price}</span>
            ${'<i class="fa-solid fa-star" style="color:gold;"></i>'.repeat(Math.round(product.rating.rate))}
        </div>
    </div>
</div>
`;
            });
            // add products fetched to the dom
            $("#prods-container").append(prodsCards);
        })
        .catch((e) => {
            console.log("some error happend");
            console.log(e);
        });

    // fetch Newest arrival
    $(function () {
        fetch("https://fakestoreapi.com/products/categories")
            .then((response) => response.json())
            .then((categories) => {
                console.log(categories);
                let categs = "";
                categories.forEach((category) => {
                    categs += `
            <a class="btn btn-new" href="#" role="button" style="background-color: rgb(237, 233, 233)">${category}</a>
            `;
                });
                $("#categ").append(categs);
            })
            .catch((e) => {
                console.log("ERROR");
                console.log(e);
            });
    });
    //     var categ2 = "";
    //    button.addEventListener(()=>categ2=category)

    // fixing nav in scroll
    window.addEventListener("scroll", function () {
        if (window.scrollY > 100) {
            document.getElementById("navbar_top").classList.add("fixed-top");
            document.getElementById("navbar_top").style.backgroundColor = "white";
            document.getElementById("navbar_top").style.boxShadow = "2px 10px 4px rgb(133, 132, 132)";
            navbar_height = document.querySelector(".navbar").offsetHeight;
            document.body.style.paddingTop = navbar_height + "px";
        } else {
            document.getElementById("navbar_top").classList.remove("fixed-top");
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
});
// fetch catecgories to products button in nav
$(function () {
    fetch("https://fakestoreapi.com/products/categories")
        .then((res) => res.json())
        .then((categories) => {
            let categorylnk = "";
            categories.forEach((category) => {
                categorylnk += `
            <li>
            <a class="dropdown-item border-bottom text-muted pb-1" href="./docs/categ.html">${category}</a>
            </li>
            `;
            });
            $("#cat-ul").append(categorylnk);
        })
        .catch((e) => {
            console.log("some error happend");
            console.log(e);
        });
});

// go top button
let mybutton = document.getElementById("topBtn");
window.onscroll = function () {
    scrollFunction();
};
function scrollFunction() {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

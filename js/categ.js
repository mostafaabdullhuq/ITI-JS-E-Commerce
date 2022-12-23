
$(function(){
    //fetching categories in navbar
    fetch("https://fakestoreapi.com/products/categories")
    .then(res=>res.json())
    .then(categories=>{
        let categs="";
        categories.forEach(category=>{
           categs+=
           `<li>
           <a class="dropdown-item border-bottom text-muted pb-1" href="categ.html">${category}</a>
           </li>
           `
        });
        $("#prodNav").append(categs);
    })
    .catch(e=>{
        console.log("Error");
        console.log(e);
    });

    //fetching all products
    fetch("https://fakestoreapi.com/products?")
    .then(response=>response.json())
    .then(products=>{
        let prods="";
        products.forEach(product=>{
            prods+=
            `
            <div class="col-sm-12 col-md-6 mb-4 col-lg-4 pb-4 pe-3 prod" data-prod-id="${product.id}" data-prod-category="${product.category}">
            <div class="product-item">
              <a href="#shop-single.html" class="card product-img">
                <img
                  src="${product.image}"
                  alt="Image"
                  class="img-fluid"
                  style="height: 300px"
                />
                <h3 class="view">Quick View</h3>
              </a>
              <h3 class="title">${product.title}</h3>
              <div class="price">
                <span class="h6 fs-5 fw-bold">$${product.price}</span>
                ${`<i class="fa-solid fa-star" style="color:var(--ltn__secondary-color-2)"></i>`.repeat(Math.round(product.rating.rate))}
                
              </div>
            </div>
        </div>
        
        `;
        });
        $("#prods").append(prods);
        //when click quickview render to product-info page
        document.querySelectorAll(".view").forEach(link=>{
          link.addEventListener("click", function () {
              window.location.href = "./../docs/product-info.html";
          });
      })
      

    })
    .catch((e) => {
        console.log("some error happend");
        console.log(e);
    });
//fetching all categories and if choose specific categ
fetch("https://fakestoreapi.com/products/categories")
      .then((response) => response.json())
      .then((categories) => {
          let categs = "";
          categories.forEach((category) => {
              categs += `
      
      <li class="menu-item">
            <div class="input-group mb-3">
              <input
                class="form-check-input ms-3 pb-4 pe-4"
                type="checkbox"
                id="check"
                name="${category}"
                value="${category}"
              />
              <p class="h5 text-align-center ms-2 mt-1">${category}</p>
            </div>
          </li>
      `;
          });
          $("#categers").append(categs);

          document.querySelectorAll(".form-check-input").forEach((button) => {
              button.addEventListener("click", function () {
                  let category = this.getAttribute("name"),
                      products = document.querySelectorAll(".prod");
                      checkbox=document.getElementById("check");
                   if(checkbox.checked==true) {
                      products.forEach((product) => {
                          if (product.getAttribute("data-prod-category") === category) {
                              product.style.display = "block";
                          } else {
                              product.style.display = "none";
                          }
                      });
                  }else {
                    products.forEach((product) => {
                    product.style.display = "block";
                    });
                  }
              });
          });
      })
      .catch((e) => {
          console.log("ERROR");
          console.log(e);
      });
    
});
//sort byyyyyyy
// let asc=document.getElementById("asc"),
 let desc=document.getElementById("desc");

    desc.addEventListener("click",$(function(){
      fetch("https://fakestoreapi.com/products?sort=desc")
      .then(res=>res.json())
      // .then(json=>{
      //   console.log(json);
      //   console.log("ertty");
      // })
      .then(products=>{
        let prods="";
        products.forEach(product=>{
            prods+=
            `
            <div class="col-sm-12 col-md-6 mb-4 col-lg-4 pb-4 pe-3 prod" data-prod-id="${product.id}" data-prod-category="${product.category}">
            <div class="product-item">
              <a href="#shop-single.html" class="card product-img">
                <img
                  src="${product.image}"
                  alt="Image"
                  class="img-fluid"
                  style="height: 300px"
                />
                <h3 class="view">Quick View</h3>
              </a>
              <h3 class="title">${product.title}</h3>
              <div class="price">
                <span class="h6 fs-5 fw-bold">$${product.price}</span>
                ${`<i class="fa-solid fa-star" style="color:var(--ltn__secondary-color-2)"></i>`.repeat(Math.round(product.rating.rate))}
                
              </div>
            </div>
        </div>
        
        `;
        });
        $("#prods").append(prods);

    })
    .catch((e) => {
        console.log("error when sort");
        console.log(e);
    });
  }));
  


//   desc.addEventListener("click",$(function(){
//     fetch("https://fakestoreapi.com/products?sort=desc")
//     .then(res=>res.json())
//     // .then(json=>{
//     //   console.log(json);
//     //   console.log("ertty");
//     // })
//     .then(products=>{
//       let prods="";
//       products.forEach(product=>{
//           prods+=
//           `
//           <div class="col-sm-12 col-md-6 mb-4 col-lg-4 pb-4 pe-3 prod" data-prod-id="${product.id}" data-prod-category="${product.category}">
//           <div class="product-item">
//             <a href="#shop-single.html" class="card product-img">
//               <img
//                 src="${product.image}"
//                 alt="Image"
//                 class="img-fluid"
//                 style="height: 300px"
//               />
//               <h3 class="view">Quick View</h3>
//             </a>
//             <h3 class="title">${product.title}</h3>
//             <div class="price">
//               <span class="h6 fs-5 fw-bold">$${product.price}</span>
//               ${`<i class="fa-solid fa-star" style="color:var(--ltn__secondary-color-2)"></i>`.repeat(Math.round(product.rating.rate))}
              
//             </div>
//           </div>
//       </div>
      
//       `;
//       });
//       $("#prods").append(prods);

//   })
//   .catch((e) => {
//       console.log("some error happend");
//       console.log(e);
//   });
// }));



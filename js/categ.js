$(function(){
    fetch("https://fakestoreapi.com/products?")
    .then(response=>response.json())
    .then(products=>{
        let prods="";
        products.forEach(product=>{
            prods+=
            `<div class="col-sm-12 col-md-6 mb-4 col-lg-4 pb-4 pe-3" data-prod-id="${product.id}" data-prod-category="${product.category}">
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
        console.log("some error happend");
        console.log(e);
    });

});
//
$(function(){
    fetch("https://fakestoreapi.com/products/categories")
    .then(response=>response.json())
    .then(categories=>{
        let categs="";
        categories.forEach(category=>{
            categs+=
            `
            <li class="menu-item">
            <div class="input-group mb-3">
              <input
                class="form-check-input ms-3 pb-4 pe-4"
                type="checkbox"
                id="check1"
                name="Category1"
                value="Category1"
              />
              <p class="h5 text-align-center ms-2 mt-1">${category}</p>
            </div>
          </li>
            `;
        });
        $("#categers").append(categs);
    })
    .catch(e=>{
        console.log("ERROR");
        console.log(e);
    });
});
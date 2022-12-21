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
//<h3 class="view">Quick View</h3>
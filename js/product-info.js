$(function(){
    fetch("https://fakestoreapi.com/products?limit=1")
    .then(res=>res.json())
    .then(products=>{
        // let prod="";
        products.forEach(product => {
            prod=
            `
            <a href="#shop-single.html" class="card product-img">
                  <img
                    src="${product.image}"
                    class="img-fluid img-thumbnail"
                    style="height: 300px ;width:300px"
                  />
                </a>
            `
        });
        $(".product-item").append(prod);
    })
    .catch(e=>{
        console.log("Error ):");
        console.log(e);
    });
  //fetching title and price
    fetch("https://fakestoreapi.com/products?limit=1")
    .then(res=>res.json())
    .then(products=>{
        products.forEach(product=>{
            prod=
            `
            <h3 class="title d-flex justify-content-center fw-bold">${product.title}</h3>
                
                <div class="d-flex justify-content-center m-4">
                    <span class="h5 me-5 fw-bold">$${product.price}</span>
                    ${`<i class="fa-solid fa-star" style="color:var(--ltn__secondary-color-2)"></i>`.repeat(Math.round(product.rating.rate))}
                </div>
            `
        });
        $(".contain").append(prod);
    })
    .catch(e=>{
        console.log("error");
        console.log(e);
    });

//fetching description
    fetch("https://fakestoreapi.com/products?limit=1")
    .then(res=>res.json())
    .then(products=>{
        products.forEach(product=>{
            prod=
            `
            <div class="container mt-5 flex-lg-row flex-column d-flex" style="padding-left:15%;">
           <h2 class="fw-bold ">Description</h2>
        </div>

        <div class="container  flex-lg-row flex-column d-flex" style="padding-left:15%;">
            <p class="desc">${product.description}
            </p>
        </div>
            `
        });
        $("#descr").append(prod);
    })
    .catch(e=>{
        console.log("error");
        console.log(e);
    });



});
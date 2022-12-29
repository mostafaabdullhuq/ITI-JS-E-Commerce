import { Users,setCookie,getCookie } from "./script.js";

//.............................................. validation .............................................................

// REGEX for first.last name , city and country : no numbers or special characters only english letters
let nameRe = /^([a-zA-Z]){2,}$/
//REGEX for username consisting only of non-whitespaces and at least 2 characters
let usernameRe = /^\S{2,}$/;
// email validation REGEX
let emailRe =   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
//REGEX for password :  Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
let passRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ ; 


let user = new Users().validateLoginCookies();

let orderList = new Users().ordersList(user);
console.log(orderList)
for (let index = 0; index < orderList.length; index++) {
        let orderId = orderList[index].id;
        let orderProdsCount = orderList[index].prodsCount;
        let orderTotalPrice = orderList[index].totalPrice;
        addOrder(orderId,orderProdsCount,orderTotalPrice);
}
// console.log(user);
// user.shippingAddr name="address"
    document.querySelector('[name="firstName"]').value = user.firstName;
    document.querySelector('[name="lastName"]').value = user.lastName;
    document.querySelector('[name="email"]').value = user.emailAddress;
    document.querySelector('[name="address"]').value = user.shippingAddr;
    document.querySelector('[name="city"]').value = user.city;
    document.querySelector('[name="country"]').value = user.country;

    document.getElementById("name1").innerHTML = user.firstName;
    document.getElementById("email1").innerHTML = user.emailAddress;

    

    // console.log(cityInput);
    // console.log(countryInput);
    // console.log(addressInput);

    // console.log("///////////////////////////////////");

document.getElementById("userInfo-form").onsubmit = function(e){
    // get inputs
    let firstNameInput = document.querySelector('[name="firstName"]').value;
    let lastNameInput = document.querySelector('[name="lastName"]').value;
    let emailInput = document.querySelector('[name="email"]').value;
    let cityInput = document.querySelector('[name="city"]').value;
    let countryInput = document.querySelector('[name="country"]').value;
    let addressInput = document.querySelector('[name="address"]').value;

    let fnameValid = nameRe.test(firstNameInput);
    let lnameValid = nameRe.test(lastNameInput);
    let emailValid = emailRe.test(emailInput);
    console.log(cityInput);
    console.log(countryInput);
    console.log(addressInput);
    
    // console.log(emailValid);
    // console.log(newPassInput);
    

    if(fnameValid===false || lnameValid===false || emailValid===false){
        e.preventDefault();
        console.log("faild")
    }
    else{
        console.log("success")

        console.log( updateAccount(user.emailAddress,emailInput,firstNameInput,lastNameInput,addressInput,cityInput,countryInput));
    }
    


}

document.getElementById("pass-form").onsubmit = function(e){
    let oldPassInput = document.querySelector('[name="oldpass"]').value;
    let newPassInput = document.querySelector('[name="newpass"]').value;
    let repassInput = document.querySelector('[name="repass"]').value;
    
    //valid var's
    
    let oldPassValid = passRe.test(oldPassInput);
    let newPassValid = passRe.test(newPassInput);
    let repassValid = passRe.test(repassInput);

    console.log(oldPassInput);
    console.log(oldPassValid);
    console.log(newPassInput);
    console.log(newPassValid);
    console.log(repassInput);
    console.log(repassValid);

    if(oldPassValid ==false || newPassValid ==false || repassValid ==false || newPassInput != repassInput ){
        console.log("pass wrong");
        e.preventDefault();
    }
    else{
        console.log("pass true");

        console.log(updatePass(user.emailAddress,newPassInput));
    }
}




function updateAccount(email,nEmail,nFname,nLname,nAddress,nCity,nCountry) {
    let data = window.localStorage.getItem("eCommerceUsers");
    console.log(nCity);
    if (data) {
        let eCommerceUsers = JSON.parse(data);

        for (let index = 0; index < eCommerceUsers.length; index++) {
            if(eCommerceUsers[index].emailAddress === email){
                console.log(eCommerceUsers[index].city);
                console.log(nCity);
                
            eCommerceUsers[index].emailAddress = nEmail;
            eCommerceUsers[index].firstName = nFname;
            eCommerceUsers[index].lastName = nLname;
            eCommerceUsers[index].shippingAddr = nAddress;
            eCommerceUsers[index].city = nCity;
            eCommerceUsers[index].country = nCountry;
            

            // console.log(eCommerceUsers[index].city);
            // console.log(nCity);
                

            // eCommerceUsers[index].city = nCity;
            // eCommerceUsers[index].country = nCountry;
            
            console.log(eCommerceUsers);

            let a = JSON.stringify(eCommerceUsers);
            // console.log(a);
            window.localStorage.setItem("eCommerceUsers",a);
            }else{
                console.log('email incorrect');

            }

            
        }
        // console.log(eCommerceUsers);
    }
}

function updatePass(email,newPass){
    
    let data = window.localStorage.getItem("eCommerceUsers");
    if (data) {
        let eCommerceUsers = JSON.parse(data);
        for (let index = 0; index < eCommerceUsers.length; index++) {
            if(eCommerceUsers[index].emailAddress === email){
            
                eCommerceUsers[index].passWord = newPass;
            
                let a = JSON.stringify(eCommerceUsers);
                window.localStorage.setItem("eCommerceUsers",a);
            }else{
                console.log('email incorrect');

            }

            
        }
        console.log(eCommerceUsers);
    }
}








                                // <div class="row border pt-1 pb-1 mb-2">
                                //         <div class="col-lg-8">
                                //             <div class="card-body">
                                //                 <h5 class="card-title fs-4">Order #1</h5>
                                //                 <p class="card-text fs-6">Total: 200$</p>
                                //                 <p class="card-text fs-6">Order Date : 22/12/2022</p>
                                //             </div>
                                //         </div>
                                //         <div class="col-lg-4">
                                //             <div class="mt-2"><input type="submit" value="Track order" class="btn rounded-0 btn-form text-uppercase fw-bold fs-5 ps-5 pe-5 p-3" /></div>
                                //         </div>
                                // </div>


function addOrder(id,products,cost) {
    document.getElementById("add_order").innerHTML +=
    `<div class="row border pt-1 pb-1 mb-2">
    <div class="col-lg-8">
        <div class="card-body">
            <h5 class="card-title fs-4">Order ${id}</h5>
            <p class="card-text fs-6">Total: ${cost}</p>
            <p class="card-text fs-6">Number of products :${products}</p>
        </div>
    </div>
    <div class="col-lg-4">
        <div class="mt-2"><input type="submit" value="Track order" class="btn rounded-0 btn-form text-uppercase fw-bold fs-5 ps-5 pe-5 p-3" /></div>
    </div>
</div>`;
}

// function addOrder() {
//         document.getElementById("name1").innerHTML +="<h5 class='card-title fs-4'>Order #1</h5>";
// }
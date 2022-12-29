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
console.log(user);
// user.shippingAddr name="address"
    document.querySelector('[name="firstName"]').value = user.firstName;
    document.querySelector('[name="lastName"]').value = user.lastName;
    document.querySelector('[name="email"]').value = user.emailAddress;
    document.querySelector('[name="address"]').value = user.shippingAddr;
    document.querySelector('[name="city"]').value = user.city;
    document.querySelector('[name="country"]').value = user.country;


document.getElementById("userInfo-form").onsubmit = function(e){
    // get inputs
    let firstNameInput = document.querySelector('[name="firstName"]').value;
    let lastNameInput = document.querySelector('[name="lastName"]').value;
    let emailInput = document.querySelector('[name="email"]').value;
    let oldPassInput = document.querySelector('[name="oldpass"]').value;
    let newPassInput = document.querySelector('[name="newpass"]').value;
    let repassInput = document.querySelector('[name="repass"]').value;
    let cityInput = document.querySelector('[name="city"]').value;
    let countryInput = document.querySelector('[name="country"]').value;
    let addressInput = document.querySelector('[name="address"]').value;
    //valid var's
    let fnameValid = nameRe.test(firstNameInput);
    let lnameValid = nameRe.test(lastNameInput);
    let emailValid = emailRe.test(emailInput);
    let oldPassValid = passRe.test(oldPassInput);
    let newPassValid = passRe.test(newPassInput);
    let repassValid = passRe.test(repassInput);


    if(fnameValid===false || lnameValid===false || emailValid===false){
        e.preventDefault();
        console.log("faild")
    }
    else{
        console.log("success")

        console.log( updateAccount(emailInput,emailInput,firstNameInput,lastNameInput,addressInput,countryInput,cityInput));
    }
    


}

document.getElementById("pass-form").onsubmit = function(){
    
}

function updateAccount(email,nEmail,nFname,nLname,nAddress,nCity,nCountry) {
    let data = window.localStorage.getItem("eCommerceUsers");
    if (data) {
        let eCommerceUsers = JSON.parse(data);
        for (let index = 0; index < eCommerceUsers.length; index++) {
            if(eCommerceUsers[index].emailAddress === email){
            
            eCommerceUsers[index].emailAddress = nEmail;
            eCommerceUsers[index].firstName = nFname;
            eCommerceUsers[index].lastName = nLname;
            eCommerceUsers[index].shippingAddr = nAddress;
            eCommerceUsers[index].city = nCity;
            eCommerceUsers[index].country = nCountry;

            let a = JSON.stringify(eCommerceUsers);
            window.localStorage.setItem("eCommerceUsers",a);
            }else{
                console.log('email incorrect');

            }

            
        }
        console.log(eCommerceUsers);
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
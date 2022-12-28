import { Users,deleteCookie } from "./script.js";
//.............................................. validation .............................................................

// REGEX for first.last name , city and country : no numbers or special characters only english letters
let nameRe = /^([a-zA-Z]){2,}$/
//REGEX for username consisting only of non-whitespaces and at least 2 characters
let usernameRe = /^\S{2,}$/;
// email validation REGEX
let emailRe =   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
//REGEX for password :  Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
let passRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ ; 

let test = new Users().validateLoginCookies();
console.log(test);
// test.shippingAddr name="address"
    document.querySelector('[name="firstName"]').value = test.firstName;
    document.querySelector('[name="lastName"]').value = test.lastName;
    document.querySelector('[name="email"]').value = test.emailAddress;
    document.querySelector('[name="address"]').value = test.shippingAddr;
    document.querySelector('[name="city"]').value = test.city;
    document.querySelector('[name="country"]').value = test.country;


document.forms[0].onsubmit = function(e){
    // get inputs
    let firstNameInput = document.querySelector('[name="firstName"]').value;
    let lastNameInput = document.querySelector('[name="lastName"]').value;
    // let usernameInput = document.querySelector('[name="username"]').value;
    let emailInput = document.querySelector('[name="email"]').value;
    let oldPassInput = document.querySelector('[name="oldpass"]').value;
    let newPassInput = document.querySelector('[name="newpass"]').value;
    let repassInput = document.querySelector('[name="repass"]').value;
    let cityInput = document.querySelector('[name="city"]').value;
    let countryInput = document.querySelector('[name="country"]').value;
    
    //valid var's
    let fnameValid = nameRe.test(firstNameInput);
    let lnameValid = nameRe.test(lastNameInput);
    // let usernameValid = usernameRe.test(usernameInput);
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
        if(oldPassInput === test.passWord){
            console.log("correct pass");
            if(newPassValid ===false || repassValid===false || newPassInput != repassInput ){
                //new pass not valid or repeated
                console.log("new pass not valid or repeated");
            }else{
                //change user data in local storage
            }
        }else{
            console.log("not correct pass");
            console.log(oldPassInput);
            console.log(test.passWord);


        }
    }
    


}

document.getElementById("logout_btn").onclick = function(e){
    if(confirm("Are you sure you want to logout?")){
        // let n = new Users().logOut();
        // console.log(n);
        // let cookiesNames = ["user_id", "user_token"];
        // // set cookies value to 0 and 0 and expire time to 0 to clear it
        // cookiesNames.map((cookie) => {
        //     setCookie(cookie, 0, 0);
        // });
        // setCookie("user_id",99,10);
        // console.log(n);
        // deleteCookie("user_id");
        dCookie("user_id",99);
    }
}
function dCookie(cname, cvalue) {
    // const d = new Date();
    // d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
// down = document.getElementsByClassName("down-btn");
// down.onclick = function () {
//    down.style.backgroundColor="rgb(245, 197, 175)";
// };

function getCookie()  
{  
    if(document.cookie.length!=0)  
    {  
    alert(document.cookie);  
    }  
    else  
    {  
        alert("Cookie not avaliable");  
    }  
}  
function eatCookie()   
{  
    document.cookie="name=user_id;max-age=0";  
}   
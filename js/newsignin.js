import * as all from "./script.js";



// email validation REGEX
let emailRe =   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
//REGEX for password :  Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
let passRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ ; 

document.getElementById("signinForm").onmouseenter = function(e){
    let emailInput = document.querySelector('[name="email"]').value;
    let passInput = document.querySelector('[name="pass"]').value;

    let emailValid = emailRe.test(emailInput);
    let passValid = passRe.test(passInput);

    if(emailValid===false || passValid===false){
        e.preventDefault();
        console.log("faild")
    }else{
        console.log("enter func")
        // checkLocalStorage(emailInput,passInput);
        let users = new all.Users().loginAccount(emailInput,passInput);
        console.log(users);
    }
}

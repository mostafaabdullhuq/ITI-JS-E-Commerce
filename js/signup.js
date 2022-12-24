// REGEX for first.last name , city and country : no numbers or special characters only english letters
let nameRe = /^([a-zA-Z]){2,}$/
//REGEX for username consisting only of non-whitespaces and at least 2 characters
let usernameRe = /^\S{2,}$/;
// email validation REGEX
let emailRe =   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
//REGEX for password :  Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
let passRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ ; 

document.forms[0].onsubmit = function(e){
    //get inputs
    let firstNameInput = document.querySelector('[name="firstName"]').value;
    let lastNameInput = document.querySelector('[name="lastName"]').value;
    let usernameInput = document.querySelector('[name="username"]').value;
    let emailInput = document.querySelector('[name="email"]').value;
    let passInput = document.querySelector('[name="pass"]').value;
    let repassInput = document.querySelector('[name="repass"]').value;
    let cityInput = document.querySelector('[name="city"]').value;
    let countryInput = document.querySelector('[name="country"]').value;
    
    //valid var's
    let fnameValid = nameRe.test(firstNameInput);
    let lnameValid = nameRe.test(lastNameInput);
    let usernameValid = usernameRe.test(usernameInput);
    let emailValid = emailRe.test(emailInput);
    let passValid = passRe.test(passInput);
    let repassValid = passRe.test(repassInput);
    let cityValid = nameRe.test(cityInput);
    let countryValid = nameRe.test(countryInput);



    if(fnameValid===false || lnameValid===false || usernameValid===false || emailValid===false || passValid===false || repassValid===false || cityValid===false  || countryValid===false || passInput != repassInput ){
        e.preventDefault();
        // console.log("faild")
    }
    // else{
    //     console.log("success")

    // }
    
}
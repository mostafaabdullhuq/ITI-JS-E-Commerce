// REGEX for first and last name : no numbers or special characters only english letters
let nameRe = /^([a-zA-Z]){2,}$/
//REGEX for username consisting only of non-whitespaces and at least 2 characters
let usernameRe = /^\S{2,}$/;
// email validation REGEX
let emailRe =   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

let reTest="s@s.co";
console.log(emailRe.test(reTest))
document.forms[0].onmouseenter = function(e){
    //get inputs
    let firstNameInput = document.querySelector('[name="firstName"]').value;
    let lastNameInput = document.querySelector('[name="lastName"]').value;
    let usernameInput = document.querySelector('[name="username"]').value;
    
    //valid var's
    let fnameValid = nameRe.test(firstNameInput);
    let lnameValid = nameRe.test(lastNameInput);
    let usernameValid = nameRe.test(usernameInput);

    //test validations
    console.log(fnameValid);
    console.log(lnameValid);

    if(fnameValid===false || lnameValid===false || usernameValid===false){
        e.preventDefault();
        console.log("faild")
    }
    else{
        console.log("success")

    }
    
    // alert(lastNameInput);
}
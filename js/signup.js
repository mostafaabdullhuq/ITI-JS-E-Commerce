import * as all from "./script.js";

// REGEX for first.last name , city and country : no numbers or special characters only english letters
let nameRe = /^([a-zA-Z]){2,}$/;
//REGEX for username consisting only of non-whitespaces and at least 2 characters
let usernameRe = /^\S{2,}$/;
// email validation REGEX
let emailRe = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
//REGEX for password :  Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
let passRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

let users_list = [];

$("body").on("submit", "#signUp-form", function (e) {
    //get inputs
    console.log("here");
    let firstNameInput = document.querySelector('[name="firstName"]').value;
    let lastNameInput = document.querySelector('[name="lastName"]').value;
    // let usernameInput = document.querySelector('[name="username"]').value;
    let emailInput = document.querySelector('[name="newemail"]').value;
    let passInput = document.querySelector('[name="newpass"]').value;
    let repassInput = document.querySelector('[name="repass"]').value;
    let cityInput = document.querySelector('[name="city"]').value;
    let countryInput = document.querySelector('[name="country"]').value;
    let addressInput = document.querySelector('[name="address"]').value;

    //valid var's
    let fnameValid = nameRe.test(firstNameInput);
    let lnameValid = nameRe.test(lastNameInput);
    let emailValid = emailRe.test(emailInput);
    let passValid = passRe.test(passInput);
    let repassValid = passRe.test(repassInput);
    let cityValid = nameRe.test(cityInput);
    let countryValid = nameRe.test(countryInput);

    if (fnameValid === false || lnameValid === false) {
        e.preventDefault();
        document.getElementById(
            "signup-msg"
        ).innerHTML = `<div class="col-12 fw-bold mt-1 p-1 rounded-0" style="color: red">Names must have no numbers or special characters only english letters</div>`;
    } else if (emailValid === false) {
        e.preventDefault();
        document.getElementById("signup-msg").innerHTML = `<div class="col-12 fw-bold mt-1 p-1 rounded-0" style="color: red">Please enter your email correctly</div>`;
    } else if (passValid === false || repassValid === false) {
        e.preventDefault();
        document.getElementById(
            "signup-msg"
        ).innerHTML = `<div class="col-12 fw-bold mt-1 p-1 rounded-0" style="color: red">Passwords must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character</div>`;
    } else if (passInput != repassInput) {
        e.preventDefault();
        document.getElementById("signup-msg").innerHTML = `<div class="col-12 fw-bold mt-1 p-1 rounded-0" style="color: red">confirmation password does not match</div>`;
    } else {
        let newuser = new all.User(firstNameInput, lastNameInput, emailInput, passInput, countryInput, cityInput, addressInput);
        let users = new all.Users(users_list).createAccount(newuser);
    }
});

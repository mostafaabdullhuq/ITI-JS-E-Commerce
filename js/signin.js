import * as all from "./script.js";

// email validation REGEX
let emailRe = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
//REGEX for password :  Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
let passRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

$("body").on("submit", "#signinForm", function (e) {
    console.log("here in login");
    let emailInput = document.querySelector('[name="email"]').value;
    let passInput = document.querySelector('[name="pass"]').value;

    let emailValid = emailRe.test(emailInput);
    let passValid = passRe.test(passInput);

    if (emailValid === false) {
        e.preventDefault();
        document.querySelector('[id="signin-msg"]').innerHTML = `<div class="col-12 fw-bold mt-1 p-1 rounded-0" style="color: red">Enter a correct email format</div>`;
    } else if (passValid === false) {
        e.preventDefault();
        document.querySelector(
            '[id="signin-msg"]'
        ).innerHTML = `<div class="col-12 fw-bold mt-1 p-1 rounded-0" style="color: red">Password Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character</div>`;
    } else {
        let users = new all.Users().loginAccount(emailInput, passInput);

        if (users == "email incorrect") {
            e.preventDefault();
            document.querySelector('[id="signin-msg"]').innerHTML = `<div class="col-12 fw-bold mt-1 p-1 rounded-0" style="color: red">Email incorrect</div>`;
        } else if (users == "password incorrect") {
            e.preventDefault();
            document.querySelector('[id="signin-msg"]').innerHTML = `<div class="col-12 fw-bold mt-1 p-1 rounded-0" style="color: red">Password incorrect</div>`;
        }
    }
});

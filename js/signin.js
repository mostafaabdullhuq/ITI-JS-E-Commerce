import * as all from "./script.js";

// email validation REGEX
let emailRe = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
//REGEX for password :  Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
let passRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

document.getElementById("signinForm").onsubmit = function (e) {
    let emailInput = document.querySelector('[name="email"]').value;
    let passInput = document.querySelector('[name="pass"]').value;

    let emailValid = emailRe.test(emailInput);
    let passValid = passRe.test(passInput);

    if (emailValid === false) {
        e.preventDefault();
        document.getElementById("signin-msg").innerHTML = `<div class="col-12 fw-bold mt-1 p-1 rounded-0" style="color: red">Enter a correct email format</div>`;
    } 
    else if(passValid === false){
        e.preventDefault();
        document.getElementById("signin-msg").innerHTML = `<div class="col-12 fw-bold mt-1 p-1 rounded-0" style="color: red">Password Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character</div>`;
    }
    else {
        // checkLocalStorage(emailInput,passInput);
        let users = new all.Users().loginAccount(emailInput, passInput);
        // let users = new all.Users().checkLocalStorage(emailInput, passInput);

        console.log(users)
        if(users == 'email incorrect'){
            e.preventDefault();
            document.getElementById("signin-msg").innerHTML = `<div class="col-12 fw-bold mt-1 p-1 rounded-0" style="color: red">Email incorrect</div>`;
        }
        else if(users == 'password incorrect'){            
            e.preventDefault();
            document.getElementById("signin-msg").innerHTML = `<div class="col-12 fw-bold mt-1 p-1 rounded-0" style="color: red">Password incorrect</div>`;
        }
        // window.location.href= "./../index.html"
    }
};

// document.getElementById("testbtn").onsubmit = function(){
//     document.getElementById("signin-msg").innerHTML += `<div class="col-12 fw-bold mt-1 p-1 rounded-0">hhhhhhh</div>`
//     console.log("enterd")
// }

//hupypyvy@mailinator.com
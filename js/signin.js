// // email validation REGEX
// let emailRe =   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
// //REGEX for password :  Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
// let passRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ ;

// document.getElementById("signinForm").onsubmit = function(e){
//     let emailInput = document.querySelector('[name="email"]').value;
//     let passInput = document.querySelector('[name="pass"]').value;

//     let emailValid = emailRe.test(emailInput);
//     let passValid = passRe.test(passInput);

//     if(emailValid===false || passValid===false){
//         e.preventDefault();
//         console.log("faild")
//     }else{
//         console.log("enter func")
//         checkLocalStorage(emailInput,passInput);
//     }
// }

// function checkLocalStorage(email,pass) {
//     let data = window.localStorage.getItem("users");
//     if (data) {
//         let users = JSON.parse(data);
//         for (let index = 0; index < users.length; index++) {
//             if(users[index].emailAddress === email){
//                 console.log('email found!');
//                 if (users[index].passWord === pass) {
//                     console.log('password correct');
//                     // setCookie(email,pass,100);
//                     let userToken = crypto.randomUUID();
//                     users[index].cookieToken = userToken;
//                     deleteCookie("user_id");
//                     deleteCookie("user_token");
//                     setCookie("user_id", users[index].emailAddress, 30);
//                     setCookie("user_token", userToken, 30);
//                 }else{
//                     console.log('password incorrect');
//                 }

//             }else{
//                 console.log('email incorrect');

//             }

//         }
//         // console.log(users);
//     }
// }

// function setCookie(cname, cvalue, exdays) {
//     const d = new Date();
//     d.setTime(d.getTime() + (exdays*24*60*60*1000));
//     let expires = "expires="+ d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }

// function deleteCookie(name) {
//     document.cookie = name + "=; Max-Age=-99999999;";
// }

// // class that represents one user only
// class User {
//     constructor(firstName, lastName, emailAddress, passWord, country, city, shippingAddr) {
//         // this.id = ecommerceUsers.usersList.length + 1;
//         // this.id = emailAddress;
//         this.firstName = firstName;
//         this.lastName = lastName;
//         this.emailAddress = emailAddress;
//         this.passWord = passWord;
//         // this.phoneNumber = phoneNumber;
//         this.shippingAddr = shippingAddr;
//         this.country = country;
//         this.city = city;
//         this.cookieToken = "Z3JvdXAyQGl0aS5nb3YuZWc6QWRtaW5AMTIzNA==";
//         this.ordersList = [];
//         this.cart = {
//             prodsCount: 0,
//             prodsPrice: 0,
//             prodsList: [],
//         };
//     }
// }

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

    if (emailValid === false || passValid === false) {
        e.preventDefault();
        console.log("faild");
    } else {
        console.log("enter func");
        // checkLocalStorage(emailInput,passInput);
        let users = new all.Users().loginAccount(emailInput, passInput);
        console.log(users);
    }
};

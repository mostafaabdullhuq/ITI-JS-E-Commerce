// a function to create a new cookie
export function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// a function to get a value of a specific cookie
export function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
// a function to delete a specific cookie
export function deleteCookie(name) {
    document.cookie = name + "=; Max-Age=-99999999;";
}

// a function to validate password requirements
export var isPassValid = (passWord) => {
    if (passWord) {
        // check if password is less than 8 characters
        if (passWord.length < 8 || passWord.length > 30) return [false, "Password must be [8-30] characters."];
        // check if password contains small letters
        else if (passWord.search(/[a-z]/) < 0) return [false, "Password must contain one or more small letter."];
        // check if password contains capital letters
        else if (passWord.search(/[A-Z]/) < 0) return [false, "Password must contain one or more capital letter."];
        // check if password contains digits
        else if (passWord.search(/[\d]/) < 0) return [false, "Password must contain one or more digit."];
        // check if password contains special characters
        else if (passWord.search(/[\$\!\_\-\&\%\?\@]/) < 0) return [false, "Password must contain one or more special character [$,!,_,-,&,%,?,@]."];
        // check for whitespaces in password
        else if (passWord.search(/\s/) >= 0) return [false, "Password cannot have whitespace."];
        // if all requirements are met.
        else return [true, ""];
    }
    // if password is false or empty, return false and a warning
    return [false, "Please enter a password."];
};

// check for email validation
export var isEmailValid = (emailAddress) => {
    // check if email address is true and not empty
    return emailAddress // if email met the conditions
        ? // check for email validation by regex
          emailAddress.search(/^([a-zA-Z1-9]*\.?\_?\-?)*@([a-zA-Z1-9]*\.[a-zA-Z1-9]*){1,2}$/) == 0
            ? // if email pass the regex validation, return true
              [true, ""]
            : // if email doesn't pass the regex validation, return false
              [false, "Please enter a valid email address"]
        : // if email is empty or false, return false
          [false, "Please enter an email address."];
};

// class that contains alll users operations
export class Users {
    // private property
    #usersName = "eCommerceUsers";
    constructor(usersList = []) {
        // users list
        this.usersList = usersList;
        // if there's no users list with the same name in the local storage
        !localStorage.getItem(this.#usersName)
            ? // add the users list to the local storage
              this.syncUpload
            : // if there's already a users list in the local storage, sync it with the current one
              this.syncDownload;
    }
    //! Users methods
    /*
        a method to create a new user, returns an object contains boolean value represents the state of creation 
        and a text value contains the error if the state is false
    */

    // syncs the localstorage with the current users list
    get syncUpload() {
        localStorage.setItem(this.#usersName, JSON.stringify(this.usersList));
    }

    // syncs the current users list with the local storage
    get syncDownload() {
        this.usersList = JSON.parse(localStorage.getItem(this.#usersName));
    }

    // a method to create a new user
    createAccount(userData) {
        // initialize the return response object
        let response = {
            isCreated: true,
            error: "",
        };
        // loop through all users
        this.usersList.forEach((user) => {
            // if the user's email is the same as the email of the user being created
            if (userData.emailAddress == user.emailAddress) {
                // cannot create account because email duplication
                response.isCreated = false;
                response.error = "Email Address is already exists.";
            }
            // if the user's username is the same as the username of the user being created
            if (userData.userName == user.userName) {
                // cannot create account because username duplication
                response.isCreated = false;
                response.error = "Username is already exists.";
            }
        });

        if (response.isCreated) {
            this.usersList.push(userData);
            localStorage.setItem(this.#usersName, JSON.stringify(this.usersList));
        }
        // return the response object
        return response;
    }

    // a method to check for username and password at login
    loginAccount(userName, passWord) {
        /*
        find if there's a user with the same username and password in the users list
        if there's a user return the user, if user not found return false
        */
        return this.usersList.find((user) => {
            return user.userName.toLowerCase() === userName.toLowerCase() && user.passWord === passWord;
        });
    }

    // method to sync user orders changes
    syncUsersData(userID, newOrdersList) {
        // loop on each user in users list
        this.usersList.forEach((user) => {
            // if the user id is the same as the given user id
            if (user.id == userID) {
                // update the list of orders for the given user
                user.ordersList = newOrdersList;
            }
        });

        // sync with the local storage
        this.syncUpload;
    }
    validateLoginCookies(userID, userName) {
        return this.usersList.find((user) => user.id == userID && user.userName == userName);
    }
    logOut(...cookiesNames) {
        // set cookies value to 0 and 0 and expire time to 0 to clear it

        cookiesNames.map((cookie) => {
            setCookie(cookie, 0, 0);
        });
    }

    // a method that returns the count of users in this users object
    get usersCount() {
        return this.usersList.length;
    }

    //! User methods

    // a method that returns specific user orders count
    userOrdersCount(user) {
        return user.ordersList.length;
    }

    // a method that returns the list of orders for specific user
    userOrdersList(user) {
        return user.ordersList;
    }

    // method to add new order to specific user orders list
    addOrder(user, order) {
        // set an id to the order
        order.id = this.userOrdersCount(user) + 1;
        // add the order to the user orders list
        user.ordersList.push(order);
        // replace the user new orders List with the old order list
        this.syncUsersData(user.id, user.ordersList);

        return order;
    }

    // method to delete specific user order
    deleteOrder(user, orderID) {
        user.ordersList.forEach((order, index) => {
            if (order.id == orderID) {
                user.ordersList.splice(index, 1);
            }
        });
        // replace the user new orders with the old orders
        this.syncUsersData(user.id, user.ordersList);
    }
}
// create new Users Object to store all website users
export var ecommerceUsers = new Users();

// class that represents one user only
export class User {
    constructor(id, firstName, lastName, emailAddress, passWord, country, city, shippingAddr, phoneNumber) {
        this.id = id;
        this.emailAddress = emailAddress;
        this.firstName = firstName;
        this.lastName = lastName;
        this.country = country;
        this.city = city;
        this.shippingAddr = shippingAddr;
        this.phoneNumber = phoneNumber;
        this.passWord = passWord;
        this.ordersList = [];
        this.cartItems = [];
    }
}
// order class
export class Order {
    constructor(prods) {
        this.id = false;
        this.prods = prods;
    }
}

// class that represents user cart
export class Cart {
    constructor() {
        this.cartItems = [];
    }
    get cartItemsCount() {
        return this.cartItems.length;
    }
    get cartItemsList() {
        return this.cartItems;
    }
    addCartItem(cartItem) {
        this.cartItems.push(cartItem);
    }
    deleteCartItem(cartItemID) {
        this.cartItems.forEach((cartItem, index) => {
            if (cartItem.id == cartItemID) {
                this.cartItems.splice(index, 1);
            }
        });
    }
    clearCart() {
        this.cartItems = [];
    }
    getCartTotal() {
        let total = 0;
        this.cartItems.forEach((cartItem) => {
            total += cartItem.totalPrice;
        });
        return total;
    }
}

// class that represents one product
export class Product {
    constructor(id, name, price, img, description) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.img = img;
        this.description = description;
        this.rating = 0;
    }
}

// fixing nav in scroll
document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener("scroll", function () {
        if (window.scrollY > 100) {
            document.getElementById("navbar_top").classList.add("fixed-top");
            document.getElementById("navbar_top").style.backgroundColor = "white";
            document.getElementById("navbar_top").style.boxShadow = "2px 10px 4px rgb(133, 132, 132)";
            navbar_height = document.querySelector(".navbar").offsetHeight;
            document.body.style.paddingTop = navbar_height + "px";
        } else {
            document.getElementById("navbar_top").classList.remove("fixed-top");
            document.body.style.paddingTop = "0";
        }
    });
});
// carousel
jQuery(document).ready(function ($) {
    "use strict";
    //  TESTIMONIALS CAROUSEL HOOK
    $("#customers-testimonials").owlCarousel({
        loop: true,
        center: true,
        items: 3,
        margin: 0,
        autoplay: true,
        dots: true,
        autoplayTimeout: 8500,
        smartSpeed: 450,
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2,
            },
            1170: {
                items: 3,
            },
        },
    });
});
$(document).ready(function () {
    $(".owl-carousel").owlCarousel();
});
// feedback
$(function () {
    var splide = new Splide(".splide");
    splide.mount();
});

$(function () {
    var splide = new Splide(".splide1", {
        type: "loop",
        padding: "5rem",
    });

    splide.mount();
});

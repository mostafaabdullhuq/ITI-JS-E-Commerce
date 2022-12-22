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
    #keyName = "eCommerceUsers";
    constructor(usersList = []) {
        this.usersList = usersList;
        // if there's no users list with the same name in the local storage
        !localStorage.getItem(this.#keyName)
            ? // add the users list to the local storage
              this.syncUpload
            : // if there's already a users list in the local storage, sync it with the current one
              this.syncDownload;
    }
    //! Users methods

    // syncs the localstorage with the current users list
    get syncUpload() {
        localStorage.setItem(this.#keyName, JSON.stringify(this.usersList));
    }

    // syncs the current users list with the local storage
    get syncDownload() {
        this.usersList = JSON.parse(localStorage.getItem(this.#keyName));
    }

    /*
        [DESC]
            a method to create a new user in Users list

        [Arguments]
            userData: an object of type User contains the user data
        EX: 
            Users.createAccount(new User(firstName="John", lastName="Maxi", emailAddress="johnmaxi@gmail.com", passWord="John@12345", country="United States", city="New York", shippingAddr="1234 X Street Build 2", phoneNumber="+1234567891"))

        [Return]
            object of two keys
                isCreated: boolean value indicates if the user is created or not
                error: string value contains the error message if the user is not created
        EX: 
            {
                isCreated: true,
                error: ""
            }

    */

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

        // if user is created successfully
        if (response.isCreated) {
            // add the user to the users list
            this.usersList.push(userData);

            // update the localstorage
            this.syncUpload;
        }
        // return the response object
        return response;
    }

    /*
        [DESC]
            a method to login to account with email and password

        [Arguments]
            - emailAddress: user email address
            - passWord: user password
        EX: 
            Users.loginAccount(emailAddress="johnmaxi@gmail.com", passWord="John@12345")

        [Return]
            - object of type user if the user is found
            - false if the user is not found
    */

    loginAccount(emailAddress, passWord) {
        return this.usersList.find((user) => {
            return user.emailAddress.toLowerCase() === emailAddress.toLowerCase() && user.passWord === passWord;
        });
    }

    /*
        [DESC]
            a method to logout from user account and reset cookies

        [Arguments]
            - cookiesNames: cookies names to be reset
        EX: 
            Users.logout("user_id","user_token")
    */

    logOut(...cookiesNames) {
        // set cookies value to 0 and 0 and expire time to 0 to clear it
        cookiesNames.map((cookie) => {
            setCookie(cookie, 0, 0);
        });
    }

    /*
        [DESC]
            a method to validate the user cookie token with the user id
            gets the values of user id and user token from the cookies and search for a match in the users list

        [Return]
            - object of type user if the cookie is valid
            - false if the cookie is not valid
    */
    validateLoginCookies() {
        let userID = getCookie("user_id"),
            userToken = getCookie("user_token");
        return this.usersList.find((user) => user.id == userID && user.cookieToken == userToken);
    }

    /*
        [DESC]
            a method to generate id for the user based on the number of users in the users array

        [Return]
            - an id number
    */
    generateUserID() {
        return this.usersList.length + 1;
    }

    //! User methods

    /*
        [DESC]
            a method to get the number of orders for specific user

        [Arguments]
            - user: object of type user
        EX:
            Users.ordersCount(user)
        
        [Return]
        - number of orders for the user given
    */
    ordersCount(user) {
        return user.ordersList.length;
    }

    /*
        [DESC]
            a method to generate id for new orders

        [Arguments]
            - user: object of type user
        EX:
            Users.generateOrderID(user)
        
        [Return]
        - an id number for the order
    */

    generateOrderID(user) {
        return user.ordersList.length + 1;
    }

    /*
        [DESC]
            a method get a list of orders for specific user

        [Arguments]
            - user: object of type user
        EX:
            Users.ordersList(user)
        
        [Return]
        - an array of objects of type order
    */
    ordersList(user) {
        return user.ordersList;
    }

    /*
        [DESC]
            a method to update user cart

        [Arguments]
            - user: object of type user
            - itemsCount: number of items in the cart
            - cartSubtotal: price of total items in the cart
            - cartProducts: array of objects of type product contains the products in the cart
        EX:
            Users.UpdateCart(user, itemsCount = 10, cartSubtotal = 2000, cartProducts = [
                {
                    id: 1,
                    name: "Product 1",
                    price: 1000,
                    img: "product1.jpg",
                    quantity: 2,
                },
                {
                    id: 2,
                    name: "Product 2",
                    price: 1000,
                    img: "product2.jpg",
                    quantity: 1,
                }
            ])
    */

    updateCart(user, itemsCount, cartSubtotal, cartProducts) {
        // update the number of items, price of total items, the list of products in user cart
        user.cart.prodsCount = itemsCount;
        user.cart.prodsPrice = cartSubtotal;
        user.cart.prodsList = cartProducts;
        // update the user cart in localstorage
        this.syncUpload;
    }

    /*
        [DESC]
            a method to add order to user orders list

        [Arguments]
            - user: object of type user
            - order: object of type order
    */

    addOrder(user, order) {
        // add the order to the user orders list
        user.ordersList.push(order);
        // update the user orders list in localstorage
        this.syncUpload;
    }

    /*
        [DESC]
            a method to update user info

        [Arguments]
            - user: object of type user
            - newDetails: object contains the new details to be updated
        EX:
            Users.updateProfile(user, newDetails = {
                firstName: "John",
                lastName: "Maxi",
                emailAddress: "johnmaxi@gmail.com"
            })
    */
    updateProfile(user, newDetails) {
        // loop through the keys of the new details object
        Object.keys(newDetails).forEach((key) => {
            // for each key in new details object, update the corresponding key in user with the value of this key
            user[key] = newDetails[key];
        });
        // update the user details in localstorage
        this.syncUpload;
    }

    /*
        [DESC]
            a method to change user password

        [Arguments]
            - user: object of type user
            - newPass: user new password
        EX:
            Users.changePassword(user, newPass="JohnMaxi@13512")
        
        [Return]
            - array of two elements
                - first element is boolean value indicates if the password is valid or not
                - second element is the user object if the password is valid, otherwise it's the error message

    */

    changePassword(user, newPass) {
        // check if password is valid and meet the requirements
        let passValidation = isPassValid(newPass);

        // if password is valid and met the requirements
        if (passValidation[0]) {
            // update the user password
            user.passWord = newPass;

            // update the localstorage
            this.syncUpload;

            return [true, user];
        }

        // if password is not valid or doesn't meet the requirements
        else {
            return passValidation;
        }
    }
}

// class that represents one user only
export class User {
    constructor(firstName, lastName, emailAddress, passWord, country, city, shippingAddr, phoneNumber) {
        this.id = Users.generateUserID();
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.passWord = passWord;
        this.phoneNumber = phoneNumber;
        this.shippingAddr = shippingAddr;
        this.country = country;
        this.city = city;
        this.cookieToken = cookieToken;
        this.ordersList = [];
        this.cart = {
            prodsCount: 0,
            prodsPrice: 0,
            prodsList: [],
        };
    }
}

// order class
export class Order {
    constructor(user, prodsCount, prodsPrice, shippingPrice, totalPrice, prodsList) {
        this.id = Users.generateOrderID(user);
        this.prodsCount = prodsCount;
        this.prodsPrice = prodsPrice;
        this.shippingPrice = shippingPrice;
        this.totalPrice = totalPrice;
        this.prodsList = prodsList;
    }
}

// create new Users Object to store all website users
export var ecommerceUsers = new Users();

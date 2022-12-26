// import { ecommerceUsers } from "./script.js";




// REGEX for first.last name , city and country : no numbers or special characters only english letters
let nameRe = /^([a-zA-Z]){2,}$/
//REGEX for username consisting only of non-whitespaces and at least 2 characters
let usernameRe = /^\S{2,}$/;
// email validation REGEX
let emailRe =   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
//REGEX for password :  Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
let passRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ ; 


let users_list = [];



document.forms[0].onsubmit = function(e){
    //get inputs
    let firstNameInput = document.querySelector('[name="firstName"]').value;
    let lastNameInput = document.querySelector('[name="lastName"]').value;
    // let usernameInput = document.querySelector('[name="username"]').value;
    let emailInput = document.querySelector('[name="email"]').value;
    let passInput = document.querySelector('[name="pass"]').value;
    let repassInput = document.querySelector('[name="repass"]').value;
    let cityInput = document.querySelector('[name="city"]').value;
    let countryInput = document.querySelector('[name="country"]').value;
    let addressInput = document.querySelector('[name="address"]').value;
    
    //valid var's
    let fnameValid = nameRe.test(firstNameInput);
    let lnameValid = nameRe.test(lastNameInput);
    // let usernameValid = usernameRe.test(usernameInput);
    let emailValid = emailRe.test(emailInput);
    let passValid = passRe.test(passInput);
    let repassValid = passRe.test(repassInput);
    let cityValid = nameRe.test(cityInput);
    let countryValid = nameRe.test(countryInput);


    if(fnameValid===false || lnameValid===false || emailValid===false || passValid===false || repassValid===false || cityValid===false  || countryValid===false || passInput != repassInput ){
        e.preventDefault();
        // console.log("faild")
    }
    else{
        console.log("success");

        let newuser = new User(firstNameInput,lastNameInput,emailInput,passInput,countryInput,cityInput,addressInput);
        // console.log("user obj within func");
        // console.log(newuser)
        getDataFromLocalStorage();
        console.log(users_list);

        added(newuser);
        // console.log(users_list);
        // getDataFromLocalStorage();


      
    }
    
}
// console.log("out func")

console.log(users_list);
// getDataFromLocalStorage();
class Users {
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
}

// class that represents one user only
class User {
    constructor(firstName, lastName, emailAddress, passWord, country, city, shippingAddr) {
        // this.id = ecommerceUsers.usersList.length + 1;
        // this.id = emailAddress;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.passWord = passWord;
        // this.phoneNumber = phoneNumber;
        this.shippingAddr = shippingAddr;
        this.country = country;
        this.city = city;
        this.cookieToken = "Z3JvdXAyQGl0aS5nb3YuZWc6QWRtaW5AMTIzNA==";
        this.ordersList = [];
        this.cart = {
            prodsCount: 0,
            prodsPrice: 0,
            prodsList: [],
        };
    }
}


function addTaskToArray(taskText) {
    // Task Data
    const task = {
      id: Date.now(),
      title: taskText,
      completed: false,
    };
    // Push Task To Array Of Tasks
    users_list.push(task);
    // Add Tasks To Page
    addElementsToPageFrom(arrayOfTasks);
    // Add Tasks To Local Storage
    addDataToLocalStorageFrom(arrayOfTasks);
  }

function addUser(user_arr) {
    window.localStorage.setItem("tasks", JSON.stringify(user_arr));
  }
  
  function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
      let tasks = JSON.parse(data);
    //   addElementsToPageFrom(tasks);
    // users_list.push(tasks)
    console.log(tasks);
    console.log(typeof(tasks));
    users_list = tasks;
    }
  }
  


function added(newuser){
    
    users_list.push(newuser);
        console.log(users_list);
        addUser(users_list);
}
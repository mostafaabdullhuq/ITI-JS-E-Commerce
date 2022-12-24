// REGEX for first and last name : no numbers or special characters only english letters
let nameRe = /^([a-zA-Z]){2,}$/


let reTest="qa";
// console.log(nameRe.test(reTest))
document.forms[0].onmouseenter = function(e){
    //get inputs
    let firstNameInput = document.querySelector('[name="firstName"]').value;
    let lastNameInput = document.querySelector('[name="lastName"]').value;
    
    //valid var's
    let fnameValid = nameRe.test(firstNameInput);
    let lnameValid = nameRe.test(lastNameInput);

    //test validations
    console.log(fnameValid);
    console.log(lnameValid);

    if(fnameValid===false || lnameValid===false){
        e.preventDefault();
        console.log("faild")
    }
    else{
        console.log("success")

    }
    
    // alert(lastNameInput);
}
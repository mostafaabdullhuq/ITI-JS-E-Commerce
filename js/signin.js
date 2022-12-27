// email validation REGEX
let emailRe =   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
//REGEX for password :  Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
let passRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ ; 


document.forms[0].onmouseenter = function(e){
    let emailInput = document.querySelector('[name="email"]').value;
    let passInput = document.querySelector('[name="pass"]').value;

    let emailValid = emailRe.test(emailInput);
    let passValid = passRe.test(passInput);

    if(emailValid===false || passValid===false){
        e.preventDefault();

    }else{
        checkLocalStorage(emailInput,passInput);

    }
}

function checkLocalStorage(email,pass) {
    let data = window.localStorage.getItem("users");
    if (data) {
        let users = JSON.parse(data);
        for (let index = 0; index < users.length; index++) {
            if(users[index].emailAddress === email){
                console.log('email found!');
                if (users[index].passWord === pass) {
                    console.log('password correct');
                    setCookie(email,pass,100);
                }else{
                    console.log('password incorrect');
                }

            }else{
                console.log('email incorrect');

            }

            
        }
        // console.log(users);
    }
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
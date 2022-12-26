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
// ("zekar@mailinator.com","Pa$$w0rd!");

function checkLocalStorage(email,pass) {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        for (let index = 0; index < tasks.length; index++) {
            // const element = array[index];
            if(tasks[index].emailAddress === email){
                console.log('email found!');
                if (tasks[index].passWord === pass) {
                    console.log('password correct');
                }else{
                    console.log('password incorrect');
                }

            }else{
                console.log('email incorrect');

            }

            
        }
        console.log(tasks);
    // console.log(typeof(tasks));
    // users_list = tasks;
    }
}
//   email , pass

//   if email valid > check pass 

      
/* Start Working on sing up form */
const signup_form = document.querySelector("#form_signup");

signup_form.onsubmit = ()=>{
    // User info is most important, Our resposbility is secure the user data (we encode the user data using btoa method)
    let name = btoa(document.querySelector("#name").value);
    let email = btoa(document.querySelector("#email").value);
    let number = btoa(document.querySelector("#number").value);
    let password = btoa(document.querySelector("#password").value);

    let user_object_data = {username : name, email : email, number : number, password : password};
    let user_text_data = JSON.stringify(user_object_data);

    if( name != "" && email != "" && number != "" && password != ""){
        localStorage.setItem(email,user_text_data);
        let sign_btn = document.querySelector("#sign_btn");
        sign_btn.style.background = "#14b129";
        sign_btn.innerHTML = "<i class='fas fa-check-circle'></i> Sign up successfull !";
        setTimeout(function(){
            sign_btn.style.background = "linear-gradient(to right, #E100FF, #7F00FF)";
            sign_btn.innerText = "Sing Up";
            signup_form.reset();
        },3000);
        return false;
    }
}
/* End Working on sing up form */

/* start Working on email validation*/
let email_inp = document.querySelector("#email");
let sign_btn = document.querySelector("#sign_btn");
email_inp.onchange = function(){
    // Encode the given email for validation 
    let email_value = btoa(document.querySelector("#email").value);
    let warning = document.querySelector("#email_notice");
    if(localStorage.getItem(email_value) != null){ // this email_value is encoded value
        warning.style.display = "block";
        email_inp.style.borderBottomColor = "red";
        sign_btn.style.disabled = true;
        sign_btn.style.background = "#ccc";
    }
    email_inp.onclick = function(){
        email_inp.value = "";
        email_inp.style.borderBottomColor = "#blue";
        warning.style.display = "none";
        sign_btn.style.disabled = false;
    } 
}
/* End Working on email validation*/

/*start Worked on Login form*/
const login_form = document.querySelector("#form_login");
login_form.onsubmit = () => {
    let email = document.querySelector("#login_email");
    let password = document.querySelector("#login_password");
    let login_email_war = document.querySelector("#login_email_warning");
    let login_password_war = document.querySelector("#login_password_warning");
    //start check email is valid or not 
    if (localStorage.getItem(btoa(email.value)) === null) {
        login_email_war.style.display = "block";
        email.style.borderBottomColor = "red";
        // Clear email input box
        email.onclick = function(){
            email.value = "";
            login_email_war.style.display = "none";
            email.style.borderBottomColor = "#ccc";
        }
    } else {
        let text_data = localStorage.getItem(btoa(email.value));
        let object_data = JSON.parse(text_data);
        let correct_email = object_data.email;
        let correct_password = object_data.password;
        // start check password is correct or not
        if (btoa(email.value) === correct_email) {
            if (btoa(password.value) === correct_password) {
                sessionStorage.setItem("user",btoa(email.value));
                window.location.replace("profile/profile.html");
            } else {
                login_password_war.style.display = "block";
                password.style.borderBottomColor = "red";
                // Clear password input box
                password.onclick = function(){
                    password.value = "";
                    login_password_war.style.display = "none";
                    password.style.borderBottomColor = "#ccc";

                }
        // End check password is correct or not
            }
        } 
    }
    //End check email is valid or not 
    return false;
}
/*End Worked on Login form*/

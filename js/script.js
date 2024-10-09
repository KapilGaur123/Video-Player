const login = document.querySelector("#login_link");
const signup = document.querySelector("#signup_link");
const loginBox = document.querySelector(".login");
const signupBox = document.querySelector(".signin");
let para1 = document.getElementById("para1");
let para2 = document.getElementById("para2");

// working on login link when clicked
login.onclick = () => {
    loginBox.style.display = "block";
    signupBox.style.display= "none";
    loginBox.setAttribute("class","animate__animated animate__flipInY");
    para1.style.textAlign = "center";
    signup.style.color = "blue";
    para1.style.margin = "0px 0px 20px 0px";
    signup.style.cursor = "pointer";
};
// working on sign-up link when clicked
signup.onclick = ()=> {
    loginBox.style.display = "none";
    signupBox.style.display = "block";
    signupBox.setAttribute("class","animate__animated animate__flipInY");
    para2.style.textAlign = "center";
    login.style.color = "blue";
    login.style.color = "blue";
    para2.style.margin = "0px 0px 30px 0px";
    login.style.cursor = "pointer";
};
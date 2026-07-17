let email = document.getElementById("email");
let password = document.getElementById("password");
let login = document.getElementById("login");

let getEmail = localStorage.getItem("email");
let getPassword = localStorage.getItem("password");

login.addEventListener("click" , function(e){
    e.preventDefault();
    if(email.value=== "" || password.value === ""){
        alert("please fill data");
    }
    else{
        if(getEmail && getEmail.trim() === email.value.trim() && getPassword && getPassword.trim() === password.value){
            setTimeout ( ()=>{
                window.location = "index.html";
            }, 1500)
        }
        else{
            alert("email or password is wrong");
        }
    }
})
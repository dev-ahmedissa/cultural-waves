let First_Name = document.getElementById("First-Name");
let Last_Name = document.getElementById("Last-Name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let register = document.getElementById("register");

register.addEventListener("click", function (e) {
    e.preventDefault();
    if (
        First_Name.value === "" ||
        Last_Name.value === "" ||
        email.value === "" ||
        password.value === ""
    ) {
        alert("please fill data");
    } else {
        localStorage.setItem("First_Name", First_Name.value);
        localStorage.setItem("Last_Name", Last_Name.value);
        localStorage.setItem("email", email.value);
        localStorage.setItem("password", password.value);
        alert("Saved successfully");

        setTimeout(() => {
        window.location = "login.html"
        }, 1500);
    }
});

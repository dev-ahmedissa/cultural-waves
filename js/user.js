let userInfo = document.querySelector ("#user_info");
let userD = document.querySelector ("#user");
let links = document.querySelector ("#links");

if (localStorage.getItem("First_Name")){
    links.remove();
    userInfo.style.display ="flex";
    userD.innerHTML = localStorage.getItem("First_Name");
}
let logOutBtn = document.querySelector("#Logout");
logOutBtn.addEventListener("click", function (){
    localStorage.clear();
    setTimeout(() => {
        window.location = "login.html";
    } , 1500)
})
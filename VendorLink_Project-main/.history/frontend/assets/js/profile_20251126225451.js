const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    window.location.href = "login.html";
}

document.getElementById("username").innerText = user.name;
document.getElementById("email").innerText = user.email;

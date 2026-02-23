import { loginUser } from "./auth.js";

document.getElementById("loginForm").addEventListener("submit", async(e)=>{
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    const res = await loginUser(email, password);

    if (res.token) {
        localStorage.setItem("token", res.token);
        window.location.href = "index.html";
    } else {
        alert(res.message || "Invalid credentials");
    }
});

import { signupUser } from "./auth.js";

document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    const res = await signupUser(name, email, password);

    if (res.message) {
        alert("Account created successfully!");
        window.location.href = "login.html";
    } else {
        alert(res.error || "Signup failed");
    }
});

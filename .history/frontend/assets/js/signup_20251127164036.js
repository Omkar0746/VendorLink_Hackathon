import { api } from "./api.js";

document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  try {
    await api("/auth/signup", "POST", { name, email, password, role });
    alert("Signup successful! Please log in.");
    window.location.href = "login.html";
  } catch (err) {
    alert(err.message);
  }
});

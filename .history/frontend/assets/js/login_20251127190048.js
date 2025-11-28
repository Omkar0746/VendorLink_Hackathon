// assets/js/login.js
import { api } from "./api.js";

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    const res = await api("/auth/login", "POST", { email, password });

    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.user));

    if (res.user.role === "supplier") {
      window.location.href = "supplier_dashboard.html";
    } else {
      window.location.href = "index.html";
    }
  } catch (err) {
    alert(err.message);
  }
});

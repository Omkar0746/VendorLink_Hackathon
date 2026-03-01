import { api } from "./api.js";
import { initThemeToggle } from "./utils.js";

initThemeToggle();

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    const data = await api("/auth/login", "POST", { email, password });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // Redirect based on role
    if (data.user.role === "supplier") {
      window.location.href = "supplier_dashboard.html";
    } else {
      window.location.href = "marketplace.html";
    }
  } catch (err) {
    alert(err.message);
  }
});

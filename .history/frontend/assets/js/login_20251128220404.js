// assets/js/login.js

import { api } from "./api.js";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const role = document.getElementById("loginRole").value;

  try {
    const res = await api("/auth/login", "POST", {
      email,
      password,
      role,
    });

    // Fix: store id properly
    res.user.id = res.user._id;

    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.user));

    if (res.user.role === "supplier") {
      window.location.href = "supplier_dashboard.html";
    } else {
      window.location.href = "index.html";
    }
  } catch (err) {
    alert(err.message || "Login failed.");
  }
});

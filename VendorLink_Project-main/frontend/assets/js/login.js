// assets/js/login.js

import { api } from "./api.js";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const role = document.getElementById("loginRole").value;

  const btn = e.submitter || document.querySelector("#loginForm button");
  const originalText = btn.textContent;
  btn.textContent = "Logging in...";
  btn.disabled = true;

  try {
    // Try backend login first
    const res = await api("/auth/login", "POST", {
      email,
      password,
      role,
    });

    // Store auth data
    res.user.id = res.user._id;
    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.user));

    // Role-based redirect
    if (role === "supplier") {
      window.location.href = "home.html";
    } else if (role === "vendor") {
      window.location.href = "home.html";
    } else {
      window.location.href = "home.html";
    }

  } catch (err) {
    btn.textContent = originalText;
    btn.disabled = false;

    // Show error
    let errMsg = document.getElementById("loginError");
    if (!errMsg) {
      errMsg = document.createElement("p");
      errMsg.id = "loginError";
      errMsg.className = "text-red-500 text-sm text-center mt-2";
      document.getElementById("loginForm").appendChild(errMsg);
    }
    errMsg.textContent = err.message || "Login failed. Please check your credentials.";
  }
});

// Check if user is already logged in
document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  if (currentUser) {
    if (currentUser.role === "supplier") {
      window.location.href = "home.html";
    } else if (currentUser.role === "vendor") {
      window.location.href = "home.html";
    } else {
      window.location.href = "home.html";
    }
  }
});

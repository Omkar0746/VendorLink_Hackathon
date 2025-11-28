// assets/js/navbar.js
import { getUser, logout, initThemeToggle } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();

  const user = getUser();

  const guestBox = document.getElementById("nav-auth-guest");
  const userBox = document.getElementById("nav-auth-user");
  const supplierLink = document.getElementById("nav-supplier-link");
  const profileLink = document.getElementById("nav-profile-link");
  const usernameSpan = document.getElementById("nav-username");
  const logoutBtn = document.getElementById("nav-logout-btn");

  if (!guestBox || !userBox) return;

  if (user) {
    guestBox.classList.add("hidden");
    userBox.classList.remove("hidden");
    if (profileLink) profileLink.classList.remove("hidden");
    if (usernameSpan) usernameSpan.textContent = user.name || "Account";

    if (supplierLink) {
      if (user.role === "supplier") supplierLink.classList.remove("hidden");
      else supplierLink.classList.add("hidden");
    }

    if (logoutBtn) logoutBtn.addEventListener("click", logout);
  } else {
    guestBox.classList.remove("hidden");
    userBox.classList.add("hidden");
    if (supplierLink) supplierLink.classList.add("hidden");
    if (profileLink) profileLink.classList.add("hidden");
  }
});

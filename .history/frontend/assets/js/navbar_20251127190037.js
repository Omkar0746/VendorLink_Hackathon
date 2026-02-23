// assets/js/navbar.js
import { getUser, logout, initThemeToggle } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();

  const user = getUser();

  const guestBox = document.getElementById("nav-auth-guest");
  const userBox = document.getElementById("nav-auth-user");
  const dashboardLink = document.getElementById("nav-supplier-dashboard");
  const roleSliderWrapper = document.getElementById("roleSliderWrapper");
  const roleText = document.getElementById("roleText");
  const profileBtn = document.getElementById("profileBtn");
  const profileDropdown = document.getElementById("profileDropdown");
  const logoutBtn = document.getElementById("logoutBtn");
  const roleToggle = document.getElementById("roleToggle");

  if (!guestBox || !userBox) return;

  // Not logged in
  if (!user) {
    guestBox.classList.remove("hidden");
    userBox.classList.add("hidden");
    if (dashboardLink) dashboardLink.classList.add("hidden");
    if (roleSliderWrapper) roleSliderWrapper.classList.add("hidden");
    return;
  }

  // Logged in
  guestBox.classList.add("hidden");
  userBox.classList.remove("hidden");

  // Role slider
  if (roleSliderWrapper && roleText && roleToggle) {
    roleSliderWrapper.classList.remove("hidden");
    roleText.textContent = `Logged in as: ${user.role}`;
    roleToggle.checked = user.role === "supplier";
  }

  // Supplier dashboard link
  if (dashboardLink) {
    if (user.role === "supplier") {
      dashboardLink.classList.remove("hidden");
    } else {
      dashboardLink.classList.add("hidden");
    }
  }

  // Profile dropdown
  if (profileBtn && profileDropdown) {
    profileBtn.addEventListener("click", () => {
      profileDropdown.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
        profileDropdown.classList.add("hidden");
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }
});

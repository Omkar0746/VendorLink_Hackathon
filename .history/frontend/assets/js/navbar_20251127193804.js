// assets/js/navbar.js

// === DARK MODE TOGGLE ===
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    );
  });
}

// Apply saved theme
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
}

// === AUTH STATE SETUP ===
const user = JSON.parse(localStorage.getItem("user"));
const guestNav = document.getElementById("nav-auth-guest");
const userNav = document.getElementById("nav-auth-user");
const dashboardLink = document.getElementById("nav-supplier-dashboard");
const profileBtn = document.getElementById("profileBtn");
const profileDropdown = document.getElementById("profileDropdown");
const logoutBtn = document.getElementById("logoutBtn");

if (user) {
  guestNav?.classList.add("hidden");
  userNav?.classList.remove("hidden");

  // Supplier gets dashboard
  if (user.role === "supplier") {
    dashboardLink?.classList.remove("hidden");
  }
}

// Profile dropdown
profileBtn?.addEventListener("click", () => {
  profileDropdown.classList.toggle("hidden");
});

// Logout
logoutBtn?.addEventListener("click", () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.location.href = "index.html";
});

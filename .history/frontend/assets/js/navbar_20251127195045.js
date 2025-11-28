// assets/js/navbar.js

// === THEME ===
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
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
}

// === USER AUTH ===
const user = JSON.parse(localStorage.getItem("user"));

const guestNav = document.getElementById("nav-auth-guest");
const userNav = document.getElementById("nav-auth-user");
const dashboardLink = document.getElementById("nav-supplier-dashboard");
const profileBtn = document.getElementById("profileBtn");
const profileDropdown = document.getElementById("profileDropdown");
const logoutBtn = document.getElementById("logoutBtn");

// Show guest or user navbar
if (user) {
  guestNav?.classList.add("hidden");
  userNav?.classList.remove("hidden");

  if (user.role === "supplier") {
    dashboardLink?.classList.remove("hidden");
  }
} else {
  guestNav?.classList.remove("hidden");
  userNav?.classList.add("hidden");
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

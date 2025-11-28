// ===============================
// NAVBAR INITIALIZATION
// ===============================

// Read logged-in user & token
const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

// Guest & User UI elements
const guestNav = document.getElementById("nav-auth-guest");
const userNav = document.getElementById("nav-auth-user");

const supplierDashboard = document.getElementById("nav-supplier-dashboard");
const roleSliderWrapper = document.getElementById("roleSliderWrapper");
const roleText = document.getElementById("roleText");
const roleToggle = document.getElementById("roleToggle");

// Dropdown Elements
const profileBtn = document.getElementById("profileBtn");
const profileDropdown = document.getElementById("profileDropdown");

// Dark Mode Elements
const themeToggle = document.getElementById("themeToggle");

// ===============================
// CHECK LOGIN STATUS
// ===============================
if (user && token) {
  // Hide guest buttons, show profile
  guestNav.classList.add("hidden");
  userNav.classList.remove("hidden");

  // Role indicator slider
  roleSliderWrapper.classList.remove("hidden");
  roleText.innerText = user.role.toUpperCase();
  roleToggle.checked = user.role === "supplier"; // purely visual

  // Show supplier dashboard nav (if logged as supplier)
  if (user.role === "supplier") {
    supplierDashboard.classList.remove("hidden");
  } else {
    supplierDashboard.classList.add("hidden");
  }

} else {
  // Not logged in — show guest buttons
  guestNav.classList.remove("hidden");
  userNav.classList.add("hidden");
  supplierDashboard.classList.add("hidden");
}

// ===============================
// PROFILE DROPDOWN TOGGLE
// ===============================
profileBtn?.addEventListener("click", () => {
  profileDropdown.classList.toggle("hidden");
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!profileBtn?.contains(e.target) && !profileDropdown?.contains(e.target)) {
    profileDropdown?.classList.add("hidden");
  }
});

// ===============================
// LOGOUT HANDLER
// ===============================
document.getElementById("logoutBtn")?.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "index.html";
});

// ===============================
// DARK MODE TOGGLE
// ===============================
themeToggle?.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");

  const isDark = document.documentElement.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Load saved theme on page load
(function loadTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.documentElement.classList.add("dark");
  }
})();

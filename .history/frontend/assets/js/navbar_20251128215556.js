// Load user from storage
const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

const guestNav = document.getElementById("nav-auth-guest");
const userNav = document.getElementById("nav-auth-user");
const supplierDashboard = document.getElementById("nav-supplier-dashboard");
const roleSliderWrapper = document.getElementById("roleSliderWrapper");
const roleText = document.getElementById("roleText");

// If logged in
if (user && token) {
  guestNav.classList.add("hidden");
  userNav.classList.remove("hidden");

  // supplier dashboard link
  if (user.role === "supplier") {
    supplierDashboard.classList.remove("hidden");
  }

  // show role slider (read-only)
  roleSliderWrapper.classList.remove("hidden");
  roleText.innerText = user.role.toUpperCase();
}

// logout
document.getElementById("logoutBtn")?.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "index.html";
});

// dropdown
const profileBtn = document.getElementById("profileBtn");
const profileDropdown = document.getElementById("profileDropdown");

profileBtn?.addEventListener("click", () => {
  profileDropdown.classList.toggle("hidden");
});

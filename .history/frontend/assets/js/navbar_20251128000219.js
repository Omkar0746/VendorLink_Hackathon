// assets/js/navbar.js

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.createElement("div");

  nav.innerHTML = `
    <nav class="w-full px-10 py-4 bg-white dark:bg-gray-900 shadow-sm flex items-center justify-between">

      <!-- Logo -->
      <a href="index.html" class="text-2xl font-bold text-amber-600">VendorLink</a>

      <!-- Navbar Links -->
      <ul class="flex items-center space-x-8 text-gray-700 dark:text-gray-200 font-medium">
        <li><a href="index.html" class="hover:text-amber-600">Home</a></li>
        <li><a href="marketplace.html" class="hover:text-amber-600">Marketplace</a></li>
        <li><a href="suppliers.html" class="hover:text-amber-600">Suppliers</a></li>
        <li><a href="community.html" class="hover:text-amber-600">Community Hub</a></li>

        <!-- ⭐ New AI Price Button -->
        <li>
          <a href="ai_predict.html" class="hover:text-purple-600 font-semibold">
            🔮 AI Price
          </a>
        </li>

        <li><a href="cart.html" class="hover:text-amber-600">Cart</a></li>
      </ul>

      <!-- Right Side Auth Buttons -->
      <div id="authButtons" class="flex items-center space-x-4"></div>

    </nav>
  `;

  document.body.prepend(nav);

  // -------------------------------
  // AUTHENTICATION STATE HANDLING
  // -------------------------------
  const authBox = document.getElementById("authButtons");
  const loggedUser = JSON.parse(localStorage.getItem("vendorlink_user"));

  if (!loggedUser) {
    // User NOT logged in → Show Login + Sign Up
    authBox.innerHTML = `
      <a href="login.html"
         class="px-5 py-2 border border-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
        Login
      </a>

      <a href="signup.html"
         class="px-5 py-2 bg-amber-600 text-white rounded-xl hover:bg-amber-700 shadow">
        Sign Up
      </a>
    `;
  } else {
    // User Logged In → Show Profile + Logout
    authBox.innerHTML = `
      <a href="${loggedUser.role === "supplier" ? "supplier_dashboard.html" : "profile.html"}"
         class="flex items-center space-x-2">
        <img src="https://avatar.iran.liara.run/public"
             class="w-8 h-8 rounded-full border" />
        <span>${loggedUser.name}</span>
      </a>

      <button id="logoutBtn"
              class="px-5 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 shadow">
        Logout
      </button>
    `;

    // Logout Logic
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("vendorlink_user");
      window.location.href = "index.html";
    });
  }
});

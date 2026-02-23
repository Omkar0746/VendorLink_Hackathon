// assets/js/marketplace.js
import { api } from "./api.js";
import { getUser } from "./utils.js";

const user = getUser();
if (!user) {
  window.location.href = "login.html";
}

const grid = document.getElementById("productGrid");

async function loadProducts() {
  try {
    const products = await api("/products");

    grid.innerHTML = "";

    products.forEach((p) => {
      const card = document.createElement("div");
      card.className =
        "group bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden";

      card.innerHTML = `
        <img src="${p.image || "https://via.placeholder.com/400x250"}"
             class="h-52 w-full object-cover group-hover:scale-105 transition duration-500" />

        <div class="p-4">
          <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">${p.name}</h3>
          <p class="text-amber-600 dark:text-amber-400 font-semibold text-lg mt-1">₹${p.price}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">${p.category || ""}</p>

          <button
            onclick="window.location.href='product.html?id=${p._id}'"
            class="mt-4 w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg text-sm font-semibold">
            View & Order
          </button>
        </div>
      `;

      grid.appendChild(card);
    });
  } catch (err) {
    alert(err.message);
  }
}

loadProducts();

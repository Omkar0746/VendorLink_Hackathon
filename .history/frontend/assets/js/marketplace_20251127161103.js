import { api } from "./api.js";
import { protectPage, logout, initThemeToggle } from "./utils.js";

protectPage("vendor");
initThemeToggle();

document.getElementById("logoutBtn").addEventListener("click", logout);

const grid = document.getElementById("productGrid");

async function loadProducts() {
  try {
    const products = await api("/products");
    grid.innerHTML = "";

    products.forEach(p => {
      const card = document.createElement("div");
      card.className = "bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col";

      card.innerHTML = `
        <img src="${p.image || 'https://via.placeholder.com/300'}"
             class="rounded-lg h-40 w-full object-cover mb-3" />
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">${p.name}</h3>
        <p class="text-amber-600 font-bold mt-1">₹${p.price}</p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">${p.category || ''}</p>
        <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">
          Supplier: ${p.supplier?.name || "N/A"}
        </p>
        <button class="mt-3 bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg text-sm order-btn">
          Order Now
        </button>
      `;

      const btn = card.querySelector(".order-btn");
      btn.addEventListener("click", () => placeOrder(p._id));

      grid.appendChild(card);
    });
  } catch (err) {
    alert(err.message);
  }
}

async function placeOrder(productId) {
  const qty = Number(prompt("Enter quantity:", "1") || "1");
  if (!qty || qty <= 0) return;

  try {
    await api("/orders", "POST", { productId, quantity: qty }, true);
    alert("Order placed successfully!");
  } catch (err) {
    alert(err.message);
  }
}

loadProducts();

// assets/js/suppliers.js
import { api } from "./api.js";

const listEl = document.getElementById("suppliersList");

async function loadSuppliers() {
  try {
    const users = await api("/auth/all-suppliers", "GET"); // NEW ENDPOINT

    listEl.innerHTML = "";

    users.forEach((s) => {
      listEl.innerHTML += `
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 w-full max-w-sm">

          <img src="${s.photo || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}"
               class="h-40 w-full object-cover rounded-lg mb-3">

          <h2 class="text-lg font-bold">${s.shopName || s.name}</h2>
          <p class="text-sm text-gray-500">${s.category || ''}</p>

          <p class="text-sm text-gray-600 mt-1">
            📍 ${s.location || "No location provided"}
          </p>

          <button
            onclick="window.location.href='supplier_profile.html?id=${s._id}'"
            class="mt-4 w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg">
            Contact Supplier
          </button>

        </div>
      `;
    });
  } catch (err) {
    listEl.innerHTML = `<p class="text-red-500">Failed to load suppliers.</p>`;
  }
}

loadSuppliers();

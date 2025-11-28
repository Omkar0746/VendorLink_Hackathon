import { api } from "./api.js";
import { requireVendor } from "./protect.js";

requireVendor();

const listEl = document.getElementById("ordersList");

async function loadOrders() {
  try {
    const orders = await api("/orders/vendor", "GET", null, true);

    if (orders.length === 0) {
      listEl.innerHTML = `<p class="text-gray-500">No orders yet.</p>`;
      return;
    }

    listEl.innerHTML = "";

    orders.forEach((o) => {
      listEl.innerHTML += `
        <div class="bg-white shadow rounded-xl p-4">

          <h2 class="font-bold mb-1">Order ID: ${o._id}</h2>
          <p class="text-sm text-gray-500 mb-3">
            Supplier: <b>${o.supplierId.shopName || o.supplierId.name}</b>
          </p>

          <ul class="mb-3">
            ${o.items
              .map(
                (item) => `
              <li class="text-sm">
                ${item.name} × ${item.quantity} — ₹${item.price * item.quantity}
              </li>
            `
              )
              .join("")}
          </ul>

          <p class="font-semibold">Total: ₹${o.totalAmount}</p>
          <p class="text-sm text-gray-600">Status: ${o.status}</p>

        </div>
      `;
    });
  } catch (err) {
    listEl.innerHTML = `<p class="text-red-500">Error loading orders.</p>`;
  }
}

loadOrders();

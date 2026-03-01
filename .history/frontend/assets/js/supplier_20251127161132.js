import { api } from "./api.js";
import { protectPage, logout, initThemeToggle } from "./utils.js";

protectPage("supplier");
initThemeToggle();

document.getElementById("logoutBtn").addEventListener("click", logout);

const addForm = document.getElementById("addProductForm");
const tableBody = document.getElementById("productTable");

async function loadAnalytics() {
  try {
    const data = await api("/orders/supplier/analytics", "GET", null, true);
    document.getElementById("totalOrders").textContent = data.totalOrders;
    document.getElementById("revenue").textContent = "₹" + data.revenue;
  } catch (err) {
    console.warn("Analytics error:", err.message);
  }
}

async function loadProducts() {
  try {
    const products = await api("/products/me/list", "GET", null, true);
    tableBody.innerHTML = "";
    products.forEach(p => {
      const tr = document.createElement("tr");
      tr.className = "text-gray-700 dark:text-gray-200";

      tr.innerHTML = `
        <td class="py-2">${p.name}</td>
        <td class="py-2">₹${p.price}</td>
        <td class="py-2">${p.category || ""}</td>
        <td class="py-2 space-x-2">
          <button class="text-blue-500 text-xs edit-btn">Edit</button>
          <button class="text-red-500 text-xs delete-btn">Delete</button>
        </td>
      `;

      tr.querySelector(".edit-btn").addEventListener("click", () => editProduct(p));
      tr.querySelector(".delete-btn").addEventListener("click", () => deleteProduct(p._id));

      tableBody.appendChild(tr);
    });
  } catch (err) {
    alert(err.message);
  }
}

addForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const body = {
    name: document.getElementById("pName").value.trim(),
    price: Number(document.getElementById("pPrice").value),
    image: document.getElementById("pImage").value.trim(),
    category: document.getElementById("pCategory").value.trim()
  };

  try {
    await api("/products", "POST", body, true);
    addForm.reset();
    await loadProducts();
    await loadAnalytics();
    alert("Product added");
  } catch (err) {
    alert(err.message);
  }
});

async function editProduct(p) {
  const name = prompt("New name:", p.name) || p.name;
  const price = Number(prompt("New price:", p.price) || p.price);
  const category = prompt("New category:", p.category || "") || p.category;

  try {
    await api(`/products/${p._id}`, "PUT", { name, price, category }, true);
    await loadProducts();
    alert("Updated");
  } catch (err) {
    alert(err.message);
  }
}

async function deleteProduct(id) {
  if (!confirm("Delete this product?")) return;
  try {
    await api(`/products/${id}`, "DELETE", null, true);
    await loadProducts();
    await loadAnalytics();
  } catch (err) {
    alert(err.message);
  }
}

loadProducts();
loadAnalytics();

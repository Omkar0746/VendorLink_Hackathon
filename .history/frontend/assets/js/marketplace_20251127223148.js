// assets/js/marketplace.js
import { api } from "./api.js";

// DOM Elements
const productListEl = document.getElementById("productList");
const searchBarEl = document.getElementById("searchBar");
const categoryChipsEl = document.getElementById("categoryChips");
const priceMinEl = document.getElementById("priceMin");
const priceMaxEl = document.getElementById("priceMax");
const supplierSelectEl = document.getElementById("supplierSelect");
const ratingSelectEl = document.getElementById("ratingSelect");
const inStockOnlyEl = document.getElementById("inStockOnly");
const sortSelectEl = document.getElementById("sortSelect");
const clearFiltersEl = document.getElementById("clearFilters");
const tagFilterInputs = document.querySelectorAll(".tagFilterInput");

let allProducts = [];
let filteredProducts = [];

// Render products
function renderProducts(list) {
  productListEl.innerHTML = "";

  if (!list.length) {
    productListEl.innerHTML = `<p class="text-sm text-gray-500">No products found.</p>`;
    return;
  }

  list.forEach((p) => {
    const tags = (p.tags || [])
      .map((t) => `<span class="tag-pill">${t}</span>`)
      .join("");

    productListEl.innerHTML += `
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col">
        
        <img src="${p.image}" class="rounded-xl h-40 w-full object-cover mb-4">

        <div class="flex justify-between items-start mb-1">
          <h2 class="text-lg font-semibold">${p.name}</h2>
          <span class="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg">
            ★ ${p.rating}
          </span>
        </div>

        <p class="text-xs text-gray-500">${p.category}</p>

        <p class="mt-2 text-xl font-bold text-amber-600">₹${p.price}/kg</p>

        <p class="text-xs mt-1 text-gray-500">Supplier: 
          <button class="underline text-blue-600"
            onclick="viewSupplier('${p.supplierId}')">
            ${p.supplierName}
          </button>
        </p>

        <span class="badge-stock ${p.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"} mt-2">
          ${p.inStock ? "In Stock" : "Out of Stock"}
        </span>

        <div class="mt-2">${tags}</div>

        <button
          onclick="addToCart('${p.name}', ${p.price})"
          class="mt-auto w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg text-sm mt-4">
          Add to Cart
        </button>

      </div>
    `;
  });
}

// View supplier profile
window.viewSupplier = (supplierId) => {
  window.location.href = `supplier_profile.html?id=${supplierId}`;
};

// Add to cart
window.addToCart = (name, price) => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push({ name, price, qty: 1 });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
};

// Apply filters
function applyFilters() {
  let list = [...allProducts];

  const q = searchBarEl.value.toLowerCase();
  if (q) list = list.filter((p) => p.name.toLowerCase().includes(q));

  const activeChip = categoryChipsEl.querySelector(".filter-chip.active");
  const selectedCategory = activeChip?.dataset.category || "all";
  if (selectedCategory !== "all") {
    list = list.filter((p) => p.category === selectedCategory);
  }

  const min = Number(priceMinEl.value);
  const max = Number(priceMaxEl.value);
  if (min) list = list.filter((p) => p.price >= min);
  if (max) list = list.filter((p) => p.price <= max);

  const supplier = supplierSelectEl.value;
  if (supplier) list = list.filter((p) => p.supplierName === supplier);

  const minRating = Number(ratingSelectEl.value);
  if (minRating) list = list.filter((p) => p.rating >= minRating);

  if (inStockOnlyEl.checked) {
    list = list.filter((p) => p.inStock === true);
  }

  const selectedTags = [...tagFilterInputs]
    .filter((i) => i.checked)
    .map((i) => i.value);
  if (selectedTags.length) {
    list = list.filter((p) =>
      selectedTags.every((t) => p.tags.includes(t))
    );
  }

  const sortVal = sortSelectEl.value;
  if (sortVal === "low") list.sort((a, b) => a.price - b.price);
  else if (sortVal === "high") list.sort((a, b) => b.price - a.price);

  filteredProducts = list;
  renderProducts(filteredProducts);
}

// Event Listeners
searchBarEl.addEventListener("input", applyFilters);
priceMinEl.addEventListener("input", applyFilters);
priceMaxEl.addEventListener("input", applyFilters);
supplierSelectEl.addEventListener("change", applyFilters);
ratingSelectEl.addEventListener("change", applyFilters);
inStockOnlyEl.addEventListener("change", applyFilters);
sortSelectEl.addEventListener("change", applyFilters);

categoryChipsEl.addEventListener("click", (e) => {
  if (!e.target.classList.contains("filter-chip")) return;

  categoryChipsEl.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
  e.target.classList.add("active");

  applyFilters();
});

tagFilterInputs.forEach((i) => i.addEventListener("change", applyFilters));

clearFiltersEl.addEventListener("click", () => {
  searchBarEl.value = "";
  priceMinEl.value = "";
  priceMaxEl.value = "";
  supplierSelectEl.value = "";
  ratingSelectEl.value = "";
  sortSelectEl.value = "";
  inStockOnlyEl.checked = false;

  tagFilterInputs.forEach((i) => (i.checked = false));

  categoryChipsEl.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
  categoryChipsEl.querySelector("[data-category='all']").classList.add("active");

  applyFilters();
});

// INITIAL LOAD
async function init() {
  try {
    const dbProducts = await api("/products", "GET");

    allProducts = dbProducts.map((p) => ({
      name: p.name,
      category: p.category,
      price: p.price,
      image: p.image || "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
      supplierName: p.supplier?.name || "Supplier",
      supplierId: p.supplier?._id || "",
      supplierPhone: p.supplier?.contactNumber || "",
      supplierLocation: p.supplier?.location || "",
      inStock: p.inStock ?? true,
      rating: p.rating || 4.2,
      tags: Array.isArray(p.tags) ? p.tags : []
    }));

    // Supplier filter dropdown
    const uniqueSuppliers = [...new Set(allProducts.map((p) => p.supplierName))];
    uniqueSuppliers.forEach((name) => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      supplierSelectEl.appendChild(opt);
    });

    filteredProducts = [...allProducts];
    renderProducts(filteredProducts);
  } catch (error) {
    productListEl.innerHTML = `<p class="text-red-500">Failed to load products.</p>`;
  }
}

init();

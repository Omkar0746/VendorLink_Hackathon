// assets/js/marketplace.js
import { api } from "./api.js";

// DOM elements
const productListEl      = document.getElementById("productList");
const searchBarEl        = document.getElementById("searchBar");
const categoryChipsEl    = document.getElementById("categoryChips");
const priceMinEl         = document.getElementById("priceMin");
const priceMaxEl         = document.getElementById("priceMax");
const supplierSelectEl   = document.getElementById("supplierSelect");
const ratingSelectEl     = document.getElementById("ratingSelect");
const inStockOnlyEl      = document.getElementById("inStockOnly");
const sortSelectEl       = document.getElementById("sortSelect");
const clearFiltersEl     = document.getElementById("clearFilters");
const tagFilterInputs    = document.querySelectorAll(".tagFilterInput");

let allProducts = [];
let filteredProducts = [];

// Render
function renderProducts(list) {
  productListEl.innerHTML = "";

  if (!list.length) {
    productListEl.innerHTML = `<p class="text-sm text-gray-500">No products match your filters.</p>`;
    return;
  }

  list.forEach((p) => {
    const tagsHTML = (p.tags || [])
      .map((t) => `<span class="tag-pill">${t}</span>`)
      .join("");

    productListEl.innerHTML += `
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col">
        <img src="${p.image}" class="rounded-xl h-40 w-full object-cover mb-4">

        <div class="flex justify-between items-start mb-1">
          <h2 class="text-lg font-semibold">${p.name}</h2>
          <span class="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg">
            ★ ${p.rating.toFixed(1)}
          </span>
        </div>

        <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">${p.category}</p>

        <p class="text-xl font-bold text-amber-600 mb-1">₹${p.price}/kg</p>

        <div class="flex items-center justify-between mb-2">
          <span class="text-xs text-gray-500">Supplier: ${p.supplierName}</span>
          <span class="badge-stock ${p.inStock ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}">
            ${p.inStock ? "In stock" : "Out of stock"}
          </span>
        </div>

        <div class="mb-3">${tagsHTML}</div>

        <button
          onclick="openModal('${p.supplierName}','${p.supplierPhone}','${p.supplierLocation}')"
          class="text-xs text-blue-600 underline mb-2 text-left">
          View supplier details
        </button>

        <button
          onclick="addToCart('${p.name}', ${p.price})"
          class="mt-auto w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg text-sm">
          Add to Cart
        </button>
      </div>
    `;
  });
}

// Apply all filters + sort
function applyFilters() {
  let list = [...allProducts];

  const q = searchBarEl.value.trim().toLowerCase();
  if (q) {
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  const activeChip = categoryChipsEl.querySelector(".filter-chip.active");
  const activeCategory = activeChip ? activeChip.dataset.category : "all";
  if (activeCategory !== "all") {
    list = list.filter((p) => p.category === activeCategory);
  }

  const min = Number(priceMinEl.value);
  const max = Number(priceMaxEl.value);
  if (!isNaN(min) && min > 0) list = list.filter((p) => p.price >= min);
  if (!isNaN(max) && max > 0) list = list.filter((p) => p.price <= max);

  const supplier = supplierSelectEl.value;
  if (supplier) list = list.filter((p) => p.supplierName === supplier);

  const minRating = Number(ratingSelectEl.value);
  if (minRating) list = list.filter((p) => p.rating >= minRating);

  if (inStockOnlyEl.checked) list = list.filter((p) => p.inStock);

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

// Add to cart
window.addToCart = (name, price) => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push({ name, price, qty: 1 });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
};

// Supplier modal
window.openModal = (name, phone, location) => {
  document.getElementById("modalSupplierName").textContent = name;
  document.getElementById("modalSupplierPhone").textContent =
    "📞 " + (phone || "Not provided");
  document.getElementById("modalSupplierLocation").textContent =
    "📍 " + (location || "Not provided");
  document.getElementById("contactModal").classList.remove("hidden");
};
window.closeModal = () => {
  document.getElementById("contactModal").classList.add("hidden");
};

// Event listeners
searchBarEl.addEventListener("input", applyFilters);
priceMinEl.addEventListener("input", applyFilters);
priceMaxEl.addEventListener("input", applyFilters);
supplierSelectEl.addEventListener("change", applyFilters);
ratingSelectEl.addEventListener("change", applyFilters);
inStockOnlyEl.addEventListener("change", applyFilters);
sortSelectEl.addEventListener("change", applyFilters);

categoryChipsEl.addEventListener("click", (e) => {
  if (!e.target.classList.contains("filter-chip")) return;
  categoryChipsEl
    .querySelectorAll(".filter-chip")
    .forEach((c) => c.classList.remove("active"));
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
  inStockOnlyEl.checked = false;
  sortSelectEl.value = "";
  tagFilterInputs.forEach((i) => (i.checked = false));
  categoryChipsEl
    .querySelectorAll(".filter-chip")
    .forEach((c) => c.classList.remove("active"));
  categoryChipsEl
    .querySelector("[data-category='all']")
    .classList.add("active");
  applyFilters();
});

// Init: fetch products from backend
async function init() {
  try {
    const apiProducts = await api("/products", "GET");

    allProducts = apiProducts.map((p) => ({
      name: p.name,
      category: p.category,
      price: p.price,
      image:
        p.image ||
        "https://images.unsplash.com/photo-1580915411954-282cb1c9c450",
      supplierName: p.supplier?.name || "Supplier",
      supplierPhone: p.supplier?.phone || "",
      supplierLocation: p.supplier?.location || "",
      rating: p.rating || 4.0,
      inStock:
        typeof p.inStock === "boolean" ? p.inStock : true,
      tags: Array.isArray(p.tags) ? p.tags : [],
    }));

    // init supplier dropdown
    const uniqueSuppliers = [...new Set(allProducts.map((p) => p.supplierName))];
    uniqueSuppliers.forEach((name) => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      supplierSelectEl.appendChild(opt);
    });

    filteredProducts = [...allProducts];
    renderProducts(filteredProducts);
  } catch (err) {
    productListEl.innerHTML =
      "<p class='text-red-500 text-sm'>Failed to load products: " +
      err.message +
      "</p>";
  }
}

init();

import { api } from "./api.js";

const urlParams = new URLSearchParams(window.location.search);
const supplierId = urlParams.get("id");

const supplierCard = document.getElementById("supplierCard");
const supplierName = document.getElementById("supplierName");
const supplierEmail = document.getElementById("supplierEmail");
const supplierLocation = document.getElementById("supplierLocation");
const supplierDescription = document.getElementById("supplierDescription");
const supplierRating = document.getElementById("supplierRating");
const supplierImage = document.getElementById("supplierImage");
const contactBtn = document.getElementById("contactBtn");
const productList = document.getElementById("productList");

// Modal
const modal = document.getElementById("contactModal");
const modalName = document.getElementById("modalName");
const modalPhone = document.getElementById("modalPhone");

window.closeModal = () => {
  modal.classList.add("hidden");
};

async function loadSupplier() {
  try {
    const data = await api(`/suppliers/${supplierId}`, "GET");

    const { supplier, products } = data;

    supplierCard.classList.remove("hidden");

    supplierName.textContent = supplier.name;
    supplierEmail.textContent = supplier.email || "Not Provided";
    supplierLocation.textContent =
      supplier.location || "Location not available";

    supplierDescription.textContent =
      supplier.description || "Reliable raw materials supplier on VendorLink.";

    supplierRating.textContent = `★ ${supplier.rating || "4.4"} (Trusted seller)`;

    // Profile photo if added later
    if (supplier.photo) supplierImage.src = supplier.photo;

    // Contact button
    contactBtn.onclick = () => {
      modalName.textContent = supplier.name;
      modalPhone.textContent =
        "📞 " + (supplier.contactNumber || "Not provided");
      modal.classList.remove("hidden");
    };

    // Render products
    products.forEach((p) => {
      productList.innerHTML += `
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
          <img src="${p.image}"
               class="h-40 w-full object-cover rounded-lg" />

          <h3 class="mt-3 text-lg font-semibold">${p.name}</h3>
          <p class="text-sm text-gray-500">${p.category}</p>
          <p class="mt-1 text-amber-600 font-bold">₹${p.price}</p>

          <button
            onclick="addToCart('${p.name}', ${p.price})"
            class="mt-4 w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg">
            Add to Cart
          </button>
        </div>
      `;
    });
  } catch (err) {
    console.error(err);
    alert("Supplier not found.");
  }
}

window.addToCart = (name, price) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price, qty: 1 });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
};

loadSupplier();

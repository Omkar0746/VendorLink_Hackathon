const API = "http://localhost:5000/api/suppliers";

// -----------------------------
// LOAD SUPPLIER LIST
// -----------------------------
async function loadSupplierList() {
  const res = await fetch(API);
  const suppliers = await res.json();

  const container = document.getElementById("supplierList");
  container.innerHTML = "";

  suppliers.forEach(s => {
    container.innerHTML += `
      <div class="bg-white dark:bg-gray-800 p-5 rounded-xl shadow border hover:scale-[1.01] transition cursor-pointer"
           onclick="window.location.href='suppliers.html?id=${s._id}'">

        <img src="${s.image || 'https://via.placeholder.com/200'}"
             class="w-full h-40 object-cover rounded-lg mb-3"/>

        <h3 class="font-bold text-lg">${s.shopName || s.name}</h3>
        <p class="text-gray-500 dark:text-gray-400">📍 ${s.location}</p>

        <p class="text-amber-600 mt-2 font-semibold">⭐ ${s.rating || "4.5"}</p>
      </div>
    `;
  });
}

// -----------------------------
// LOAD SUPPLIER PROFILE
// -----------------------------
async function loadSupplierProfile(id) {
  const res = await fetch(`${API}/${id}`);
  const s = await res.json();

  document.getElementById("shopName").innerText = s.shopName || s.name;
  document.getElementById("location").innerText = s.location;
  document.getElementById("contact").innerText = s.contactNumber || "Not Available";
  document.getElementById("rating").innerText = s.rating || "4.5";
  document.getElementById("profileImage").src = s.image || "https://via.placeholder.com/200";

  // Hide list, show profile
  document.getElementById("supplierList").classList.add("hidden");
  document.getElementById("supplierProfile").classList.remove("hidden");
  document.getElementById("pageTitle").innerText = "Supplier Profile";
}

// -----------------------------
// PAGE LOGIC
// -----------------------------

const urlParams = new URLSearchParams(window.location.search);
const supplierId = urlParams.get("id");

if (supplierId) {
  loadSupplierProfile(supplierId);
} else {
  loadSupplierList();
}

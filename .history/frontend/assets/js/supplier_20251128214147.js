async function loadSuppliers() {
  try {
    const res = await fetch("http://localhost:5000/api/suppliers");
    const suppliers = await res.json();

    const container = document.getElementById("supplierList");
    container.innerHTML = "";

    if (!suppliers.length) {
      container.innerHTML = `<p class='text-gray-500'>No suppliers available.</p>`;
      return;
    }

    suppliers.forEach(s => {
      container.innerHTML += `
        <div class="bg-white shadow-md rounded-xl p-4 cursor-pointer"
             onclick="window.location.href='supplier_profile.html?id=${s._id}'">

          <img src="${s.image || 'https://via.placeholder.com/400'}"
               class="w-full h-40 object-cover rounded-lg">

          <h2 class="mt-3 text-xl font-semibold">${s.shopName || s.name}</h2>

          <p class="text-gray-600">${s.location || "Location not available"}</p>

          <p class="text-yellow-600 font-semibold mt-1">⭐ ${s.rating || "4.5"}</p>

        </div>
      `;
    });

  } catch (err) {
    console.error(err);
  }
}

loadSuppliers();

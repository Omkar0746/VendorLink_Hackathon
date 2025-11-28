import { api } from "./api.js";

async function loadMarketplace() {
    const products = await api("/products");

    const container = document.getElementById("market-container");
    container.innerHTML = "";

    products.forEach(p => {
        container.innerHTML += `
            <div class="bg-white shadow-lg rounded-xl p-4 hover:scale-105 transition cursor-pointer"
                 onclick="window.location.href='product.html?id=${p._id}'">
                <img src="${p.image}" class="rounded-xl h-40 w-full object-cover"/>
                <h2 class="text-lg font-semibold mt-3">${p.name}</h2>
                <p class="text-gray-600">₹${p.price}</p>
            </div>
        `;
    });
}

loadMarketplace();

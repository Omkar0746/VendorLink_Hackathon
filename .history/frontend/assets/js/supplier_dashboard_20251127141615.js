document.getElementById("addProductForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/products/create", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ name, price, image }),
    });

    const data = await res.json();

    if (res.ok) {
        alert("Product added!");
        loadProducts();
    } else {
        alert(data.error || "Failed to add product");
    }
});

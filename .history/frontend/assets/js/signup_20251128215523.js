document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  // supplier fields
  const shopName = document.getElementById("shopName")?.value || null;
  const contactNumber = document.getElementById("contactNumber")?.value || null;
  const location = document.getElementById("location")?.value || null;

  const payload = {
    name,
    email,
    password,
    role,
    shopName: role === "supplier" ? shopName : null,
    contactNumber: role === "supplier" ? contactNumber : null,
    location: role === "supplier" ? location : null
  };

  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Registration failed");
      return;
    }

    alert("Registration successful! Please login.");
    window.location.href = "login.html";

  } catch (err) {
    console.error("Signup Error:", err);
  }
});

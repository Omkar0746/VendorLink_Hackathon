document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        console.log("Login Response:", data);

        if (res.ok) {
            localStorage.setItem("token", data.token);
            alert("Login successful!");
            window.location.href = "index.html"; 
        } else {
            alert(data.message || "Invalid credentials!");
        }
    } catch (err) {
        console.error("Login error:", err);
        alert("Server error!");
    }
});

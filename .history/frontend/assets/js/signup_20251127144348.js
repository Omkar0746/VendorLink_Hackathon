document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
        const res = await fetch("http://localhost:5000/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();
        console.log("Signup Response:", data);

        if (res.ok) {
            alert("Signup successful!");
            window.location.href = "login.html";
        } else {
            alert(data.message || data.error || "Signup failed!");
        }
    } catch (err) {
        console.error("Signup error:", err);
        alert("Server error!");
    }
});

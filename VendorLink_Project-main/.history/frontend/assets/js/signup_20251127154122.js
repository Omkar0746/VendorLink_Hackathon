document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const res = await fetch("http://localhost:5000/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();
        console.log("Signup response:", data);

        if (res.ok) {
            alert("Account created successfully!");
            window.location.href = "login.html";
        } else {
            alert(data.error || "Signup failed!");
        }
    } catch (err) {
        alert("Server error. Please try again.");
    }
});

document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
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
            alert(data.message || data.error);
        }
    } catch (err) {
        console.error("Signup Error:", err);
        alert("Something went wrong!");
    }
});

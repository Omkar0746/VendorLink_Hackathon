// frontend/js/signup.js
document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  try {
    const res = await apiFetch('/auth/signup', {
      method: 'POST',
      body: { name, email, password, role },
      auth: false
    });

    // Save token + user locally
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));

    // Redirect to supplier dashboard if supplier, else to index
    if (res.user.role === 'supplier') {
      window.location.href = 'supplier_dashboard.html';
    } else {
      window.location.href = 'index.html';
    }
  } catch (err) {
    console.error(err);
    alert(err.data?.message || 'Signup failed');
  }
});

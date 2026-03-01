// js/login.js
async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    // redirect to profile or supplier dashboard based on role:
    if (data.user.role === 'supplier') window.location.href = 'supplier_dashboard.html';
    else window.location.href = 'profile.html';
  } catch (err) {
    alert('Login error: ' + err.message);
  }
}

document?.getElementById('loginForm')?.addEventListener('submit', handleLogin);

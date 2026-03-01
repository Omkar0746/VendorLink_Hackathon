// js/signup.js
import { saveAuth } from './auth.js';
import { apiFetch } from './api-wrapper.js'; // if you want to wrap apiFetch as named export

// simpler: assuming apiFetch exported as global — below I will show non-module version too.
async function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  try {
    const result = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ name, email, password, role: 'supplier' })
    });
    const data = await result.json();
    if (!result.ok) throw new Error(data.message || 'Signup failed');
    // store token and user
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    // redirect (adjust according to your HTML)
    window.location.href = 'supplier_dashboard.html';
  } catch (err) {
    alert('Signup error: ' + err.message);
  }
}

document?.getElementById('signupForm')?.addEventListener('submit', handleSignup);

// assets/js/profile.js
import { apiFetch, getUser, clearAuth } from './api.js';

async function loadProfile() {
  // Try to GET /auth/me to get latest user data
  const { status, data } = await apiFetch('/auth/me', { method: 'GET' });
  if (status === 200) {
    const user = data;
    document.getElementById('name').innerText = user.name || '';
    document.getElementById('email').innerText = user.email || '';
    document.getElementById('role').innerText = user.role || '';
  } else {
    // if unauthorized, fallback to localStorage user
    const userLocal = getUser();
    if (!userLocal) {
      alert('Please login');
      window.location.href = 'login.html';
    } else {
      document.getElementById('name').innerText = userLocal.name || '';
      document.getElementById('email').innerText = userLocal.email || '';
      document.getElementById('role').innerText = userLocal.role || '';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // wire logout button if present
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', () => {
    clearAuth();
    window.location.href = 'index.html';
  });

  loadProfile();
});

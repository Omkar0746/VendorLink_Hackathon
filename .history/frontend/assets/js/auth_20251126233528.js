// assets/js/auth.js
import { apiFetch, saveAuth, clearAuth } from './api.js';

export async function signup(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.querySelector('input[name="name"]').value.trim();
  const email = form.querySelector('input[name="email"]').value.trim();
  const password = form.querySelector('input[name="password"]').value.trim();
  const role = form.querySelector('select[name="role"]') ? form.querySelector('select[name="role"]').value : 'buyer';

  const body = { name, email, password, role };
  const { status, data } = await apiFetch('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(body)
  });

  if (status === 200 || status === 201) {
    // expected response: { token, user }
    saveAuth(data.token, data.user);
    window.location.href = 'profile.html';
  } else {
    alert(data?.message || 'Signup failed');
  }
}

export async function login(event) {
  event.preventDefault();
  const form = event.target;
  const email = form.querySelector('input[name="email"]').value.trim();
  const password = form.querySelector('input[name="password"]').value.trim();

  const { status, data } = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

  if (status === 200) {
    saveAuth(data.token, data.user);
    window.location.href = 'profile.html';
  } else {
    alert(data?.message || 'Login failed');
  }
}

export function logout() {
  clearAuth();
  window.location.href = 'index.html';
}

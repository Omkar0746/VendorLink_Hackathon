// assets/js/api.js
// Change BASE_URL if your backend runs on another URL/port
const BASE_URL = 'http://localhost:5000/api';

export async function apiFetch(path, options = {}) {
  const headers = options.headers || {};
  if (!headers['Content-Type'] && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }
  const token = localStorage.getItem('token');
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const text = await res.text(); // sometimes API returns plain text
  try {
    return { status: res.status, data: text ? JSON.parse(text) : null };
  } catch (e) {
    return { status: res.status, data: text };
  }
}

export function saveAuth(token, user) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export function getUser() {
  const u = localStorage.getItem('user');
  return u ? JSON.parse(u) : null;
}

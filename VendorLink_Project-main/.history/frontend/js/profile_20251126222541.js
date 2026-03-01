// js/profile.js
document.addEventListener('DOMContentLoaded', async () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (!user) { window.location.href = 'login.html'; return; }
  document.getElementById('profileName').innerText = user.name;
  document.getElementById('profileEmail').innerText = user.email;
});

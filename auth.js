document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const msg = document.getElementById('loginMsg');

  msg.textContent = 'Logging in...';
  msg.style.color = '#555';

  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    msg.textContent = data.message;
    msg.style.color = res.ok ? 'green' : 'red';

    if (res.ok) {
      localStorage.setItem('token', data.token);
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    }
  } catch (err) {
    msg.textContent = 'Server error. Try again later.';
    msg.style.color = 'red';
  }
});

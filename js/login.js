function toggleForm() {
  const signInForm = document.getElementById('signInForm');
  const signUpForm = document.getElementById('signUpForm');

  signInForm.classList.toggle('active');
  signUpForm.classList.toggle('active');
}

// Optional: hook up submit handlers to call backend auth endpoints
document.addEventListener('DOMContentLoaded', () => {
  const signIn = document.getElementById('signInForm');
  const signUp = document.getElementById('signUpForm');

  if (signIn) {
    signIn.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = signIn.querySelector('input[type="email"]').value;
      const password = signIn.querySelector('input[type="password"]').value;
      fetch('/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
      }).then(r => r.json()).then(res => {
        if (res.success) {
          window.location.href = 'index.html';
        } else {
          alert(res.message || 'Login failed');
        }
      }).catch(err => { console.error(err); alert('Login error'); });
    });
  }

  if (signUp) {
    signUp.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = signUp.querySelector('input[type="text"]').value;
      const email = signUp.querySelector('input[type="email"]').value;
      const password = signUp.querySelector('input[type="password"]').value;
      fetch('/api/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username, email, password })
      }).then(r => r.json()).then(res => {
        if (res.success) {
          alert('Registered successfully. You can sign in now.');
          toggleForm();
        } else {
          alert(res.message || 'Registration failed');
        }
      }).catch(err => { console.error(err); alert('Register error'); });
    });
  }
});
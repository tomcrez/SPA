document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const signUpForm = document.getElementById('signUpForm');
    const toggleSignUp = document.getElementById('toggleSignUp');
    const toggleLogin = document.getElementById('toggleLogin');

    toggleSignUp.addEventListener('click', function() {
        loginForm.classList.add('hidden');
        signUpForm.classList.remove('hidden');
    });

    toggleLogin.addEventListener('click', function() {
        signUpForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });

    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'user' && password === 'password') {
            alert('Login successful!');
            // Redirect or perform other actions
        } else {
            alert('Invalid username or password.');
        }
    });

    document.getElementById('signUpForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;

        if (newUsername && newPassword) {
            alert('Sign up successful!');
            // Redirect or perform other actions
        } else {
            alert('Please fill in all fields.');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var loginForm = document.getElementById('login-form');
    var signupLink = document.getElementById('signup-link');
    var loginTitle = document.getElementById('login-title'); // Get the login title element
    var dontHaveAccount = document.getElementById('dont-have-account'); // Get the "Don't have an account?" element

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get the username and password from the form
        var username = loginForm.querySelector('#username').value;
        var password = loginForm.querySelector('#password').value;

        // Check if the username and password are correct (replace with your own logic)
        if (username === 'client' && password === 'shopping') {
            // Store the username in sessionStorage
            sessionStorage.setItem('username', username);
            window.location.href = 'home.html';
        } else {
            // Display an error message if login fails (you can customize this)
            alert('Invalid username or password. Please try again.');
        }
    });

    // Add event listener for sign-up link
    signupLink.addEventListener('click', function(event) {
        event.preventDefault(); 
        var signupSection = document.getElementById('signup-section');

        if (signupSection.style.display === 'none' || signupSection.style.display === '') {
            signupSection.style.display = 'block'; 
            loginForm.style.display = 'none'; 
            dontHaveAccount.innerHTML = ''; // Remove the "Don't have an account?" text
            signupLink.textContent = 'Go back to Login'; // Update sign-up link text
            loginTitle.innerHTML = '<h2>Sign Up</h2>'; // Change the text above username to "Sign Up"
        } else {
            signupSection.style.display = 'none'; 
            loginForm.style.display = 'block'; 
            dontHaveAccount.innerHTML = '<span id="dont-have-account">Don\'t have an account?</span>'; // Add back the "Don't have an account?" text
            signupLink.textContent = 'Sign Up'; // Reset sign-up link text
            loginTitle.innerHTML = '<h2>Login</h2>'; // Change the text above username back to "Login"
        }
    });
});

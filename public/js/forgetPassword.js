// forgetPassword.js
function forgetPassword() {
    const email = document.getElementById('email').value;

    // redirects the user to a page where user can input their email for reset of password
    window.location.href = 'password_reset_sent.html';
}


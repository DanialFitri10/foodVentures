// forge_password.js
document.getElementById('forgetPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;

    // Send the email to the server to initiate the password reset process
    // You'll need server-side code to handle this request, such as sending an email with a unique link to reset the password.
    // This example only handles the client-side form submission.

    // Redirect the user to a page indicating that an email has been sent for password reset.
    window.location.href = 'password_reset_sent.html';
});

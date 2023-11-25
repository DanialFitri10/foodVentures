// forgetPassword.js
function forgetPassword() {
    const email = document.getElementById('email').value;

    // sends the email to the server to initiate the password reset process
    // this code only handles the client-side form submission.

    // Redirect the user to a page indicating that an email has been sent for password reset.
    window.location.href = 'password_reset_sent.html';
}

// function sendResetEmail() {
//     const email = document.getElementById('email').value;

//     // Basic email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//         document.getElementById('emailError').textContent = 'Please enter a valid email address.';
//         return;
//     }

//     // Reset error message if email is valid
//     document.getElementById('emailError').textContent = '';

//     // Send email to server for password reset
//     fetch('/resetPassword', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//     })
//         .then(response => {
//             if (response.ok) {
//                 alert('Password reset email sent!');
//             } else {
//                 alert('Failed to send reset email.');
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
// }




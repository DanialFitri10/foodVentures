// // forgetPassword.js
// const nodeMailer = require('nodemailer');

// const html = `
//     <h1>Hello!</h1>
//     <p>This email is for you to reset your password. Thanks!</p>
// `;

// async function forgetPassword() {

//     const transporter = nodeMailer.createTransport({
//         host: "mail.openjavascript.info", // SMTP server address (usually mail.your-domain.com)
//         port: 465, // Port for SMTP (usually 465)
//         secure: true, // Usually true if connecting to port 465
//         auth: {
//             user: "test@openjavascipt.info", // Your email address
//             pass: "NodeMailer123!",
//         }
//     });

//     const info = await transporter.sendMail({
//         from: 'OpenJavaScript <test@javascript.info>',
//         to: 'test2@openjavascript.info',
//         subject: 'Testing, testing, 123',
//         html: html,
//     })

//     console.log("Message sent" + info.messageId);
// }

// forgetPassword()
// .catch(e => console.log(e));

// //function forgetPassword() {
// //    const email = document.getElementById('email').value;

// // redirects the user to a page where user can input their email for reset of password
// //    window.location.href = 'password_reset_sent.html';
// //}

// server.js
const express = require('express');
const nodeMailer = require('nodemailer');
const app = express();
const port = 3000;

app.use(express.json());

const html = `
    <h1>Hello!</h1>
    <p>This email is for you to reset your password. Thanks!</p>
`;

app.post('/send-email', async (req, res) => {
    try {
        const transporter = nodeMailer.createTransport({
            host: "mail.openjavascript.info",
            port: 465,
            secure: true,
            auth: {
                user: "test@openjavascript.info",
                pass: "NodeMailer123!",
            }
        });

        const info = await transporter.sendMail({
            from: 'OpenJavaScript <test@javascript.info>',
            to: 'carasim80@gmail.com', // assuming you pass the email address through the request body
            subject: 'Testing, testing, 123',
            html: html,
        });

        console.log("Message sent" + info.messageId);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending email');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

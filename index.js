var express = require('express');
var bodyParser = require("body-parser");
var app = express();
const PORT = process.env.PORT || 5050
var startPage = "index.html";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// reset password
app.post('/resetPassword', resetPassword);

// app.post('/resetPassword', (req, res) => {
//     const { email } = req.body;

//     // handle sending the reset email using nodemailer
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'your_email@gmail.com',
//             pass: 'your_password'
//         }
//     });

//     const mailOptions = {
//         from: 'your_email@gmail.com',
//         to: email,
//         subject: 'Password Reset',
//         text: 'Instructions to reset your password...'
//     };

//     transporter.sendMail(mailOptions, function(error, info){
//         if (error) {
//             console.log(error);
//             res.status(500).send('Error sending reset email');
//         } else {
//             console.log('Email sent: ' + info.response);
//             res.status(200).send('Reset email sent');
//         }
//     });
// });

const { register, login } = require('./utils/UserUtil')
app.post('/register', register);
app.post('/login', login);
//app.post('/forgetPassword', forgetPassword);


app.use(express.static("./public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/" + startPage);
})
app.listen(PORT, function () {
    console.log(`Demo project at: ${PORT}!`);
});
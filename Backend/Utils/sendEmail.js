// sendResetEmail.js

const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendResetEmail(email, resetToken) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hanushajain04@gmail.com',
            pass: "iooc pkvc ooar pyxr",
        },
    });
// console.log(process.env.EMAIL_USER);
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset',
        text: `Click the following link to reset your password: ${process.env.CLIENT_URL}/reset-password/${resetToken}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Password reset email sent successfully.');
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw error;
    }
}

module.exports = sendResetEmail;

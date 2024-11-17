// smsSender.js
const { text } = require('express');
const nodemailer = require('nodemailer');

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use any email service
    auth: {
        user: "asadsaddiqui101@gmail.com", // Your email
        pass: "cvvv hmaf cfxu fxad",  // Your email password
    },
});

const EmailFuncationality = async (EMAIL, subject, otpArray) => {
    console.log('otpArray', otpArray)
    const recipientEmail = EMAIL;
    const mailOptions = {
        from: "asadsaddiqui101@gmail.com",
        to: recipientEmail,
        subject: subject,
        text: otpArray?.join(' '),
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        if (info) {
            return true

        } else {
            return false
        }
    } catch (error) {
        return false
    }
};

const resetPassword = async (EMAIL, subject) => {
    const recipientEmail = EMAIL;
    const mailOptions = {
        from: process.env.APP_EMAIL,
        to: recipientEmail,
        subject: "Reset Password", 
        text: subject,
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        if (info) {
            return true

        } else {
            return false
        }
    } catch (error) {
        return false
    }
};
module.exports = { EmailFuncationality, resetPassword };
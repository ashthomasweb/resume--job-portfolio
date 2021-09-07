// Nodemailer functions and templates for "Looseleashdog" 

// Dependencies
const nodemailer = require("nodemailer");
const { user_name, user_email, message, } = require('./app.js');


// console.log(user_name);
// Mailer transport object 
var transporter = nodemailer.createTransport({
    host: 'mi3-ts3.a2hosting.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
});

// Templates
function inquiryTemplate() {

    // Do not remove backtick
    let inqTemplate = `

    <div style='max-width: 80%; padding: 30px; border: 1px solid lightgrey; border-radius: 12px; margin: 15px;'>
        <h2>Hi Ash, someone is looking at your portfolio!</h2>
            <p>Below is a copy of the email.</p> 
        <h2>From:</h2>
            <p style='padding: 0 30px;'><strong>${user_name}</strong></p>
        <h2>Email:</h2>
            <p style='padding: 0 30px;'>${user_email}</p>
        <h2>Message:</h2>
            <p style='padding: 0 30px;'>${message}</p>
    </div>
    
    `; // Do not remove backtick

    let output = inqTemplate.replace(/\n/g, "").replace(/\r/g, "<br>");
    return output;
};

function confirmTemplate() {

    // Do not remove backtick
    let confTemplate = `

    <div style='max-width: 80%; padding: 30px; border: 1px solid lightgrey; border-radius: 12px; margin: 15px;'>   
        <h2>Hi ${user_name}, thanks for checking out my portfolio.</h2>
            <p>This is an automatic response confirming that your email was sent. I will reach out to you shortly. Below is a copy of your email.</p> 
            <p>Remember, this is an automatic email and doesn't accept replys.</p>
        <h2>From:</h2>
            <p style='padding: 0 30px;'><strong>${user_name}</strong></p>  
        <h2>Email:</h2>
            <p style='padding: 0 30px;'>${user_email}</p>
        <h2>Message:</h2>
            <p style='padding: 0 30px;'>${message}</p>
    </div>

    `; // Do not remove backtick

    let output = confTemplate.replace(/\n/g, "").replace(/\r/g, "<br>");
    return output;  
};

// Nodemailer email objects
function mailNewInquiry(user_name, user_email, message) {
    return `{"from": "info@ashthomasweb.com",
    "to": "ashthomasweb@gmail.com",
    "subject": "A person is reaching out from your portfolio.",
    "html": "${inquiryTemplate()}"}`;
};

function mailConfirmation(user_name, user_email, message) {
    return `{"from": "info@ashthomasweb.com",
    "to": "${user_email}",
    "subject": "This is your email confirmation from Ash Thomas Web!",
    "html": "${confirmTemplate()}"}`;
};

// Object parsing
let inquiry = JSON.parse(mailNewInquiry(user_name, user_email, message));
let finalConfirm = JSON.parse(mailConfirmation(user_name, user_email, message));

// Exports
module.exports = {
    transporter,
    inquiry,
    finalConfirm,
};

// END of document

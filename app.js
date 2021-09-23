// Server file for "Job-portfolio"

// || Require dependencies 

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
// const fs = require('fs')
// const path = require('path')

// || Assign dependencies 
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


// // Create the path to the lock file
// const lockFile = path.join(__dirname, './lock')

// let isExists = fs.existsSync(lockFile);

// if (isExists) {
//     // The file already exists, exit the process
//     console.log('app already running! exiting...')
//     process.exit()
// } else {
//     // The file does not exist, let's create it
//     fs.writeFileSync(lockFile, '')

//     // Before the application quits, remove the lock file
//     process.on('exit', () => {
//         console.log('exiting and removing lockfile...')
//         fs.unlinkSync(lockFile)
//     })    
// }

// setTimeout( () => {process.exit()}, 3000 )

// Dependencies
const nodemailer = require("nodemailer");

// || Routes 
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post('/', function (req, res) {

    let ifError = false;

    let {
        user_name,
        user_email,
        message
    } = req.body;


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
    
    `;

        let output = inqTemplate.replace(/\n/g, "").replace(/\r/g, "<br>");
        return output;
    };

    function confirmTemplate() {

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

        `;

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


    let userInquiry = transporter.sendMail(inquiry);

    let userConfirm = transporter.sendMail(finalConfirm);

    Promise.all([userInquiry, userConfirm])
        .then(([resultInq, resultConf]) => {
            console.log("Emails sent", resultInq, resultConf);
        })
        .catch((err) => {
            console.log(err);
            ifError = true;
        })
        .finally(() => {
            if (ifError == true) {
                res.json({
                    error: true
                })
            } else {
                res.json({
                    error: false
                })
            }
        });

});

// || Listener compatible with Heroku, Localhost, and A2 - ?potential problem area 

const server = app.listen(0, () => console.log('Server running at port:', server.address().port));


// let port = process.env.PORT;
// // if (port == null || port == "") { 
// //     port = 3000; 
// // };
// app.listen(port, () => console.log(`Server started at port ${port}.`));
// || END Listener 

// END of document
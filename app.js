// Server file for "Job-portfolio"

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const secure = require("ssl-express-www");
const nodemailer = require("nodemailer");
const app = express();
app.use(secure)
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var http = require('http'); //importing http

function wakeUpHerokuApps(input) {
    console.log('hi')
        var options = {
            host: input,
            port: 80,
            path: '/'
        };
        http.get(options, function(res) {
            res.on('data', function(chunk) {
                try {
                    // optional logging... disable after it's working
                    // console.log("HEROKU RESPONSE: " + chunk);
                } catch (err) {
                    console.log(err.message);
                }
            });
        }).on('error', function(err) {
            console.log("Error: " + err.message);
        });
}

const appsToPing = ['wyldgreens.herokuapp.com', 'lumberjack-theme.herokuapp.com']
// const appsToPing = ['at-react--hello-world.herokuapp.com']

app.use(function(req, res, next) {
    appsToPing.forEach( (app) => {
        wakeUpHerokuApps(app);
        setTimeout(() => {
            wakeUpHerokuApps(app)
        }, 1000 * 60 * 29.5)
    })
    next()
} )


// || Routes 
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
}); 

// app.get("/test", function (req, res) {
//     console.log('hi')
//     test()
//     res.send('hidave')
// }); 

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
            transporter.close();
        });

});

// || Listener
let port = process.env.PORT;
if (port == null || port == "") { 
    port = 3000; 
};
app.listen(port, () => console.log(`Server started at port ${port}.`));

// END of document

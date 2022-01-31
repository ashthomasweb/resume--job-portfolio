// Server file for "Job-portfolio"

require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const secure = require("ssl-express-www")
const nodemailer = require("nodemailer")
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2
const http = require('http')
const app = express()
app.use(secure)
app.use(express.static("public"))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

// Middleware to ping Heroku Apps 
const appsToPing = ['wyldgreens.herokuapp.com', 'lumberjack-theme.herokuapp.com']
function wakeUpHerokuApps(input) {
    var options = {
        host: input,
        port: 80,
        path: '/'
    };
    http.get(options, (res) => {
        res.on('data', () => {
            try {} catch (err) {
                console.log(err.message)
            }
        })
    }).on('error', (err) => {
        console.log("Error: " + err.message)
    })
}
app.use((req, res, next) => {
    appsToPing.forEach((app) => {
        wakeUpHerokuApps(app);
        setTimeout(() => {
            wakeUpHerokuApps(app)
        }, 1000 * 60 * 29.5)
    })
    next()
})

// || Routes 
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post('/', async (req, res) => {

    let ifError = false;

    let {
        user_name,
        user_email,
        message
    } = req.body;

    // Mailer transport object 

    const oauth2Client = new OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        'https://developers.google.com/oauthplayground'
    )

    oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN
    })

    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
          if (err) {
            console.log(err)
            reject('Error');
          }
          resolve(token);
        });
      });
    
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            type: 'OAuth2',
            user: process.env.MAIL_USER,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken
        }
    });
  
    // Templates
    function inquiryTemplate() {

        let inqTemplate = `

                <div style='max-width: 80%; padding: 30px; border: 1px solid lightgrey; border-radius: 12px; margin: 15px;'>
                    <h2>Hi Ashley, someone is looking at your portfolio!</h2>
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
        return `{"from": "ashthomasweb@gmail.com",
        "to": "ashthomasweb@gmail.com",
        "subject": "A person is reaching out from your portfolio.",
        "html": "${inquiryTemplate()}"}`;
    };

    function mailConfirmation(user_name, user_email, message) {
        return `{"from": "ashthomasweb@gmail.com",
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
            console.log('error')
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
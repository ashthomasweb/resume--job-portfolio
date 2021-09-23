// Server file for "Job-portfolio"

// || Require dependencies 

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs')
const path = require('path')

// || Assign dependencies 
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


// Create the path to the lock file
const lockFile = path.join(__dirname, './lock')

let isExists = fs.existsSync(lockFile);

if (isExists) {
    // The file already exists, exit the process
    console.log('app already running! exiting...')
    process.exit()
} else {
    // The file does not exist, let's create it
    fs.writeFileSync(lockFile, '')
    
    // Before the application quits, remove the lock file
    process.on('exit', () => {
        console.log('exiting and removing lockfile...')
        fs.unlinkSync(lockFile)
    })    
}

// setTimeout( () => {process.exit()}, 3000 )

// || Routes 
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post('/', function (req, res) {

    let ifError = false;

    const {
        user_name,
        user_email,
        message
    } = req.body;

    module.exports = {
        user_email,
        user_name,
        message
    };

    const {
        transporter,
        inquiry,
        finalConfirm
    } = require('./nodemailer.js');

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

const server = app.listen(0, () => {
    console.log('Server running at port:', server.address().port);
});


// let port = process.env.PORT;
// // if (port == null || port == "") { 
// //     port = 3000; 
// // };
// app.listen(port, () => console.log(`Server started at port ${port}.`));
// || END Listener 

// END of document
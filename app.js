// || Require dependencies 

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

// || Assign dependencies 
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// || Routes 
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post('/', function (req, res) {

    let ifError = false;

    const { user_name, user_email, message } = req.body;

    // console.log(user_email);

    module.exports = { user_email, user_name, message };

    const { transporter, inquiry, finalConfirm } = require('./nodemailer.js');

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
            if ( ifError == true ) {
                res.json({error: true})
            } else {
                res.json({error: false})
            }
        });

});


// || Listener compatible with Heroku, Localhost, and A2
let port = process.env.PORT;
if (port == null || port == "") { 
    port = 3000; 
};
app.listen(port, () => console.log(`Server started at port ${port}.`));
// || END Listener 


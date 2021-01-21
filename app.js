// || Require dependencies 

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

// || Assign dependencies 
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// || Routes 
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post('/', function (req, res) {

    let ifError = false;

    const { user_name, user_email, message } = req.body;

    module.exports = { user_email, user_name, message };

    const { transporter, inquiry, finalConfirm } = require('./nodemailer.js');

    var userInquiry = transporter.sendMail(inquiry);

    var userConfirm = transporter.sendMail(finalConfirm);

    Promise.all([userInquiry, userConfirm])
        .then(([resultInq, resultConf]) => {
            console.log("Emails sent", resultInq, resultConf);
        })
        .catch((err) => {
            console.log(err);
            ifError = true;
        })
        .finally(() => {
            if ( ifError = true ) {
                res.json({sent: true})
            } else {
                res.json({sent: false})
            }
            console.log('hi');
        });

});


// || Listener compatible with Heroku, Localhost, and A2
let port = process.env.PORT;
if (port == null || port == "") { 
    port = 3000; 
};
app.listen(port, () => console.log(`Server started at port ${port}.`));
// || END Listener 


// Server file for "Job-portfolio"

require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const secure = require("ssl-express-www")
const http = require('http')
const app = express()
app.use(secure)
app.use(express.static("public"))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

// Middleware to ping Heroku Apps 
const appsToPing = ['lumberjack-theme.herokuapp.com']
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
        // setTimeout(() => {
        //     wakeUpHerokuApps(app)
        // }, 1000 * 60 * 29.5)
    })
    next()
})

// || Routes 
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

// || Listener
let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
};
app.listen(port, () => console.log(`Server started at port ${port}.`));

// END of document

/* --- Dependencies --- */
const express = require('express');
// const /* variable */ = require(__dirname + /* '/public/js/file.js' */)
/* --- Module Assignments --- */
const app = express();
app.use(express.static('public'));



/* --- Static Route --- */
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});














// || working manual refresh for localhost and ftp-ready 
let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
    console.log('Server started on port 3000.');
}
app.listen(port), function () {};


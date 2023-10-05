const express = require('express');
const serveStatic = require('serve-static');
// ssl certificate setup
const https = require('https');
const fs = require('fs');

var hostname = "3.92.159.83";
var port = 3001;

var app = express();

app.use(function (req, res, next) {
    console.log(req.url);
    console.log(req.method);
    console.log(req.path);
    console.log(req.query.id);

    //Checking the incoming request type from the client
    if (req.method != "GET") {
        res.type('.html');
        var msg = '<html><body>This server only serves web pages with GET request</body></html>';
        res.end(msg);
    } else {
        next();
    }
});

app.use(serveStatic(__dirname + "/public"));

app.get("/", (req, res) => {
    res.sendFile("/public/home.html", { root: __dirname });
});

// get ssl certificate and private key
const privateKey = fs.readFileSync('cert/privateKey.key', 'utf8');
const certificate = fs.readFileSync('cert/certificate.crt', 'utf8');

// https server
const httpsServer = https.createServer(
    {
        key: privateKey,
        cert: certificate
    }, app
);

httpsServer.listen(port, () => {
    console.log(`Server hosted at https://${hostname}:${port}`);
});
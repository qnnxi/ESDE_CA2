const express = require("express");
const cors = require('cors')
const config = require('./src/config/config');
const formData = require('express-form-data');
const https = require('https'); // Add the HTTPS module
const fs = require('fs'); // Required for reading SSL certificate and private key
//const dummyUserFn = require('./src/middlewares/dummyUserFn');

let app = express();
app.use('*', cors());

//Server Settings
const PORT = 5000;
const path = require("path");
const bodyParser = require("body-parser");
const bootstrap = require("./src/bootstrap");

//Parse data with connect-multiparty.
app.use(formData.parse({}));
app.use(formData.format());
app.use(formData.stream());
app.use(formData.union());

//Pug Template Engine
app.set("view engine", "pug");
app.set("views", path.resolve("./src/views"));

//Request Parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Express Router
const router = express.Router();
app.use(router);
const rootPath = path.resolve("./dist");
app.use(express.static(rootPath));
bootstrap(app, router);

//Index Page (Home public page)
router.get('/', (req, res, next) => {
    res.send('<html><title>Backend API system for experimenting security concept</title><body>This project provides only backend API support</body></html>');
    res.end();
});

router.use((err, req, res, next) => {
    if (err) {
        return res.send(err.message);
    }
});

// get ssl certificate and private key
const privateKey = fs.readFileSync('cert/privateKey.key', 'utf8');
const certificate = fs.readFileSync('cert/certificate.crt', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate
};

// Create HTTPS server
const httpsServer = https.createServer(credentials, app);

// Start listening on the HTTPS port
httpsServer.listen(PORT, err => {
    if (err) return console.log(`Cannot Listen on PORT: ${PORT}`);
    console.log(`Server is Listening on: https://3.92.159.83:${PORT}/`);
});

const jwt = require('jsonwebtoken');
const config = require('../config/config');

const verifyTokenFn = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        res.status(403).send(`{"Message":"Not Authorized"}`);
    } else {
        jwt.verify(token, config.JWTKey, (err, decodedPayLoad) => {
            if (err) { // decoding failed
                res.status(403).send(`{"Message":"Not Authorized"}`);
            } else { // decoding success
                next();
            };
        });
    }
}

module.exports = verifyTokenFn;

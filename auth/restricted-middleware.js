const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../api/secret.js");

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) { // token is invalid
                res.status(401).json({ you: "Cant't touch this!" });
                console.log(err);
            } else { // token is valid
                req.jwt = decodedToken;
                next();
            }
        });
    } else {
        res.status(401).json({ none: "shall not pass! We are the knights of ni!" });
    }
};
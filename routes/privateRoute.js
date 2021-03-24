//importing jwt
const jwt = require("jsonwebtoken");

//declaring a function that verify the token we can put it anywhere we want as a middelware
module.exports = function privateRoute(req, res, next) {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("acces denied");
    try {
        const verified = jwt.verify(token, process.env.TOKEN);
        req.user = verified;
        console.log(verified._id);
        next();
    } catch (error) {
        res.status(400).send("Invalid Token");
    }
};

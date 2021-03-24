const router = require("express").Router();
//importing user schema
const User = require("../model/User");
//importing validation function
const { loginValidation } = require("../validation");
//importing bcrypt
const bcrypt = require("bcryptjs");
//importing jwt
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
//configuring dotenv
dotenv.config();

router.post("/", async (req, res) => {
    const validation = loginValidation(req.body);
    //data validation before everything
    //if error returning error and not going further
    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    }
    //
    //
    //verifying if the user exists (login)
    const user = await User.findOne({
        email: req.body.email.toLowerCase(),
    });
    if (!user) return res.status(400).send("Email or password incorrect");
    //
    //
    //comparing passwords
    const passwordIsValid = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (!passwordIsValid) {
        return res.status(400).send("password not valid");
    }
    //everything is good so log in
    //create a token and assign it
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN);
    res.header("auth-token", token).send(token);
});

module.exports = router;

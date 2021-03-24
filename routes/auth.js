const router = require("express").Router();
//importing user schema
const User = require("../model/User");
//importing validation function
const { userValidation } = require("../validation");
//importing bcrypt
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
    const validation = userValidation(req.body);
    //data validation before creating user
    //if error returning error and not going further
    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    }
    //
    //
    //verifying if the email already exists
    const emailExists = await User.findOne({
        email: req.body.email.toLowerCase(),
    });
    if (emailExists) return res.status(400).send("Email Already exists");
    //
    //
    //encrypting password
    const salt = await bcrypt.genSalt(10);
    const hashedPasswort = await bcrypt.hash(req.body.password, salt);
    //
    //creating new user
    const user = new User({
        name: req.body.name,
        email: req.body.email.toLowerCase(), //Making it lower case
        password: hashedPasswort,
    }); // saving the new user
    try {
        const savedUser = await user.save();
        res.send({ savedUser: savedUser.__id }); //don't send the entire user just send the id or the username
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;

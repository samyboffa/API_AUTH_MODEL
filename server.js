//importing dependencies
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
//configuring dotenv
dotenv.config();
//
//
//
//Parsing request must be before importing routes
app.use(express.json());
//
//
//
//importing routes
const authRoute = require("./routes/auth");
const loginRoute = require("./routes/login");
//middelwares routes
app.use("/register", authRoute);
app.use("/login", loginRoute);
//
//example
//exapmle
//exapmle of private route
const verify = require("./routes/privateRoute"); // importing the function that verify token
const User = require("./model/User");
//add it as a middelware
app.get("/posts", verify, async (req, res) => {
    let id = req.user._id;
    console.log(id);
    const currentUser = await User.findOne({ _id: id });
    console.log(currentUser);
});
//
//
//
//
//connecting to database
mongoose
    .connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("connection to database succesfull"))
    .catch((err) => console.log("connection to database error"));

//launching the server
app.listen(3010, console.log("server running"));

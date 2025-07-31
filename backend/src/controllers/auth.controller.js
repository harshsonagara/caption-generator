const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');


async function registerController(req, res) {

    const { username, password } = req.body;

    const existingUser = await userModel.findOne({
        username
    });

    if (existingUser) {
        return res.status(400).json({
            message: "Username already exits",
        });
    }

    const user = await userModel.create({
        username,
        password,
    });

    const token = jwt.sign(
        { userId: user._id }, process.env.JWT_SECRET
    );

    res.cookie("token", token);

    return res.status(201).json({
        message: "User created successfully",
        user,
        token
    });
}

async function loginController(req, res) {

    const { username, password } = req.body;

    const user = await userModel.findOne({
        username,
    });

    if (!user) {
        return res.status(400).json({
            message: "user not found please register"
        });
    }

    const isPasswordvalid = user.password === password;

    if (!isPasswordvalid) {
        return res.status(400).json({
            message: " invalid password"
        });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token);

    res.status(200).json({
        message: "user logged in successfully",
        user: {
            username: user.username,
            id: user._id
        }
    });
}

async function name(params) {

}
module.exports = {
    registerController,
    loginController
}
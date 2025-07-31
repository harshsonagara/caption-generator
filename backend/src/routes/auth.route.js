const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken')
const router = express.Router();

router.post('/register', async (req, res) => {

    const { username, password } = req.body;

    const existingUser = await userModel.findOne({
        username
    });

    if (existingUser) {
        return res.status(409).json({
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
    return res.status(201).json({
        message: "User created successfully",
        user,
        token
    });
});

module.exports = router;
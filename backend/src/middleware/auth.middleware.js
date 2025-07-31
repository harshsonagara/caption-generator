const jwt = require('jsonwebtoken');
const userModel = require('../model/user.model');

async function authMiddleware(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access , please login again",
        });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findOne({
            _id: decode.id
        });

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
            message: " invalid token , please login again"
        });
    }
}

module.exports = authMiddleware;
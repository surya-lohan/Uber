const jwt = require('jsonwebtoken');
const BlacklistToken = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');

async function captainAuthMiddleware(req, res, next) {
    const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    
    if (!token) {
        return res.status(401).send({
            message: "User is not logged in!"
        })
    }

    const isBlacklisted = await BlacklistToken.findOne({token: token});

    if (isBlacklisted) {
        return res.status(400).send({
            message: "User is not logged in!"
        })
    }
    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id)
        req.captain = captain;
        next();
    } catch (error) {
        res.status(401).send({
            message: "Something went wrong!",
            error: error.message || error
        })
    }
}
module.exports = captainAuthMiddleware;
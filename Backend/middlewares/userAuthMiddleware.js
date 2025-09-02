const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user.models");

async function userAuthMiddleware(req ,res ,next) {

    const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
       return res.status(401).json({message: "User is unauthorized!"});
    }

    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({message: "Unauthorized"})
    }

}

module.exports = userAuthMiddleware
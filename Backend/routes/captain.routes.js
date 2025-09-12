const express = require("express");
const router = express.Router();
const zod = require("zod");
const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const captainAuthMiddleware = require("../middlewares/captainAuthMiddleware")
const BlacklistToken = require("../models/blacklistToken.model");

router.post('/register', async (req, res) => {
    const requiredBody = zod.object({
        fullName: zod.object({
            firstName: zod.string(),
            lastName: zod.string().optional()
        }),
        email: zod.string().email(),
        password: zod.string().min(4),
        vehicle: zod.object({
            color: zod.string(),
            plate: zod.string(),
            capacity: zod.string(),
            vehicleType: zod.string()
        })
    })

    const parsedData = requiredBody.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(401).send({
            message: "Invalid inputs!",
            error: parsedData.error.errors
        })
    }

    const { email, password, fullName, vehicle } = parsedData.data;

    const { firstName, lastName } = fullName;
    const { color, capacity, vehicleType, plate } = vehicle;



    try {
        const hashedPassword = await captainModel.hashPassword(password);

        await captainService.create({
            firstname: firstName,
            lastname: lastName,
            email,
            password: hashedPassword,
            color,
            capacity,
            vehicletype: vehicleType,
            plate
        })
        res.status(200).send({
            message: "Captain registered succesfully!"
        })
    } catch (error) {
        res.status(400).send({
            message: "Something went wrong!",
            error: error.message || error
        })
    }
})

router.post('/login', async (req, res) => {

    try{
    const requiredBody = zod.object({
        email: zod.email(),
        password: zod.string().min(4)
    })

    const parsedData = requiredBody.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(401).send({
            message: "Invalid inputs!",
            error: parsedData.error
        })
    }
    const {email , password} = parsedData.data;
    const captain = await captainModel.findOne({email: email}).select("+password");
    
    if(!captain){
        res.status(401).send({
            message: "Email doesn't exists!"
        })
    }
    const hashedPass = await captain.comparePassword(password);
    if (!hashedPass) {
            return res.status(401).json({
                message: "Invalid password!"
            })
        }

    const token = await captain.generateAuthToken();
    console.log(token)
    res.cookie('token' , token);

    res.status(200).json({
            message: "Captain logged in succesfully!",
            token,
            captain
        }) 

    } catch (error) {
        res.status(401).send({
            message: "Captain doesn't exists!",
            error: error.message || error
        })
    }

})
router.get('/profile', captainAuthMiddleware, async (req, res) => {
    try {
        const captain = req.captain;
        res.status(200).send({
            message: "Profile retrieved succesfully!",
            captain
        })

    } catch (error) {
        res.status(401).send({
            message: "Something Went Wrong!",
            error: error.message || error
        })
    }
})

router.get('/logout', captainAuthMiddleware, async (req, res) => {

    res.clearCookie('token');

    const token = req.cookies?.token || req.headers.authorization.split(' ')[1];

    await BlacklistToken.create({ token: token })

    res.status(200).send("Logged out succesfully!")

})

module.exports = router
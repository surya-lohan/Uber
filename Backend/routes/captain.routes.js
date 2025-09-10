const express = require("express");
const router = express.Router();
const zod = require("zod");
const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service")

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

router.post('/login' , async (req, res) => {
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
    
    try {
        const captain =await captainModel.findOne({
        email,
        password
    });

    if (captain) {
        const token = captainModel.generateAuthToken();
    }

    res.status(201).send({
        token: token
    })

    } catch (error) {
        res.status(401).send({
            message: "User doesn't exists!"
        })
    }

})

module.exports = router
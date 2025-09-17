const express = require("express");
const router = express.Router();
const zod = require("zod");
// const userController = require("../controller/user.controller");
const { userModel } = require("../models/user.models");
const userService = require("../services/user.service");
const userAuthMiddleware = require("../middlewares/userAuthMiddleware");
const BlacklistToken = require("../models/blacklistToken.model");
router.post('/register' , async (req , res) => {
    try {
        const requiredBody = zod.object({
            email: zod.string().email(),
            password: zod.string().min(4),
            fullName: zod.object({
                firstName : zod.string().min(2),
                lastName: zod.string().optional()
            })
        })

        const parsedData = requiredBody.safeParse(req.body);
        if (!parsedData.success) {
            console.log('Validation error:', parsedData.error.errors);
            return res.status(400).send({
                message: "Invalid inputs!",
                errors: parsedData.error.errors
            });
        }

        const { email, password, fullName = {} } = parsedData.data;
        const isUserAlreadyExists = await userModel.findOne({
            email: email
        });

        if (isUserAlreadyExists) {
            return res.status(400).send({
                message: "User already exists with this email id!"
            })
        }

        const {firstName , lastName} = fullName;

        const hashedPass = await userModel.hashPassword(password);

        const user = await userService.createUser({
            email,
            password: hashedPass,
            firstName,
            lastName
        });

        

        res.status(201).json({
            message: "User created succesfully!",
            user
        })
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
})  

router.post('/login', async (req, res , next) => {
    try {
        const requiredBody = zod.object({
            email: zod.string().email(),
            password: zod.string().min(4)
        })

        const parsedData = requiredBody.safeParse(req.body);

        if (!parsedData.success) {
            return res.status(400).send({
                message: "Invalid details!",
                error: parsedData.error.errors
            })
        }

        const {email , password} = parsedData.data;

        const user = await userModel.findOne({email}).select('+password');

        if (!user) {
           return res.status(401).json({
            message: "Invalid email or password"
           })
        }

        const isUserValid = await user.comparePassword(password);

        if (!isUserValid) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        const token = user.generateAuthToken();
        
        res.cookie('token' , token);
        
        res.status(200).send({
            message: "User logged in succesfully!",
            token,
            user
        })
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
})

router.get('/profile' , userAuthMiddleware , (req, res , next) => {
    try {
        const user = req.user;
        res.status(200).json({
            message: "Profile retrieved successfully",
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
})

router.get('/logout' , userAuthMiddleware , async (req , res) => {
    
    res.clearCookie('token');

    const token = req.cookies?.token || req.headers.authorization.split(' ')[1];

    await BlacklistToken.create({token});

    res.status(200).send("Logged out!");
})

module.exports = router
const mongoose = require("mongoose");
// const { string, minLength, email, lowercase } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const captainSchema = new Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minLength: [3 , "First name should be atleast 3 characters long!"]
        },
        lastName: {
            type: String,
            minlength: [3, "Last name must be at least 3 characters long"]
        }
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true,
        select: true
    },

    socketId: {
        type: String
    },

    status: {
        type: String,
        enum: ['active' , 'inactive'],
        default: 'active'
    },

    vehicle: {
        color: {
            type: String,
            required: true
        },
        plate: {
            type: String,
            required: true
        },
        capacity: {
            type: String,
            required: true,
            min: [1 , "Capacity must be at least 1"]
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car' , 'auto' , 'motorcycle']
        }
    },

    location: {
        lat: {
            type: Number
        },
        long: {
            type: Number
        }
    }
})

captainSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({
        _id: this._id
    }, process.env.JWT_SECRET , {expiresIn: '24h'});
    return token;
}

captainSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password , 10);
}

captainSchema.methods.comparePassword = async function( password) {
    return await bcrypt.compare(password , this.password)
}

const captainModel = mongoose.model('captain' , captainSchema);

module.exports = captainModel;
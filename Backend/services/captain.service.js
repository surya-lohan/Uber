const captainModel = require("../models/captain.model")

module.exports.create = async ({ firstname, lastname, email, password, color, plate, capacity, vehicletype }) => {
    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicletype) {
        throw new Error("All fields are required!")
    };

    const captain = await captainModel.create({
        fullName: {
            firstName: firstname,
            lastName : lastname
        },
        email: email,
        password: password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType: vehicletype
        }
    })
    return captain;
}
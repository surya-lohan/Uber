const { default: mongoose } = require("mongoose");
const mogoose = require("mongoose");

const connectToDb = () => {
    mongoose.connect(process.env.DB_CONNECT).then(() => {
        console.log("Connected to DB!")
    }).catch(err => console.log(err));
}

module.exports = {
    connectToDb
}
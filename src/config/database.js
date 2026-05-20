const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://mohrazaullah:Mdrazaullah%40786@cluster0.q6jorni.mongodb.net/devTinder")
}

module.exports = {
    connectDB
}
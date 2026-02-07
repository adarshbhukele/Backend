const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: [true, "user already present with this email id"]
    },
    password : String
})

const userModel = mongoose.model("Userdata", userSchema)

module.exports = userModel
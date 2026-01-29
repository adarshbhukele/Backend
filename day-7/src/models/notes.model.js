const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    Title : String,
    Description : String
})

const noteModel = mongoose.model("Notes",noteSchema)

module.exports = noteModel
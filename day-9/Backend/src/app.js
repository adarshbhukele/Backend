const express = require("express")
const noteModel = require("./models/note.model")
const cors = require("cors")
const path = require("path")
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static("./public"))


app.post("/api/note", async (req, res) => {

    const { title, description } = req.body

    const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        message: "Note created successfully.",
        note
    })
})

app.get("/api/notes", async (req, res) => {

    const notes = await noteModel.find()

    res.status(200).json({
        message: "notes fetch successfully",
        notes
    })
})

app.patch("/api/note/:id", async (req, res) => {

    const id = req.params.id
    const { description } = req.body

    const note = await noteModel.findByIdAndUpdate(id, { description })

    res.status(200).json({
        message: "note updated successfully",
        note
    })
})

app.delete("/api/note/:id", async (req, res) => {

    const id = req.params.id
    const note = await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"Note deleted successfully",
        note
    })
})


module.exports = app
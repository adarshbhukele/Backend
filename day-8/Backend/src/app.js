const express = require("express")
const noteModel = require("./models/note.model")
const app = express()
app.use(express.json())


// post api for create a note and store in database
app.post("/api/note", async (req, res) => {
    const{title,description} = req.body

    const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        message: "new note created successfully",
        note
    })
})

// get api for fetching all notes
app.get("/api/notes", async (req, res) => {
    const notes = await noteModel.find()

    res.status(200).json({
        message: "fetching all notes",
        notes
    })
})

// delete api for delete the note using params id
app.delete("/api/note/:id", async (req, res) => {
    const id = req.params.id

    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "Note deleted successfully"
    })
})

// patch api for update the note using id
app.patch("/api/note/:id", async (req, res) => {
    const id = req.params.id
    const { description } = req.body

    await noteModel.findByIdAndUpdate(id, { description })

    res.status(200).json({
        message:"note updated successfully"
    })
})

module.exports = app
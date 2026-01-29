// server ko create karna

const express = require("express")
const noteModel = require("./models/notes.model")

const app = express()

app.use(express.json())

//post api for create note into DB
app.post("/notes",async (req,res)=>{
    const{Title,Description} = req.body

    const note = await noteModel.create({
        Title,Description
    })

    res.status(201).json({
        message:"note added successfully",note
    })
})

//get api for fetch note from DB
app.get("/notes",async (req,res)=>{

    const notes = await noteModel.find()

    res.status(200).json({
        message:"notes fetch successfully",
        notes
    })
})

module.exports = app
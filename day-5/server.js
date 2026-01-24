 const app = require('./app')
 const express = require('express')

 app.use(express.json())

 const notes = []

 // post api for adding note
 app.post("/notes",(req,res)=>{

    notes.push(req.body)
    res.status(201).json({
        "message":"Note added successfully"
    });
 })

 //get api for fetching note
 app.get("/notes",(req,res)=>{

    res.status(200).json(notes)
 })

 //patch api for updating parcial data
 app.patch("/notes/:id",(req,res)=>{

    notes[req.params.id].description = req.body.description
    res.status(400).json({
        message:"Note updated successfully"
    })
 })

 //delete api for delete the note
 app.delete("/notes/:id",(req,res)=>{

    delete notes[req.params.id]
    res.status(200).json({
        message:"Note deleted successfully"
    })
 })

 app.listen('3000',()=>{
    console.log("Server is running on port 3000"); 
 })
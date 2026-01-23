const express = require('express')

const app = express()
app.use(express.json());

const notes = [];

//Post API
app.post("/notes", (req, res) => {

    notes.push(req.body);
    res.send('Note created successfully');

})

//get API
app.get('/notes', (req, res) => {

    res.send(notes);
})

//delete API
app.delete("/notes/:index",(req,res)=>{

    delete notes[req.params.index]
    res.send("note deleted successfully")
})

//Patch API
app.patch("/notes/:index",(req,res)=>{

    notes[req.params.index].content = req.body.content
    res.send("Data Updated Successfully")
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
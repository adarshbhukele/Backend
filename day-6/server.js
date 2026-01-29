const mongoose = require('mongoose')
const app = require("./src/app.js");

// aadarsh nZpSVvnlYlSkxQ07

const connectToDb =()=>{
    mongoose.connect("mongodb+srv://aadarsh:nZpSVvnlYlSkxQ07@cohort2-0.blczluy.mongodb.net/day-6")
    .then(()=>{
        console.log("connected to database");
    })
}

connectToDb()

app.listen(3000,()=>{
    console.log("server is running on port 3000");
    
})
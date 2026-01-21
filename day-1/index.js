const express = require('express')
const app = express()

app.get("/",(req,res)=>{
    res.send("hello this is my first program")
})

app.get("/about",(req,res)=>{
    res.send("This is about page")
})

app.get("/home",(req,res)=>{
    res.send("This is Home Page")
})

app.listen(3000)
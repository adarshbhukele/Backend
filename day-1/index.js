const express = require('express')
const app = express()

app.get("/",(req,res)=>{
    res.send("hello this is my first program")
})

app.listen(3000)
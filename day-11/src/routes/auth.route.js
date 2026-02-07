const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const authRouter = express.Router()
const crypto = require("crypto")

authRouter.post("/register", async (req, res) => {

    const { email, name, password } = req.body

    const isUserAlreadyExist = await userModel.findOne({ email })

    if (isUserAlreadyExist) {
        return res.status(400).json({
            message: "User already Exist with this Email"
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")

    const user = await userModel.create({
        name, email, password : hash
    })

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie("jwt_token", token)

    res.status(200).json({
        message: "User created successfully",
        user,
        token
    })
})

authRouter.post("/login", async (req, res) => {

    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(404).json({
            message: "User not exist with this email"
        })
    }

    const isPasswordmatched = user.password === crypto.createHash("md5").update(password).digest("hex")

    if (!isPasswordmatched) {
        return res.status(409).json({
            message: " Invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id
    },process.env.JWT_SECRET)

    res.cookie("jwy_token",token)

    res.status(200).json({
        message:"Login Successfully",
        user
    })
})

module.exports = authRouter
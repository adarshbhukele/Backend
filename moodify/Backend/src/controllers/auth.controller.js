const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const redis = require("../config/cache")

async function userRegisterController(req, res) {

    const { username, email, password } = req.body

    const isAlreadyExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (isAlreadyExists) {
        return res.status(401).json({
            message: "user exists with this email or username"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign({
        id: user._id,
        username: user.username
    },
        process.env.JWT_SECRET, {
        expiresIn: "1d"
    })

    res.cookie("token", token)

    res.status(200).json({
        message: "user register successfully",
        user,
        token: token
    })
}

async function userLoginController(req, res) {
    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    }).select("+password")

    if (!user) {
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }

    const isPasswordValid = bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username
    },
        process.env.JWT_SECRET, {
        expiresIn: "1d"
    })

    res.cookie("token", token)

    res.status(200).json({
        message: "user login successffully",
        user,
        token: token
    })
}

async function userGetMeController(req, res) {

    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: "data fetch successfully",
        user
    })
}

async function userLogOutController(req, res) {

    const token = req.cookies.token

    res.clearCookie("token")

    await redis.set(token, Date.now().toString(),"Ex", 60 * 60)

    res.status(200).json({
        message:"Logout successfully"
    })
}

module.exports = {
    userRegisterController,
    userLoginController,
    userGetMeController,
    userLogOutController
}
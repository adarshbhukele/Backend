const { Router } = require("express")
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")

const router = Router()

router.post("/register", authController.userRegisterController)

router.post("/login", authController.userLoginController)

router.get("/get-me", authMiddleware, authController.userGetMeController)

router.get("/logout", authController.userLogOutController)

module.exports = router
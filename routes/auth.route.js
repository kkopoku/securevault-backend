const {registerUser, login} = require("../controller/auth.controller.js")
const authRouter = require('express').Router()


authRouter.post("/create", registerUser);
authRouter.post("/login", login)

module.exports = authRouter
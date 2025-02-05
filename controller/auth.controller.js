const User = require("../models/user.model.js")
const Joi = require("joi")
const { createUser } = require("../library/user.library.js")
const { sendRes } = require("../library/api.library.js")


const registerUser = async (req, res) => {
    const tag = "[auth.controller.ts][registerUser]"

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        type: Joi.string().valid("admin", "subscriber").required(),
    }).unknown(true)

    const { error, value } = schema.validate(req.body)

    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
            status: "failed"
        })
    }

    const { email } = value
    try {
        const foundUser = await User.findOne({ email }).lean().exec()
        if (foundUser) {
            return sendRes(res, {
                message: "User already exists",
                status: "failed"
            }, 400)
        }

        const user = await createUser(req.body)

        if (user)
            return res
                .status(200)
                .json({ user, message: "You have successfully created your account" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


const login = async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    })

    const { error, value } = schema.validate(req.body)

    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
            status: "failed"
        })
    }

    const { email, password } = value

    try {
        const foundUser = await User.findOne({ email })
        if (!foundUser) {
            return sendRes(res, {
                message: "Invalid credentials",
                status: "failed"
            }, 404)
        }

        const passwordCheck = await foundUser.comparePassword(password)
        if (!passwordCheck) {
            return sendRes(res, {
                message: "Invalid credentials",
                status: "failed"
            }, 400)
        }

        const token = foundUser.createJWT()

        return sendRes(res, {
            message: "You logged in successfully",
            status: "success",
            data: { user: foundUser, token }
        }, 200)

    } catch (error) {
        console.log(error)
        return sendRes(res, {
            message: "Something went wrong",
            status: "error",
            data: { user: foundUser }
        }, 500)
    }
}

module.exports = { login, registerUser };
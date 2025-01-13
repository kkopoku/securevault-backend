import User from "../models/user.model"
import Joi from "joi"

export async function registerUser(req, res) {
    const tag = "[auth.controller.ts][registerUser]"
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        type: Joi.string().valid(...Object.values(UserType)).required(),
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
            return sendResponse(res, {
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


export async function login(req, res) {
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
            return res.status(400).json({
                message: "Invalid credentials",
                status: "failed"
            })
        }


        const passwordCheck = await foundUser.comparePassword(password)
        if (!passwordCheck) {
            return res.status(400).json({
                message: "Invalid credentials",
                status: "failed"
            })
        }

        const token = foundUser.createJWT()

        return res
            .status(200)
            .json({ user: foundUser, token, message: "You logged in successfully" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
const Analytics = require("../models/analytic.model.js")
const { sendRes } = require("../library/api.library.js")
const eventQueue = require("../jobs/analytic.job.js")
const Joi = require("joi")

const linkCreated = async (req, res) => {
    const tag = "[analytic.controller.js][linkCreated]"
    try {
        const schema = Joi.object({
            type: Joi.string().valid("link","messagesLink").required(),
        })

        const { error, value } = schema.validate(req.body)

        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
                status: "failed"
            })
        }

        const { type } = value

        await eventQueue.add({ type })

        return sendRes(res,{
            message: "linkCreated event acknowledged",
            status: "success"
        },200)

    } catch (error) {
        console.log(`${tag} ${error}`)
        return sendRes(res,{
            message: "Internal Server Error",
            status: "failed"
        },500)
    }
}

module.exports = { linkCreated }
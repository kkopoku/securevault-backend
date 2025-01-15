const AnonymuousMessage = require("../models/anon-message.model")
const Joi = require("joi")
const sendRes = require("../library/api.library")
const { encryptWithBaseKey, decryptWithBaseKey } = require("../services/encryption")

const createAnonMessage = async(req, res) => {
    const tag = "[anon-message.controller.js][createAnonMessage]"

    try{

        const schema = Joi.object({
            message: Joi.string().required(),
        })

        const { error, value } = schema.validate(req.body)

        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
                status: "failed"
            })
        }

        const { message } = value

        const encryptedMessage = encryptWithBaseKey(message)
        await AnonymuousMessage.create({
            message: encryptedMessage,
            subscriber: req.user.id
        })

        return sendRes(res,{
            message: "Message created successfully",
            status: "success"
        },201)

    }catch(error){
        console.log(`${tag} Error:`, error)
        const response = {
            message: "Something went wrong",
            status: "error"
        }
        return sendRes(res,response,500)
    }
}



const viewAnonMessage = async(req, res) => {

    const tag = "[anon-message.controller.js][viewAnonMessage]"

    try{

        const schema = Joi.object({
            id: Joi.string().required(),
        })

        const { error, value } = schema.validate(req.params)

        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
                status: "failed"
            })
        }

        const { id } = value

        const foundAnonMessage = await AnonymuousMessage.findById(id)
        if(!foundAnonMessage){
            return sendRes(res,{
                message: "No message found",
                status:"failed"
            },404)
        }

        const decryptedMessage = decryptWithBaseKey(foundAnonMessage.message)
        return sendRes(res,{
            message: "Message retrieved",
            status:"success",
            data: { message: decryptedMessage}
        },200)

    }catch(error){
        console.log(`${tag} Error:`, error)
        const response = {
            message: "Something went wrong",
            status: "error"
        }
        return sendRes(res,response,500)
    }
}


const getAnonMessages = (req,res) => {

}


module.exports = { createAnonMessage, viewAnonMessage, getAnonMessages}
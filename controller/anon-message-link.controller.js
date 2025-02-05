// const Joi = require("joi")
const AnonymousMessageLink = require("../models/anon-message-link.model")
const { generateRandomString } = require("../utils");

const createAnonMessageLink = async(req, res) => {
    const tag = `[anon-message-link.controller.js][createAnonMessageLink]`

    const oid = generateRandomString(4)

    try{
        await AnonymousMessageLink.create({
            oid,
            user: req.user.id
        })
        // dispatch anon link created event
    }catch(error){
        console.log(`${tag} ${error}`)
        return sendRes(res,{
            message: "Internal Server Error",
            status: "failed"
        },500)
    }
}


module.exports = { createAnonMessageLink }
import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import Joi from "joi"
import { sendRes } from "../library/api.library.js"


export const authorize = async (req, res, next) => {

    const logtag = "[auth.middleware.ts][authorize]"
    const schema = Joi.object({
        authorization: Joi.string().required(),
    }).unknown(true)

    const {error, value} = schema.validate(req.headers)
    if (error){
        return sendRes(res, {
            message: error.details[0].message,
            status: "failed"
        }, 403)
    }

    const { authorization } = value

    if(!authorization.startsWith("Bearer")) return sendRes(res,{
        message: "Unauthorized",
        status: "failed"
    },401)

    const token = authorization.split(" ")[1]
    const secret = String(process.env.JWT_SECRET)

    try{
        const payload = jwt.verify(token, secret)
        if(!payload) return sendRes(res,{
            message: "Unauthorized",
            status: "failed"
        },401)

        const user = await User.findById(payload.id);

        if(!user){
            return sendRes(res,{
                message: "Unauthorized",
                status: "failed"
            },401) 
        }
        else{
            req.user = {
                id: user._id,
                firstName: user.firstName,
                otherNames: user.otherNames,
                email: user.email,
                type: user.type
            }
            next()
        }
    }catch(error){
        console.log(`${logtag} Error: ${error}`)
        return sendRes(res,{
            message: `${error.message}`,
            status: "failed"
        },401) 
    }
}
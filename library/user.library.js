import Admin from "../models/admin.model.js"
import Subscriber from "../models/subscriber.model.js"

export const createUser = async (data) => {
    const type = (data.type).toLowerCase()
    switch(type){
        case "admin":
            return await createAdmin(data)

        case "subscriber":
            return await createSubscriber(data)
        
        default:
            break;
    }
}


export const createAdmin = async (data) => {
    try{
        const admin = await Admin.create({
            firstName: data.firstName,
            otherNames: data.otherNames,
            email: data.email,
            password: data.password,
            type: "admin"
        })
        return admin
    }catch(e){
        return false
    }
}


export const createSubscriber = async (data) => {
    try{
        const subscriber = await Subscriber.create({
            firstName: data.firstName,
            otherNames: data.otherNames,
            email: data.email,
            password: data.password,
            credits: 0,
            type: "subscriber"
        })
        return subscriber
    }catch(e){
        return false
    }
}
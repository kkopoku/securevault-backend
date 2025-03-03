import { Schema, model } from "mongoose"
import { ObjectId } from "mongodb"

const AnonymousMessageSchema = new Schema({
    user: {
        type: ObjectId,
        required: true,
        ref: "Subscriber"
    },
    message: {
        type: String,
        required: true
    }
},{ timestamps:true })

const AnonymousMessage = model("AnonymousMessage", AnonymousMessageSchema)

export default AnonymousMessage;
const { Schema, model } = require("mongoose")
const { ObjectId } = require("mongodb")

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

module.exports = AnonymousMessage
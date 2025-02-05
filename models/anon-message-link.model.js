const { Schema, model } = require("mongoose")
const { ObjectId} = require("mongodb")


const AnonymousMessageLink = new Schema({

    oid: {
        type: String,
        required: true
    },
    user: {
        type: ObjectId,
        required: true
    }

}, { timestamps:true })


const AnonymousMessageLinkModel = model("AnonymousMessageLink", AnonymousMessageLink)

module.exports = AnonymousMessageLinkModel
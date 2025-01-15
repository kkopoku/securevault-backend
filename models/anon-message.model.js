const { Schema, model } = require("mongoose")
const { ObjectId } = require("mongodb")

const AnonymuousMessageSchema = new Schema({
    user: {
        type: ObjectId,
        required: true,
        ref: "Subsciber"
    }
},{ timestamps })

const AnonymuousMessage = model("AnonymuousMessage", AnonymuousMessageSchema)

module.exports = AnonymuousMessage
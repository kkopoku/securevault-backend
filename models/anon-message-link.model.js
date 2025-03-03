import { Schema, model } from "mongoose"
import { ObjectId} from "mongodb"


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

export default AnonymousMessageLinkModel;
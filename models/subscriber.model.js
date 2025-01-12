import { Schema } from "mongoose";
import User from "./user.model";

const SubscriberSchema = new Schema({
    credits:{
        type: Number,
        required: true,
        defaults: 0
    }
},{ discriminatorKey: "type"})


const Subscriber = User.discriminator('subscriber', SubscriberSchema)
export default Subscriber
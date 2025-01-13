const { Schema } = require("mongoose");
const User = require("./user.model");


const SubscriberSchema = new Schema({
    credits:{
        type: Number,
        required: true,
        defaults: 0
    }
},{ discriminatorKey: "type"})


const Subscriber = User.discriminator('subscriber', SubscriberSchema)

module.exports = Subscriber
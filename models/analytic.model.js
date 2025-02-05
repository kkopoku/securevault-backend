const { Schema, model } = require("mongoose");

const AnalyticSchema = new Schema({

    type: {
        type: String,
        required: false,
        enum: ["link"]
    }

}, { timestamps:true })

const Analytics = model("Analytic", AnalyticSchema)
module.exports =  Analytics
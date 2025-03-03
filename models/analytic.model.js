import { Schema, model } from "mongoose";

const AnalyticSchema = new Schema({

    type: {
        type: String,
        required: false,
        enum: ["link"]
    }

}, { timestamps:true })

const Analytics = model("Analytic", AnalyticSchema)

export default Analytics;
import { Schema, model } from "mongoose";

const AnalyticSchema = new Schema({

    linksCreated: {
        type: Number,
        required: false
    },

})

const Analytics = model("Analytic", AnalyticSchema)
export default Analytics
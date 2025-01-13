const { Schema, model } = require("mongoose");

const AnalyticSchema = new Schema({

    linksCreated: {
        type: Number,
        required: false
    },

})

const Analytics = model("Analytic", AnalyticSchema)
module.exports =  Analytics
const { linkCreated } = require("../controller/analytic.controller.js")
const analyticRouter = require('express').Router()


analyticRouter.post("/linkCreated", linkCreated);


module.exports = analyticRouter
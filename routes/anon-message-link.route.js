const { createAnonMessageLink } = require("../controller/anon-message-link.controller.js")
const anonMessageLinkRouter = require('express').Router()
const { authorize } = require("../middleware/auth.middleware.js")


anonMessageLinkRouter.post("/create", authorize, createAnonMessageLink);


module.exports = anonMessageLinkRouter
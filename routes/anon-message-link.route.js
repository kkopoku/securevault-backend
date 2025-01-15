const { createAnonMessageLink } = require("../controller/anon-message-link.controller.js")
const anonMessageLinkRouter = require('express').Router()


anonMessageLinkRouter.post("/create", createAnonMessageLink);


module.exports = anonMessageLinkRouter
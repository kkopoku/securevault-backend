const { createAnonMessage, viewAnonMessage, getAnonMessages } = require("../controller/anon-message.controller.js")
const anonMessageRouter = require('express').Router()


anonMessageRouter.get("/", getAnonMessages);
anonMessageRouter.post("/:id", viewAnonMessage);
anonMessageRouter.post("/create", createAnonMessage);


module.exports = anonMessageRouter
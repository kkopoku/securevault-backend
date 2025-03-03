import express from "express";
import { createAnonMessage, viewAnonMessage, getAnonMessages } from "../controller/anon-message.controller.js"

const router = express.Router();

router.get("/", getAnonMessages);
router.post("/:id", viewAnonMessage);
router.post("/create", createAnonMessage);


export default router;
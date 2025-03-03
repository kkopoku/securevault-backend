import express from "express";
import { createAnonMessageLink } from "../controller/anon-message-link.controller.js"
import { authorize } from "../middleware/auth.middleware.js"

const router = express.Router();

router.post("/create", authorize, createAnonMessageLink);

export default router;
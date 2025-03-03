import express from "express";
import {registerUser, login} from "../controller/auth.controller.js"

const router = express.Router();

router.post("/create", registerUser);
router.post("/login", login)

export default router;
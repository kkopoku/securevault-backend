import express from "express";
import { 
    registerUser, 
    login
} from "../controller/auth.controller";

const authRouter = express.Router();

authRouter.post("/create", registerUser);
authRouter.post("/login", login)

export default authRouter;
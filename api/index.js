import express from "express";
import linkRouter from "../routes/link.js";
import authRouter from "../routes/auth.route.js";
import anonMessageRouter from "../routes/anon-message.route.js";
import anonMessageLinkRouter from "../routes/anon-message-link.route.js";
import { authorize } from "../middleware/auth.middleware.js";
import cors from "cors";
import connectDB from "../database/connect.js";
import "../events/index.events.js";

const app = express();
const uri = process.env.MONGO_URI;
const baseURL = "/api/v1";

connectDB(uri);

// Packages
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.json("securevault"));
app.get("/health", (req, res) => res.json("success"));

// Routes
app.use(`${baseURL}/link`, linkRouter);
app.use(`${baseURL}/auth`, authRouter);
app.use(`${baseURL}/anonMessage`, authorize, anonMessageRouter);
app.use(`${baseURL}/anonMessageLink`, authorize, anonMessageLinkRouter);

app.get("/api", async (req, res) => {
  res.send("<h1>Hello, Express!</h1>");
});

export default app;
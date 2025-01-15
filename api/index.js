const express = require("express");
const app = express();
const linkRouter = require("../routes/link");
const authRouter = require("../routes/auth.route.js");
const analyticRouter = require("../routes/analytic.route.js");
const anonMessageRouter = require("../routes/anon-message.route.js")
const { authorize } = require("../middleware/auth.middleware.js")
const cors = require("cors")
const connectDB = require("../database/connect");
const uri = process.env.MONGO_URI;

const baseURL = "/api/v1"

connectDB(uri);

// Packages
app.use(express.json());
app.use(cors());

app.get("/", function(req, res){ return res.json("securevault")})

app.get("/health", function(req, res){ return res.json("success")})

// Routes
app.use(`${baseURL}/link`, linkRouter);
app.use(`${baseURL}/auth`, authRouter);
app.use(`${baseURL}/analytic`, analyticRouter);
app.use(`${baseURL}/anonMessage`, authorize, anonMessageRouter)

app.get("/api", async (req, res) => {
  res.send(`<h1>Hello, Express!</h1>`);
});

module.exports = app;

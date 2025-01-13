const express = require("express");
const app = express();
const linkRouter = require("../routes/link");
const authRouter = require("../routes/auth.route.js");
const cors = require("cors")
const connectDB = require("../database/connect");
const uri = process.env.MONGO_URI;

connectDB(uri);

// Packages
app.use(express.json());
app.use(cors());

app.get("/", function(req, res){ return res.json("securevault")})

app.get("/health", function(req, res){ return res.json("success")})

// Routes
app.use('/api/v1/link', linkRouter);
app.use('/api/v1/auth', authRouter);

app.get("/api", async (req, res) => {
  res.send(`<h1>Hello, Express!</h1>`);
});

module.exports = app;

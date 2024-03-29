const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const linkRouter = require("./routes/link");
const cors = require("cors")
const connectDB = require("./database/connect");
const uri = process.env.MONGO_URI;

connectDB(uri);

// Packages
app.use(bodyParser.json());
app.use(cors());

app.get("/", function(req, res){ return res.json("securevault")})

app.get("/health", function(req, res){ return res.json("success")})

// Routes
app.use('/api/v1/link', linkRouter);

app.get("/api", async (req, res) => {
  res.send(`<h1>Hello, Express!</h1>`);
});

module.exports = app;

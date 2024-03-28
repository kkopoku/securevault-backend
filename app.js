const express = require("express");
const app = express();
const linkRouter = require("./routes/link");
const cors = require("cors")
const connectDB = require("./database/connect");
const uri = process.env.MONGO_URI;

connectDB(uri || 8080);

// Packages
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/v1/link', linkRouter);

app.get("/api", async (req, res) => {
  res.send(`<h1>Hello, Express!</h1>`);
});

module.exports = app;

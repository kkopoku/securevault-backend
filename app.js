// index.js
const express = require("express");
const app = express();
const port = 8080;
require("dotenv").config();
const uri = process.env.MONGO_URI;
const connectDB = require("./database/connect");
const linkRouter = require("./routes/link");
const cors = require("cors")

// Packages
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/v1/link', linkRouter);

app.get("/api", async (req, res) => {
  res.send(`<h1>Hello, Express!</h1>`);
});

async function run() {
  try {
    // Connect the client to the server
    connectDB(uri || 8080);
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

run();

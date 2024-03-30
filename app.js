// index.js
require("dotenv").config();
const app = require("./api")
const port = 8080;

async function run() {
  try {
    // Connect the client to the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

run();
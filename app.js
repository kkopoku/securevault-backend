import dotenv from "dotenv";
import api from "./api/index.js"

dotenv.config();

const app = api;
const port = 8000;

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
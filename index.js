
require("dotenv").config();

const app = require("./app");
const port = 8080;

async function run() {
    try {
      
      app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  run();
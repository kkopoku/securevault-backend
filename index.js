const app = require("./app");
const port = 8080;
const connectDB = require("./database/connect");
const uri = process.env.MONGO_URI;


async function run() {
    try {
      // Connect the client to the server
    //   connectDB(uri || 8080);
      app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  run();
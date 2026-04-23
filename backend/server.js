require("dotenv").config(); // load environment variables

const app = require("./src/app");
const config = require("./src/config");
const initializeDatabase = require("./src/db-init"); 

const PORT = config.port;

(async () => {
  try {
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
})();
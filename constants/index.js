require("dotenv").config();

/**@defining constants from @environment variables */
const NODE_ENV = process.env.APP_NODE_ENV;
const APP_PORT = process.env.PORT;
const MONGO_URI = process.env.APP_MONGO_URI;
const SECRET = process.env.APP_JWT_SECRET;
//export constants
module.exports = {
  NODE_ENV,
  PORT,
  MONGO_URI,
  SECRET,
};

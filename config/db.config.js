const mongoose = require("mongoose");
const { MONGO_URI } = require("../constants/index");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(
      `MongoDB Connected to ${conn.connection.host}`.magenta.underline
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = { connectDB };

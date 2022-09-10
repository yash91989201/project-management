const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  const conn = await mongoose.connect(MONGODB_URI);
  console.log(
    `Connected to db at PORT:${conn.connection.port}`.bgCyan.underline.bold
  );
};

module.exports = connectDB;

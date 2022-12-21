const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect("mongodb://mongo:27017/project_mgmt");
  console.log(
    `Connected to db at PORT:${conn.connection.port}`.bgCyan.underline.bold
  );
};

module.exports = connectDB;

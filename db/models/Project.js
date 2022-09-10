const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["NOT STARTED", "IN PROGRESS", "DONE"],
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client ",
  },
});

module.exports = mongoose.model("project", ProjectSchema);

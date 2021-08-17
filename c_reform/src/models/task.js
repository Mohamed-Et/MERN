const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  title: { type: String, required: true },
  deliverable: { type: String },
  deadline: { type: String },
  implementation: { type: Boolean, default: false },
  personInCharge: { type: String },
  description: { type: String },
  startingDate: { type: String },
  endingDate: { type: String },
});

module.exports = mongoose.model("Task", taskSchema);

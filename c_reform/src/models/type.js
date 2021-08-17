const mongoose = require("mongoose");

const typeSchema = mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String },
  bg_color: { type: String },
});

module.exports = mongoose.model("Type", typeSchema);

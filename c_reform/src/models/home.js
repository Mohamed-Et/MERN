const mongoose = require("mongoose");
//const Role = require("../models/Role");
const homeSchema = mongoose.Schema({
  logo_right: { type: String },
  logo_left: { type: String },
  navBarTitle: { type: String },
  presentation_title: { type: String },
  presentation_content: { type: String },
});

module.exports = mongoose.model("Home", homeSchema);

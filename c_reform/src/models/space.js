const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const spaceSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  logo: { type: String },
  logo_text: { type: String },
  header_bg: { type: String },
});

spaceSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Space", spaceSchema);

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const carousselSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  img: { type: String },
});

carousselSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Caroussel", carousselSchema);

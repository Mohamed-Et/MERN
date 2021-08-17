const mongoose = require("mongoose");

const documentFileSchema = mongoose.Schema({
  url: { type: String, required: true },
});

module.exports = mongoose.model("DocumentFile", documentFileSchema);

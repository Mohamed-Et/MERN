const mongoose = require("mongoose");

const documentSchema = mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String },
  date: { type: String },
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: "DocumentFile" }],
});

module.exports = mongoose.model("Document", documentSchema);

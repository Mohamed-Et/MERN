const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    order: { type: Number },
    title: { type: String, required: true },
    description: { type: String },
    space: { type: mongoose.Schema.Types.ObjectId, ref: "Space" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    subCategory: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" }],
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("category", categorySchema);

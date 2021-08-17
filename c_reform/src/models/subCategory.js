const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema(
  {
    order: { type: Number, required: true },
    title: { type: String },
    category: { type: String },
    feasibility: { type: String },
    status: { type: String },
    description: { type: String, default: "No Description" },
    deadLine: { type: String },
    implementation: { type: Number },
    workingGroup: { type: mongoose.Schema.Types.ObjectId, ref: "WorkingGroup" },
    task: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    monitoring: [{ type: mongoose.Schema.Types.ObjectId, ref: "Monitoring" }],
    meeting: [{ type: mongoose.Schema.Types.ObjectId, ref: "Meeting" }],
    documentation: [{ type: mongoose.Schema.Types.ObjectId, ref: "Document" }],
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("SubCategory", subCategorySchema);

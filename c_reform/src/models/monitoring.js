const mongoose = require("mongoose");

const monitoringSchema = mongoose.Schema({
  information: { type: String, required: true },
  author: { type: String },
  date_monitoring: { type: String },
  excel_file: { type: String }
});

module.exports = mongoose.model("Monitoring", monitoringSchema);

const mongoose = require("mongoose");

const meetingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  meeting_date: { type: String },
  participants: [{ type: String }],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

module.exports = mongoose.model("Meeting", meetingSchema);

const mongoose = require("mongoose");

const statusSchema = mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String },
    bg_color: { type: String },
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model("status", statusSchema);

//await thing.save(); // `created_at` & `updatedAt` will be included
const mongoose = require("mongoose");

const feasabilitySchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String},
    bg_color: { type: String},
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model("feasability", feasabilitySchema);

const mongoose = require("mongoose");

const workingGroupSchema = mongoose.Schema({
    userFacilitator: { type: String, required: true},
    userWorkers: [{ type: String}],
});

module.exports = mongoose.model("WorkingGroup", workingGroupSchema);

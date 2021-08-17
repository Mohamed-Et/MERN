const mongoose = require("mongoose");

const richTextSchema = mongoose.Schema({
    entityMap: { type: Object },
    blocks: [{ type: Object }],
});

module.exports = mongoose.model("RichText", richTextSchema);

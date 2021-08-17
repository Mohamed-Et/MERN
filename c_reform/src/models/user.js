const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
//const Role = require("../models/Role");
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
  avatar: { type: String },
  nom: { type: String },
  prenom: { type: String },
  spaces: [{ type: mongoose.Schema.Types.ObjectId, ref: "Space" }],
  firstTime: { type: Boolean, default: 0 },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);

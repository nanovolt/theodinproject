const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  firstname: { type: String, maxLength: 64 },
  lastname: { type: String, maxLength: 64 },
  username: { type: String, required: true },
  password: { type: String, required: true },
  admin: Boolean,
});

module.exports = mongoose.model("User", userSchema);

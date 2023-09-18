const mongoose = require("mongoose");

const { Schema } = mongoose;

const clubSchema = new Schema({
  member: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Club", clubSchema);

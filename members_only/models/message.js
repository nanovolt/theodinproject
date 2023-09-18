/* eslint-disable func-names */
const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const { Schema } = mongoose;

const messageSchema = new Schema({
  message: { type: String, maxLength: 256, required: true },
  date: { type: Date, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

messageSchema.virtual("dateFormat").get(function () {
  // return this.date ? DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED) : "";
  return this.date ? DateTime.fromJSDate(this.date).toFormat("ff") : "";
});

module.exports = mongoose.model("Message", messageSchema);

const mongoose = require("mongoose");

const { Schema } = mongoose;

const genreSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 100 },
});

genreSchema.virtual("url").get(function () {
  return `/catalog/genre/${this.id}`;
});

module.exports = mongoose.model("Genre", genreSchema);

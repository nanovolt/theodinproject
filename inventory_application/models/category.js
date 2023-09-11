const mongoose = require("mongoose");

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 64 },
  parent: String,
});

categorySchema.virtual("url").get(function virt() {
  // We don't use an arrow function as we'll need the this object
  return `/category/${this.id}`;
});

module.exports = mongoose.model("Category", categorySchema);

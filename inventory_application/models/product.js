const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 64 },
  description: { type: String, maxLength: 256 },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, min: 0.0 },
  numberInStock: { type: Number, min: 0 },
  umageUrl: String,
});

productSchema.virtual("url").get(function virt() {
  // We don't use an arrow function as we'll need the this object
  return `/product/${this.id}`;
});

module.exports = mongoose.model("Product", productSchema);

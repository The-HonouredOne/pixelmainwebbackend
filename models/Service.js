const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String },
  duration: { type: String },
  features: [{ type: String }],
});

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
    imagePublicId: { type: String },
    packages: [packageSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);

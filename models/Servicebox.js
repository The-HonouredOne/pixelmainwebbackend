const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    // slug: { type: String, unique: true },
    // description: { type: String, required: true },
    imageUrl: String,
    imagePublicId: String,
    // packages: [packageSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("serviceBox", serviceSchema);

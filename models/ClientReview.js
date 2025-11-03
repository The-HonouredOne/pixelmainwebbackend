const mongoose = require("mongoose");

const clientReviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    review: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },

    // ✅ Client image (person photo)
    imageUrl: { type: String, default: "" },
    imagePublicId: { type: String, default: "" },

    // ✅ Company logo
    logoUrl: { type: String, default: "" },
    logoPublicId: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ClientReview", clientReviewSchema);

// models/Portfolio.js
const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String }, 
    description: { type: String }, 
    technologies: [{ type: String }], 
    howBuilt: { type: String }, 
    why: { type: String }, 
    // projectUrl: { type: String }, 
    // category: { type: String }, 
    imageUrl: { type: String },
    imagePublicId: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);

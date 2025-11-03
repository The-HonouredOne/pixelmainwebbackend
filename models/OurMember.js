// models/TeamMember.js
const mongoose = require("mongoose");

const OurMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String },
  imageUrl: { type: String },       
  imagePublicId: { type: String },  
},
  { timestamps: true });

module.exports = mongoose.model("OurMember", OurMemberSchema);

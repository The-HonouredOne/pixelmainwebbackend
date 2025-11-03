const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: String,
  price: Number,
  mode: String, // online/offline
});

module.exports = mongoose.model("Course", courseSchema);

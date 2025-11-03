const ClientReview = require("../models/ClientReview");
const cloudinary = require("../utils/cloudinary");

// Create client review with image + logo upload
exports.createReview = async (req, res) => {
  try {
    const { name, companyName, review, rating } = req.body;

    if (!name || !companyName || !review) {
      return res.status(400).json({ msg: "All fields are required." });
    }

    let imageUrl = "";
    let imagePublicId = "";
    let logoUrl = "";
    let logoPublicId = "";

    // ✅ Handle multiple uploads from frontend form
    if (req.files) {
      if (req.files.image && req.files.image[0]) {
        imageUrl = req.files.image[0].path;
        imagePublicId = req.files.image[0].filename;
      }
      if (req.files.logo && req.files.logo[0]) {
        logoUrl = req.files.logo[0].path;
        logoPublicId = req.files.logo[0].filename;
      }
    }

    const newReview = await ClientReview.create({
      name,
      companyName,
      review,
      rating: rating ? Number(rating) : 5,
      imageUrl,
      imagePublicId,
      logoUrl,
      logoPublicId,
    });

    res.status(201).json({ msg: "Client review added", review: newReview });
  } catch (error) {
    console.error("createReview error:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Get all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await ClientReview.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error("getAllReviews error:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Delete review + its Cloudinary images
exports.deleteReview = async (req, res) => {
  try {
    const review = await ClientReview.findById(req.params.id);
    if (!review) return res.status(404).json({ msg: "Review not found" });

    // ✅ Delete both images from Cloudinary if they exist
    if (review.imagePublicId)
      await cloudinary.uploader.destroy(review.imagePublicId);
    if (review.logoPublicId)
      await cloudinary.uploader.destroy(review.logoPublicId);

    await ClientReview.findByIdAndDelete(req.params.id);
    res.json({ msg: "Client review deleted successfully" });
  } catch (error) {
    console.error("deleteReview error:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

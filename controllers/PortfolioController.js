// controllers/portfolioController.js
const Portfolio = require("../models/Portfolio");
const cloudinary = require("../utils/cloudinary"); // if you need to call uploader manually

// Create portfolio item (image upload via upload middleware)
exports.createPortfolio = async (req, res) => {
  try {
    const {
      title,
    //   subtitle,
      description,
      technologies,
      howBuilt,
      why,
    //   projectUrl,
      category,
    } = req.body;
   

    if (!title) return res.status(400).json({ msg: "Title is required" });

    // technologies can come as comma-separated string or array
    let techArr = [];
    if (technologies) {
      techArr =
        typeof technologies === "string"
          ? technologies.split(",").map((t) => t.trim()).filter(Boolean)
          : technologies;
    }

    let imageUrl = null;
    let imagePublicId = null;

    // If your upload middleware already sets req.file.path = cloudinary URL and req.file.public_id, use those:
    if (req.file) {
      // If middleware already uploaded to cloudinary and returned secure_url/public_id:
      imageUrl = req.file.path || req.file.secure_url || req.file.url;
      imagePublicId = req.file.public_id || req.file.filename || req.file.public_id;
      // If your middleware didn't upload and you have local file, you can upload here:
      // const uploaded = await cloudinary.uploader.upload(req.file.path, { folder: "portfolio" });
      // imageUrl = uploaded.secure_url; imagePublicId = uploaded.public_id;
    }

    const newPortfolio = await Portfolio.create({
      title,
    //   subtitle,
      description,
      technologies: techArr,
      howBuilt,
      why,
    //   projectUrl,
      category,
      imageUrl,
      imagePublicId,
    });

    res.status(201).json({ msg: "Portfolio created", portfolio: newPortfolio });
  } catch (err) {
    console.error("createPortfolio error:", err);
    res.status(500).json({ msg: "Server error", details: err.message });
  }
};

// Get all portfolio items
exports.getAllPortfolios = async (req, res) => {
  try {
    const items = await Portfolio.find().sort({ createdAt: -1 });
     console.log('hello')
    res.json( items);
  } catch (err) {
    console.error("getAllPortfolios error:", err);
    res.status(500).json({ msg: "Server error", details: err.message });
  }
};

// Get single portfolio by id (optional)
exports.getPortfolioById = async (req, res) => {
  try {
    const item = await Portfolio.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: "Not found" });
    res.json(item);
  } catch (err) {
    console.error("getPortfolioById error:", err);
    res.status(500).json({ msg: "Server error", details: err.message });
  }
};

// Delete portfolio item and its Cloudinary image
exports.deletePortfolio = async (req, res) => {
  try {
    const item = await Portfolio.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: "Not found" });

    if (item.imagePublicId) {
      await cloudinary.uploader.destroy(item.imagePublicId, { resource_type: "image" });
    }

    await Portfolio.findByIdAndDelete(req.params.id);
    res.json({ msg: "Portfolio deleted" });
  } catch (err) {
    console.error("deletePortfolio error:", err);
    res.status(500).json({ msg: "Server error", details: err.message });
  }
};

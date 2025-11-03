const Service = require("../models/Service");
const cloudinary = require("../utils/cloudinary");

//  Create Service
exports.createService = async (req, res) => {
  try {
    const { title, description, packages } = req.body;

    if (!title || !description) {
      return res.status(400).json({ msg: "Title and description are required" });
    }

    // Parse packages safely (works with JSON or raw object)
    let packagesData = [];
    try {
      packagesData = typeof packages === "string" ? JSON.parse(packages) : packages;
    } catch (error) {
      packagesData = [];
    }

    // Prepare image fields
    let imageUrl = null;
    let imagePublicId = null;
    if (req.file) {
      imageUrl = req.file.path;
      imagePublicId = req.file.filename || req.file.public_id;
    }

    const slug = title.toLowerCase().replace(/\s+/g, "-");

    const newService = await Service.create({
      title,
      slug,
      description,
      imageUrl,
      imagePublicId,
      packages: packagesData,
    });

    return res.status(201).json({
      msg: "Service created successfully",
      service: newService,
    });
  } catch (err) {
    console.error("Error creating service:", err);
    return res.status(500).json({
      msg: "Server error",
      details: err.message,
    });
  }
};

//  Get All Services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ msg: "Server error", details: err.message });
  }
};

//  Get Single Service by Slug
exports.getServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) return res.status(404).json({ msg: "Service not found" });
    res.json(service);
  } catch (err) {
    res.status(500).json({ msg: "Server error", details: err.message });
  }
};

//  Delete Service and Cloudinary Image
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ msg: "Service not found" });

    // delete cloudinary image
    if (service.imagePublicId) {
      await cloudinary.uploader.destroy(service.imagePublicId);
    }

    await Service.findByIdAndDelete(req.params.id);
    res.json({ msg: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", details: err.message });
  }
};

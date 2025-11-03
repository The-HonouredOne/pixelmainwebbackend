const Servicebox = require("../models/Servicebox");
const TeamMember = require("../models/TeamMembers");

// console.log("REQ.FILE:", req.file);


// Create team member with image upload
exports.createService = async (req, res) => {
  try {
    const { name  } = req.body;
    if (!name) return res.status(400).json({ msg: "Name is required" });

    let imageUrl, imagePublicId;

    if (req.file) {
      imageUrl = req.file.path;            // Cloudinary URL
      imagePublicId = req.file.filename;   // Cloudinary public_id
    }
    

    const service = await Servicebox.create({ name, imageUrl, imagePublicId });
    res.status(201).json({service, msg:"service created" });
  

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", details: err.message });
  }
};

// -----------------Get all team members---------------------------
exports.getService = async (req, res) => {
  try {
    const service = await Servicebox.find().sort({ createdAt: -1 });
    res.json(service);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete team member and image from Cloudinary
exports.deleteService = async (req, res) => {
  console.log("🧹 Delete endpoint hit");

  try {
    const { id } = req.params;
    // console.log("🧾 Deleting service with id:", id);

    const service = await Servicebox.findById(id);
    // console.log("🔍 Found service:", service);

    if (!service) {
      
      return res.status(404).json({ msg: "Service not found" });
    }

    if (service.imagePublicId) {
      // console.log(" Deleting image from Cloudinary:", service.imagePublicId);
      const cloudinary = require("../utils/cloudinary");
      const result = await cloudinary.uploader.destroy(service.imagePublicId, { resource_type: "image" });
      // console.log("✅ Cloudinary delete result:", result);
    }

    await Servicebox.findByIdAndDelete(id);
    // console.log("✅ Service deleted from DB");

    res.json({ success: true, msg: "Service deleted successfully" });
  } catch (err) {
    // console.error("❌ Delete error:", err);
    res.status(500).json({ msg: "Server error", details: err.message });
  }
};


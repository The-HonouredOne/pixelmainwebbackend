const TeamMember = require("../models/TeamMembers");

// Create team member with image upload
exports.createTeamMember = async (req, res) => {
  try {
    const { name, role } = req.body;
    if (!name) return res.status(400).json({ msg: "Name is required" });

    let imageUrl, imagePublicId;


  imageUrl = req.file.path;    // Cloudinary URL
  imagePublicId = req.file.public_id; // Cloudinary public ID



    const member = await TeamMember.create({ name, role, imageUrl, imagePublicId });
    res.status(201).json({member, msg:"member created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", details: err.message });
  }
};

// -----------------Get all team members---------------------------
exports.getTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete team member and image from Cloudinary
exports.deleteTeamMember = async (req, res) => {
  // console.log(" Delete endpoint hit");
  try {
    const { id } = req.params;
    // console.log(" Deleting member with id:", id);

    const member = await TeamMember.findById(id);
    // console.log(" Found member:", member);

    if (!member) {
      // console.log(" Member not found");
      return res.status(404).json({ msg: "Member not found" });
    }

    if (member.imagePublicId) {
      // console.log(" Deleting image from Cloudinary:", member.imagePublicId);
      const cloudinary = require("../utils/cloudinary");
      const result = await cloudinary.uploader.destroy(member.imagePublicId, {
        resource_type: "image",
      });
      // console.log(" Cloudinary delete result:", result);
    }

    await TeamMember.findByIdAndDelete(id);
    // console.log(" Member deleted from DB");

    res.json({ success: true, msg: "Team member deleted successfully" });
  } catch (err) {
    // console.error(" Delete error:", err);
    res.status(500).json({ msg: "Server error", details: err.message });
  }
};


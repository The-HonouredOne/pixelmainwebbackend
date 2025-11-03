const Industry = require("../models/Industry");
const cloudinary = require("../utils/cloudinary");



// Create team member with image upload
exports.createIndustry = async (req, res) => {
    try {
        const { name, description } = req.body;
        // console.log('category', category)
        if (!name) return res.status(400).json({ msg: "Name is required" });

        let imageUrl, imagePublicId;

        if (req.file) {
            imageUrl = req.file.path;            // Cloudinary URL
            imagePublicId = req.file.filename;   // Cloudinary public_id
        }

        // console.log("hello createIndustry")
        const industry = await Industry.create({ name, description, imageUrl, imagePublicId });
        res.status(201).json({ industry, msg: "Industry created" });


    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error", details: err.message });
    }
};

// -----------------Get all team members---------------------------
exports.getIndustry = async (req, res) => {
    try {
        const industry = await Industry.find().sort({ createdAt: -1 });
        //   console.log("hello createIndustry", industry)
        res.json({industry, msg:'hellooifjof'});
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

// Delete team member and image from Cloudinary
exports.deleteIndustry = async (req, res) => {
    //   console.log(" Delete endpoint hit");

    try {
        const { id } = req.params;
        // console.log(" Deleting service with id:", id);

        const industry = await Industry.findById(id);
        // console.log(" Found service:", service);

        if (!industry) {

            return res.status(404).json({ msg: "Industry not found" });
        }

        if (industry.imagePublicId) {
            // console.log(" Deleting image from Cloudinary:", service.imagePublicId);

            const result = await cloudinary.uploader.destroy(industry.imagePublicId, { resource_type: "image" });
            // console.log(" Cloudinary delete result:", result);
        }

        await Industry.findByIdAndDelete(id);
        // console.log(" Industry deleted from DB");

        res.json({ success: true, msg: "Industry deleted successfully" });
    } catch (err) {
        // console.error(" Delete error:", err);
        res.status(500).json({ msg: "Server error", details: err.message });
    }
};


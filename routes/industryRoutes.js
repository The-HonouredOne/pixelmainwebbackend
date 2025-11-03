const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadTeamImage.js");
// const {createTeamMember, getTeamMembers, deleteTeamMember} = require("../controllers/teamController");
// const { createService, getService, deleteService } = require("../controllers/serviceboxController.js");
const { protectAdmin } = require("../middleware/authMiddleware.js");
// const { createBlog, deleteBlog, getBlog } = require("../controllers/blogController.js");
const { createIndustry, getIndustry, deleteIndustry } = require("../controllers/industryController.js");


router.post("/",  protectAdmin, upload.single("image"), createIndustry);

router.get("/", getIndustry);
router.delete("/:id", protectAdmin, deleteIndustry);

module.exports = router;
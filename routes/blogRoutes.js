const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadTeamImage.js");
// const {createTeamMember, getTeamMembers, deleteTeamMember} = require("../controllers/teamController");
// const { createService, getService, deleteService } = require("../controllers/serviceboxController.js");
const { protectAdmin } = require("../middleware/authMiddleware.js");
const { createBlog, deleteBlog, getBlog } = require("../controllers/blogController");


router.post("/",  protectAdmin, upload.single("image"), createBlog);

router.get("/", getBlog);
router.delete("/:id", protectAdmin, deleteBlog);

module.exports = router;


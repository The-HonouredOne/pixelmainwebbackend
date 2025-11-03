const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadTeamImage.js");
const {createTeamMember, getTeamMembers, deleteTeamMember} = require("../controllers/teamController");
const { protectAdmin } = require("../middleware/authMiddleware.js");

// Routes
router.post("/", protectAdmin, upload.single("image"), createTeamMember);
router.get("/", getTeamMembers);
router.delete("/:id", protectAdmin, deleteTeamMember);

module.exports = router;

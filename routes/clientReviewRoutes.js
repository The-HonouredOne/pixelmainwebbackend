const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadTeamImage"); // your existing Cloudinary upload middleware
const {
    createReview,
    getAllReviews,
    deleteReview,
} = require("../controllers/clientReviewController");

//  Use `upload.fields()` to handle both image & logo uploads
router.post(
    "/",
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "logo", maxCount: 1 },
    ]),
    createReview
);

router.get("/", getAllReviews);
router.delete("/:id", deleteReview);

module.exports = router;

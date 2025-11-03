const Enquiry = require("../models/Enquiry");

exports.submitEnquiry = async (req, res) => {
  const enquiry = new Enquiry(req.body);
  await enquiry.save();
  res.status(201).json({ message: "Enquiry submitted" });
};

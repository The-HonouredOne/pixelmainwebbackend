const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // console.log('hello' , req.body)
    const admin = await Admin.findOne({ email });
    if (admin && (await bcrypt.compare(password, admin.password))) {
      res.json({
        _id: admin._id,
        email: admin.email,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Register admin manually once
// exports.registerAdmin = async (req, res) => {
//   const { email, password } = req.body;
//   const exists = await Admin.findOne({ email });
//   if (exists) return res.status(400).json({ message: "Admin already exists" });

//   const hashedPwd = await bcrypt.hash(password, 10);
//   const admin = new Admin({ email, password: hashedPwd });
//   await admin.save();

//   res.status(201).json({ message: "Admin registered" });
// };

// ✅ Protected route controller
exports.getProtectedData = async (req, res) => {
  res.status(200).json({
    message: "Welcome to the protected admin route!",
    admin: req.admin,
  });
};


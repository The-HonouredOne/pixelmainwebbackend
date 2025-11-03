const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
// const courseRoutes = require("./routes/courseRoutes"); ← comment this
const contactRoutes = require("./routes/contactRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const adminRoutes = require("./routes/adminRoutes");
const adminServices = require("./routes/adminServices");
// const teamRoute = require("./routes/teamRoutes.js");
// const paymentRoutes = require("./routes/paymentRoutes");
// const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
connectDB();

const app = express();
// const cors = require("cors");

app.use(cors({
  origin: [
    "https://pixelmainwebfrontend.vercel.app",  // ✅ no trailing slash
    "http://localhost:5173"                     // ✅ optional for local testing (Vite)
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));



app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/team", require("./routes/teamRoutes.js"));
app.use("/api/ourmember", require("./routes/ourmemberRoutes.js"));
app.use("/api/servicebox", require("./routes/serviceboxRoutes.js"));
app.use("/api/contact", require('./routes/contactRoutes.js'));
app.use("/api/blog", require("./routes/blogRoutes.js"));
app.use("/api/industries",  require("./routes/industryRoutes.js"));
app.use("/api/services", require('./routes/serviceRoutes.js'));
app.use("/api/portfolios", require('./routes/portfolioRoutes.js'));
app.use("/api/clientreviews", require("./routes/clientReviewRoutes.js"));
// app.use("/api/courses", courseRoutes); ← comment this
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/admin", adminRoutes);

app.use("/api/admin/services", adminServices);

// app.use("/api/admin/payment", paymentRoutes);

// app.use(notFound);
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

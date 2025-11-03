const Contact = require("../models/Contact");
const sendMail = require("../utils/sendMail");

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    // console.log("Form Data Received:", req.body);


    if (!name || !email || !message) {
      const fieldErrors = {};
      if (!name) fieldErrors.name = "Name is required";
      if (!email) fieldErrors.email = "Email is required";
      if (!message) fieldErrors.message = "Message is required";
      return res.status(400).json({ error: "Validation failed", fieldErrors });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        fieldErrors: { email: "Please provide a valid email address" },
      });
    }

    //  Save to database
    await Contact.create({ name, email, phone, message });
    console.log(" Contact form data saved to database");


    try {
      // Admin notification
      await Promise.all([
        sendMail(
          process.env.ADMIN_EMAIL,
          `📩 New Contact Form Submission from ${name}`,
          `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "N/A"}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `
        ),
        sendMail(
          email,
          "We’ve received your query!",
          `
      <h2>Hi ${name},</h2>
      <p>Thank you for contacting <strong>PixelGenix</strong>. We’ve received your message and will get back to you soon.</p>
      <br/>
      <p><strong>Your submitted details:</strong></p>
      <ul>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone || "N/A"}</li>
        <li><strong>Message:</strong> ${message}</li>
      </ul>
      <br/>
      <p>Best Regards,<br/>The PixelGenix Team</p>
    `
        )
      ]);

      // console.log(` User confirmation email sent to ${email}`);
    } catch (mailError) {
      // console.error(" Error sending emails:", mailError);
      return res.status(500).json({
        error: "Contact saved but failed to send emails",
      });
    }

    //  Final response
    res.status(200).json({ message: "Contact form submitted successfully!" });
  } catch (error) {
    // console.error(" Error submitting contact form:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};


// Get all contact form submissions
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
};

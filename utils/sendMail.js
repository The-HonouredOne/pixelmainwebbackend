// // utils/sendMail.js
// const nodemailer = require("nodemailer");

// const sendMail = async (to, subject, html) => {
//   const transporter = nodemailer.createTransport({
//     host: "smtp-relay.brevo.com",
//     port: 587,
//     secure: false, // true for 465, false for 587
//     auth: {
//       user: process.env.BREVO_USER,
//       pass: process.env.BREVO_PASS,
//     },
//   });

//   const mailOptions = {
//     from: `"Pixel Genix" <${process.env.ADMIN_EMAIL}>`,
//     to,
//     subject,
//     html,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log("✅ Email sent successfully:", info.messageId);
//     return info;
//   } catch (error) {
//     console.error("❌ Error sending email:", error);
//     throw error;
//   }
// };

// module.exports = sendMail;





// utils/sendMail.js
const Brevo = require("@getbrevo/brevo");

const sendMail = async (to, subject, html) => {
  try {
    const apiInstance = new Brevo.TransactionalEmailsApi();
    apiInstance.authentications["apiKey"].apiKey = process.env.BREVO_API_KEY;

    const sendSmtpEmail = {
      sender: { name: "Pixel Genix", email: process.env.ADMIN_EMAIL },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    };

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("✅ Email sent successfully:", response.messageId || response);
  } catch (error) {
    console.error("❌ Error sending email:", error.message || error);
  }
};

module.exports = sendMail;

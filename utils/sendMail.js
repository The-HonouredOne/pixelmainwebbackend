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
const SibApiV3Sdk = require("@getbrevo/brevo");

const sendMail = async (to, subject, html) => {
  try {
    const client = SibApiV3Sdk.ApiClient.instance;
    client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

    const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    const sendSmtpEmail = {
      sender: { name: "Pixel Genix", email: "your_verified_sender@domain.com" },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    };

    const data = await tranEmailApi.sendTransacEmail(sendSmtpEmail);
    console.log("✅ Email sent successfully:", data.messageId || data);
  } catch (error) {
    console.error("❌ Error sending email:", error.message || error);
  }
};

module.exports = sendMail;


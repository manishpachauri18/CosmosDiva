// api/send-email.js

const nodemailer = require("nodemailer");

// This is the main entry point for the Vercel serverless function
module.exports = async (req, res) => {
  // Only allow POST requests
  if (req.method === "POST") {
    const { to, subject, text } = req.body;

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // You can use any email service (e.g., 'gmail', 'yahoo', etc.)
      auth: {
        user: process.env.EMAIL_USER, // Use your email from the environment variable
        pass: process.env.EMAIL_PASS, // Use your app password from the environment variable
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email
      to, // Recipient email
      subject, // Email subject
      text, // Email body text
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Failed to send email" });
    }
  } else {
    // Handle non-POST requests
    res.status(405).send("Method Not Allowed");
  }
};

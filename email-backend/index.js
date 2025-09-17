const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config(); // For using environment variables

const app = express();
const port = 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse incoming JSON

// Email sending route
app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail", // You can use any email service (e.g., 'gmail', 'yahoo', etc.)
    auth: {
      user: process.env.EMAIL_USER, // Use your email here or from .env
      pass: process.env.EMAIL_PASS, // Use your email password or an app-specific password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email
    to, // Recipient email
    subject, // Email subject
    text, // Email body text
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

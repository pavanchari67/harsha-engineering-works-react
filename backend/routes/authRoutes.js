const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Temporary OTP storage (CMD-based)
const otpStore = {};

// ============================================================
// CHECK USER
// ============================================================

router.post("/check-user", async (req, res) => {
  try {
    const { phone } = req.body;

    const user = await User.findOne({ phone });

    res.json({
      exists: !!user,
      user: user || null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// ============================================================
// SEND OTP - CMD BASED
// ============================================================

router.post("/send-otp", async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        message: "Phone number is required",
      });
    }

    // Generate 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Store OTP
    otpStore[phone] = {
      otp: otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    };

    // Show OTP in CMD
    console.log("");
    console.log("=================================");
    console.log("       HARsha ENGINEERING WORKS");
    console.log("=================================");
    console.log(`Phone: ${phone}`);
    console.log(`OTP:   ${otp}`);
    console.log("Valid for: 5 minutes");
    console.log("=================================");
    console.log("");

    res.json({
      success: true,
      message: "OTP generated successfully",
      otp: otp,
    });
  } catch (error) {
    console.error("SEND OTP ERROR:", error);

    res.status(500).json({
      message: "Failed to generate OTP",
      error: error.message,
    });
  }
});

// ============================================================
// VERIFY OTP
// ============================================================

router.post("/verify-otp", async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const stored = otpStore[phone];

    if (!stored) {
      return res.status(400).json({
        success: false,
        message: "OTP not found. Please request a new OTP.",
      });
    }

    if (Date.now() > stored.expiresAt) {
      delete otpStore[phone];

      return res.status(400).json({
        success: false,
        message: "OTP expired. Please request a new OTP.",
      });
    }

    if (stored.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // OTP verified successfully
    delete otpStore[phone];

    res.json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);

    res.status(500).json({
      message: "Failed to verify OTP",
      error: error.message,
    });
  }
});

module.exports = router;
const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const repairRoutes = require("./routes/repairRoutes");

const app = express();

app.use(cors());

// Increased limit because repair requests can contain images
app.use(express.json({ limit: "20mb" }));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", repairRoutes);

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Harsha Engineering Works Backend is running!"
    });
});

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });
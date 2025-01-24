const express = require("express");
const multer = require("multer");
const Video = require("../models/Video"); // Ensure this is the correct path to your Video model

const router = express.Router();

// Ensure the uploads directory exists
const fs = require("fs");
const path = require("path");
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // Limit file size to 100MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["video/mp4", "video/mkv", "video/webm"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid file type. Only MP4, MKV, and WEBM are allowed."));
    }
    cb(null, true);
  },
});

// Route to upload a video
router.post("/upload", upload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No video file provided." });
    }

    const newVideo = new Video({
      title: req.body.title || req.file.originalname,
      description: req.body.description || "",
      url: `/uploads/${req.file.filename}`,
    });

    await newVideo.save();
    res.status(201).json({ message: "Video uploaded successfully!", video: newVideo });
  } catch (err) {
    console.error("Error uploading video:", err);
    res.status(500).json({ error: "Failed to upload video." });
  }
});

// Route to fetch all videos
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (err) {
    console.error("Error fetching videos:", err);
    res.status(500).json({ error: "Failed to fetch videos." });
  }
});

// Route to delete a video
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the video by ID
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ error: "Video not found." });
    }

    // Delete the video file
    const filePath = path.join(__dirname, "../", video.url);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete the video document from the database
    await Video.findByIdAndDelete(id);

    res.status(200).json({ message: "Video deleted successfully." });
  } catch (err) {
    console.error("Error deleting video:", err);
    res.status(500).json({ error: "Failed to delete video." });
  }
});

module.exports = router;

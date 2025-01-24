// routes/videoUploadRoute.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const authenticateAdmin = require('../middleware/authenticateAdmin');
const Subscription = require('../models/subscriptionModel');
const fs = require('fs');
const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Upload video route
router.post('/api/upload', authenticateAdmin, upload.single('video'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const videoFilePath = `/uploads/${req.file.filename}`;

  // Save the video information in the database (if subscription is active)
  const token = req.headers.authorization?.split(' ')[1]; // Get the token from headers
  const userId = req.admin.id; // Assuming the token contains the admin ID
  const subscription = await Subscription.findOne({ userId });

  if (!subscription || !subscription.isActive || subscription.expirationDate < new Date()) {
    return res.status(403).json({ error: 'You must have an active subscription to upload videos.' });
  }

  res.json({ filePath: videoFilePath });
});

module.exports = router;

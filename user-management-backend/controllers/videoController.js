const Video = require('../models/Video');

// Create a new video
exports.createVideo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const videoUrl = `/uploads/${req.file.filename}`;
    const video = new Video({ title, description, videoUrl });
    await video.save();
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create video.' });
  }
};

// Get all videos
exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch videos.' });
  }
};

// Get a video by ID
exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found.' });
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch video.' });
  }
};

// Update a video by ID
exports.updateVideo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update video.' });
  }
};

// Delete a video by ID
exports.deleteVideo = async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Video deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete video.' });
  }
};

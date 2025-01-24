// routes/courses.js
const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// Route to get course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve course data' });
  }
});

module.exports = router;

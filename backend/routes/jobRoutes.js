const express = require('express');
const Job = require('../models/Job');
const router = express.Router();

// Fetch job recommendations based on user data
router.get('/recommendations', async (req, res) => {
  // Fetch user information and generate recommendations using your ML model
  try {
    const jobs = await Job.find().limit(5); // Placeholder for actual recommendation logic
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

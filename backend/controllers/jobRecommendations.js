const Job = require('../models/Job');

// Example job recommendations logic (mock data for now)
const getRecommendations = async (req, res) => {
  const { limit = 5 } = req.query;
  try {
    // Here we would fetch data from the database (or external API)
    const jobs = await Job.find().limit(parseInt(limit)); // Fetch jobs from database
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching job recommendations:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = { getRecommendations };

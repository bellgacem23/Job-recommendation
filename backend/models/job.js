const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  similarity: { type: Number, required: true },  // Similarity to user's profile
  description: { type: String },
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;

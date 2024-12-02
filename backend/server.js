const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jobRoutes = require('./routes/jobRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON body requests

// Routes
app.use('/api', jobRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

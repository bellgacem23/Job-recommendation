const axios = require('axios');

router.get('/recommendations', async (req, res) => {
  const userProfile = {
    title: 'Software Developer',
    skills: 'Python, JavaScript',
    experience: '5 years'
  };

  try {
    // Make an API request to the Python service
    const response = await axios.post('http://localhost:5000/recommendations', userProfile);

    // Return the recommendations from the Python service
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching recommendations' });
  }
});

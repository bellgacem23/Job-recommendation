import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [limit, setLimit] = useState(5); // Initial limit of 5 jobs
  const [loading, setLoading] = useState(false);

  // Fetch job recommendations when the component mounts or when the limit changes
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/recommendations?limit=${limit}`);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching job recommendations:', error);
      }
      setLoading(false);
    };
    fetchJobs();
  }, [limit]);

  // Handle the "See More" button click to increase the limit
  const handleSeeMore = () => {
    if (limit < 20) setLimit(limit + 10); // Increase the limit by 10
  };

  return (
    <Container className="py-5">
      {/* Home Page Introduction */}
      <div className="text-center mt-5">
        <h1>Welcome to Job Recommendations</h1>
        <p>Find jobs tailored to your skills and experience.</p>
      </div>

      {/* Recommended Jobs Section */}
      <h2 className="text-center mb-4">Recommended Jobs</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row>
          {jobs.map((job) => (
            <Col md={4} key={job.id} className="mb-4">
              <Card className="shadow">
                <Card.Body>
                  <Card.Title>{job.title}</Card.Title>
                  <Card.Text>Company: {job.company}</Card.Text>
                  <Card.Text>Match: {job.similarity}%</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* "See More" Button */}
      {limit < 20 && (
        <div className="text-center mt-4">
          <Button variant="primary" onClick={handleSeeMore}>
            See More
          </Button>
        </div>
      )}
    </Container>
  );
};

export default HomePage;

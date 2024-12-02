import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

const Recommendations = () => {
  const [jobs, setJobs] = useState([]);
  const [limit, setLimit] = useState(5); // Initial limit of 5 jobs
  const [loading, setLoading] = useState(false);

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

  const handleSeeMore = () => {
    if (limit < 20) setLimit(limit + 10); // Increase the limit by 10
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Recommended Jobs</h1>
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

export default Recommendations;

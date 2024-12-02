import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">Job Recommendations</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Navigation;

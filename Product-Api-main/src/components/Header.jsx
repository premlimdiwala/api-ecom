import React from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
  const navStyle = {
    background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
    padding: '15px 0',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  };

  const brandStyle = {
    color: '#00d9a6',
    fontWeight: 'bold',
    fontSize: '24px',
    letterSpacing: '1px',
    textDecoration: 'none'
  };

  const linkStyle = {
    margin: '0 10px',
    textDecoration: 'none',
  };

  const buttonStyle = {
    backgroundColor: 'transparent',
    border: '2px solid #00d9a6',
    color: '#00d9a6',
    borderRadius: '25px',
    padding: '8px 20px',
    fontWeight: '600',
    transition: 'all 0.3s ease-in-out'
  };

  const hoverButtonStyle = {
    backgroundColor: '#00d9a6',
    color: '#0f2027',
    border: '2px solid #00d9a6'
  };

  return (
    <Navbar expand="lg" style={navStyle}>
      <Container>
        <Navbar.Brand as={Link} to="/" style={brandStyle}>
          🛍️ TealStore
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ backgroundColor: '#00d9a6' }} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">

            <Link to="/" style={linkStyle}>
              <Button
                style={buttonStyle}
                onMouseOver={(e) => Object.assign(e.target.style, hoverButtonStyle)}
                onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
              >
                Home
              </Button>
            </Link>

            <Link to="/addProduct" style={linkStyle}>
              <Button
                style={buttonStyle}
                onMouseOver={(e) => Object.assign(e.target.style, hoverButtonStyle)}
                onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
              >
                ➕ Add Product
              </Button>
            </Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

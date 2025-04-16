import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams, Link } from 'react-router-dom';
import Review from './Review';

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    document.body.style.background = 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)';
    document.body.style.minHeight = '100vh';
    document.body.style.color = '#ffffff';

    const getProduct = async () => {
      const details = await fetch(`http://localhost:3000/products/${productId}`);
      const data = await details.json();
      setProduct(data);
    };
    getProduct();

    return () => {
      document.body.style.background = '';
    };
  }, [productId]);

  const sectionStyle = {
    background: 'rgba(55, 71, 79, 0.9)',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 4px 20px rgba(0, 217, 166, 0.15)',
    color: '#eceff1',
  };

  const headingStyle = {
    textAlign: 'center',
    marginBottom: '40px',
    color: '#00d9a6',
    fontWeight: 'bold',
    fontSize: '36px',
  };

  const categoryStyle = {
    backgroundColor: '#00d9a6',
    color: '#0f2027',
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const priceStyle = {
    color: '#00d9a6',
    fontSize: '28px',
    fontWeight: '600',
    marginBottom: '20px',
  };

  const buttonStyle = {
    backgroundColor: 'transparent',
    border: '2px solid #00d9a6',
    color: '#00d9a6',
    borderRadius: '25px',
    padding: '10px 20px',
    fontWeight: '600',
    transition: 'all 0.3s ease-in-out',
    marginTop: '20px',
    textDecoration: 'none',
    display: 'inline-block'
  };

  return (
    <Container className="py-5">
      <h1 style={headingStyle}>📦 Product Details</h1><br /><br />
      <Row className="align-items-center g-5" style={sectionStyle}>
        <Col md={6} className="text-center">
          <img
            src={product.image}
            alt={product.title}
            height="300"
            className="img-fluid rounded"
            style={{
              objectFit: 'contain',
              maxHeight: '400px',
              boxShadow: '0 4px 15px rgba(0, 217, 166, 0.2)',
              backgroundColor: '#263238',
              borderRadius: '10px',
              padding: '10px'
            }}
          />
        </Col>
        <Col md={6}>
          <h3 style={{ fontWeight: 'bold' }}>{product.title}</h3>
          <div style={categoryStyle}>{product.category}</div>
          <div style={priceStyle}>₹ {Number(product.price).toLocaleString('en-IN')}</div>
          <p style={{ fontSize: '1.1rem', color: '#cfd8dc' }}>{product.description}</p>

          <Link
            to="/"
            style={buttonStyle}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#00d9a6';
              e.target.style.color = '#0f2027';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#00d9a6';
            }}
          >
            ⬅️ Back to Products
          </Link>
        </Col>
      </Row>

      <hr className="my-5" style={{ borderColor: '#00d9a6' }} />

     
      <Review productId={productId} />
    </Container>
  );
}

export default ProductDetails;

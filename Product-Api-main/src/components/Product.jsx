import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function Product() {
  const [product, setProducts] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null); 

  useEffect(() => {
    document.body.style.background = 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)';
    document.body.style.minHeight = '100vh';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.fontFamily = "'Segoe UI', sans-serif";

    getProducts();

    return () => {
      document.body.style.background = '';
    };
  }, []);

  const getProducts = async () => {
    try {
      const data = await fetch("http://localhost:3000/products");
      const records = await data.json();
      setProducts(records);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const deleteProductData = async (id) => {
    await fetch(`http://localhost:3000/products/${id}`, {
      method: "delete",
    });
    getProducts();
  };

  const containerStyle = {
    paddingTop: '50px',
    paddingBottom: '50px',
    color: '#fff',
  };

  const headingStyle = {
    textAlign: 'center',
    marginBottom: '40px',
    color: '#00d9a6',
    fontSize: '32px',
    fontWeight: 'bold',
  };

  const cardStyle = {
    background: 'rgba(55, 71, 79, 0.9)',
    border: '1px solid #00d9a6',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 217, 166, 0.15)',
    color: '#eceff1',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out', 
  };

  const priceStyle = {
    color: '#00d9a6',
    fontWeight: '600',
    fontSize: '18px',
  };

  const btnStyle = {
    borderRadius: '20px',
    fontWeight: '600',
    padding: '6px 15px',
    fontSize: '14px',
    border: 'none',
  };


  const viewMoreBtn = {
    backgroundColor: 'transparent',
    border: '1px solid #00d9a6',
    color: '#00d9a6',
    borderRadius: '20px',
    fontWeight: '600',
    marginTop: '10px',
    transition: 'all 0.3s ease-in-out',
  };

  const cardHover = {
    transform: 'scale(1.05)', 
    boxShadow: '0 8px 25px rgba(0, 217, 166, 0.3)', 
    borderColor: '#00d9a6', 
  };

  const viewMoreBtnHover = {
    backgroundColor: '#00d9a6',
    color: '#0f2027',
  };

  return (
    <Container style={containerStyle}>
      <h2 style={headingStyle}>✨ Our Products</h2>
      <Row className="g-4 justify-content-center">
        {product.map((v) => (
          <Col key={v.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              className="shadow-sm h-100"
              style={hoveredCard === v.id ? { ...cardStyle, ...cardHover } : cardStyle} 
              onMouseEnter={() => setHoveredCard(v.id)} 
              onMouseLeave={() => setHoveredCard(null)} 
            >
              <Card.Img
                variant="top"
                src={v.image}
                height="200px"
                style={{ objectFit: "contain", padding: "10px" }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="text-truncate">{v.title}</Card.Title>
                <Card.Text className="small" style={{ flexGrow: 1, color: '#b0bec5' }}>
                  {v.description.slice(0, 90)}...
                </Card.Text>
                <div style={priceStyle}>₹ {Number(v.price).toLocaleString('en-IN')}</div>


                <div className="d-flex justify-content-between mt-3">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    style={btnStyle}
                    onClick={() => deleteProductData(v.id)}
                  >
                    ❌ Delete
                  </Button>
                  <Link to={`/UpdateProduct/${v.id}`}>
                    <Button
                      variant="outline-warning"
                      size="sm"
                      style={btnStyle}
                    >
                      ✏️ Update
                    </Button>
                  </Link>
                </div>

                <Link to={`/ProductDetails/${v.id}`}>
                  <Button
                    style={viewMoreBtn}
                    className="w-100"
                    onMouseOver={(e) => Object.assign(e.target.style, viewMoreBtnHover)} 
                    onMouseOut={(e) => Object.assign(e.target.style, viewMoreBtn)} 
                  >
                    👁️ View More
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Product;

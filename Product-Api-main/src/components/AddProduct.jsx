import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState({});
  const navigate = useNavigate(); 


  useEffect(() => {
    document.body.style.background = 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)';
    document.body.style.minHeight = '100vh';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.fontFamily = "'Segoe UI', sans-serif";

   
    return () => {
      document.body.style.background = '';
    };
  }, []);

  useEffect(() => {
    const getCategory = async () => {
      const getCatData = await fetch("https://fakestoreapi.com/products/categories");
      const cateData = await getCatData.json();
      setCategory(cateData);
    };
    getCategory();
  }, []);

  const getInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const submitData = async (e) => {
    e.preventDefault();

    
    if (!product.category || !product.title || !product.price || !product.description || !product.image) {
      toast.error("❌ Please fill all the fields before submitting.");
      return; 
    }

   
    const addPro = await fetch("http://localhost:3000/products", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (addPro.ok) {
      toast.success("✅ Product inserted successfully");

      setTimeout(() => {
        navigate("/"); 
      }, 1000); 
    } else {
      toast.error("❌ Something went wrong, please try again.");
    }
  };

  const containerStyle = {
    maxWidth: "650px",
    margin: "80px auto",
    padding: "40px",
    borderRadius: "15px",
    background: "rgba(33, 47, 61, 0.9)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
    color: "#fff"
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "28px",
    fontWeight: "700",
    color: "#00d9a6"
  };

  const labelStyle = {
    fontWeight: "500",
    color: "#b0bec5"
  };

  const inputStyle = {
    backgroundColor: "#37474f",
    color: "#fff",
    border: "1px solid #546e7a",
    borderRadius: "8px",
    padding: "10px",
  };

  const buttonStyle = {
    backgroundColor: "#00d9a6",
    border: "none",
    borderRadius: "8px",
    padding: "12px 25px",
    fontWeight: "600",
    letterSpacing: "0.5px",
    fontSize: "16px",
    boxShadow: "0 4px 14px rgba(0, 217, 166, 0.4)",
    transition: "all 0.3s ease-in-out"
  };

  return (
    <Container>
      <Row style={containerStyle}>
        <Col>
          <Form onSubmit={submitData}>
            <h2 style={headingStyle}>🛒 Add New Product</h2>

            <Form.Group className="mb-4">
              <Form.Label style={labelStyle}>Category</Form.Label>
              <Form.Select
                name="category"
                onChange={getInput}
                style={inputStyle}
              >
                <option value="">-- Select Category --</option>
                {category.map((v, i) => (
                  <option key={i} value={v}>{v}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label style={labelStyle}>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter product title"
                onChange={getInput}
                style={inputStyle}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label style={labelStyle}>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Enter price"
                onChange={getInput}
                style={inputStyle}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label style={labelStyle}>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Enter product description"
                onChange={getInput}
                style={inputStyle}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label style={labelStyle}>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                placeholder="Enter image URL"
                onChange={getInput}
                style={inputStyle}
              />
            </Form.Group>

            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <Button
                type="submit"
                style={buttonStyle}
                onMouseOver={e => e.target.style.backgroundColor = "#00b894"}
                onMouseOut={e => e.target.style.backgroundColor = "#00d9a6"}
              >
                ➕ Add Product
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}


export default AddProduct;

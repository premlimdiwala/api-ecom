/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateProduct() {
  let [category, setCategory] = useState([]);
  let [product, setProduct] = useState({});
  let prodata = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    getCategory();
    getSingleProductDetails();
  }, [setCategory, setProduct]);

  let getSingleProductDetails = async () => {
    let productDetails = await fetch("http://localhost:3000/products/" + prodata.productId);
    let details = await productDetails.json();
    setProduct(details);
  };

  let getCategory = async () => {
    let getCatData = await fetch("https://fakestoreapi.com/products/categories");
    let cateData = await getCatData.json();
    setCategory(cateData);
  };

  let getInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setProduct({ ...product, [name]: value });
  };

  let submitData = async (e) => {
    e.preventDefault();
    console.log(product);
    await fetch("http://localhost:3000/products/" + prodata.productId, {
      method: "put",
      body: JSON.stringify(product),
    });

    toast.success("Product updated successfully");

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div style={{ backgroundColor: '#263238', minHeight: '100vh', paddingTop: '50px' }}>
      <Container className="my-5 p-5" style={{ background: '#263238', borderRadius: '10px', color: '#ffffff' }}>
        <Row style={{ width: '500px', margin: '0 auto' }}>
          <Col>
            <Form onSubmit={(e) => submitData(e)} method="post">
              <h1 className="text-center mb-4" style={{ color: '#00d9a6' }}>Update Product</h1>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Category
                </Form.Label>
                <Col sm="9">
                  <Form.Select
                    aria-label="Default select example"
                    name="category"
                    onChange={(e) => getInput(e)}
                    value={product.category || ''}
                    style={{
                      backgroundColor: '#263238',
                      color: '#eceff1',
                      border: '2px solid #00d9a6',
                      borderRadius: '10px',
                    }}
                  >
                    <option value="">---Select Category---</option>
                    {category.map((v, i) => {
                      return (
                        <option key={i} value={v}>
                          {v}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Title
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    name="title"
                    value={product.title || ''}
                    onChange={(e) => getInput(e)}
                    style={{
                      backgroundColor: '#263238',
                      color: '#eceff1',
                      border: '2px solid #00d9a6',
                      borderRadius: '10px',
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Price
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="number"
                    name="price"
                    value={product.price || ''}
                    onChange={(e) => getInput(e)}
                    style={{
                      backgroundColor: '#263238',
                      color: '#eceff1',
                      border: '2px solid #00d9a6',
                      borderRadius: '10px',
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Description
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={product.description || ''}
                    onChange={(e) => getInput(e)}
                    style={{
                      backgroundColor: '#263238',
                      color: '#eceff1',
                      border: '2px solid #00d9a6',
                      borderRadius: '10px',
                      resize: 'none',
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  Image
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    name="image"
                    value={product.image || ''}
                    onChange={(e) => getInput(e)}
                    style={{
                      backgroundColor: '#263238',
                      color: '#eceff1',
                      border: '2px solid #00d9a6',
                      borderRadius: '10px',
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3"></Form.Label>
                <Col sm="9">
                  <Button
                    type="submit"
                    className="w-100"
                    style={{
                      backgroundColor: '#00d9a6',
                      borderColor: '#00d9a6',
                      fontWeight: 'bold',
                      padding: '10px',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#00b597'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#00d9a6'}
                  >
                    Update Product
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </div>
  );
}

export default UpdateProduct;

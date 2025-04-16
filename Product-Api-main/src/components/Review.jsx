import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaStar } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

function Review(props) {
  const [star, setStar] = useState([1, 2, 3, 4, 5]);
  const [activestar, setActiveStar] = useState(-1);
  const [review, setReview] = useState({});
  const [allReview, setAllReview] = useState([]);

  useEffect(() => {
    getReviews();
  }, [setAllReview]);

  const getReviews = async () => {
    const productReview = await fetch(`http://localhost:3000/reviews/?productId=${props.productId}`);
    const data = await productReview.json();
    setAllReview(data);
  };

  const getInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setReview({ ...review, [name]: value });
  };

  const addReview = async (e) => {
    e.preventDefault();
    const obj = { ...review, star: activestar, productId: props.productId };

    const addRe = await fetch("http://localhost:3000/reviews", {
      method: "post",
      body: JSON.stringify(obj),
    });

    if (addRe.ok) {
      toast.success("Review Added");

      setReview({});
      setActiveStar(-1);

      getReviews();
    } else {
      toast.error("Failed to submit review. Please try again.");
    }
  };

  return (
    <Container className="my-5 p-4 rounded shadow-sm" style={{ background: 'rgba(30, 55, 75, 0.85)', color: '#ffffff' }}>
      <h2 className="text-center mb-4" style={{ color: '#00d9a6' }}>Customer Reviews</h2>

      <Row className="justify-content-center">
        <Col md={8}>
          <form method="post" onSubmit={(e) => addReview(e)} className="mb-4">
            <div className="mb-3 d-flex align-items-center">
              {star.map((v, i) => (
                <FaStar
                  key={i}
                  onMouseOver={() => setActiveStar(i + 1)}
                  style={{
                    color: activestar > i ? "#00d9a6" : "#e4e5e9",
                    fontSize: "1.8rem",
                    cursor: "pointer",
                    transition: "color 0.3s",
                  }}
                />
              ))}
              <Button
                variant="outline-secondary"
                size="sm"
                className="ms-3"
                type="button"
                onClick={() => setActiveStar(-1)}
                style={{
                  border: '2px solid #00d9a6',
                  color: '#00d9a6',
                  backgroundColor: 'transparent',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#00d9a6'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                Reset
              </Button>
            </div>

            <textarea
              name="description"
              placeholder="Write your review..."
              onChange={(e) => getInput(e)}
              className="form-control mb-3"
              rows="3"
              required
              style={{
                resize: "none",
                backgroundColor: '#263238',
                color: '#eceff1',
                border: '2px solid #00d9a6',
                borderRadius: '10px',
                padding: '10px',
                fontSize: '1rem',
              }}
              value={review.description || ''}
            ></textarea>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              style={{
                backgroundColor: '#00d9a6',
                borderColor: '#00d9a6',
                fontWeight: 'bold',
                padding: '10px',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#00d9a6'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#00d9a6'}
            >
              Submit Review
            </Button>
          </form>
        </Col>
      </Row>

      <hr className="my-5" style={{ borderColor: '#00d9a6' }} />

      <Row className="justify-content-center">
        <Col md={8}>
          {allReview.length === 0 ? (
            <p className="text-center text-muted">No reviews yet. Be the first to review!</p>
          ) : (
            allReview.map((v, i) => (
              <div
                key={i}
                className="mb-4 p-3 border rounded"
                style={{
                  backgroundColor: '#263238',
                  color: '#eceff1',
                  boxShadow: '0 4px 20px rgba(0, 217, 166, 0.2)',
                }}
              >
                <div className="mb-2">
                  {v.star > 0 &&
                    [...Array(v.star)].map((_, i) => (
                      <FaStar
                        key={i}
                        style={{ color: '#00d9a6', fontSize: '1.4rem' }}
                      />
                    ))}
                </div>
                <p style={{ fontSize: '1rem' }}>{v.description}</p>
              </div>
            ))
          )}
        </Col>
      </Row>

      <ToastContainer />
    </Container>
  );
}

export default Review;

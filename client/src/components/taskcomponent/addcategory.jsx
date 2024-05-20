import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const AddCategory = () => {
  return (
    <div>
      <Container>
        <Row className="align-items-center">
          <Col sm={3} className='text-right'>
            <h4>Category</h4>
          </Col>
          <Col sm={6} className="d-flex justify-content-center">
            <Form.Group className="w-100">
              <Form.Control type="text" placeholder="Search" style={{ width: "100%" }} />
            </Form.Group>
          </Col>
          <Col sm={3} className="text-right">
            <Link to="/categoryinputs"> {/* Wrap the Button with Link component */}
              <Button variant="" style={{
                backgroundColor: "purple",
                color: "white",
                padding: "8px"
              }}> Add New</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AddCategory;

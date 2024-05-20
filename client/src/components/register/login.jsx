import React, { useState } from 'react';
import { Container, Form, Button, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
 import { signin } from '../../redux/authSlice';
import './Login.css';


// Import your background image
import backgroundImage from '../images/image 293.png'; // Adjust the path to your image

function Login() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(
      signin({
        email: formData.email,
        password: formData.password,
      })
    );
  };

  return (
    <div className="login" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <Container>
        <Col md={6} className="d-flex justify-content-start align-items-center" style={{ height: '80vh', paddingLeft: '50px' }}>
          <Card className="p-4" style={{ top: "50px",width: '400px', height: '420px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px', left: '10px' }}>
            <Card.Body>
              <h2 className="text-center mb-4">Digitalflake</h2>
              <p style={{ textAlign: 'center', color: 'gray' }}>Welcome to Digitalflake Admin</p>
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{ marginBottom: '15px', padding: '10px' }}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    style={{ marginBottom: '15px', padding: '10px' }}
                  />
                </Form.Group>
                <div className="text-left mb-3">
                  <a href="/signup" style={{ color: 'grey', float: 'right' }}>Forgot Password?</a>
                </div>
                <Button variant="primary" type="submit" className="w-100" style={{ backgroundColor: '#800080', border: 'none', marginTop: '' }}>
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Container>
    </div>
  );
}

export default Login;

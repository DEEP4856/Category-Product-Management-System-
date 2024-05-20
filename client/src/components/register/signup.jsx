import React, { useState } from 'react';
import { Form, Button, Container, Card, Col } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/authSlice';
import backgroundImage from '../images/image 293.png'; 
import './Login.css';

function SignUp() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value); // Check if handleInputChange is being called and inputs' values
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    
      dispatch(
        
        register({

        username: formData.username ,
         email: formData.email, 
         password: formData.password ,



       })
       
       
       );
  
     
  };
  console.log(formData.email, formData.password, formData.username);
  return (
  <div  className="login" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
    <Container>
      <Col md={6} className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <Card className="p-4" style={{ width: '400px', height: '470px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: "10px", left: "10px" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Digitalflake</h2>
            <p style={{ textAlign: "center", color: "gray" }}>Welcome to Digitalflake Admin</p>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="mb-2"
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mb-2"
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="mb-2"
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 mt-3" style={{ backgroundColor: '#800080', border: 'none' }}>
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Container>
</div>  
  );
}

export default SignUp;

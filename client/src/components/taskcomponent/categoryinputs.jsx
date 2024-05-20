import React, { useState } from 'react';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from React Router
import Sidebar from '../../components/sidebar/sidebar';
import './task.css';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from "../../redux/taskSlice";

const CategoryInputs = () => {

  const dispatch = useDispatch();
  const { auth } = useSelector((formData) => ({ ...formData }));

  const { currentUser } = auth;


  const [formData, setFormData] = useState({ categoryName: '', description: '', status: '' });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    dispatch(addTask(formData.categoryName,formData.description, formData.status,currentUser.id));


    setFormData({ categoryName: '', description: '', status: '' });



    // Perform form submission logic here
    console.log("Form submitted:", formData);
    // Reset form fields
   
  };

  return (
    <div style={{ backgroundColor: '', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: '', alignItems: 'center', position: 'relative' }}>
      {/* Sidebar */}
      <Sidebar />
      {/* Main content */}
      <Container className='catagory-container' style={{ marginTop: '20px', textAlign: 'center' }}>
        <div className='catagory-title'>
          <h2>Add Category</h2>
        </div>
        <Form style={{ marginLeft: "22vh" }} onSubmit={handleSubmit}>
          <Row className="justify-content-center">
            <Col md={4} style={{ paddingLeft: '20px', paddingRight: '20px' }}>
              <Form.Group controlId="categoryName">
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  type="text"
                  name="categoryName"
                  placeholder="Enter category name"
                  value={formData.categoryName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4} style={{ paddingLeft: '20px', paddingRight: '20px' }}>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={4} style={{ paddingLeft: '20px', paddingRight: '20px' }}>
              <Form.Group controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select status</option>
                  <option value="active"  >Active</option>
                  <option value="inactive" >Inactive</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <div style={{ position: 'absolute', bottom: '70px', right: '20px' }}>
            <Link to="/category">
              <Button variant="" style={{ marginRight: '10px', borderColor: "purple", borderRadius: "8px", backgroundColor: "#fff" }}>Cancel</Button>
            </Link>
            <Button style={{ backgroundColor: "purple", color: "#fff", borderRadius: "8px" }} variant="" type="submit">Add Category</Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default CategoryInputs;

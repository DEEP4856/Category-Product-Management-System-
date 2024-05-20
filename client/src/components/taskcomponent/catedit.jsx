import React, { useState, useEffect } from 'react';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { editTask } from '../../redux/taskSlice';
import Sidebar from '../../components/sidebar/sidebar';
import './task.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const Catedit = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { auth } = useSelector((state) => state);
  const { currentUser } = auth;
  const [formData, setFormData] = useState({ categoryName:'', description: '', status: '' });



 // Fetch existing data for the category and populate the form fields
  useEffect(() => {
    console.log('Fetching category data for id:', id); // Debugging statement
    const fetchData = async () => {
      try {
        // Make API call to fetch category data
        const response = await axios.get(`http://localhost:4000/task/tasks/${id}`);
        console.log('Fetched category data:', response.data); // Debugging statement
        // Update form data with fetched category data
        setFormData({
          categoryName: response.data.categoryName,
          description: response.data.description,
          status: response.data.status
        });
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchData();
  }, [id]);


  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(editTask(formData.categoryName, formData.description, formData.status, currentUser.id));
    console.log("Form submitted:", formData);
  };

  return (
    <div style={{ backgroundColor: '', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: '', alignItems: 'center', position: 'relative' }}>
      {/* Sidebar */}
      <Sidebar />
      {/* Main content */}
      <Container className='catagory-container' style={{ marginTop: '20px', textAlign: 'center' }}>
        <div className='catagory-title'>
          <h2>Edit Category</h2>
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
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <div style={{ position: 'absolute', bottom: '70px', right: '20px' }}>
            <Link to="/category">
              <Button variant="" style={{ marginRight: '10px', borderColor: "purple", borderRadius: "8px", backgroundColor: "#fff" }}>Cancel</Button>
            </Link>
            <Button style={{ backgroundColor: "purple", color: "#fff", borderRadius: "8px" }} variant="" type="submit">Edit Category</Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default Catedit;

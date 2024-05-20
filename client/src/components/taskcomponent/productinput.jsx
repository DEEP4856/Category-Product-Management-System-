import React, { useState } from 'react';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import Sidebar from '../../components/sidebar/sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../redux/productslice';
import './task.css';
import addproduct from './addproduct';

const ProductInput = () => {



  const dispatch = useDispatch();
  const { auth } = useSelector((formData) => ({ ...formData }));

  const { currentUser } = auth;





  const [formData, setFormData] = useState({
    categoryName: '',
    productName: '', // Changed from ProductName
    packSize: '', // Changed from PackSize
    mrp: '',
    productImage: null,
    status: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    dispatch(addProduct(formData.categoryName, formData.productName, formData.packSize, formData.mrp, formData.productImage, formData.status, currentUser.id));
    // Reset form fields
    setFormData({
      categoryName: '',
      ProductName: '',
      PackSize: '',
      mrp: '',
      productImage: null,
      status: ''
    });
    console.log("Form submitted:", formData);
  };

  
  const handleCancel = () => {
    // Implement cancel functionality here
    console.log("Cancel button clicked");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        productImage: file
      });
      console.log(file);
    }
  };

  return (
    <div style={{ backgroundColor: '', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: '', alignItems: 'center', position: 'relative' }}>
      <Sidebar />
      <div>
        <Container className='catagory-container' style={{ marginTop: '20px', textAlign: 'center' }}>
          <div className='catagory-title'>
            <h2>Add Product</h2>
          </div>
          <Form style={{ marginLeft: "22vh" }} onSubmit={handleSubmit}>
            <Row className="justify-content-center" style={{ marginBottom: '20px' }}>
              <Col md={4} style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                <Form.Group controlId="categoryName">
                  <Form.Label>Category Name</Form.Label>
                  <Form.Control
                    as="select"
                    name="categoryName"
                    value={formData.categoryName}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Milk">Milk</option>
                    <option value="Fruits">Fruits</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={4} style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                <Form.Group controlId="productName">
                  <Form.Label>Product name</Form.Label>
                  <Form.Control
                    type='text'
                    name="productName"
                    rows={3}
                    placeholder="Enter ProductName"
                    value={formData.productName}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4} style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                <Form.Group controlId="packSize">
                  <Form.Label>Packsize</Form.Label>
                  <Form.Control
                    type="text"
                    name="packSize"
                    placeholder="Enter PackSize"
                    value={formData.packSize}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-center" style={{ marginBottom: '20px' }}>
              <Col md={4} style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                <Form.Group controlId="mrp">
                  <Form.Label>MRP</Form.Label>
                  <Form.Control
                    type="text"
                    name="mrp"
                    placeholder="Enter MRP"
                    value={formData.mrp}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4} style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                <Form.Group controlId="productImage">
                  <Form.Label>Product Image</Form.Label>
                  <div className="custom-file">
                    <input
                      type="file"
                      accept="image/*"
                      className="custom-file-input"
                      id="inputGroupFile01"
                      onChange={handleImageChange}
                    />
                    <label className="custom-file-label" htmlFor="inputGroupFile01">
                      {formData.productImage ? formData.productImage.name : 'Choose file'}
                    </label>
                  </div>
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
              <Link to="/product">
                <Button variant="" style={{ marginRight: '10px', borderColor: "purple", borderRadius: "8px", backgroundColor: "#fff" }} onClick={handleCancel}>Cancel</Button>
              </Link>
              <Button style={{ backgroundColor: "purple", color: "#fff", borderRadius: "8px" }} variant="" type="submit">Add Product</Button>
            </div>
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default ProductInput;

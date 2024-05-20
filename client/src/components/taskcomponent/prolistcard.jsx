import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { PencilSquare, TrashFill, ExclamationTriangleFill } from 'react-bootstrap-icons'
import './task.css'
import './product.css'
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../redux/productslice';

const ProductListCard = ({ item, index }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    console.log("Deleting product:", item); // Debugging: Log the product being deleted
    dispatch(deleteProduct(item?._id));
    setShowDeleteModal(false); // Hide the delete modal after deletion
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'green' : 'red';
  };

  console.log("Rendering ProductListCard:", item); // Debugging: Log the product being rendered

  return (
    <div className="border rounded p-3 mb-3 category-list-card product-box" style={{ backgroundColor: '#f8f9fa', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', marginTop: '20px', transition: 'background-color 0.3s ease' }}>
      <Container>
        <Row className="align-items-end  card_fromleft">
          <Col style={{ fontWeight: "500" }}>{index}</Col>
          <Col className="text-right">{item?.productName}</Col>
          <Col className="text-right">{item?.packSize}</Col>
          <Col className="text-right">{item?.categoryName}</Col>
          <Col className="text-right">{item?.mrp}</Col>
          <Col className="text-right">
            <div className="image-placeholder">
              <img src={`http://localhost:4000/product/${item?.productImage}`} alt="image" />
            </div>
          </Col>
          <Col className="text-right" style={{ color: getStatusColor(item?.status) }}>{item?.status}</Col>
          <Col className="text-right">
            <Link to={`/Productedit/${item?._id}`}>
              <PencilSquare size={20} className="text-primary mr-2" />
            </Link>
            <TrashFill onClick={() => setShowDeleteModal(true)} size={20} className="text-danger" />
          </Col>
        </Row>
      </Container>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Body className="text-center p-5">
          <h2 className="mb-4">
            <ExclamationTriangleFill className="text-danger mr-2" style={{ fontSize: '2rem' }} />
            Delete
          </h2>
          <p className="mb-4">Are you sure you want to delete this item?</p>
          <div className="d-flex justify-content-center">
            <Button variant="" onClick={() => setShowDeleteModal(false)} className="cancel-button">Cancel</Button>
            <Button variant="" onClick={handleDelete} className="ml-3 delete-button">Confirm</Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ProductListCard;

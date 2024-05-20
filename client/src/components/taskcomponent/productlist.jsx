import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { CaretUpFill, CaretDownFill } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/productslice';
import Productlistcard from './prolistcard';
import './task.css';
import './product.css';

const Productlist = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const products = useSelector((state) => state.product);
  const { currentUser } = auth;
  const { allProducts } = products;

  useEffect(() => {
    dispatch(getAllProducts(currentUser.token, currentUser.id));
  }, [dispatch, currentUser.token, currentUser.id]);

  return (
    <>
      <div className='produtbox' style={{ backgroundColor: '#ffffcc', padding: '10px' }}>
        <Container>
          <Row className="align-items-center">
            <Col className='list-heading'>ID <CaretUpFill /><CaretDownFill /></Col>
            <Col className='list-heading'>Name <CaretUpFill /><CaretDownFill /></Col>
            <Col className='list-heading'>Packsize <CaretUpFill /><CaretDownFill /></Col>
            <Col className='list-heading'>Category <CaretUpFill /><CaretDownFill /></Col>
            <Col className='list-heading'>MRP <CaretUpFill /><CaretDownFill /></Col>
            <Col className='list-heading'>Image<CaretUpFill /><CaretDownFill /></Col>
            <Col className='list-heading'>Status <CaretUpFill /><CaretDownFill /></Col>
          </Row>
        </Container>
      </div>
      <div>
        {allProducts.map((item,index) => (
          <Productlistcard key={item._id} item={item} index={index + 1}/>
        ))}
      </div>
    </>
  );
}

export default Productlist;

import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { CaretUpFill, CaretDownFill, PencilSquare, TrashFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import Catlistcard from './catlistcard';
import { getAllTasks } from '../../redux/taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import './task.css';

const CategoryList = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const tasks = useSelector((state) => state.task);
  const { currentUser } = auth;
  const { AllTasks } = tasks;

  useEffect(() => {
    // the current user with token will validate whaether the user is logged in or not
    dispatch(getAllTasks(currentUser.token, currentUser.id));
  }, [dispatch, currentUser.token, currentUser.id]);

  return (
    <>
      <div style={{ backgroundColor: '#ffffcc', padding: '10px' }}>
        <Container>
          <Row className="align-items-center">
            <Col className='list-heading'>ID <CaretUpFill /><CaretDownFill /></Col>
            <Col className='list-heading'>Name <CaretUpFill /><CaretDownFill /></Col>
            <Col className='list-heading'>Description <CaretUpFill /><CaretDownFill /></Col>
            <Col className='list-heading'>Status <CaretUpFill /><CaretDownFill /></Col>
          </Row>
        </Container>
      </div>
      <div>
      {Object.values(AllTasks).map((item, index) => (
        
    <Catlistcard key={item._id} item={item} index={index+1}/>
  ))}

      </div>
    </>
  );
}

export default CategoryList;

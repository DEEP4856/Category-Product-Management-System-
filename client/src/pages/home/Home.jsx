import React, { useState } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import { BoxArrowRight , ExclamationTriangleFill } from 'react-bootstrap-icons';
import Sidebar from '../../components/sidebar/sidebar'; // Assuming Sidebar component is in the same directory
import  './home.css'
import { useSelector, useDispatch } from 'react-redux';
import {logoutSuccess} from '../../redux/authSlice'
import { Link } from 'react-router-dom';
import history from '../../history';

import backgroundImage from '../../components/images/image 289.png'

const Home = () => {

  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));


  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleLogout = (e) => {
    
    e.preventDefault();
		dispatch(logoutSuccess());
		localStorage.removeItem('auth');
    console.log("logout done!")
		history.push('/login');
		window.location.reload();
    setShowModal(false);
  };

  return (
    <div style={{ backgroundColor: '', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: '', alignItems: '' }}>
      {/* Sidebar */}
      <Sidebar />
      {/* Main content  margin top -- 20px  */}
      <Container style={{ marginTop: '255px', textAlign: 'center' }}>
        <img src={backgroundImage} alt="Digitalflake" style={{ maxWidth: '100%', height: 'auto' }} />
        {/* Welcome message */}
        <p style={{ color: '#555' }}>Welcome to Digitalflake Admin</p>
      </Container>
      {/* Logout button */}
      <div className='logoutbutton' style={{ position: 'absolute', top: '50px', right: '10px', borderRadius: '5px', border: '2px solid red', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)' }}>
        <Button variant="" style={{ color: "red" }} onClick={handleShow}><BoxArrowRight style={{ marginRight: '10px' }} />Logout</Button>
      </div>
      {/* Logout modal */}
      <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Body className="text-center p-5">
       <h2 className="mb-4">
       <ExclamationTriangleFill className="text-danger mr-2" style={{ fontSize: '2rem' }} />
      Logout
    </h2>
    <p className="mb-4">Are you sure you want to logout?</p>
    <div  className="d-flex justify-content-center">
      <Button variant="" className='cancel-button' style={{margin:"15px"}} onClick={handleClose}>
        Cancel
      </Button>
      {/* {auth.currentUser && auth.currentUser.token ?( */}
      <Link to="/login"  style={{ margin: "15px" }} onClick={handleLogout}>
      <Button variant=""   className="delete-button">Confirm</Button>
    </Link>
      {/* ) : (
        <Link to= "/home"></Link>
      )} */}
    
    </div>
  </Modal.Body>
</Modal>

    </div>
  );
}

export default Home;



import  { useState } from 'react'; // Importing useState from React
import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Sticky, X } from 'react-bootstrap-icons';

// import NavDropdown from 'react-bootstrap/NavDropdown';
import { PersonCircle } from 'react-bootstrap-icons'; 
import { Modal, Button } from 'react-bootstrap';
import './header.css';
import logoImage from '../images/Group 2609047.png'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutSuccess } from '../../redux/authSlice';
import history from '../../history';




const header = () => {
//  to check if user is already logged in or not.
  // const dispatch = useDispatch();  //3:19
	// const { auth } = useSelector((state) => ({ ...state }));





  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

    return (
<div className='' >
    <Navbar   expand="lg" className=" header bg-body-tertiary ">
      <Container style={{}}>
        
      <div className="logo-container">
            <img src={logoImage} alt="Digitalflake" className="logo"  style={{    width: '168px'}}/>
      </div>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
          <a href="#" className='profile_logo'  onClick={handleShowModal}>
                <PersonCircle size={24} /> {/* Using the profile icon */}
           </a>
          </Navbar.Text>
        </Navbar.Collapse>

     
      </Container>
    </Navbar>
    
         {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} dialogClassName="modal-right" animation={false}>
        <Modal.Body>
          <div className="d-flex justify-content-end">
            <X size={24} className="close-icon" onClick={handleCloseModal} />
          </div>
        <div className='top_buttons'>

        {/* {auth.currentUser && auth.currentUser.token ? ( */}
          <Button variant="purple" href='/Login'  className="mb-2 button_top" block  style={{ backgroundColor: '#800080', border: 'none', marginTop:"" ,color: 'antiquewhite'}}>Log In</Button>


        
          <Button variant="purple" block href='/Signup' style={{ backgroundColor: '#800080', border: 'none', marginTop:"",  color: 'antiquewhite'}}>Sign Up
          </Button>
          </div>
        </Modal.Body>
      </Modal>
      
     </div>

     )
};

export default header;
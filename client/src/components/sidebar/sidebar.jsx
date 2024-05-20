import React, { useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'react-bootstrap-icons';
import './Sidebar.css';

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`sidebar-container${expanded ? ' expanded' : ''}`}>
      <Navbar
        expand="sm"
        className="flex-column sidebar"
      >
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={handleToggle}
          className="sidebar-toggle"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-column w-100">
            <Link
              to="/Home"
              className="nav-link d-flex justify-content-between align-items-center"
            >
              <span>Home</span> <ChevronRight  className='arrow'  />
            </Link>
            <Link
              to="/category"
              className="nav-link d-flex justify-content-between align-items-center"
            >
              <span>Category</span> <ChevronRight className='arrow' />
            </Link>
            <Link
              to="/product"
              className="nav-link d-flex justify-content-between align-items-center"
            >
              <span>Products</span> <ChevronRight className='arrow' />
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Sidebar;

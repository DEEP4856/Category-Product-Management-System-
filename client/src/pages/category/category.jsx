import React from 'react';
import Sidebar from '../../components/sidebar/sidebar'; // Import the Sidebar component
import Addcategory from '../../components/taskcomponent/addcategory';
import Categorylist from '../../components/taskcomponent/categorylist';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './Cat.css';
const Category = () => {
  return (
    <>
    
    <div>
      {/* Render the Sidebar component */}
      <Sidebar/>
      {/* Add other content of the dashboard below if needed */}
    </div>
    
   
    
       <div className='box' style={{marginTop:"10px" }} >
 
        <Addcategory/>
    
       </div>
      
       <div className='box' style={{marginTop:"10px"  , textAlign:"center" }} >
 
      <Categorylist/>
    
       </div>
      
     
      </>
  );
}

export default Category;

import React from 'react';
import Sidebar from '../../components/sidebar/sidebar'; // Import the Sidebar component
import Addproduct from '../../components/taskcomponent/addproduct';
import Productlist from '../../components/taskcomponent/productlist';
const Product = () => {
  return (
    <>
    
    <div>
      {/* Render the Sidebar component */}
      <Sidebar/>
      {/* Add other content of the dashboard below if needed */}
    </div>
    <div className='box' style={{ marginTop: "10px" }}>
      
      <Addproduct/>

      </div>
      <div className='box' style={{marginTop:"10px"  , textAlign:"center" }} >
 
        <Productlist/>

     </div>
      
      </>
  );
}

export default Product;

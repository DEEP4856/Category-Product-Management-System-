import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// Initial state
const initialState = {
    productData: null, // Change the initial state to null
    allProducts: [],
    loading: false,
    error: null,
};

// Slice
export const productSlice = createSlice({ 
    name: 'product',
    initialState,
    reducers: {
        productAddedSuccessfully: (state, action) => {
            console.log('Product Added Successfully. Payload:', action.payload);
            console.log('Current state:', state);
            state.productData = action.payload;
        },
        productAddFailure: (state, action) => {
            console.log('Product Add Failure. Error:', action.payload);
            console.log('Current state:', state);
            state.error = action.payload;
        },
        getAllProductsSuccess: (state, action) => {
            console.log('Get All Products Success. Payload:', action.payload);
            console.log('Current state:', state);
            state.allProducts = action.payload;
        },
        getAllProductsFailure: (state, action) => {
            console.log('Get All Products Failure. Error:', action.payload);
            console.log('Current state:', state);
            state.error = action.payload;
        },
        editProductStart: (state) => {
            console.log('Edit Product Start');
            console.log('Current state:', state);
            state.loading = true;
            state.error = null;
        },
        editProductSuccess: (state, action) => {
            console.log('Edit Product Success. Payload:', action.payload);
            console.log('Current state:', state);
            state.productData = action.payload;
            state.loading = false;
        },
        editProductFailure: (state, action) => {
            console.log('Edit Product Failure. Error:', action.payload);
            console.log('Current state:', state);
            state.loading = false;
            state.error = action.payload;
        },
        deleteProductSuccess: (state, action) => {
            console.log('Delete Product Success. Payload:', action.payload);
            console.log('Current state:', state);
            state.allProducts = state.allProducts.filter(product => product._id !== action.payload);
        },
        deleteProductFailure: (state, action) => {
            console.log('Delete Product Failure. Error:', action.payload);
            console.log('Current state:', state);
            state.error = action.payload;
        },
    },
});

// Export actions
export const {
    productAddedSuccessfully,
    productAddFailure,
    getAllProductsSuccess,
    getAllProductsFailure,
    editProductStart,
    editProductSuccess,
    editProductFailure,
    deleteProductSuccess,
    deleteProductFailure,
} = productSlice.actions;

// Reducer
export default productSlice.reducer;

// Thunk action creators
export const addProduct = (categoryName, productName, packSize, mrp, productImage, status, id) => async (dispatch) => {
    console.log('Adding product...');
    const formData = new FormData();
    formData.append('categoryName', categoryName);
    formData.append('productName', productName);
    formData.append('packSize', packSize);
    formData.append('mrp', mrp);
    formData.append('productImage', productImage);
    formData.append('status', status);
    formData.append('id', id);

    try {
        const response = await axios.post('http://localhost:4000/product/addpro', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('Add Product Success Response:', response.data);
        dispatch(productAddedSuccessfully(response.data));
        toast.success('Product added successfully');
        localStorage.setItem('product', JSON.stringify(response.data));
    } catch (error) {
        console.error('Error adding product:', error);
        dispatch(productAddFailure(error.message));
    }
};




export const editProduct = (id, updatedProduct) => async (dispatch) => {
    console.log('Editing product...');
    dispatch(editProductStart());
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('categoryName', updatedProduct.categoryName);
      formDataToSend.append('productName', updatedProduct.productName);
      formDataToSend.append('packSize', updatedProduct.packSize);
      formDataToSend.append('mrp', updatedProduct.mrp);
      formDataToSend.append('productImage', updatedProduct.productImage);
      formDataToSend.append('status', updatedProduct.status);
  
      const response = await axios.put(`http://localhost:4000/product/edit/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Edit Product Success Response:', response.data);
      dispatch(editProductSuccess(response.data));
    } catch (error) {
      console.error('Error editing product:', error);
      dispatch(editProductFailure(error.message));
    }
  };
  





export const getAllProducts = (token, _id) => async (dispatch) => {
    console.log('Fetching all products...');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            _id,
        },
    };

    try {
        const response = await axios.get('http://localhost:4000/product/getpro', config);
        console.log('Get All Products Success Response:', response.data);
        dispatch(getAllProductsSuccess(response.data));
    } catch (error) {
        console.error('Error getting all products:', error);
        dispatch(getAllProductsFailure(error.message));
    }
};

export const deleteProduct = (id) => async (dispatch) => {
    console.log('Deleting product...');
    try {
        const response = await axios.delete(`http://localhost:4000/product/${id}`);
        console.log('Delete Product Success Response:', response.data);
        dispatch(deleteProductSuccess(id));
        toast.success('Product deleted successfully');
    } catch (error) {
        console.error('Error deleting product:', error);
        dispatch(deleteProductFailure(error.message));
    }
};

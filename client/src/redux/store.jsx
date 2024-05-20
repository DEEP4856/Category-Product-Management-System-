import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './reducers'; // Import your root reducer
import authReducer  from './authSlice';
import taskReducer  from './taskSlice';
import productReducer from './productslice'

// Define any initial state if needed
// const initialState = {};

// Create the Redux store
const store = configureStore({
 reducer : { auth : authReducer , task: taskReducer , product : productReducer },
});

export default store;

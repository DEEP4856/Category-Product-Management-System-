import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import history from '../history';
// This package provides a JavaScript API for managing session history in web browsers. 
import { toast } from 'react-toastify';
//This package provides components and methods for displaying toast notifications in React applications. Toast notifications are temporary messages that appear at the bottom or top of the screen to provide feedback or alerts to users.


const initialUser = localStorage.getItem('auth')
	? JSON.parse(localStorage.getItem('auth'))
	: null;


const initialState = {
  isLoading: false,
  currentUser:  initialUser,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState : initialState,

  reducers: {
 
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
			state.isLoading = false;
		},
		loginFailure: (state, action) => {
			state.error = action.payload;
		},
		registerSuccess: (state, action) => {
			state.currentUser  = action.payload;
			state.isLoading = false;
		},
		registerFailure: (state, action) => {
			state.error = action.payload;
		},

		logoutSuccess: (state) => {
			state.currentUser = null;
		},

  },
});

export const { 

  loginSuccess,
  loginFailure,
	registerSuccess,
	registerFailure,
	logoutSuccess,
 } = authSlice.actions;

export default authSlice.reducer;









export const register = (user) => async (dispatch) => {
  console.log(user); // Check the user object
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.post('http://localhost:4000/auth/register', user, config);

    if (response.status === 200) { // Check response status code
      dispatch(registerSuccess(response.data));
      toast.success('Registration successful');
      history.push('/login');
      window.location.reload(); // Refresh the page
    } else {
      dispatch(registerFailure());
      toast.error('Registration failed');
    }
  } catch (error) {
    console.error('Error registering user:', error);
    dispatch(registerFailure('Error registering user')); // Dispatch failure with error message
  }
};








export const signin =  (user) => async (dispatch) => {
	console.log(user);
	try {

    // const userData = {
		// 	email: user.email,
		// 	password: user.password,
		// };
  console.log("login processing")
  
		const response = await axios.post('http://localhost:4000/auth/signin', user)
    console.log("login posted")


		if (response.status === 200) {
			localStorage.setItem('auth', JSON.stringify(response.data));
			dispatch(loginSuccess(response.data));
      history.push('/home');
      toast.success('login successfull');

      window.location.reload(); 
		} else {
      dispatch(loginFailure());
			toast.error('login failed');
		}
	} catch (error) {
    console.log("login failed", error)
    dispatch(loginFailure());
	}
};

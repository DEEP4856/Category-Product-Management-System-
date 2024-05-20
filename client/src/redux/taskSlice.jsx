import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify'

const initalTask = localStorage.getItem('task')
	? JSON.parse(localStorage.getItem('task'))
	: null;

    const initialState = {
        TaskData: initalTask,
        AllTasks: {},
    };


    export const taskSlice = createSlice({
        name: 'task',
        initialState,
    
        reducers: {
            taskAddedSuccessfully: (state, action) => {
                state.TaskData = action.payload;
            },
            taskAddFailure: (state) => {
                return state;
            },
            getAllTaskSuccess: (state, action) => {
                state.AllTasks = action.payload;
            },
            getAllTaskFailure: (state) => {
                return state;
            },
    
            editTaskSuccess: (state, action) => {
                state.TaskData = action.payload;
            },

            editTaskFailure: (state) => {
                return state;
              },
    
            deleteSuccess: (state, action) => {
                state.TaskData = action.payload;
            },
            deletefail: (state) => {
                return state;
            },
        },
    });

    export const {
        taskAddFailure,
        taskAddedSuccessfully,
        getAllTaskFailure,
        getAllTaskSuccess,
        deleteSuccess,
        deletefail,
        editTaskSuccess,
        editTaskFailure,
    } = taskSlice.actions;
    
    export default taskSlice.reducer;







    export const addTask = (categoryName, description, status, id) => async (dispatch) => {
        const taskData = {
            categoryName, description, status, id
        };
    
        try {
            const response = await axios.post('http://localhost:4000/task/add', taskData);
            if (response && response.status === 200) {
                localStorage.setItem('task', JSON.stringify(response.data));
                dispatch(taskAddedSuccessfully(response.data));
                toast.success('task added successfully');
                window.location.reload();
            } else {
                dispatch(taskAddFailure());
            }
        } catch (error) {
            dispatch(taskAddFailure());
        }
    };
    





    export const editTask = (id , newData) => async (dispatch) => {
        //   const taskData = { categoryName, description, status, id };
        
        
    
        console.log('editTask function started');
        try {
            const response = await axios.put(`http://localhost:4000/task/edit/${id}` , newData);
            console.log("url ok ")
            if (response) {
              dispatch(editTaskSuccess(response.data));
              window.location.reload();
            } else {
              dispatch(editTaskFailure());
            }
          } catch (error) {
            dispatch(editTaskFailure());
          }
        };
    






    export const getAllTasks = (token, _id) => async (dispatch) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                _id,
            },
        };
    
        try {
            const response = await axios.get(
                'http://localhost:4000/task/tasks',
                config
            );
    
            if (response) {
                dispatch(getAllTaskSuccess(response.data));
            }
        } catch (error) {
            if (error.response.status === 400) {
                dispatch(getAllTaskFailure());
            }
        }
    };
    
  
    
    export const deleteItem = (id) => async (dispatch) => {
        let res = await axios.delete(`http://localhost:4000/task/${id}`);
    
        if (res) {
            dispatch(deleteSuccess());
            toast.success('task deleted successfully');
    
            window.location.reload();
        } else {
            dispatch(deletefail());
        }
    };
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

import { ITask } from '../../interfaces';
import { fetchAxios } from '../../helpers';
import { AxiosResponse } from 'axios';

export interface TaskState {
    tasks: ITask[];
    activeTask: ITask | null;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: TaskState = {
    tasks: [],
    status: 'idle',
    activeTask: null,
};

//THUNK ASYNC ACTIONS
export const loadTasks = createAsyncThunk(
    'task/loadTasks',
    async () => {
        const response = await fetchAxios('task', undefined, 'GET') as AxiosResponse;
        const { data: body } = response;
        return body.tasks;
    }
);

export const addTask = createAsyncThunk(
    'task/addTask',
    async (task: ITask) => {
        const response = await fetchAxios('task', task , 'POST') as AxiosResponse;
        const { data: body } = response;
        return body.task;
    }
);

export const removeTask = createAsyncThunk(
    'task/removeTask',
    async (id: string) => {
        const response = await fetchAxios(`task/${ id }`, undefined, 'DELETE') as AxiosResponse;
        const { data: body } = response;
        return body.task;
    }
);

export const updateTask = createAsyncThunk(
    'task/updateTask',
    async ( task: ITask ) => {
        const response = await fetchAxios(`task/${ task.objectId }`, task, 'PUT') as AxiosResponse;
        const { data: body } = response;
        return body.task;
    }
);


export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        
        setActiveTask: (state, action: PayloadAction<string>) => {
            state.activeTask = state.tasks.filter(task => task.objectId === action.payload)[0];
        },
        removeActiveTask: (state) => {
            state.activeTask = null;
        }
    },
    extraReducers: {

        //LOAD TASKS
        [loadTasks.pending.type]: (state) => {
            state.status = 'loading';
        },
        [loadTasks.fulfilled.type]: (state, action) => {
            state.status = 'idle';
            state.tasks = action.payload;
        },
        [loadTasks.rejected.type]: (state) => {
            state.status = 'failed';
        },

        //ADD TASK
        [addTask.pending.type]: (state) => {
            state.status = 'loading';
        },
        [addTask.fulfilled.type]: (state, action) => {
            state.tasks.push(action.payload);
            state.status = 'idle';
        },
        [addTask.rejected.type]: (state) => {
            state.status = 'failed';
        },

        //REMOVE TASK
        [removeTask.pending.type]: (state) => {
            state.status = 'loading';
        },
        [removeTask.fulfilled.type]: (state, action) => {
            state.tasks = state.tasks.filter(task => task.objectId !== action.payload.objectId);
            state.status = 'idle';
        },
        [removeTask.rejected.type]: (state) => {
            state.status = 'failed';
        },

        //UPDATE TASK
        [updateTask.pending.type]: (state) => {
            state.status = 'loading';
        },
        [updateTask.fulfilled.type]: (state, action) => {
            state.tasks = state.tasks.map(task => task.objectId === action.payload.objectId ? action.payload : task);
            state.status = 'idle';
        },
        [updateTask.rejected.type]: (state) => {
            state.status = 'failed';
        },
    }
        

});

// REDUCERS
export const { setActiveTask, removeActiveTask } = taskSlice.actions;

// SELECTORS
export const selectTasks = (state: RootState) => state.task.tasks;
export const selectActiveTask = (state: RootState) => state.task.activeTask;


export default taskSlice.reducer;
        




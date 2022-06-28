import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface NavState {
   status: 'home' | 'allTasks' | 'newTask' | 'editTask';
}

const initialState: NavState = {
    status: 'home'
};

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        setNavigationStatus: (state, action: PayloadAction<NavState>) => {
            state.status = action.payload.status;
        }
    }
});

// REDUCERS
export const { setNavigationStatus } = navigationSlice.actions;

// SELECTORS
export const selectNavigationStatus = (state: RootState) => state.navigation.status;



export default navigationSlice.reducer;
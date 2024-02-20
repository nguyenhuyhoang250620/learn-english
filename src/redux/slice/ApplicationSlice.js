import {createSlice} from '@reduxjs/toolkit';

export const applcationSlice = createSlice({
    name: 'applications',
    initialState: {
        applicaion: []
    },
    reducers: {
        getApplication: (state,action) => {
            const { data } = action.payload;
            return {
                applicaion: data
            }
        }
    }
});

export const { getApplication } = applcationSlice.actions;

export const selectApplicationData = state => state.applications.applicaion;

export default applcationSlice.reducer;
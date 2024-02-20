import {createSlice} from '@reduxjs/toolkit';


export const darkModeSlice = createSlice({
    name:'darkmode',
    initialState: {
        darkmode: false
    },
    reducers: {
        changeDarkMode: (state,action) => {
            return {
                darkmode:action.payload
            }
        }
    }
});

export const { changeDarkMode } = darkModeSlice.actions;

export const selectIsDarkMode = state => state.darkmode.darkmode;

export default darkModeSlice.reducer;

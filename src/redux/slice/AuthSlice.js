import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        info: []
    },
    reducers: {
        getInfo: (state,action) => {
            const { data } = action.payload;
            localStorage.setItem("user",JSON.stringify(data.data));
            return {
                info: data.data
            }
        }
    }
});

export const { getInfo } = authSlice.actions;

export const selectAuthInfo = state => state.auth.info;

export default authSlice.reducer;
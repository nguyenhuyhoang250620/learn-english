import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		info: [],
		isAuthen:false
	},
	// reducers: {
	// 	getInfo(state, action) {
	// 		const {data} = action.payload;
	// 		localStorage.setItem('user', JSON.stringify(data.data));
	// 		return {
	// 			info: data.data,
	// 		};
	// 	},
	// 	isAuthencation:(state,action)=>{
    //         state.isAuthen = action.payload
    //     }
	// },
	reducers: {
        getInfo: (state,action) => {
            state.isAuthen = action.payload
        },
        isAuthencation:(state,action)=>{
            state.isAuthen = action.payload
        }
    }
});

export const {getInfo, isAuthencation} = authSlice.actions;

export const selectAuthInfo = state => state.auth.info;
export const selectIsAuthen = state => state.auth.isAuthen;

export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
	name: 'profiles',
	initialState: {
		isLoading: false,
		profile: [],
		profileAll: [],
		total_results: 0,
		profileSearch: [],
		dataSelect:[],
		listEventProfile:[]
	},
	reducers: {
		getProfile(state, action) {
			const {data} = action.payload;
			state.profile = data.results;
			state.total_results = data.total_results;
			state.isLoading = true;
		},
		getAllProfile(state, action) {
			const {data} = action.payload;
			state.profileAll = data;
		},
		getDataSelect(state, action) {
			const item = action.payload;
			const prevList = state.dataSelect;
		  
			if (!Array.isArray(prevList)) {
			  prevList = [];
			}
		  
			const updatedList = prevList.filter(i => i !== item);
		  
			if (updatedList.length === prevList.length) {
			  // Nếu item không tồn tại trong mảng, thêm vào
			  state.dataSelect = [...prevList, item];
			} else {
			  // Nếu item đã tồn tại trong mảng, cập nhật mảng
			  state.dataSelect = updatedList;
			}
		  },
		getEventProfile(state, action) {
			state.listEventProfile= action.payload.data.results
		}
	},
});

export const {getProfile,getEventProfile} = profileSlice.actions;

export const selectProfileData = state => state.profiles.profile;
export const selectProfileDataIsloading = state => state.profiles.isLoading;
export const selectTotalProfileData = state => state.profiles.total_results;
export const selectListEventProfile = state => state.profiles.listEventProfile;

export default profileSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

export const plateSlice = createSlice({
	name: 'plates',
	initialState: {
		plate: [],
		plate_no_owner: [],
		totalRecord: 0,
		detail: {},
		isLoading: false,
	},
	reducers: {
		getPlate(state, action) {
			state.plate = action.payload.results;
			state.totalRecord = action.payload.total_results;
			state.isLoading = true;
		},
		getPlateNoOwner(state, action) {
			state.plate_no_owner = action.payload;
		},
		getDetail(state, action) {
			const data = action.payload;
			state.detail = data[0];
		},
	},
});

export const {getPlate, getDetail, getPlateNoOwner} = plateSlice.actions;

export const selectPlateData = state => state.plates.plate;
export const selectPlateTotalRecord = state => state.plates.totalRecord;
export const selectPlateDetail = state => state.plates.detail;
export const selectPlateNoOwner = state => state.plates.plate_no_owner;
export const selectPlateIsLoading = state => state.plates.isLoading;

export default plateSlice.reducer;


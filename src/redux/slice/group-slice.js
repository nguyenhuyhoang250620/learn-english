import { createSlice } from '@reduxjs/toolkit';

export const groupListSlice = createSlice({
	name: 'groups',
	initialState: {
		group: [],
		totalRecord: 0,
		detail: {},
		filterSearchSelect: [],
	},
	reducers: {
		getBlackList(state, action) {
			state.group = action.payload;
			state.totalRecord = action.payload.length;
		},
	},
});

export const {getBlackList} = groupListSlice.actions;

export const selectGroupList = state => state.groups.group;

export default groupListSlice.reducer;
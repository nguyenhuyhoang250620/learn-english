import {createSlice} from '@reduxjs/toolkit';

export const regionSlice = createSlice({
    name: 'regions',
    initialState: {
        region: []
    },
    reducers: {
        getRegion: (state,action) => {
            const { data } = action.payload;
            return {
                region: data.data
            }
        }
    }
});

export const { getRegion } = regionSlice.actions;

export const selectRegionSlice = state => state.regions.region;

export default regionSlice.reducer;
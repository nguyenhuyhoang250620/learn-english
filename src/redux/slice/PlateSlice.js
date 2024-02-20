import { createSlice } from "@reduxjs/toolkit";

export const plateSlice = createSlice({
  name: "plates",
  initialState: {
    plate: [],
    plate_no_owner:[],
    totalRecord: 0,
    detail:{}
  },
  reducers: {
    getPlate: (state, action) => {
      const { results } = action.payload;
      return {
        plate: results,
        totalRecord:action.payload.total_results
      };
    },
    getPlateNoOwner: (state, action) => {
      return {
        plate_no_owner: action.payload,
      };
    },
    getDetail: (state,action) => {
      const data = action.payload;
      state.detail = data[0];
    }
  },
});

export const { getPlate, getDetail,getPlateNoOwner } = plateSlice.actions;

export const selectPlateData = state => state.plates.plate;
export const selectPlateTotalRecord = state => state.plates.totalRecord;
export const selectPlateDetail = state => state.plates.detail;
export const selectPlateNoOwner = state => state.plates.plate_no_owner;

export default plateSlice.reducer;

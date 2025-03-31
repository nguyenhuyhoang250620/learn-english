import { createSlice } from "@reduxjs/toolkit";

export const liveSlice = createSlice({
  name: "live",
  initialState: {
    listVocabulary:[],
    totalRecords:0
  },
  reducers: {
    getListVocabulary :(state,action)=>{
      state.listVocabulary = action.payload.data
      state.totalRecords = action.payload.pagination.totalRecords
    },
  },
});

export const {getListVocabulary } =liveSlice.actions;

export const selectListVocabulary = (state) => state.live.listVocabulary;
export const selectTotalVocabulary = (state) => state.live.totalRecords;

export default liveSlice.reducer;

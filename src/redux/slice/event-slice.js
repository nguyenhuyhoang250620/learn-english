/* eslint-disable no-self-compare */
import { createSlice } from "@reduxjs/toolkit";

export const eventSlice = createSlice({
  name: "event",
  initialState: {
    eventAll:[],
    totalEventAll:0
  },
  reducers: {
    handleGetAllEvent(state,action){
        state.eventAll = action.payload.results;
        state.totalEventAll= action.payload.total_results
    },
  },
});

export const { handleGetAllEvent } = eventSlice.actions;

export const selectListEventAll = (state) => state.event.eventAll;
export const selectTotalEventAll = (state) => state.event.totalEventAll;

export default eventSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const viewEventSlice = createSlice({
  name: "viewEvents",
  initialState: {
    viewEvent: {},
    collapse: false,
  },
  reducers: {
    getViewEvent: (state, action) => {
      const data = action.payload;
      state.viewEvent = data;
    },
    getCollapse: (state, action) => {
      const data = action.payload;
      state.collapse = data;
    },
  },
});

export const { getViewEvent, getCollapse } = viewEventSlice.actions;

export const selectViewEvent = (state) => state.viewEvents.viewEvent;
export const selectCollapse = (state) => state.viewEvents.collapse;

export default viewEventSlice.reducer;

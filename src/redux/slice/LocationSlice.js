import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
  name: "locations",
  initialState: {
    location: [],
  },
  reducers: {
    getLocation: (state, action) => {
      const data = action.payload;
      return {
        location: data,
      };
    },
  },
});

export const { getLocation } = locationSlice.actions;

export const selectLocationData = state => state.locations.location;

export default locationSlice.reducer;
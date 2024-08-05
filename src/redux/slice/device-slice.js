/* eslint-disable no-self-compare */
import { createSlice } from "@reduxjs/toolkit";

export const deviceSlice = createSlice({
  name: "device",
  initialState: {
    listDevice:[]
  },
  reducers: {
    handleListDevice(state,action){
        state.listDevice = action.payload
    }
  },
});

export const { handleListDevice } =
  deviceSlice.actions;

export const selectListDevice = (state) => state.device.listDevice;


export default deviceSlice.reducer;

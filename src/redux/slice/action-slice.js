import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isToggle: false, 
  isSidebar:true,
  isActionCamera:false,
  keyStream:0
};

const actionSilce = createSlice({
  name: 'action',
  initialState,
  reducers: {
    doIsTogle: (state,action) => {
      console.log("vao day khong",action.payload)
      state.isToggle = action.payload;
    },
    doIsSidebar: (state,action) => {
      state.isSidebar = action.payload;
    },
    doIsActionCamera:(state,action)=>{
      state.isActionCamera = action.payload
    },
    changeKeyStream:(state,action)=>{
      state.keyStream+=action.payload
    }
  },
});

export const { doIsTogle,doIsSidebar,doIsActionCamera,changeKeyStream } = actionSilce.actions;
export const selectToggle = state => state.action.isToggle;
export const selectSidebar = state => state.action.isSidebar;
export const selectActionCamera = state => state.action.isActionCamera;
export const selectChangeKeyStream = state => state.action.keyStream;
export default actionSilce.reducer;
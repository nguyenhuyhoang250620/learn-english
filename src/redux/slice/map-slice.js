import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({
  name: "map",
  initialState: {
    dataLocation: null,
    dataAddress: [],
    code: "",
    dataProvince: [],
    dataDistrict: [],
    totalCamAll: [],
    dataRecorder: [],
    changeKey: 1,
    isShowDrawerGroup: false,
    listDataCameraGroup: [],
    dataWard:[],
    totalPages:0
  },
  reducers: {
    getDataLocationCam: (state, action) => {
      state.dataLocation = action.payload.results;
      state.totalPages = action.payload.totalPages;
    },
    clearDataLocation: (state) => {
      state.dataLocation = null;
    },
    getDataAddress: (state, action) => {
      state.dataAddress = action.payload;
    },
    getDataProvince: (state, action) => {
      state.dataProvince = action.payload.results;
    },
    getDataDistrict: (state, action) => {
      state.dataDistrict = action.payload.results;
    },
    getCode: (state, action) => {
      state.code = action.payload;
    },
    getTotalCamAll: (state, action) => {
      state.totalCamAll = action.payload;
    },
    getDataRecorder: (state, action) => {
      state.dataRecorder = action.payload;
    },
    changeKeyHandle: (state, action) => {
      state.changeKey += action.payload;
    },
    getDataCameraGroup: (state, action) => {
      state.isShowDrawerGroup = true;
      state.listDataCameraGroup = action.payload;
    },
    closeGroup:(state,action)=>{
      state.isShowDrawerGroup = false
    },
    getDataWard:(state,action)=>{
      state.dataWard  = action.payload.results
    },
  },
});

export const {
  getDataLocationCam,
  getDataAddress,
  getCode,
  getDataProvince,
  getDataDistrict,
  getTotalCamAll,
  getDataRecorder,
  changeKeyHandle,
  getDataCameraGroup,
  closeGroup,
  getDataWard,
  clearDataLocation,
} = mapSlice.actions;

export const selectDataLocationCam = (state) => state.map.dataLocation;
export const selectClearDataLocationCam = (state) => state.map.dataLocation;
export const selectDataAddress = (state) => state.map.dataAddress;
export const selectDataProvince = (state) => state.map.dataProvince;
export const selectDataDistrict = (state) => state.map.dataDistrict;
export const selectTotalCamAll = (state) => state.map.totalCamAll;
export const selectDataRecorder = (state) => state.map.dataRecorder;
export const selectCode = (state) => state.map.code;
export const selectChangKey = (state) => state.map.changeKey;
export const selectListCameraGroup = (state) => state.map.listDataCameraGroup;
export const selectIsShowCameraGroup= (state) => state.map.isShowDrawerGroup;
export const selectDataWard= (state) => state.map.dataWard;

export default mapSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const liveSlice = createSlice({
  name: "live",
  initialState: {
    isChangeGird: 4,
    isOpenListCamera: false,
    listCameraPreview: Array(4).fill(null),
    listCameraStream:[],
    listProvince:[],
    dataCameraWithProvince:[],
    dataPreviewCamWithID:null,
    actionCamera:'',
    randomRender:0,
    selectedCamera:0,
  },
  reducers: {
    getListProvince :(state,action)=>{
      state.listProvince = action.payload.results
    },
    handleCheckGrid :(state,action)=>{
      const sizeCamera = action.payload.length
      let lengthGrid = 1;
      if(sizeCamera > 1 && sizeCamera<=4){
        lengthGrid = 4
      }
      else if(sizeCamera > 4 && sizeCamera<=9){
        lengthGrid = 9
      }
      else if(sizeCamera > 9 && sizeCamera<=16){
        lengthGrid= 16
      }
      else if(sizeCamera > 16 && sizeCamera<=25){
        lengthGrid = 25
      }
      state.isChangeGird =lengthGrid
      state.listCameraPreview = []
      for(let i = 0; i < lengthGrid;i++){
       if(action.payload[i]){
        state.listCameraPreview.push({
          url:action.payload[i].urlRestream,
          id:action.payload[i].id,
          status:'Connect'
        })
       }
       else{
        state.listCameraPreview.push(null)
       }
      }
    },

    getSizeGrid: (state, action) => {
      const {grid,listCameraStream} = action.payload;
      state.isChangeGird = grid;
      state.listCameraPreview = []
      for(let i = 0; i < grid;i++){
        state.listCameraPreview.push(listCameraStream[i])
      }
    },
    getOpenList: (state, action) => {
      state.isOpenListCamera = action.payload;
    },
    getListCameraPreview: (state, action) => {
      state.listCameraPreview[action.payload.index] = {
        index:action.payload.index,
        url:action.payload?.url,
        id:action.payload?.id,
        status:action.payload.status
      } 
      state.listCameraStream[action.payload.index] = {
        index:action.payload.index,
        url:action.payload?.url,
        id:action.payload?.id,
        status:action.payload.status
      }
      
    },
    getCameraWithProvince:(state,action)=>{
      state.dataCameraWithProvince = action.payload
    },
    getPreviewCameWithID:(state,action)=>{
      state.dataPreviewCamWithID = action.payload
    },
    changeCameraStatus:(state,action)=>{
      state.actionCamera = action.payload
    },
    randomRender:(state,action)=>{
      state.randomRender+=action.payload
    },
    resetgetListCameraPreview:(state,action)=>{
      const {index,listCameraStream} = action.payload;
      state.listCameraPreview[index] = null
      const newArray = [...listCameraStream];
      const idIndex = newArray.findIndex(item => (item && item.index) === index);
      if (idIndex !== -1) {
        newArray.splice(idIndex, 1);
      }
      state.listCameraStream = newArray
    },
    handleCameraById:(state,action)=>{
      state.selectedCamera = action.payload
    },
  },
});

export const {handleCameraById,handleCheckGrid, getSizeGrid, getOpenList, getListCameraPreview,getListProvince,getCameraWithProvince,getPreviewCameWithID,changeCameraStatus,randomRender,resetgetListCameraPreview } =liveSlice.actions;

export const selectListProvince = (state) => state.live.listProvince;
export const selectSizeGrid = (state) => state.live.isChangeGird;
export const selectIsOpenList = (state) => state.live.isOpenListCamera;
export const selectListCameraPreview = (state) => state.live.listCameraPreview;
export const selectListCameraStream = (state) => state.live.listCameraStream;
export const selectDataCameraWithProvince = (state) => state.live.dataCameraWithProvince;
export const selectDataCameraWithID = (state) => state.live.dataPreviewCamWithID;
export const selectCameraStatus = (state) => state.live.actionCamera;
export const selectRandom = (state) => state.live.randomRender;
export const selectCameraById = (state) => state.live.selectedCamera;

export default liveSlice.reducer;

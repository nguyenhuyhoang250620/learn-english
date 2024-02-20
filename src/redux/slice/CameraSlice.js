import {createSlice} from '@reduxjs/toolkit';

export const cameraSlice = createSlice({
    name: 'cameras',
    initialState: {
        camera: []
    },
    reducers: {
        getCamera: (state,action) => {
            const  data  = action.payload;
            return {
                camera: data
            }
        }
    }
});

export const { getCamera } = cameraSlice.actions;

export const selectCameraData = state => state.cameras.camera;

export default cameraSlice.reducer;
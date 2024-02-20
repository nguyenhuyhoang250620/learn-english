import {
    call,
    put,
    takeEvery,
} from "redux-saga/effects";

//Api 
import EventService from "../services/EventService/EventService.js";

import TYPE_ACTION from "../constants/TypeAction.js";

//Slice 
import { getCamera } from "../redux/slice/CameraSlice";
import CameraService from "../services/CameraService/CameraService.js";

//----Worker
function* doGetCameraSaga(action) {
    try {
        const body = action.payload;
        const response = yield call(CameraService.getCamera,body);
        const { data }  = response;
        yield put(getCamera(data));
    } catch (error) {
        console.log("Error fetching: ", error);
    }
}


//----Watcher
function* watchGetCameraSaga() {
    yield takeEvery(TYPE_ACTION.CAMERA.GET, doGetCameraSaga);
};

export {
    watchGetCameraSaga
};
import {
    call,
    put,
    takeEvery,
} from "redux-saga/effects";

//Api 
import EventService from "../services/EventService/EventService.js";

import TYPE_ACTION from "../constants/TypeAction.js";


//Slice
import { getInfo } from "../redux/slice/AuthSlice.js";
import AuthService from "../services/AuthService/AuthService.js";

//---Worker 
function* doGetAuthInfo(action) {
    try {
        const response = yield call(AuthService.getInfo);
        const data = response;
        yield put(getInfo(data));
    } catch (error) {
        console.log("Error fetching: ",error);
    }
}


//---Watcher
function* watchGetAuthInfoSaga() {
    yield takeEvery(TYPE_ACTION.AUTH.GET_INFO,doGetAuthInfo);
};

export {
    watchGetAuthInfoSaga
}
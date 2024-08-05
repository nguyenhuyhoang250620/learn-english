import {
    takeEvery,
    put,
} from "redux-saga/effects";
import TYPE_ACTION from "@constants/action";
import { changeKeyStream, doIsActionCamera, doIsSidebar, doIsTogle } from "@redux/slice/action-slice";


//---Worker 
function* doIsToggle(action) {
    const body = action.payload;
    yield put(doIsTogle(body))
}

function* doIsActionSidebar(action) {
    const body = action.payload;
    yield put(doIsSidebar(body))
}

function* doIsActionCameras(action) {
    const body = action.payload;
    yield put(doIsActionCamera(body))
}

function* doIsChangeKeyStream(action) {
    const body = action.payload;
    yield put(changeKeyStream(body))
}


function* watchDoIdToggle() {
    yield takeEvery(TYPE_ACTION.ACTION.IS_TOGGLE,doIsToggle);
};

function* watchDoIsSidebar(){
    yield takeEvery(TYPE_ACTION.ACTION.IS_SIDEBAR,doIsActionSidebar)
}
function* watchDoIsActionCamera(){
    yield takeEvery(TYPE_ACTION.ACTION.IS_ACTION_CAMERA,doIsActionCameras)
}
function* watchChangeKeyStream(){
    yield takeEvery(TYPE_ACTION.ACTION.CHANGE_KEY_STREAM,doIsChangeKeyStream)
}

export {
    watchDoIdToggle,
    watchDoIsSidebar,
    watchDoIsActionCamera,
    watchChangeKeyStream
}
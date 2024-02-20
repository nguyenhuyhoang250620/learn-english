import {
    call,
    put,
    takeEvery,
} from "redux-saga/effects";

import TYPE_ACTION from "../constants/TypeAction.js";

//Slice 
import { getSocket, deleteSocket, changeNotification } from "../redux/slice/SocketSlice.js";

//-----Worker 
function* doGetSocketSaga(action) {
    const body = action.payload;
    yield put(getSocket(body));
};

function* doDeleteSocketSaga(action) {
    yield put(deleteSocket());
};

function* doChangeNotification(action){
    yield put(changeNotification(action.payload));
};

//---- Watcher 
function* watchGetSocketSaga() {
    yield takeEvery(TYPE_ACTION.SOCKET.GET_SOCKET,doGetSocketSaga);
};

function* watchDeleteSocketSaga() {
    yield takeEvery(TYPE_ACTION.SOCKET.DELETE_SOCKET,doDeleteSocketSaga);
};

function* watchChangeNofitication() {
    yield takeEvery(TYPE_ACTION.SOCKET.NOTIFICATION,doChangeNotification);
};

export {
    watchGetSocketSaga,
    watchDeleteSocketSaga,
    watchChangeNofitication
}
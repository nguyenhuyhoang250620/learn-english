import { call, put, takeEvery } from "redux-saga/effects";


import TYPE_ACTION from "../constants/TypeAction";

import { getCollapse, getViewEvent } from "../redux/slice/ViewEventSlice";

//---- Workcer 
function* doGetViewEventSaga(action) {
    const body = action.payload;
    yield put(getViewEvent(body));
};

function* doGetCollapse(action) {
    const body = action.payload;
    yield put(getCollapse(body))
};

//-- Watcher
function* watchGetViewEventSaga() {
    yield takeEvery(TYPE_ACTION.VIEW_EVENT.GET_VIEW_EVENT,doGetViewEventSaga);
};

function* watchGetCollapse(){
    yield takeEvery(TYPE_ACTION.VIEW_EVENT.GET_COLLAPSE,doGetCollapse);
};

export {
    watchGetViewEventSaga,
    watchGetCollapse
};
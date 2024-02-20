import {
    call,
    put,
    takeEvery,
} from "redux-saga/effects";

//Api
import EventService from "../services/EventService/EventService.js";

import TYPE_ACTION from "../constants/TypeAction.js";

//Slice
import { getEvent, getDetailEvent, getEventPreview, getEventMap,getEventSearch,getValueSearch,getEventWithPerson } from "../redux/slice/EventSlice.js";

//----Worker
function* doGetEventSaga (action) {
    try {
        const response = yield call(EventService.getEvent,action.payload);
        const { data } = response;
        yield put(getEvent(data));
    } catch (error) {
        console.log("Error fetching: ", error);
    }
};
function* doGetEventWithPersonSaga (action) {
    try {
        const response = yield call(EventService.getEventWithPerson,action.payload);
        const { data } = response;
        yield put(getEventWithPerson(data));
    } catch (error) {
        console.log("Error fetching: ", error);
    }
};

function* doGetEventSearchSaga (action) {
    try {
        const response = yield call(EventService.getEventSearch,action.payload);
        const { data } = response;
        yield put(getEventSearch(data));
    } catch (error) {
        console.log("Error fetching: ", error);
    }
};

function* doGetEventMapSaga(action) {
    const body = action.payload;
    try {
        const response = yield call(EventService.getEvent,body);
        const { data } = response;
        yield put(getEventMap(data));
    } catch (error) {
        console.log("Error fetching: ", error);
    }
}

function* doGetEventPreviewSaga (action) {
    const {body, isSuccess} = action.payload;
    try {
        const response = yield call(EventService.getEvent,body);
        const { data } = response;
        yield put(getEventPreview(data['results']));
        isSuccess();
    } catch (error) {
        console.log("Error fetching: ", error);
    }
};

function* doGetEventDetailSaga(action) {
    const id = action.payload;
    try {
        const response = yield call(EventService.getDetail,id);
        const data = response;
        yield put(getDetailEvent(data));
    } catch (error){
        console.log("Error fetching detail ",error);
    }
};

function* search(action) {
    try {
        yield put(getValueSearch(action.payload));
    } catch (error){
        console.log("Error fetching detail ",error);
    }
};


//----Watcher
function* watchGetEventSaga() {
    yield takeEvery(TYPE_ACTION.EVENT.GET, doGetEventSaga);
};

function* watchGetEventWithPersonSaga() {
    yield takeEvery(TYPE_ACTION.EVENT.GET_PERSON, doGetEventWithPersonSaga);
};

function* watchGetEventSearchSaga() {
    yield takeEvery(TYPE_ACTION.EVENT.GET_SEARCH, doGetEventSearchSaga);
};


function* watchGetEventMapSaga() {
    yield takeEvery(TYPE_ACTION.EVENT.GET_EVENT_MAP,doGetEventMapSaga);
};

function* watchGetEventPreviewSaga() {
    yield takeEvery(TYPE_ACTION.EVENT.GET_PREVIEW, doGetEventPreviewSaga);
};

function* watchGetEventDetailSaga() {
    yield takeEvery(TYPE_ACTION.EVENT.DETAIL,doGetEventDetailSaga);
};

function* valueSearch() {
    yield takeEvery('VALUE_SEARCH',search);
};

export {
    watchGetEventSaga,
    watchGetEventDetailSaga,
    watchGetEventPreviewSaga,
    watchGetEventMapSaga,
    watchGetEventSearchSaga,
    valueSearch,
    watchGetEventWithPersonSaga
};

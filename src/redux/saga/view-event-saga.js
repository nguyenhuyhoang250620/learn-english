import TYPE_ACTION from "@constants/action";
import { getCollapse, getViewEvent } from "@redux/slice/view-event-slice";
import { put, takeEvery } from "redux-saga/effects";

function * doGetViewEventSaga(action) {
	yield put(getViewEvent(action.payload));
}
function * doGetCollapse(action) {
	const body = action.payload;
	yield put(getCollapse(body));
}
// -- Watcher
function * watchGetViewEventSaga() {
	yield takeEvery(TYPE_ACTION.VIEW_EVENT.GET_VIEW_EVENT, doGetViewEventSaga);
}

function * watchGetCollapse() {
	yield takeEvery(TYPE_ACTION.VIEW_EVENT.GET_COLLAPSE, doGetCollapse);
}

export {
	watchGetViewEventSaga,
	watchGetCollapse,
};
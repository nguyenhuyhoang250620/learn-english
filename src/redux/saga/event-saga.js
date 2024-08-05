import { call, put, takeEvery } from 'redux-saga/effects';
import EventService from '@redux/services/event-service.js';
import TYPE_ACTION from '@constants/action.js';
import { handleGetAllEvent } from '@redux/slice/event-slice.js';

function * doGetListEventAll(action) {
	try {
		const {body,callBack} = action.payload
		const response = yield call(EventService.getListEventAll, body);
		const {data} = response;
		callBack(data)
		yield put(handleGetAllEvent(data));
	} catch (error) {
		console.log('Error fetching: ', error);
	}
}

// ----Watcher
function * watchGetListEventAll() {
	yield takeEvery(TYPE_ACTION.EVENT.GET_ALL_EVENT, doGetListEventAll);
}

export {
	watchGetListEventAll,
};

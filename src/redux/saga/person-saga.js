import {
    call,
    put,
    takeEvery,
} from 'redux-saga/effects';
import ProfileService from '@redux/services/person-service.js';
import TYPE_ACTION from '@constants/action.js';

// Slice
import { getEventProfile, getProfile } from '@redux/slice/person-slice';

// ----Worker
function * doGetProfileSaga(action) {
	try {
		const {body,callBack} = action.payload;
		const response = yield call(ProfileService.getProfile, body);
		const data = response;
		callBack(data)
		yield put(getProfile(data));
	} catch (error) {
		console.log('Error fetching: ', error);
	}
}
function * doGetEventProfile(action) {
	try {
		const {body,callBack} = action.payload;
		const response = yield call(ProfileService.getEventProfile, body);
		const data = response;
		console.log('2', data);
		callBack(data)
		yield put(getEventProfile(data));
	} catch (error) {
		console.log('Error fetching: ', error);
	}
}
// ----Watcher
function * watchGetProfileSaga() {
	yield takeEvery(TYPE_ACTION.PROFILE.GET_PROFILE, doGetProfileSaga);
}
function * watchGetEventProfile() {
	yield takeEvery(TYPE_ACTION.PROFILE.GET_EVENT_PROFILE, doGetEventProfile);
}

export {
	watchGetProfileSaga,
	watchGetEventProfile
};

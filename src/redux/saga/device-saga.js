import { call, put, takeEvery } from 'redux-saga/effects';

import DeviceService from '../services/device-service.js';
import TYPE_ACTION from '@constants/action.js';
import { handleListDevice } from '@redux/slice/device-slice.js';

function * doGetListDevice(action) {
	try {
		const {body,callBack} = action.payload
		const response = yield call(DeviceService.getListDevice, body);
		const {data} = response;
		callBack(data)
		yield put(handleListDevice(data));
	} catch (error) {
		console.log('Error fetching: ', error);
	}
}


// ----Watcher
function * watchGetListDevice() {
	yield takeEvery(TYPE_ACTION.CAMERA.GET_LIST_DEVICE, doGetListDevice);
}

export {
	watchGetListDevice,
};

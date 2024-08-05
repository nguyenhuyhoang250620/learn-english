import TYPE_ACTION from "@constants/action";
import { call, put, takeEvery } from "redux-saga/effects";
import { getPlate } from '@redux/slice/vehicle-slice';
import VehicleService from "@redux/services/vehicle-service";


function * doGetPlateSaga(action) {
	try {
		const {body,callBack} = action.payload;
		const response = yield call(VehicleService.getPlate, body);
		const {data} = response;
		callBack(data)
		yield put(getPlate(data));
	} catch (error) {
		console.log('Error fetching', error);
	}
}
// ----Watcher
function * watchGetPlateSaga() {
	yield takeEvery(TYPE_ACTION.VEHICLE.GET_VEHICLE, doGetPlateSaga);
}

export {
	watchGetPlateSaga,
};

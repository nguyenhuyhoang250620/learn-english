import { call, put, takeEvery } from "redux-saga/effects";

//Api
import LocationService from "../services/LocationService/LocationService";

//Slice
import { getLocation } from "../redux/slice/LocationSlice";
import { message } from "antd";
import { P } from "@antv/g2plot";
import TYPE_ACTION from "../constants/TypeAction";

//----Worker
function* doGetLocationSaga(action) {
  try {
    const body = action.payload;
    const response = yield call(LocationService.getLocation);
    const { data } = response;
    yield put(getLocation(data));
  } catch (err) {
    console.log(err);
  }
}

//---- Watcher
function* watchGetLocationSaga() {
  yield takeEvery(TYPE_ACTION.LOCATION.GET_LOCATION, doGetLocationSaga);
}

export { watchGetLocationSaga };

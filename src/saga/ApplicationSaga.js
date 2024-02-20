import { call, put, takeEvery } from "redux-saga/effects";

//Api
import ApplicationService from "../services/ApplicationService/ApplicationService.js";

import TYPE_ACTION from "../constants/TypeAction.js";

//Slice
import { getApplication } from "../redux/slice/ApplicationSlice.js";

//----Worker
function* doGetApplicationSaga(action) {
  try {
    const response = yield call(ApplicationService.getAppllication);
    const { data } = response;
    yield put(getApplication(data));
  } catch (error) {
    console.log("Error fetching: ", error);
  }
}

//----Watcher
function* watchGetApplicationSaga() {
  yield takeEvery(TYPE_ACTION.APPLICATION.GET, doGetApplicationSaga);
}

export { watchGetApplicationSaga };

import { takeEvery, put, call } from "redux-saga/effects";
import TYPE_ACTION from "@constants/action";
import {
  getSizeGrid,
  getOpenList,
  getListCameraPreview,
  getListProvince,
  getCameraWithProvince,
  handleCheckGrid
} from "@redux/slice/live-slice";
import LiveService from "@redux/services/live-services";

//---Worker

function* doGetListProvince(action) {
  const { ids } = action.payload;
  try {
    const response = yield call(LiveService.getDatalistProvince, ids);
    const { data } = response;
    yield put(getListProvince(data));
  } catch (error) {
    console.log("Error fetching", error);
  }
}


function* doSelectSizeGrid(action) {
  const body = action.payload;
  yield put(getSizeGrid(body));
}
function* doSelectOpenListCam(action) {
  const body = action.payload;
  yield put(getOpenList(body));
}

function* doGetListCameraPreview(action) {
  const body = action.payload;
  yield put(getListCameraPreview(body));
}
function* doGetCameraDataWithProvince(action) {
  try {
    const { body, callBack } = action.payload;
    const response = yield call(LiveService.getCameraDataWithProvince, body);
    const { data } = response;
    callBack(data);
    yield put(getCameraWithProvince(data));
  } catch (error) {
    console.log("Error fetching", error);
  }
}

function* doGetCameraDataWithID(action) {
  const { url, callBack, errorBack } = action.payload;
  try {
    const response = yield call(LiveService.getPreviewCamWithID, url);
    callBack(response.data);
  } catch (error) {
    errorBack(error);
  }
}

function* doGetDistrict(action) {
  const { body, callBack } = action.payload;
  try {
    const response = yield call(LiveService.getDistric, body);
    callBack(response.data.results);
  } catch (error) {}
}

function* doGetWard(action) {
  const { body, callBack } = action.payload;
  try {
    const response = yield call(LiveService.getWard, body);
    callBack(response.data.results);
  } catch (error) {}
}

function* doGetDevice(action) {
  const { body, callBack } = action.payload;
  try {
    const response = yield call(LiveService.getDevice, body);
    callBack(response.data);
  } catch (error) {}
}

function* doGetAllCameraStream(action) {
  const { body, callBack } = action.payload;
  try {
    const response = yield call(LiveService.getAllCameraStream, body);
    callBack(response.data);
    yield put(handleCheckGrid(response.data));
  } catch (error) {}
}

function* doStopStream(action) {
  const {id,callBack} = action.payload;
  try {
    const response = yield call(LiveService.stopStream, id);
    callBack(response);
  } catch (error) {}
}


function* watchDoGetListProvince() {
  yield takeEvery(TYPE_ACTION.LIVE.GET_LIST_PROVINCE, doGetListProvince);
}

function* watchDoSelectSizeGrid() {
  yield takeEvery(TYPE_ACTION.LIVE.CHANGE_GRID, doSelectSizeGrid);
}
function* watchDoSelectOpenList() {
  yield takeEvery(TYPE_ACTION.LIVE.OPEN_LIST, doSelectOpenListCam);
}
function* watchDoGetListCameraPreview() {
  yield takeEvery(
    TYPE_ACTION.LIVE.GET_LIST_CAMERA_PREVIEW,
    doGetListCameraPreview
  );
}
function* watchDoGetDataCameraWithProvince() {
  yield takeEvery(
    TYPE_ACTION.LIVE.GET_DATA_CAMERA_WITH_PROVINCE,
    doGetCameraDataWithProvince
  );
}
function* watchDoGetDataCameraWithID() {
  yield takeEvery(TYPE_ACTION.LIVE.GET_PREVIEW_WITH_ID, doGetCameraDataWithID);
}
function* watchDoGetDistrictLive() {
  yield takeEvery(TYPE_ACTION.LIVE.GET_DISTRICT_LIVE, doGetDistrict);
}
function* watchDoGetWardLive() {
  yield takeEvery(TYPE_ACTION.LIVE.GET_WARD_LIVE, doGetWard);
}
function* watchDoGetDevice() {
  yield takeEvery(TYPE_ACTION.LIVE.GET_DEVICE_LIVE, doGetDevice);
}

function* watchDoGetAllCameraStream() {
  yield takeEvery(TYPE_ACTION.LIVE.GET_ALL_CAMERA_STREAM, doGetAllCameraStream);
}

function* watchDoStopStream() {
  yield takeEvery(TYPE_ACTION.LIVE.STOP_STREAM, doStopStream);
}
export {
  watchDoSelectSizeGrid,
  watchDoSelectOpenList,
  watchDoGetListCameraPreview,
  watchDoGetListProvince,
  watchDoGetDataCameraWithProvince,
  watchDoGetDataCameraWithID,
  watchDoGetDistrictLive,
  watchDoGetWardLive,
  watchDoGetDevice,
  watchDoGetAllCameraStream,
  watchDoStopStream,
};

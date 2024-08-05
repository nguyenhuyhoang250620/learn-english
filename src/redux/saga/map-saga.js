import { call, put, takeEvery } from "redux-saga/effects";
import {
  getDataLocationCam,
  getDataAddress,
  getCode,
  getDataProvince,
  getDataDistrict,
  getTotalCamAll,
  getDataRecorder, changeKeyHandle,
  getDataCameraGroup,
  closeGroup,
  getDataWard
} from "../slice/map-slice";
import MapService from "@redux/services/map-services";
import TYPE_ACTION from "@constants/action";
//-----Worker
function* doGetLocationCamera(action) {
  try {
    const body = action.payload;
    const response = yield call(MapService.getDataLocationCamera, body);
    const { data } = response;
    yield put(getDataLocationCam(data));
  } catch (error) {
    console.log("Error fetching", error);
  }
}
function* doGetDataRecorder(action) {
  try {
    const body = action.payload;
    const response = yield call(MapService.getDataRecorder, body);
    const { data } = response;
    yield put(getDataRecorder(data));
  } catch (error) {
    console.log("Error fetching", error);
  }
}
function* doGetDataAddress(action) {
  try {
    const response = yield call(MapService.getDataAddress);
    const { data } = response;
    yield put(getDataAddress(data));
  } catch (error) {
    console.log("Error fetching", error);
  }
}

function* doGetDataProvince(action) {
  const { ids } = action.payload;
  try {
    const response = yield call(MapService.getDataProvince, ids);
    const { data } = response;
    yield put(getDataProvince(data));
  } catch (error) {
    console.log("Error fetching", error);
  }
}

function* doGetDataWard(action) {
  const { body,callBack } = action.payload;
  try {
    const response = yield call(MapService.getDataWard, body);
    const { data } = response;
    callBack(data.results)
    yield put(getDataWard(data));
  } catch (error) {
    console.log("Error fetching", error);
  }
}

function* doGetDataDistrict(action) {
  const { ids } = action.payload;
  try {
    const response = yield call(MapService.getDataDistrict, ids);
    const { data } = response;
    yield put(getDataDistrict(data));
  } catch (error) {
    console.log("Error fetching", error);
  }
}

function* doGetTotalCam(action) {
  try {
    const response = yield call(MapService.getTotalCamAll);
    const { data } = response;
    yield put(getTotalCamAll(data));
  } catch (error) {
    console.log("Error fetching", error);
  }
}

function* doGetDataDrawCircle(action) {
  try {
    const {arr,callBack} = action.payload
    const response = yield call(MapService.getDataDrawCircle,arr);
    callBack(response)
    // const { data } = response;
    // yield put(getTotalCamAll(data));
  } catch (error) {
    console.log("Error fetching", error);
  }
}
function* doGetDataDrawPolygon(action) {
  try {
    const {arr,callBack} = action.payload
    const response = yield call(MapService.getDataDrawPolygon,arr);
    callBack(response)
    // const { data } = response;
    // yield put(getTotalCamAll(data));
  } catch (error) {
    console.log("Error fetching", error);
  }
}

function* doGetCameraDataWithID(action) {
  const {url,callBack,errorBack} = action.payload;
  try {
    const response = yield call(MapService.getPreviewCameraWithID,url);
    callBack(response.data)
  } catch (error) {
    errorBack(error)
    console.log("Error fetching", error);
  }
}

function* doCloseCamera(action) {
  try {
    console.log("stop stream")
    const response = yield call(MapService.closeCamera,action.payload);
    console.log(response)
  } catch (error) {
    console.log("Error fetching", error);
  }
}


function* doGetCode(action) {
  yield put(getCode(action.payload));
}

function* doGetChangeKey(action) {
  yield put(changeKeyHandle(action.payload));
}

function* doCloseGroup(action) {
  yield put(closeGroup(action.payload));
}

function* doGetDataCameraGroup(action){
  try {
    const {body,callback} = action.payload
    const response = yield call(MapService.getDataCameraGroup,body);
    const {data} = response
    callback(data)
    yield put(getDataCameraGroup(data));
  } catch (error) {
    console.log("Error fetching", error);
  }
}

//----Watcher
function* watchGetLocationCamera() {
  yield takeEvery(
    TYPE_ACTION.MAP.GET_LOCATION_CAMERA,
    doGetLocationCamera
  );
}
function* watchGetDataRecorder() {
  yield takeEvery(TYPE_ACTION.MAP.GET_RECORDER, doGetDataRecorder);
}
function* watchGetDataAddress() {
  yield takeEvery(TYPE_ACTION.MAP.GET_ADDRESS, doGetDataAddress);
}
function* watchGetDataProvince() {
  yield takeEvery(TYPE_ACTION.MAP.GET_PROVINCE, doGetDataProvince);
}
function* watchGetDataWard() {
  yield takeEvery(TYPE_ACTION.MAP.GET_WARD, doGetDataWard);
}
function* watchGetDataDistrict() {
  yield takeEvery(TYPE_ACTION.MAP.GET_DISTRICT, doGetDataDistrict);
}
function* watchGetTotalCam() {
  yield takeEvery(TYPE_ACTION.MAP.GET_TOTAL, doGetTotalCam);
}
function* watchDrawCircle() {
  yield takeEvery(TYPE_ACTION.MAP.GET_ADDRESS_DRAW_CIRCLE, doGetDataDrawCircle);
}
function* watchDrawPolygon() {
  yield takeEvery(TYPE_ACTION.MAP.GET_ADDRESS_DRAW_POLYGON, doGetDataDrawPolygon);
}
function* watchGetCode() {
  yield takeEvery(TYPE_ACTION.MAP.GET_CODE, doGetCode);
}
function* watchGetPreviewCamera() {
  yield takeEvery(TYPE_ACTION.MAP.GET_PREVIEW, doGetCameraDataWithID);
}
function* watchStopStream() {
  yield takeEvery(TYPE_ACTION.MAP.CLOSE_PRVIEW, doCloseCamera);
}
function* watchChangeKey() {
  yield takeEvery(TYPE_ACTION.MAP.CHANGE_KEY, doGetChangeKey);
}
function* watchGetCameraDataGroup() {
  yield takeEvery(TYPE_ACTION.MAP.GET_DATA_CAMERA_GROUP, doGetDataCameraGroup);
}

function* watchCloseGroup() {
  yield takeEvery(TYPE_ACTION.MAP.CLOSE_GROUP, doCloseGroup);
}

export {
  watchGetLocationCamera,
  watchGetDataAddress,
  watchGetCode,
  watchGetDataProvince,
  watchGetDataDistrict,
  watchGetTotalCam,
  watchGetDataRecorder,
  watchDrawCircle,
  watchDrawPolygon,
  watchGetPreviewCamera,
  watchStopStream,
  watchChangeKey,
  watchGetCameraDataGroup,
  watchCloseGroup,
  watchGetDataWard
};

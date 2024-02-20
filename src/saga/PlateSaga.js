import { call, put, takeEvery } from "redux-saga/effects";

//Api
import PlateService from "../services/PlateService/PlateService";

import TYPE_ACTION from "../constants/TypeAction";

//Slice
import { getPlate, getDetail, getPlateNoOwner } from "../redux/slice/PlateSlice";
import { message } from "antd";

//-----Worker
function* doGetPlateSaga(action) {
  try {
    const body = action.payload;
    const response = yield call(PlateService.getPlate, body);
    const { data } = response;
    yield put(getPlate(data));
  } catch (error) {
    console.log("Error fetching", error);
  }
}

function* doGetPlateSagaNoOwner(action) {
  try {
    const body = action.payload;
    const response = yield call(PlateService.getPlateNoOwner, body);
    const { data } = response;
    yield put(getPlateNoOwner(data));
  } catch (error) {
    console.log("Error fetching", error);
  }
}

function* doCreatePlateSaga(action) {
  const {obj, callBack} = action.payload;
    const formData = new FormData();
    Object.keys(obj).map((index) => {
        if (obj[index]) {
            formData.append(index, obj[index]);
        }
    })
    try {
      const response = yield call(PlateService.createPlate, formData);
      callBack(response['data']);
      message.success("successfully added profile")
   } catch (error) {
       console.log("Error fetching: ", error);
   }
}

function* doGetPlateDetail(action) {
  try {
    const body = action.payload;
    const response = yield call(PlateService.getPlate, body);
    const { data } = response;
    yield put(getDetail(data));
  } catch (error) {
    console.log("Error fetching", error);
    message.error(error.response.data.message);
  }
}

function* doUpdatePlate(action) {
  const {obj, callBack} = action.payload;
    const formData = new FormData();
    Object.keys(obj).map((index) => {
        if (obj[index]) {
            formData.append(index, obj[index]);
        }
    })
  try {
    // for (const [key, value] of body.entries()) {
    //   console.log(key + ": " + value);
    // }
    const response = yield call(PlateService.updatePlate, formData);
    callBack(response['data']);
    message.success("Media information update successful !");
  } catch (error) {
    console.log("Error fetching", error);
    message.error(error.response.data.message);
  }
}
function* doDeletePlate(action) {
  try {
    const body = action.payload;
    const response = yield call(PlateService.deletePlate, body);
    message.success("Delete success!");
  } catch (error) {
    console.log("Error update: ", error);
    message.error(error.response.data.message);
  }
};

//----Watcher
function* watchGetPlateSaga() {
  yield takeEvery(TYPE_ACTION.PLATE.GET_PLATE, doGetPlateSaga);
};
function* watchGetPlateNoOwner() {
  yield takeEvery(TYPE_ACTION.PLATE.GET_PLATE_NO_OWNER, doGetPlateSagaNoOwner);
};

function* watchCreatePlateSaga() {
  yield takeEvery(TYPE_ACTION.PLATE.NEW_PLATE,doCreatePlateSaga);
}

function* watchGetPlateDetailSaga() {
  yield takeEvery(TYPE_ACTION.PLATE.PLATE_DETAIL,doGetPlateDetail);
}

function* watchUpdatePlateSaga() {
  yield takeEvery(TYPE_ACTION.PLATE.UPDATE_PLATE,doUpdatePlate);
};
function* watchDeletePlateSaga() {
  yield takeEvery(TYPE_ACTION.PLATE.DELETE_PLATE,doDeletePlate);
};

export {
    watchGetPlateSaga,
    watchGetPlateNoOwner,
    watchGetPlateDetailSaga,
    watchCreatePlateSaga,
    watchUpdatePlateSaga,
    watchDeletePlateSaga
    
}
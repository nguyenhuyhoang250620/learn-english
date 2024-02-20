import {
    call,
    put,
    takeEvery,
} from "redux-saga/effects";

//Api
import ProfileService from "../services/ProfileService/ProfileService.js";

import TYPE_ACTION from "../constants/TypeAction.js";

//Slice
import { getProfile, getAllProfile } from "../redux/slice/ProfileSlice.js";
import { message } from "antd";

//----Worker
function* doGetProfileSaga(action) {
    try {
        const body = action.payload;
        const response = yield call(ProfileService.getProfile,body);
        const data  = response;
        yield put(getProfile(data));
    } catch (error) {
        console.log("Error fetching: ", error);
    }
};

function* doGetAllProfileSaga(action) {
    try {
        const body = action.payload;
        const response = yield call(ProfileService.getProfile,body);
        const data  = response;
        yield put(getAllProfile(data));
    } catch (error) {
        console.log("Error fetching: ", error);
    }
};

function* doAddProfileSaga(action) {
    const {obj, callBack} = action.payload;
    const formData = new FormData();
    Object.keys(obj).map((index) => {
        if (obj[index]) {
            formData.append(index, obj[index]);
        }
    })
    try {
       const res =  yield call(ProfileService.addProfile, formData);
       callBack(res['data']);
       message.success("successfully added profile")
    } catch (error) {
        console.log("Error fetching: ", error);
    }
};

function* doUpdateProfileSaga(action) {
    try {
        if (action.payload instanceof FormData) {
            const body = action.payload;
            const response = yield call(ProfileService.updateProfile, body);
            message.success("successfully update profile")
          } else {
            const {obj, callBack} = action.payload;
            const formData = new FormData();
            Object.keys(obj).map((index) => {
                if (obj[index]) {
                    formData.append(index, obj[index]);
                }
            })
            const response = yield call(ProfileService.updateProfile, formData);
            callBack(response['data']);
            message.success("successfully update profile")
          }
    } catch (error) {
        console.log("Error fetching: ", error);
    }
};


function* doDeleteProfile(action) {
    try {
      const body = action.payload;
      const response = yield call(ProfileService.deleteProfile, body);
      message.success("Delete success!");
    } catch (error) {
      console.log("Error update: ", error);
      message.error(error.response.data.message);
    }
  };

//----Watcher
function* watchGetProfileSaga() {
    yield takeEvery(TYPE_ACTION.PROFILE.GET_PROFILE, doGetProfileSaga);
};

function* watchGetAllProfileSaga() {
    yield takeEvery(TYPE_ACTION.PROFILE.GET_ALL_PROFILE, doGetAllProfileSaga);
};

function* watchAddProfileSaga() {
    yield takeEvery(TYPE_ACTION.PROFILE.ADD_PROFILE, doAddProfileSaga);
};

function* watchUpdateProfileSaga() {
    yield takeEvery(TYPE_ACTION.PROFILE.UPDATE_PROFILE, doUpdateProfileSaga);
};
function* watchDeleteProfileSaga() {
    yield takeEvery(TYPE_ACTION.PROFILE.DELETE, doDeleteProfile);
};


export {
    watchGetProfileSaga,
    watchAddProfileSaga,
    watchUpdateProfileSaga,
    watchGetAllProfileSaga,
    watchDeleteProfileSaga
}

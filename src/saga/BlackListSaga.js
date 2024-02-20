import { call, put, takeEvery } from "redux-saga/effects";

//Api
import BlackListService from "../services/BlackListService/BlackListService.js";

import TYPE_ACTION from "../constants/TypeAction.js";

//Slice
import {
  getBlackList,
  getBlackListDetail,
  getFilterSearchSelect,
  selectFilterSearchSelect
} from "../redux/slice/BlackListSlice.js";
import { message } from "antd";

//----Worker
function* doGetBlackListSaga(action) {
  const body = action.payload;
  try {
    const response = yield call(BlackListService.getList, body);
    const { data } = response;
    yield put(getBlackList(data));
  } catch (error) {
    console.log("Error fetching: ", error);
  }
}

function* doGetBlackListDetailSaga(action) {
  const body = action.payload;
  try {
    const response = yield call(BlackListService.getList, body);
    const { data } = response;
    yield put(getBlackListDetail(data));
  } catch (error) {
    console.log("Error fetching: ", error);
    message.error(error.response.data.message);
  }
}

function* doUpdateBlackListDetail(action) {
  try {
    const body = action.payload;
    const response = yield call(BlackListService.updateBlackListDetail, body);
    const { data } = response;
    message.success("Update success!");
  } catch (error) {
    console.log("Error update: ", error);
    message.error(error.response.data.message);
  }
}

function* doCreateBlackList(action) {
  try {
    const body = action.payload;
    const response = yield call(BlackListService.createBlackList, body);
    const { data } = response;
    message.success("Create success!");
  } catch (error) {
    console.log("Error update: ", error);
    message.error(error.response.data.message);
  }
}

function* doDeleteBlackList(action) {
  try {
    const body = action.payload;
    const response = yield call(BlackListService.deleteBlackList, body);
    const { data } = response;
    message.success("Delete success!");
  } catch (error) {
    console.log("Error update: ", error);
    message.error(error.response.data.message);
  }
};

function* doGetFilterSearchSelect(action) {
  const body = action.payload;
  yield put(getFilterSearchSelect(body))
};

//----Watcher
function* watchGetBlackListSaga() {
  yield takeEvery(TYPE_ACTION.BLACKLIST.GET_BLACKLIST, doGetBlackListSaga);
}

function* watchGetBlackListDetailSaga() {
  yield takeEvery(TYPE_ACTION.BLACKLIST.GET_DETAIL, doGetBlackListDetailSaga);
}

function* watchUpdateBlackListSaga() {
  yield takeEvery(TYPE_ACTION.BLACKLIST.UPDATE_DETAIL, doUpdateBlackListDetail);
}

function* watchCreateBlackListSaga() {
  yield takeEvery(TYPE_ACTION.BLACKLIST.CREATE, doCreateBlackList);
}

function* watchDeleteBlackListSaga() {
  yield takeEvery(TYPE_ACTION.BLACKLIST.DELETE, doDeleteBlackList)
}

function* watchFilterSearchSelect() {
  yield takeEvery(TYPE_ACTION.BLACKLIST.SELECT, doGetFilterSearchSelect)
}

export {
  watchGetBlackListSaga,
  watchGetBlackListDetailSaga,
  watchUpdateBlackListSaga,
  watchCreateBlackListSaga,
  watchDeleteBlackListSaga,
  watchFilterSearchSelect
};

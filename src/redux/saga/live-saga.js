import { takeEvery, put, call } from "redux-saga/effects";
import TYPE_ACTION from "@constants/action";
import { getListVocabulary } from "@redux/slice/live-slice";
import LiveService from "@redux/services/live-services";

//---Worker

function* doGetAllDataVocabulary(action) {
  try {
    const { body, callBack } = action.payload;
    const response = yield call(LiveService.getDataAllVocabulary, body);
    const  data  = response.data;
    callBack(data);
    yield put(getListVocabulary(data));
  } catch (error) {
    console.log("Error fetching", error);
  }
}

function* doDeleteVocabulary(action) {
  try {
    const { body, callBack } = action.payload;
    const response = yield call(LiveService.deleteDataAllVocabulary, body.id);
    callBack(response);
  } catch (error) {
    console.log("Error fetching", error);
  }
}

function* watchDoGetAllDataVocabulary() {
  yield takeEvery(
    TYPE_ACTION.VOCABULARY.GET_ALL_VOCABULARY,
    doGetAllDataVocabulary
  );
}
function* watchDoDeleteVocabulary() {
  yield takeEvery(
    TYPE_ACTION.VOCABULARY.DELETE_VOCABULARY,
    doDeleteVocabulary
  );
}
export {
  watchDoGetAllDataVocabulary,
  watchDoDeleteVocabulary
};

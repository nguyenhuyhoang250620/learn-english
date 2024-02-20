import {
    call,
    put,
    takeEvery,
} from "redux-saga/effects";

//Api 
import IdCardService from "../services/IDCardService/IdCardService.js";

import TYPE_ACTION from "../constants/TypeAction.js";

//Slice 
import { getIdCard } from "../redux/slice/IDCardSlice";

//----Worker
function* doGetIdCardSaga (action) {
    const body = action.payload;
    try {
        const response = yield call(IdCardService.getIdCard,body);
        const { data } = response;
        yield put(getIdCard(data.sort((a, b) => b.id - a.id)));
    } catch (error) {
        console.log("Error fetching: ", error);
    } 
};

function* watchGetIdCardSaga() {
    yield takeEvery(TYPE_ACTION.ID_CARD.GET_ID_CARD, doGetIdCardSaga);
};


export {
    watchGetIdCardSaga,
}
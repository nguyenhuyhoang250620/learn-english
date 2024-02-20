import {
    call,
    put,
    takeEvery,
} from "redux-saga/effects";

//Api 
import RegionService from "../services/RegionService/RegionService.js";

import TYPE_ACTION from "../constants/TypeAction.js";

//Slice 
import { getRegion } from "../redux/slice/RegionSlice";

//----Worker
function* doGetRegionSaga(action) {
    const body = action.payload;
    try {
        const response = yield call(RegionService.getRegion);
        const data  = response;
        yield put(getRegion(data));
    } catch (error) {
        console.log("Error fetching: ", error);
    }
}

//----Watcher
function* watchGetRegionSaga() {
    yield takeEvery(TYPE_ACTION.REGION.GET, doGetRegionSaga);
};

export {
    watchGetRegionSaga
};
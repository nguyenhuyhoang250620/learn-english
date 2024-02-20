import {
    call,
    put,
    takeEvery,
} from "redux-saga/effects";
import TYPE_ACTION from "../constants/TypeAction";

import { changeDarkMode } from "../redux/slice/DarkModeSlice";


function* doChangeDarkMode(action) {
    yield put(changeDarkMode(action.payload));
};

function* watchGetDoChangeDarkMode() {
    yield takeEvery(TYPE_ACTION.BACKGROUND.DARK_MODE,doChangeDarkMode);
};

export {
    watchGetDoChangeDarkMode
};
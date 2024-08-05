import {
	call,
	put,
	takeEvery,
} from 'redux-saga/effects';

// Api


import {isAuthencation} from '../slice/auth-slice.js';
import AuthService from '../services/auth-service.js';
import TYPE_ACTION from '@constants/action.js';
import { message } from 'antd';

// ---Worker
function * doGetAuthInfo(action) {
	try {
        const {data,callback} = action.payload
        const response = yield call(AuthService.signin,data);
        localStorage.setItem("token",response.data.jwt)
        localStorage.setItem("refreshToken",response.data.refreshToken)
        callback(response)
        yield put(isAuthencation(true))
    } catch (error) {
        message.error('Đăng nhập thất bại!')
    }
}

// ---Watcher
function * watchGetAuthInfoSaga() {
	yield takeEvery(TYPE_ACTION.AUTH.SIGN_IN,doGetAuthInfo);
}

export {
	watchGetAuthInfoSaga,
};

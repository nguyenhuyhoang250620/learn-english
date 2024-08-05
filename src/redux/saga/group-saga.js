import TYPE_ACTION from "@constants/action";
import GroupListService from "@redux/services/group-service";
import { getBlackList } from "@redux/slice/group-slice";
import { call, put, takeEvery } from "redux-saga/effects";


function * doGetGroupListSaga(action) {
	try {
		const {body,callBack} = action.payload
		const response = yield call(GroupListService.getList, body);
		const {data} = response;
		callBack(data)
		yield put(getBlackList(data));
	} catch (error) {
		console.log('Error fetching: ', error);
	}
}

function * watchGetGroupListSaga() {
	yield takeEvery(TYPE_ACTION.GROUP.GET_GROUP, doGetGroupListSaga);
}

export {
	watchGetGroupListSaga,
};
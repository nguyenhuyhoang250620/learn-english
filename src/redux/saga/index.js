// Saga effects
import { all } from "redux-saga/effects";
// Auth
import { watchGetAuthInfoSaga } from '../saga/auth-saga';
import { watchGetListDevice } from './device-saga';
import { watchDoIdToggle } from './action-saga';
import { watchGetListEventAll } from './event-saga';
import { watchGetProfileSaga } from './person-saga';
import { watchGetPlateSaga } from './vehicle-saga';
import { watchGetEventProfile } from './person-saga';
import { watchGetCollapse, watchGetViewEventSaga } from './view-event-saga';
import {
  watchDoGetAllDataVocabulary,
  watchDoDeleteVocabulary
} from "./live-saga";
import { watchGetGroupListSaga } from "./group-saga";
import {
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
} from "./map-saga";


export default function* rootSaga() {
  yield all([
		watchGetCollapse(),
		watchGetViewEventSaga(),
    watchGetAuthInfoSaga(),
    watchGetPlateSaga(),
    watchGetListDevice(),
    watchDoIdToggle(),
    watchGetListEventAll(),
    watchGetProfileSaga(),
    watchGetEventProfile(),
    watchDoGetAllDataVocabulary(),
    watchGetGroupListSaga(),
    watchGetLocationCamera(),
    watchGetDataAddress(),
    watchGetCode(),
    watchGetDataProvince(),
    watchGetDataDistrict(),
    watchGetTotalCam(),
    watchGetDataRecorder(),
    watchDrawCircle(),
    watchDrawPolygon(),
    watchGetPreviewCamera(),
    watchStopStream(),
    watchChangeKey(),
    watchGetCameraDataGroup(),
    watchCloseGroup(),
    watchGetDataWard(),
    watchDoDeleteVocabulary()
  ]);
}

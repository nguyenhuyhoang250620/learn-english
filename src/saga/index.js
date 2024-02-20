// saga effects
import { all } from "redux-saga/effects";

//Event
import {
  watchGetEventSaga,
  watchGetEventDetailSaga,
  watchGetEventPreviewSaga,
  watchGetEventMapSaga,
  watchGetEventSearchSaga,
  valueSearch,
  watchGetEventWithPersonSaga
} from "../saga/EventSaga";

//Application
import { watchGetApplicationSaga } from "../saga/ApplicationSaga";

//Camera
import { watchGetCameraSaga } from "../saga/CameraSaga";

//Region
import { watchGetRegionSaga } from "../saga/RegionSaga";

//Auth
import { watchGetAuthInfoSaga } from "../saga/AuthSaga";

//ID Card
import { watchGetIdCardSaga } from "../saga/IDCardSaga";

//Profile
import {
  watchGetProfileSaga,
  watchAddProfileSaga,
  watchUpdateProfileSaga,
  watchGetAllProfileSaga,
  watchDeleteProfileSaga
  
} from "../saga/ProfileSaga";

//Socket
import {
  watchGetSocketSaga,
  watchDeleteSocketSaga,
  watchChangeNofitication,
} from "../saga/SocketSaga";

//Background
import { watchGetDoChangeDarkMode } from "../saga/DarkModeSaga";

//Plate
import {
  watchGetPlateSaga,
  watchGetPlateNoOwner,
  watchCreatePlateSaga,
  watchGetPlateDetailSaga,
  watchUpdatePlateSaga,
  watchDeletePlateSaga
} from "../saga/PlateSaga";

//BlackList
import {
  watchGetBlackListSaga,
  watchGetBlackListDetailSaga,
  watchUpdateBlackListSaga,
  watchCreateBlackListSaga,
  watchDeleteBlackListSaga,
  watchFilterSearchSelect,
} from "../saga/BlackListSaga";

//Location
import { watchGetLocationSaga } from "./LocationSaga";

// View Event
import { watchGetViewEventSaga, watchGetCollapse } from "./ViewEventSaga"; 

export default function* rootSaga() {
  yield all([
    //----Event
    watchGetEventSaga(),
    watchGetEventDetailSaga(),
    watchGetEventPreviewSaga(),
    watchGetEventMapSaga(),
    watchGetEventSearchSaga(),
    valueSearch(),
    watchGetEventWithPersonSaga(),
    //----Application
    watchGetApplicationSaga(),
    //-----Camera
    watchGetCameraSaga(),
    //-----Region
    watchGetRegionSaga(),
    //-----Auth
    watchGetAuthInfoSaga(),
    //-----ID Card
    watchGetIdCardSaga(),
    //-----Profile
    watchGetProfileSaga(),
    watchAddProfileSaga(),
    watchUpdateProfileSaga(),
    watchGetAllProfileSaga(),
    watchDeleteProfileSaga(),
    //------Socket
    watchGetSocketSaga(),
    watchDeleteSocketSaga(),
    watchChangeNofitication(),
    //----Background
    watchGetDoChangeDarkMode(),
    //----Plate
    watchGetPlateSaga(),
    watchGetPlateNoOwner(),
    watchCreatePlateSaga(),
    watchGetPlateDetailSaga(),
    watchUpdatePlateSaga(),
    watchDeletePlateSaga(),
    //----BlackList
    watchGetBlackListSaga(),
    watchGetBlackListDetailSaga(),
    watchUpdateBlackListSaga(),
    watchCreateBlackListSaga(),
    watchDeleteBlackListSaga(),
    watchFilterSearchSelect(),
    //Location
    watchGetLocationSaga(),
    //ViewEvent
    watchGetViewEventSaga(),
    watchGetCollapse()
  ]);
}

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";

// Saga
import rootSaga from "../saga/index";

//Event
import eventReducer from "../redux/slice/EventSlice";

//Application
import applicationReducer from "./slice/ApplicationSlice";

//Camera
import cameraReducer from "./slice/CameraSlice";

//Region
import regionReducer from "./slice/RegionSlice";

//Auth
import authReducer from "./slice/AuthSlice";

//ID Card
import idCard from "./slice/IDCardSlice";

//Profile
import profile from "./slice/ProfileSlice";

//Socket
import socket from "./slice/SocketSlice";

//DarkMode
import darkmode from "./slice/DarkModeSlice";

//Plate
import plate from "./slice/PlateSlice";

//BlackList
import blacklist from "./slice/BlackListSlice";

//Location
import location from "./slice/LocationSlice";

//View Event 
import viewEvent from "./slice/ViewEventSlice";

const reducers = combineReducers({
  events: eventReducer,
  applications: applicationReducer,
  cameras: cameraReducer,
  regions: regionReducer,
  auth: authReducer,
  idCards: idCard,
  profiles: profile,
  sockets: socket,
  darkmode: darkmode,
  plates: plate,
  blacklists: blacklist,
  locations:location,
  viewEvents:viewEvent
});

let sagaMiddleware = createSagaMiddleware();
const middleware = [
  ...getDefaultMiddleware({ thunk: false, serializableCheck: false }),
  sagaMiddleware,
];

const store = configureStore({
  reducer: reducers,
  middleware,
  devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleware.run(rootSaga);

export default store;

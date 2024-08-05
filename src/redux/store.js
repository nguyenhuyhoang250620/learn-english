import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

// Saga
import rootSaga from './saga/index';

// Auth
import authReducer from './slice/auth-slice';
import tabsReducer from './slice/tabs-slice';
import deviceReducer from './slice/device-slice';
import liveReducer from "./slice/live-slice";
import mapReducer from './slice/map-slice';
import actionReducer from './slice/action-slice';
import eventReducer from './slice/event-slice';
import profileReducer from './slice/person-slice'
import plateReducer from './slice/vehicle-slice'
import viewEventReducer from './slice/view-event-slice';
import groupReducer from './slice/group-slice';


const reducers = combineReducers({
	auth: authReducer,
	tabs:tabsReducer,
	device:deviceReducer,
	live:liveReducer,
	map:mapReducer,
	action: actionReducer,
	event:eventReducer,
	profiles: profileReducer,
	plates: plateReducer,
	viewEvents: viewEventReducer,
	groups: groupReducer,
});

const sagaMiddleware = createSagaMiddleware();
const middleware = [
	...getDefaultMiddleware({thunk: false, serializableCheck: false}),
	sagaMiddleware,
];

const store = configureStore({
	reducer: reducers,
	middleware,
	devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);

export default store;

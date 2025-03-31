
export const SERVICE_PATHS = {
	AUTH: {
		SIGN_IN: '/api/auth/login',
		GET_INFO: '/AIViewService/api/aiview/getUserInfo',
	},
	CAMERA: {
		GET_DEVICE: '/api/vms/camera/get/',
	},
	EVENT:{
		GET_EVENT_ALL:'/api/cctv/get/'
	},
	PROFILE: {
		GET_PROFILE: '/api/ocr/get/',
	},
	VEHICLE: {
		GET_VEHICLE: '/api/anpr/get/',
	},
	LIVE:{
		GET_PROVINCE: '/api/province',
		GET_DATA_CAMERA_WITH_PROVINCE:'/api/camera/get',
        GET_PREVIEW_WITH_ID:'/api/camera/start-stream',
        GET_DISTRICT: '/api/district',
        GET_CAMERA: '/api/camera',
        GET_DEVICE:'/api/device',
        GET_ALL_CAMERA_STREAM:'/api/camera/all-cameras-playing-of-user',
        STOP_STREAM:'/api/camera/stop-stream'
	},
	GROUP: {
		GET_GROUP: '/api/cctv/profile/get/',
	},
	MAP:{
		GET_LOCATION: '/api/camera/get',
        GET_ADDRESS: '/api/address',
        GET_PROVINCE: '/api/province',
        GET_WARD:"/api/ward",
        GET_DISTRICT: '/api/district',
        GET_TOTAL:'/api/camera/count',
        GET_RECORDER:'/api/recorder',
        GET_DRAW_CIRCLE:'/api/address/inside-circle',
        GET_DRAW_POLYGON:'/api/address/inside-polygon',
        GET_PREVIEW_WITH_ID:'/api/camera/start-stream',
        STOP_STREAM:'/api/camera/stop-stream/all',
        GET_DATA_CAMERA_GROUP:"/api/device/inside-circle"
	},
	VOCABULARY:{
		GET_ALL:'/all',
		DELETE:'/person'
	}

};

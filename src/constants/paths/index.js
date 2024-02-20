

export const SERVICE_PATHS = {
    AUTH: {
        SIGN_IN: '/api/auth/signin',
        GET_INFO: '/AIViewService/api/aiview/getUserInfo'
    },
    EVENT: {
        GET_EVENT: '/api/cctv/get/',
        GET_DETAIL: '/AIViewService/api/aiview/getReportByEventId/',
    },
    APPLICATION: {
        GET_APPLICATION: '/AIViewService/api/application/getAllApplication'
    },
    CAMERA: {
        GET_CAMERA: '/api/vms/camera/get/'
    },
    REGION: {
        GET_REGION: '/AIViewService/api/aiview/getAllRegion'
    },
    IDCARD: {
        GET_ID_CARD: '/api/ocr/get/',
    },
    PROFILE: {
        GET_PROFILE: '/api/ocr/get/',
        ADD_PROFILE: '/api/ocr/add/',
        UPDATE_PROFILE: '/api/ocr/update/',
        GET_PROFILE_HAVE_VEHICLE:'/api/ocr/get_user_have_vehicle/',
        GET_PROFILE_NO_VEHICLE:'/api/ocr/get_user_no_vehicle/',
        DELETE:'/api/ocr/delete/?id=',
    },
    PLATE: {
        GET_PLATE: '/api/anpr/get/',
        GET_PLATE_NO_OWNER: '/api/anpr/get_no_owner/',
        NEW_PLATE: '/api/anpr/add/',
        UPDATE_PLATE: '/api/anpr/update/',
        DELETE:'/api/anpr/delete/?id='
    },
    BLACKLIST: {
        GET_BLACKLIST: '/api/cctv/profile/get/',
        UPDATE_BLACKLIST_DETAIL: '/api/cctv/profile/update/',
        CREATE_BLICKLIST: '/api/cctv/profile/add/',
        DELETE_BLACKLIST: '/api/cctv/profile/delete/?id='
    },
    SOCKET: {
        CONNECT_SOCKET: '/ws/vms-server/'
    },
    LOCATION: {
        GET_LOCATION: '/api/vms/location/get/'
    }
};

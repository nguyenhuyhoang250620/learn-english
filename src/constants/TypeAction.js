

const TYPE_ACTION = {
    EVENT: {
        GET: 'GET_EVENT',
        GET_PERSON:"GET_PERSON",
        GET_SEARCH: 'GET_EVENT_SEARCH',
        GET_PREVIEW: 'GET_PREVIEW',
        DETAIL: 'GET_DETAIL',
        GET_EVENT_MAP: 'GET_EVENT_MAP',
    },
    APPLICATION: {
        GET: 'GET_APPLICATION'
    },
    CAMERA: {
        GET: 'GET_CAMERA'
    },
    REGION: {
        GET: 'GET_REGION'
    },
    AUTH: {
        GET_INFO: 'GET_INFO'
    },
    ID_CARD: {
        GET_ID_CARD: 'GET_ID_CARD',
    },
    PROFILE: {
        GET_PROFILE: 'GET_PROFILE',
        GET_ALL_PROFILE: 'GET_ALL_PROFILE',
        ADD_PROFILE: 'ADD_PROFILE',
        UPDATE_PROFILE: 'UPDATE_PROFILE',
        GET_IMAGE: 'GET_IMAGE',
        DELETE: 'DELETE_PROFILE',
    },
    SOCKET: {
        GET_SOCKET: 'GET_SOCKET',
        DELETE_SOCKET: 'DELETE_SOCKET',
        NOTIFICATION: 'NOTIFICATION'
    },
    BACKGROUND:{
        DARK_MODE: 'DARK_MODE'
    },
    PLATE: {
        GET_PLATE: 'GET_PLATE',
        GET_PLATE_NO_OWNER: 'GET_PLATE_NO_OWNER',
        NEW_PLATE: 'NEW_PLATE',
        PLATE_DETAIL: 'PLATE_DETAIL',
        UPDATE_PLATE: 'UPDATE_PLATE',
        DELETE_PLATE:"DELETE_PLATE"
    },
    BLACKLIST: {
        GET_BLACKLIST: 'GET_BLACKLIST',
        GET_DETAIL: 'GET_BLACKLIST_DETAIL',
        UPDATE_DETAIL: 'UPDATE_BLACKLIST_DETAIL',
        CREATE: 'CREATE_BLACK_LIST',
        DELETE: 'DELETE_BLACK_LIST',
        SELECT: 'SELECT'
    },
    LOCATION: {
        GET_LOCATION: 'GET_LOCATION'
    },
    VIEW_EVENT: {
        GET_VIEW_EVENT: 'GET_VIEW_EVENT',
        GET_COLLAPSE: 'GET_COLLAPSE'
    }
}
export default TYPE_ACTION;

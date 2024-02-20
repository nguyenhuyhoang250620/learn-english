import { SERVICE_PATHS } from "../../constants/paths";
import {get, update, remove, post} from "../../api/ApiBase";

const CameraService  = {

    getCamera: body => get(SERVICE_PATHS.CAMERA.GET_CAMERA),

};

export default CameraService;
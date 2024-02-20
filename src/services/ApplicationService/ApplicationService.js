import { SERVICE_PATHS } from "../../constants/paths";
import {get, update, remove, post} from "../../api/ApiBase";

const ApplicationService = {

    getAppllication: body => get(SERVICE_PATHS.APPLICATION.GET_APPLICATION),

};

export default ApplicationService;
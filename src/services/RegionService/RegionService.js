import { SERVICE_PATHS } from "../../constants/paths";
import {get, update, remove, post} from "../../api/ApiBase";

const RegionService = {

    getRegion: body => get(SERVICE_PATHS.REGION.GET_REGION),

}

export default RegionService;
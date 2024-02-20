import { SERVICE_PATHS } from "../../constants/paths";
import { get } from "../../api/ApiBase";

const LocationService = {

    getLocation: body => get(SERVICE_PATHS.LOCATION.GET_LOCATION),

};

export default LocationService;
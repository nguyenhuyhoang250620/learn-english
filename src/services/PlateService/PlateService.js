import { SERVICE_PATHS } from "../../constants/paths";
import { get, update, remove, post, patch } from "../../api/ApiBase";

const PlateService = {
  getPlate: (body) => {
    var filterString = "?";
    Object.keys(body).map((index) => {
      if (filterString != "?" && body[index]) {
        filterString += `&${index}=${body[index]}`;
      } else if (body[index]) {
        filterString += `${index}=${body[index]}`;
      }
    });
    if (filterString == "?") {
      return get(SERVICE_PATHS.PLATE.GET_PLATE);
    } else {
      return get(`${SERVICE_PATHS.PLATE.GET_PLATE}${filterString}`);
    }
  },
  getPlateNoOwner: (body) => {
    return get(SERVICE_PATHS.PLATE.GET_PLATE_NO_OWNER);
  },
  createPlate: body =>post(SERVICE_PATHS.PLATE.NEW_PLATE, body),
  updatePlate: body => patch(SERVICE_PATHS.PLATE.UPDATE_PLATE,body),
  deletePlate: id =>  remove(`${SERVICE_PATHS.PLATE.DELETE}${id}`)
};

export default PlateService;

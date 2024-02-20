import { SERVICE_PATHS } from "../../constants/paths";
import { get, update, remove, post, patch } from "../../api/ApiBase";

const ProfileService = {
  getProfile: (body) => {
    var filterString = "?";
    Object.keys(body).map((index) => {
      if (filterString != "?" && body[index] != null) {
        filterString += `&${index}=${body[index]}`;
      } else if (body[index] != null) {
        filterString += `${index}=${body[index]}`;
      }
    });
    if (filterString === "?") {
      return get(SERVICE_PATHS.PROFILE.GET_PROFILE);
    } else {
      return get(`${SERVICE_PATHS.PROFILE.GET_PROFILE}${filterString}`);
    }
  },
    addProfile:body => post(SERVICE_PATHS.PROFILE.ADD_PROFILE, body),
    updateProfile:body => patch(SERVICE_PATHS.PROFILE.UPDATE_PROFILE, body),
    deleteProfile: id =>  remove(`${SERVICE_PATHS.PROFILE.DELETE}${id}`)
};

export default ProfileService;

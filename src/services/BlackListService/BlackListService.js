import { SERVICE_PATHS } from "../../constants/paths";
import { get, update, remove, post, patch } from "../../api/ApiBase";

const BlackListService = {
  getList: (body) => {
  var filterString = "?";
    Object.keys(body).map((index) => {
      if (filterString != "?" && body[index]) {
        filterString += `&${index}=${body[index]}`;
      } else if (body[index]) {
        filterString += `${index}=${body[index]}`;
      }
    });
    if (filterString == "?") {
      return get(SERVICE_PATHS.BLACKLIST.GET_BLACKLIST);
    } else {
      return get(`${SERVICE_PATHS.BLACKLIST.GET_BLACKLIST}${filterString}`);
    }
  },
  updateBlackListDetail: (body) => patch(SERVICE_PATHS.BLACKLIST.UPDATE_BLACKLIST_DETAIL,body),
  createBlackList: body => post(SERVICE_PATHS.BLACKLIST.CREATE_BLICKLIST,body),
  deleteBlackList: id => remove(`${SERVICE_PATHS.BLACKLIST.DELETE_BLACKLIST}${id}`)
};

export default BlackListService;

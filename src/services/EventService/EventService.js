import { SERVICE_PATHS } from "../../constants/paths";
import { get, update, remove, post } from "../../api/ApiBase";

const EventService = {
  getEvent: (body) => {
    var filterString = "?";
    Object.keys(body).map((index) => {
      if (filterString != "?" && body[index]) {
        filterString += `&exact=false&${index}=${body[index]}`;
      } else if (body[index]) {
        filterString += `${index}=${body[index]}`;
      }
    });
    if (filterString == "?") {
      // return get(SERVICE_PATHS.EVENT.GET_EVENT);
    } else {
      return get(`${SERVICE_PATHS.EVENT.GET_EVENT}${filterString}`);
    }
  },
  getEventWithPerson:(body)=>{
    var filterString = "?";
    Object.keys(body).map((index) => {
      if (filterString != "?" && body[index]) {
        filterString += `&exact=false&${index}=${body[index]}`;
      } else if (body[index]) {
        filterString += `${index}=${body[index]}`;
      }
    });
    if (filterString == "?") {
      // return get(SERVICE_PATHS.EVENT.GET_EVENT);
    } else {
      return get(`${SERVICE_PATHS.EVENT.GET_EVENT}${filterString}`);
    }
  },
  getEventSearch: (body) => {
    var filterString = "?";
    Object.keys(body).map((index) => {
      if (filterString != "?" && body[index]) {
        filterString += `&${index}=${body[index]}`;
      } else if (body[index]) {
        filterString += `${index}=${body[index]}`;
      }
    });
    if (filterString == "?") {
      // return get(SERVICE_PATHS.EVENT.GET_EVENT);
    } else {
      return get(`${SERVICE_PATHS.EVENT.GET_EVENT}${filterString}`);
    }
  },
  getDetail: (id) => get(`${SERVICE_PATHS.EVENT.GET_DETAIL}${id}`),
};

export default EventService;

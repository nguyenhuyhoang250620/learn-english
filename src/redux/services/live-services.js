import { SERVICE_PATHS } from "@constants/url";
import { get,remove } from "src/api/api-map";

const LiveService = {
  getDataAllVocabulary: (body) => {
    var filterString = "?";
    Object.keys(body).forEach((index) => {
      if (filterString !== "?" && body[index]) {
        filterString += `&${index}=${body[index]}`;
      } else if (body[index]) {
        filterString += `${index}=${body[index]}`;
      }
    });    
    if (filterString === "?") {
      return get(SERVICE_PATHS.VOCABULARY.GET_ALL);
    } else {
      return get(`${SERVICE_PATHS.VOCABULARY.GET_ALL}${filterString}`);
    }
  },
  deleteDataAllVocabulary: (body) =>{
    return remove(`${SERVICE_PATHS.VOCABULARY.DELETE}/${body}`)
  }
 
};

export default LiveService;

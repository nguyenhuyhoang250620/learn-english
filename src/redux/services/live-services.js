import { SERVICE_PATHS } from "@constants/url";
import { get } from "src/api/api-map";

const LiveService = {
  getDatalistProvince:(body)=>{
    if(body){
      return get(`${SERVICE_PATHS.LIVE.GET_PROVINCE}?ids=${body}`)
    }
    else{
      return get(SERVICE_PATHS.LIVE.GET_PROVINCE)
    }
  },

  
  getCameraDataWithProvince: (body) => {
    var filterString = "?";
    Object.keys(body).forEach((index) => {
      if (filterString !== "?" && body[index]) {
        filterString += `&${index}=${body[index]}`;
      } else if (body[index]) {
        filterString += `${index}=${body[index]}`;
      }
    });    
    if (filterString === "?") {
      return get(SERVICE_PATHS.LIVE.GET_DATA_CAMERA_WITH_PROVINCE);
    } else {
      return get(`${SERVICE_PATHS.LIVE.GET_DATA_CAMERA_WITH_PROVINCE}${filterString}`);
    }
  },
  getPreviewCamWithID:(body)=>{
    return get(`${SERVICE_PATHS.LIVE.GET_PREVIEW_WITH_ID}?ids=${body}`)
  },
  getDistric:(body)=>{
    return get(`${SERVICE_PATHS.LIVE.GET_DISTRICT}?province_ids=${body}`)
  },
  getWard:(body)=>{
    return get(`${SERVICE_PATHS.LIVE.GET_DATA_CAMERA_WITH_PROVINCE}?district_ids=${body}`)
  },
  getDevice:(body)=>{
    return get(`${SERVICE_PATHS.LIVE.GET_DEVICE}?ward_ids=${body}`)
  },
  getAllCameraStream:(body)=>{
    return get(`${SERVICE_PATHS.LIVE.GET_ALL_CAMERA_STREAM}`)
  },
  stopStream:(id)=>{
    return get(`${SERVICE_PATHS.LIVE.STOP_STREAM}?ids=${id}`)
  }
};

export default LiveService;

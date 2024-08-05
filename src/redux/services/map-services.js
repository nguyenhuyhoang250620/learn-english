
import { SERVICE_PATHS } from "@constants/url";
import { get, get_stream, post } from "src/api/api-map";

const MapService = {
  getDataLocationCamera: (body) => {
    var filterString = '?';
    Object.keys(body).map((index) => {
      if (filterString !== '?' && body[index] !== null) {
        filterString += `&${index}=${body[index]}`;
      } else if (body[index]) {
        filterString += `${index}=${body[index]}`;
      }
    });
    if (filterString === "?") {
      return get(SERVICE_PATHS.MAP.GET_LOCATION);
    } else {
      return get(`${SERVICE_PATHS.MAP.GET_LOCATION}${filterString}`);
    }
  },
  getDataRecorder: (body) => {
    var filterString = "?";
    Object.keys(body).map((index) => {
      if (filterString !== "?" && body[index]) {
        filterString += `&${index}=${body[index]}`;
      } else if (body[index]) {
        filterString += `${index}=${body[index]}`;
      }
    });
    if (filterString === "?") {
      return get(SERVICE_PATHS.MAP.GET_RECORDER);
    } else {
      return get(`${SERVICE_PATHS.MAP.GET_RECORDER}${filterString}`);
    }
  },
  getDataAddress:(body)=>{
    return get(SERVICE_PATHS.MAP.GET_ADDRESS)
  },
  getDataProvince:(body)=>{
    if(body){
      return get(`${SERVICE_PATHS.MAP.GET_PROVINCE}?ids=${body}`)
    }
    else{
      return get(SERVICE_PATHS.MAP.GET_PROVINCE)
    }
  },
  getDataDistrict:(body)=>{
    if(body){
      return get(`${SERVICE_PATHS.MAP.GET_DISTRICT}?province_ids=${body}`)
    }
    else{
      return get(SERVICE_PATHS.MAP.GET_DISTRICT)
    }
    
  },
  getDataWard:(body)=>{
    var filterString = "?";
    Object.keys(body).map((index) => {
      if (filterString !== "?" && body[index]) {
        filterString += `&${index}=${body[index]}`;
      } else if (body[index]) {
        filterString += `${index}=${body[index]}`;
      }
    });
    return get(`${SERVICE_PATHS.MAP.GET_WARD}${filterString}`);
  },
  getTotalCamAll:(body)=>{
    return get(SERVICE_PATHS.MAP.GET_TOTAL)
  },
  getDataDrawCircle:(body)=>{
    return post(SERVICE_PATHS.MAP.GET_DRAW_CIRCLE,body)
  },
  getDataDrawPolygon:(body)=>{
    return post(SERVICE_PATHS.MAP.GET_DRAW_POLYGON,body)
  },
  getPreviewCameraWithID:(body)=>{
    return get_stream(`${SERVICE_PATHS.MAP.GET_PREVIEW_WITH_ID}?ids=${body}`)
  },
  closeCamera:(body)=>{
    return get_stream(`${SERVICE_PATHS.MAP.STOP_STREAM}`)
  },
  getDataCameraGroup:(body)=>{
    return post(SERVICE_PATHS.MAP.GET_DATA_CAMERA_GROUP,body)
  }
};

export default MapService;

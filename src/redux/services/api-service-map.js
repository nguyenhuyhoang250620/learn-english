import axios from "axios";
export const domain = window.SystemConfig.REACT_APP_API_MAP;
export const baseURL = `http://${domain}`;
const ApiServiceMap = (configuration = {}) => {
  const token = localStorage.getItem("token");
  var headers ={}
  if(configuration === "login"){
    headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers":"*",
      "Access-Control-Allow-Origin":"*",
    };
  }
  else{
    headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "Access-Control-Allow-Headers":"*",
      "Access-Control-Allow-Origin":"*",
    };
  }
  const axiosInstance = axios.create({
    baseURL,
    timeout: 1000000,
    headers,
    ...configuration,
  });


  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.log(error)
      if (error?.response?.status === 401) {
      }

      if (error?.response?.status === 503) {
        console.log("Something went wrong. Please try later!");
      }

      return Promise.reject(error);
    }
  );
  return axiosInstance;
};

export default ApiServiceMap;

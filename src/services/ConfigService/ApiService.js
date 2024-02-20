import axios from "axios";

export const domain = window.SystemConfig.REACT_APP_API_Django;
export const baseURL = `http://${domain}`;
export const domainSpringBoot = window.SystemConfig.REACT_APP_API_SpringBoot;
export const baseURLSpringBoot = `http://${domainSpringBoot}`;
const ApiService = (configuration = {}) => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  var headers ={}
  if(configuration == "login"){
    headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "Access-Control-Allow-Headers":"*",
      "Access-Control-Allow-Origin":"*",
    };
  }
  else{
    headers = {
      // "Content-Type": "application/json",
      "Content-Type": "multipart/form-data",
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

  const tokenUser = localStorage.getItem("tokenUser");

  axiosInstance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => Promise.reject(error)
  );
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.log("errorhehe",error)
      if (error?.response?.status === 401) {
        // console.log("refreshToken",refreshToken)
        // await axios.post(`${baseURLSpringBoot}/api/auth/refresh-token`,'s').then((value)=>{
        //   console.log(value)
        // })
      }

      if (error?.response?.status === 503) {
        console.log("Something went wrong. Please try later!");
      }

      return Promise.reject(error);
    }
  );
  return axiosInstance;
};

export default ApiService;

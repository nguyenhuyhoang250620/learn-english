import ApiService from "@redux/services/api-service";



export const get = url => ApiService().get(url);

export const update = (url, body) => ApiService().put(url, body);

export const remove = (url, body) => ApiService().delete(url, body);

export const post = (url, body) => {
    if(url.includes('signin')){
        return ApiService('signin').post(url, body);
      }
      else{
        return ApiService().post(url, body);
      }
};

export const patch = (url, body) => ApiService().patch(url, body);



import ApiServiceMap from "@redux/services/api-service-map";
export const get = url => ApiServiceMap().get(url);

export const update = (url, body) => ApiServiceMap().put(url, body);

export const remove = (url, body) => ApiServiceMap().delete(url, body);

export const post = (url, body) => {
    if(url.includes('login')){
        return ApiServiceMap('login').post(url, body);
      }
      else{
        return ApiServiceMap().post(url, body);
      }
};

export const patch = (url, body) => ApiServiceMap().patch(url, body);
export const get_stream = (url) => ApiServiceMap().get(url);
export const post_stream = (url, body) => ApiServiceMap().post(url, body)


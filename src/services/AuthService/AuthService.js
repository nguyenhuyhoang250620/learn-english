import { SERVICE_PATHS } from "../../constants/paths";

import { post , get } from "../../api/ApiBase";

const AuthService = {

    signin:body => post('http://172.16.20.96:48080/api/auth/login',body),
    getInfo:body => get(SERVICE_PATHS.AUTH.GET_INFO,body)

}

export default AuthService;

import { SERVICE_PATHS } from '@constants/url';
import { post } from 'src/api/api-map';
const AuthService = {
	signin:body => post(SERVICE_PATHS.AUTH.SIGN_IN,body)

};

export default AuthService;

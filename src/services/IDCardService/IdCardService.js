import { SERVICE_PATHS } from "../../constants/paths";
import { get, update, remove, post } from "../../api/ApiBase";

const IdCardService = {

    getIdCard: body => get(SERVICE_PATHS.IDCARD.GET_ID_CARD),

    getIdLicense: body => get(SERVICE_PATHS.IDCARD.GET_ID_CARD)

};

export default IdCardService;
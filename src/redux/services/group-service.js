import { SERVICE_PATHS } from "@constants/url";
import { get } from "src/api/api-base";

const GroupListService = {
	getList(body) {
		let filterString = '?';
		Object.keys(body).map(index => {
			if (filterString !== '?' && body[index]) {
				filterString += `&${index}=${body[index]}`;
			} else if (body[index]) {
				filterString += `${index}=${body[index]}`;
			}
		});
		if (filterString === '?') {
			return get(SERVICE_PATHS.GROUP.GET_GROUP);
		}

		return get(`${SERVICE_PATHS.GROUP.GET_GROUP}${filterString}`);
	},
};

export default GroupListService;
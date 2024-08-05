import { SERVICE_PATHS } from '@constants/url';
import { get, remove, post, patch } from '../../api/api-base';
const DeviceService = {
	getListDevice(body) {
		let filterString = '?';
		Object.keys(body).map(index => {
			if (filterString != '?' && body[index]) {
				filterString += `&${index}=${body[index]}`;
			} else if (body[index]) {
				filterString += `${index}=${body[index]}`;
			}
		});
		if (filterString == '?') {
			return get(SERVICE_PATHS.CAMERA.GET_DEVICE);
		}

		return get(`${SERVICE_PATHS.CAMERA.GET_DEVICE}${filterString}`);
	},
};

export default DeviceService;

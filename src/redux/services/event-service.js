import { SERVICE_PATHS } from '@constants/url';
import { get, remove, post, patch } from '../../api/api-base';
const EventService = {
	getListEventAll(body) {
		let filterString = '';
		let arrString = '';
		let notNull = '';
		Object.keys(body).forEach(index => {
			const value = body[index];
			if (Array.isArray(value) && value.length > 0) {
				const queryParams = body[index].map(value => `${index}=${value}`);
				const queryString = queryParams.join('&');
				arrString += `${queryString}&`;
			} else if (value === null || Array.isArray(value) && value.length === 0) {
			} else {
				notNull += `${index}=${body[index]}&`;
			}

			if (arrString) {
				filterString = `${arrString}${notNull}`;
			} else {
				filterString = `${notNull}`;
			}
		});
		if (filterString === '?') {
			// Return get(SERVICE_PATHS.EVENT.GET_EVENT);
		} else {
			return get(`${SERVICE_PATHS.EVENT.GET_EVENT_ALL}?${filterString}`);
		}
	},
};

export default EventService;

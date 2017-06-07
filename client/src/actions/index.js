import { POST_LOCATION } from './types';
import axios from 'axios';

const API = 'http://localhost:8000/api';

export function postLocation(location) {
	const request = axios.post(`${API}/search`, { location })
	return {
		type: POST_LOCATION,
		payload: request
	}
}
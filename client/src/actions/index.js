import { POST_LOCATION, UPDATE_FORM } from './types';
import axios from 'axios';

const API = 'http://localhost:8000/api';

export function postLocation(location) {
	const request = axios.post(`${API}/search`, { location })
	return {
		type: POST_LOCATION,
		payload: request
	};
}

export function updateForm(address) {
	return {
		type: UPDATE_FORM,
		payload: address
	};
}
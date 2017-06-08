import { POST_LOCATION, UPDATE_FORM, CHECK_AUTH, SIGN_OUT, FETCH_USER_INFO } from './types';
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

export function checkAuth(token) {
	const request = axios.post(`${API}/auth/in`, { token });
	return {
		type: CHECK_AUTH,
		payload: request
	};
}

export function signOutUser(token) {
	const request = axios.post(`${API}/auth/out`, { token });
	return {
		type: SIGN_OUT,
		payload: request
	};
}

export function fetchUserInfo(token) {
	const request = axios.post(`${API}/user`, { token });
	return {
		type: FETCH_USER_INFO,
		payload: request
	};
}
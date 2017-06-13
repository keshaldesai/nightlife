import { POST_LOCATION, UPDATE_FORM, CHECK_AUTH, SIGN_OUT, RSVP_CHANGE } from './types';
import axios from 'axios';

const API = 'http://localhost:8000/api';

export function postLocation(location, token) {
  const request = axios.post(`${API}/search`, { location, token })
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

export function rsvpSet(barId, token, rsvp) {
  const request = axios.post(`${API}/rsvp`, { barId, token, rsvp });
  return {
    type: RSVP_CHANGE,
    payload: request
  };
}
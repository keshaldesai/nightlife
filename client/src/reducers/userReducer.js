import { FETCH_USER_INFO, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = { info: null };

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case (FETCH_USER_INFO):
			if (!action.payload.Error) {
				return { ...state, info: action.payload.data }
			} else {
				return { ...state, info: null }
			}
		case (SIGN_OUT):
			return INITIAL_STATE;
		default:
			return state;
	}
}
import { CHECK_AUTH, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = { authenticated: false, user: {} };

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case (CHECK_AUTH):
			if (!action.error) {
				return { ...state, authenticated: true, user: action.payload.data };
			} else {
				return { ...INITIAL_STATE };
			}
		case (SIGN_OUT):
			return { ...INITIAL_STATE };
		default:
			return state;
	}
}
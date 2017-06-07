import { POST_LOCATION } from '../actions/types';

const INITIAL_STATE = { all: {} };

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case (POST_LOCATION):
			return { ...state, all: action.payload.data };
		default:
			return state;
	}
}
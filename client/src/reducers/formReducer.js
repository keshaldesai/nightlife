import { UPDATE_FORM } from '../actions/types';

const INITIAL_STATE = { address: '' };

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case (UPDATE_FORM):
			return { ...state, address: action.payload };
		default:
			return state;
	}
}
import { UPDATE_FORM, UPDATE_CHOICE } from '../actions/types';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case (UPDATE_CHOICE):
			return { ...state, votePoll: { ...action.payload } };
		case (UPDATE_FORM):
			return { ...state, newPoll: { ...state.newPoll, ...action.payload } };
		default:
			return state;
	}
}
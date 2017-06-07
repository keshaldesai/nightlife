import { combineReducers } from 'redux';
import listReducer from './listReducer';

const rootReducer = combineReducers({
	bars: listReducer
});

export default rootReducer;
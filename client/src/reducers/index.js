import { combineReducers } from 'redux';
import listReducer from './listReducer';
import formReducer from './formReducer';

const rootReducer = combineReducers({
	bars: listReducer,
	address: formReducer
});

export default rootReducer;
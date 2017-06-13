import { combineReducers } from 'redux';
import listReducer from './listReducer';
import formReducer from './formReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
	bars: listReducer,
	address: formReducer,
	auth: authReducer,
});

export default rootReducer;
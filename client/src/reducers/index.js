import { combineReducers } from 'redux';
import listReducer from './listReducer';
import formReducer from './formReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
	bars: listReducer,
	user: userReducer,
	address: formReducer,
	auth: authReducer,
});

export default rootReducer;
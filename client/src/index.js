import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';
import reducers from './reducers';
import reduxPromise from 'redux-promise';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const createStoreWithMiddleware = applyMiddleware(reduxPromise)(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<Router>
			<Route path="/" component={App} />
		</Router>
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
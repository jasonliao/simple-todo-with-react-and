import React from 'react';
import { Provider } from 'react-redux';
import App from './javascripts/containers/App';
import configureStore from './javascripts/store/configureStore';

const store = configureStore();

React.render(
	<Provider store={store}>
		{() => <App />}
	</Provider>,
	document.getElementById('root')
);
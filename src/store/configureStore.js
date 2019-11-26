import { createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant' // eslint-disable-line
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const configureStore = initialState => {
	// Add wrapper to enable redux dev tools
	// @see https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup

	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	let middleware;
	if (process.env.NODE_ENV === 'production') {
		middleware = applyMiddleware(
			thunk,
				reduxImmutableStateInvariant()// eslint-disable-line
		);
	} else {
		middleware = applyMiddleware(thunk);
	}

	return createStore(rootReducer, initialState, composeEnhancers(middleware));
};

export default configureStore;

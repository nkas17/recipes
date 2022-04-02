import { createStore, applyMiddleware, compose } from 'redux';
// @ts-ignore
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'; // eslint-disable-line
// @ts-ignore
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import { Store } from '../types/store';

const configureStore = (initialState?: Store) => {
  const composeEnhancers =
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  let middleware;
  if (process.env.NODE_ENV !== 'production') {
    middleware = applyMiddleware(thunk, reduxImmutableStateInvariant());
  } else {
    middleware = applyMiddleware(thunk);
  }

  // @ts-ignore
  return createStore(rootReducer, initialState, composeEnhancers(middleware));
};

export default configureStore;

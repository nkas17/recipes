import { createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'; // eslint-disable-line
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

const configureStore = (initialState) => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  let middleware;
  if (process.env.NODE_ENV !== 'production') {
    middleware = applyMiddleware(
      thunk,
      reduxImmutableStateInvariant(), // eslint-disable-line
    );
  } else {
    middleware = applyMiddleware(thunk);
  }

  return createStore(rootReducer, initialState, composeEnhancers(middleware));
};

export default configureStore;

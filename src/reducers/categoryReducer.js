import { LOAD_CATEGORIES_SUCCESS } from '../actions/actionTypes';
import initialState from './initialState';

/**
 * category reducer
 */
// eslint-disable-next-line default-param-last
const categoryReducer = (state = initialState.categories, action) => {
  switch (action.type) {
    case LOAD_CATEGORIES_SUCCESS:
      return action.categories;
    default:
      return state;
  }
};

export default categoryReducer;

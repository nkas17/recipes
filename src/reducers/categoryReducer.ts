import { LOAD_CATEGORIES_SUCCESS } from '../actions/actionTypes';
import initialState from './initialState';
import { Action } from '../types/action';
import { Category } from '../types/category';

/**
 * category reducer
 */
const categoryReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: Category[] = initialState.categories,
  action: Action,
): Category[] => {
  switch (action.type) {
    case LOAD_CATEGORIES_SUCCESS:
      return action?.payload?.categories || [];
    default:
      return state;
  }
};

export default categoryReducer;

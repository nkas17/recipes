import {
  USER_AUTHENTICATE_SUCCESS,
  USER_AUTHENTICATE_FAILURE,
  USER_AUTHENTICATE,
  USER_UNAUTHENTICATE,
} from '../actions/actionTypes';
import initialState from './initialState';
import { Action } from '../types/action';
import { User } from '../types/user';

/**
 * user reducer
 */
// eslint-disable-next-line @typescript-eslint/default-param-last
const user = (state: User = initialState.user, action: Action): User => {
  switch (action.type) {
    case USER_AUTHENTICATE_SUCCESS:
      return {
        ...state,
        ...action?.payload?.user,
        authenticating: false,
      };
    case USER_AUTHENTICATE_FAILURE:
      return {
        ...state,
        authenticating: false,
        authenticated: false,
        error: action.error,
      };
    case USER_AUTHENTICATE:
      return {
        ...state,
        authenticating: true,
      };
    case USER_UNAUTHENTICATE:
      return {
        ...state,
        authenticating: false,
        authenticated: false,
        token: null,
      };
    default:
      return state;
  }
};

export default user;

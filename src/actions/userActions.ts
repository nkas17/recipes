// @ts-ignore
import vanillaToast from 'vanilla-toast';
import {
  USER_AUTHENTICATE_SUCCESS,
  USER_AUTHENTICATE_FAILURE,
  USER_AUTHENTICATE,
  USER_UNAUTHENTICATE,
} from './actionTypes';
import { UserApi } from '../api/UserApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';
import { User } from '../types/user';

/**
 * actions
 */

export const userLoginSuccess = (user: User) => ({
  type: USER_AUTHENTICATE_SUCCESS,
  payload: { user },
});

export const userLoginFailure = (error: any) => ({
  type: USER_AUTHENTICATE_FAILURE,
  error,
});

export const userLoginStart = () => ({
  type: USER_AUTHENTICATE,
});

export const userLogout = () => ({
  type: USER_UNAUTHENTICATE,
});

/**
 * thunks
 */

export const userLogin = (username: string, password: string) => (dispatch: any) => {
  dispatch(beginAjaxCall('userLogin'));
  dispatch(userLoginStart());
  return UserApi.userLogin(username, password)
    .then((user) => {
      dispatch(userLoginSuccess(user));
    })
    .catch((error) => {
      dispatch(ajaxCallError('userLogin'));
      dispatch(userLoginFailure(error));
      if (error && error.additionalData && error.additionalData.error) {
        vanillaToast.error(error.additionalData.error.message);
      }
      throw error;
    });
};

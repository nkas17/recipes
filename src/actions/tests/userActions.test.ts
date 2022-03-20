import vanillaToast from 'vanilla-toast';
import {
  userLoginSuccess,
  userLoginFailure,
  userLoginStart,
  userLogout,
  userLogin,
} from '../userActions';
import {
  USER_AUTHENTICATE_SUCCESS,
  USER_AUTHENTICATE_FAILURE,
  USER_AUTHENTICATE,
  USER_UNAUTHENTICATE,
} from '../actionTypes';
import { UserApi } from '../../api/UserApi';
import { beginAjaxCall, ajaxCallError } from '../ajaxStatusActions';

beforeEach(() => {
  jest.clearAllMocks();
});

const user = { id: 'id', token: 'token' };

/**
 * test actions
 */

describe('User Actions', () => {
  describe('userLoginSuccess', () => {
    it('should create a USER_AUTHENTICATE_SUCCESS action', () => {
      expect(userLoginSuccess(user)).toEqual({
        type: USER_AUTHENTICATE_SUCCESS,
        payload: { user },
      });
    });
  });
  describe('userLoginFailure', () => {
    const error = 'error';
    it('should create a USER_AUTHENTICATE_FAILURE action', () => {
      expect(userLoginFailure(error)).toEqual({
        type: USER_AUTHENTICATE_FAILURE,
        error,
      });
    });
  });
  describe('userLoginStart', () => {
    it('should create a USER_AUTHENTICATE action', () => {
      expect(userLoginStart()).toEqual({
        type: USER_AUTHENTICATE,
      });
    });
  });
  describe('userLogout', () => {
    it('should create a USER_UNAUTHENTICATE action', () => {
      expect(userLogout()).toEqual({
        type: USER_UNAUTHENTICATE,
      });
    });
  });
});

/**
 * test thunks
 */

describe('User Thunks', () => {
  describe('userLogin', () => {
    it('should successfully log a user in', () => {
      UserApi.userLogin = jest.fn().mockResolvedValue(user);
      const dispatch = jest.fn();
      const username = 'username';
      const password = 'password';
      return userLogin(
        username,
        password,
      )(dispatch).then(() => {
        expect(UserApi.userLogin).toHaveBeenCalledWith(username, password);
        expect(dispatch).toHaveBeenNthCalledWith(1, beginAjaxCall('userLogin'));
        expect(dispatch).toHaveBeenNthCalledWith(2, userLoginStart());
        expect(dispatch).toHaveBeenNthCalledWith(3, userLoginSuccess(user));
        expect(dispatch).toHaveBeenCalledTimes(3);
      });
    });
    it('should error a user when logging in without additional error data', () => {
      const error = new Error('error');
      UserApi.userLogin = jest.fn().mockRejectedValue(error);
      const dispatch = jest.fn();
      const username = 'username';
      const password = 'password';
      return userLogin(
        username,
        password,
      )(dispatch).catch((err) => {
        expect(UserApi.userLogin).toHaveBeenCalledWith(username, password);
        expect(dispatch).toHaveBeenNthCalledWith(1, beginAjaxCall('userLogin'));
        expect(dispatch).toHaveBeenNthCalledWith(2, userLoginStart());
        expect(dispatch).toHaveBeenNthCalledWith(3, ajaxCallError('userLogin'));
        expect(dispatch).toHaveBeenNthCalledWith(4, userLoginFailure(err));
        expect(dispatch).toHaveBeenCalledTimes(4);
      });
    });
    it('should error a user when logging in with additional error data', () => {
      const error = {
        additionalData: {
          error: {
            message: 'message',
          },
        },
      };
      UserApi.userLogin = jest.fn().mockRejectedValue(error);
      vanillaToast.error = jest.fn();
      const dispatch = jest.fn();
      const username = 'username';
      const password = 'password';
      return userLogin(
        username,
        password,
      )(dispatch).catch((err) => {
        expect(UserApi.userLogin).toHaveBeenCalledWith(username, password);
        expect(dispatch).toHaveBeenNthCalledWith(1, beginAjaxCall('userLogin'));
        expect(dispatch).toHaveBeenNthCalledWith(2, userLoginStart());
        expect(dispatch).toHaveBeenNthCalledWith(3, ajaxCallError('userLogin'));
        expect(dispatch).toHaveBeenNthCalledWith(4, userLoginFailure(err));
        expect(dispatch).toHaveBeenCalledTimes(4);
        expect(vanillaToast.error).toHaveBeenCalledWith(err.additionalData.error.message);
      });
    });
  });
});

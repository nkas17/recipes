import userReducer from '../userReducer';
import {
  USER_AUTHENTICATE_SUCCESS,
  USER_AUTHENTICATE_FAILURE,
  USER_AUTHENTICATE,
  USER_UNAUTHENTICATE,
} from '../../actions/actionTypes';

describe('User Reducer', () => {
  describe('USER_AUTHENTICATE_SUCCESS', () => {
    it('should set up user data', () => {
      expect(
        userReducer(
          {
            token: null,
            authenticating: true,
            authenticated: false,
          },
          {
            type: USER_AUTHENTICATE_SUCCESS,
            payload: {
              user: {
                token: 'abcd',
                authenticated: true,
              },
            },
          },
        ),
      ).toEqual({
        token: 'abcd',
        authenticating: false,
        authenticated: true,
      });
    });
  });
  describe('USER_AUTHENTICATE_FAILURE', () => {
    it('should not set up user data due to an error', () => {
      expect(
        userReducer(
          {
            token: null,
            authenticating: true,
            authenticated: false,
          },
          {
            type: USER_AUTHENTICATE_FAILURE,
            error: 'error',
          },
        ),
      ).toEqual({
        token: null,
        authenticating: false,
        authenticated: false,
        error: 'error',
      });
    });
  });
  describe('USER_AUTHENTICATE', () => {
    it('should start the authenticated process', () => {
      expect(
        userReducer(
          {
            token: null,
            authenticating: false,
            authenticated: false,
          },
          {
            type: USER_AUTHENTICATE,
          },
        ),
      ).toEqual({
        token: null,
        authenticating: true,
        authenticated: false,
      });
    });
  });
  describe('USER_UNAUTHENTICATE', () => {
    it('should unauthenticate a user', () => {
      expect(
        userReducer(
          {
            token: 'adsf',
            authenticating: false,
            authenticated: true,
          },
          {
            type: USER_UNAUTHENTICATE,
          },
        ),
      ).toEqual({
        token: null,
        authenticating: false,
        authenticated: false,
      });
    });
  });
  describe('MISSING_ACTION', () => {
    it('return existing initial state with missing action and no state', () => {
      expect(
        userReducer(undefined, {
          type: 'MISSING_ACTION',
        }),
      ).toEqual({
        token: null,
        authenticating: false,
        authenticated: false,
      });
    });
  });
});

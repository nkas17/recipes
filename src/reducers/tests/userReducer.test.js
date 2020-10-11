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
						authenticated: false,
						authenticating: true,
					},
					{
						type: USER_AUTHENTICATE_SUCCESS,
						user: {
							token: 'abcd',
							authenticated: true,
						},
					}
				)
			).toEqual({
				token: 'abcd',
				authenticated: true,
				authenticating: false,
			});
		});
	});
	describe('USER_AUTHENTICATE_FAILURE', () => {
		it('should not set up user data due to an error', () => {
			expect(
				userReducer(
					{
						token: null,
						authenticated: false,
						authenticating: true,
					},
					{
						type: USER_AUTHENTICATE_FAILURE,
						error: 'error',
					}
				)
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
						authenticated: false,
						authenticating: false,
					},
					{
						type: USER_AUTHENTICATE,
					}
				)
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
						token: 'abcd',
						authenticated: true,
						authenticating: false,
					},
					{
						type: USER_UNAUTHENTICATE,
					}
				)
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
				})
			).toEqual({
				token: null,
				authenticated: false,
			});
		});
	});
});

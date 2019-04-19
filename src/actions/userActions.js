import * as actionTypes from './actionTypes';
import { UserApi } from '../api/UserApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

export const userLoginSuccess = user => ({
	type: actionTypes.USER_AUTHENTICATE_SUCCESS,
	user,
});

export const userLoginFailure = () => ({
	type: actionTypes.USER_AUTHENTICATE_FAILURE,
});

const userLoginStart = () => ({
	type: actionTypes.USER_AUTHENTICATE,
});

export const userLogout = () => ({
	type: actionTypes.USER_UNAUTHENTICATE,
});

/**
 * thunks
 */

export const userLogin = (username, password) => dispatch => {
	dispatch(beginAjaxCall());
	dispatch(userLoginStart());
	return UserApi.userLogin(username, password)
		.then(user => {
			dispatch(userLoginSuccess(user));
		})
		.catch(error => {
			throw error;
		});
};

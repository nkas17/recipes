import { BEGIN_AJAX_CALL, AJAX_CALL_ERROR } from '../actions/actionTypes';
import initialState from './initialState';

export const actionTypeEndsInSuccess = (type) =>
	type.substring(type.length - 8) === '_SUCCESS';

export default (state = initialState.numAjaxCallsInProgress, action) => {
	if (action.type === BEGIN_AJAX_CALL) {
		return state + 1;
	}
	if (action.type === AJAX_CALL_ERROR || actionTypeEndsInSuccess(action.type)) {
		return state - 1;
	}
	return state;
};

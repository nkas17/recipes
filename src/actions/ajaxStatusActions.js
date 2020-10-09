import { BEGIN_AJAX_CALL, AJAX_CALL_ERROR } from './actionTypes';

export const beginAjaxCall = (description) => ({
	type: BEGIN_AJAX_CALL,
	payload: { description },
});

export const ajaxCallError = (description) => ({
	type: AJAX_CALL_ERROR,
	payload: { description },
});

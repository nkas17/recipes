import { BEGIN_AJAX_CALL, AJAX_CALL_ERROR } from './actionTypes';

export const beginAjaxCall = () => ({ type: BEGIN_AJAX_CALL });

export const ajaxCallError = () => ({ type: AJAX_CALL_ERROR });

import { BEGIN_AJAX_CALL, AJAX_CALL_ERROR } from './actionTypes';

export const beginAjaxCall = (description: string) => ({
  type: BEGIN_AJAX_CALL,
  payload: { description },
});

export const ajaxCallError = (description: string) => ({
  type: AJAX_CALL_ERROR,
  payload: { description },
});

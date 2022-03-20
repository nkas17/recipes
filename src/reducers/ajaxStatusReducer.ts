import { BEGIN_AJAX_CALL, AJAX_CALL_ERROR } from '../actions/actionTypes';
import initialState from './initialState';
import { Action } from '../types/action';

export const actionTypeEndsInSuccess = (type: string) =>
  type.substring(type.length - 8) === '_SUCCESS';

// eslint-disable-next-line @typescript-eslint/default-param-last
export default (state = initialState.numAjaxCallsInProgress, action: Action) => {
  if (action.type === BEGIN_AJAX_CALL) {
    return state + 1;
  }
  if (action.type === AJAX_CALL_ERROR || actionTypeEndsInSuccess(action.type)) {
    return state - 1;
  }
  return state;
};

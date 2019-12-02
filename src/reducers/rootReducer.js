import { combineReducers } from 'redux';
import recipes from './recipeReducer';
import categories from './categoryReducer';
import user from './userReducer';
import numAjaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
	categories,
	numAjaxCallsInProgress,
	recipes,
	user,
});

export default rootReducer;

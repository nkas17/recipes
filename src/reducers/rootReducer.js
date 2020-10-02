import { combineReducers } from 'redux';
import recipeStore from './recipeReducer';
import categories from './categoryReducer';
import user from './userReducer';
import numAjaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
	categories,
	numAjaxCallsInProgress,
	recipeStore,
	user,
});

export default rootReducer;

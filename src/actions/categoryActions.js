import CategoryApi from '../api/mockCategoryApi';
import * as actionTypes from './actionTypes';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

/**
 * actions
 */

export const loadCategoriesSuccess = categories => ({
	type: actionTypes.LOAD_CATEGORIES_SUCCESS,
	categories,
});

/**
 * thunks
 */

export const loadCategories = () => dispatch => {
	dispatch(beginAjaxCall());
	return CategoryApi.getAllCategories()
		.then(categories => {
			dispatch(loadCategoriesSuccess(categories));
		})
		.catch(error => {
			dispatch(ajaxCallError());
			throw error;
		});
};

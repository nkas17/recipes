import CategoryApi from '../api/mockCategoryApi';
import { LOAD_CATEGORIES_SUCCESS } from './actionTypes';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

/**
 * actions
 */

export const loadCategoriesSuccess = (categories) => ({
	type: LOAD_CATEGORIES_SUCCESS,
	categories,
});

/**
 * thunks
 */

export const loadCategories = () => (dispatch) => {
	dispatch(beginAjaxCall('getAllCategories'));
	return CategoryApi.getAllCategories()
		.then((categories) => {
			dispatch(loadCategoriesSuccess(categories));
		})
		.catch((error) => {
			dispatch(ajaxCallError('getAllCategories'));
			throw error;
		});
};

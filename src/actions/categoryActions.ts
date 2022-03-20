import CategoryApi from '../api/mockCategoryApi';
import { LOAD_CATEGORIES_SUCCESS } from './actionTypes';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';
import { Category } from '../types/category';

/**
 * actions
 */

export const loadCategoriesSuccess = (categories: Category[]) => ({
  type: LOAD_CATEGORIES_SUCCESS,
  payload: { categories },
});

/**
 * thunks
 */

export const loadCategories = () => (dispatch: any) => {
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

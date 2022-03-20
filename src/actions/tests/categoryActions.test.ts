import CategoryApi from '../../api/mockCategoryApi';
import { loadCategories, loadCategoriesSuccess } from '../categoryActions';
import { beginAjaxCall, ajaxCallError } from '../ajaxStatusActions';
import { LOAD_CATEGORIES_SUCCESS } from '../actionTypes';
import { Category } from '../../types/category';

jest.mock('../ajaxStatusActions');

const dispatch = jest.fn();

const categories: Category[] = [{ id: 1, name: 'categories' }];

describe('Category Actions', () => {
  describe('loadCategoriesSuccess', () => {
    it('should create a LOAD_CATEGORIES_SUCCESS action', () => {
      expect(loadCategoriesSuccess(categories)).toEqual({
        type: LOAD_CATEGORIES_SUCCESS,
        payload: { categories },
      });
    });
  });

  describe('loadCategories', () => {
    it('should load categories when promise resolves', () => {
      CategoryApi.getAllCategories = jest.fn().mockResolvedValue(categories);
      return loadCategories()(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalled();
        expect(beginAjaxCall).toHaveBeenCalled();
      });
    });
    it('should throw an error when promise rejects', () => {
      CategoryApi.getAllCategories = jest.fn().mockRejectedValue(new Error('error'));
      return loadCategories()(dispatch).catch(() => {
        expect(dispatch).toHaveBeenCalled();
        expect(ajaxCallError).toHaveBeenCalled();
      });
    });
  });
});

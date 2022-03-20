import categoryReducer from '../categoryReducer';
import { LOAD_CATEGORIES_SUCCESS } from '../../actions/actionTypes';
import { Category } from '../../types/category';

describe('Category Reducer', () => {
  describe('categoryReducer', () => {
    it('should return initial state when no state exists', () => {
      expect(
        categoryReducer(undefined, {
          type: 'no',
        }),
      ).toEqual([]);
    });

    it('should return existing state when type not found', () => {
      expect(
        categoryReducer([{ id: 1, name: 'name' }], {
          type: 'NO_TYPE_FOUND',
        }),
      ).toEqual([{ id: 1, name: 'name' }]);
    });

    it('should return new state when type is LOAD_CATEGORIES_SUCCESS', () => {
      const categories: Category[] = [
        {
          id: 1,
          name: 'other',
        },
        {
          id: 2,
          name: 'poultry',
        },
      ];
      expect(
        categoryReducer([], {
          type: LOAD_CATEGORIES_SUCCESS,
          payload: { categories },
        }),
      ).toEqual(categories);
    });
  });
});

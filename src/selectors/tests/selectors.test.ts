import { categoriesFormattedForSelectInput, getUser } from '../selectors';
import { Category } from '../../types/category';

describe('Recipe Selectors', () => {
  describe('categoriesFormattedForSelectInput', () => {
    it('should return category data formatted for use in a select input', () => {
      const categories: Category[] = [
        {
          id: 1,
          name: 'other',
        },
        {
          id: 2,
          name: 'poultry',
        },
        {
          id: 3,
          name: 'beef',
        },
      ];

      const expected = [
        { value: 1, text: 'other' },
        { value: 2, text: 'poultry' },
        { value: 3, text: 'beef' },
      ];

      expect(categoriesFormattedForSelectInput(categories)).toEqual(expected);
    });
  });
  describe('getUser', () => {
    it('should return the user', () => {
      const store = { user: { token: 'user' } };
      expect(getUser(store)).toEqual({ token: 'user' });
    });
  });
});

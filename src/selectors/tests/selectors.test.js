import { categoriesFormattedForSelectInput, getUser } from '../selectors';

describe('Recipe Selectors', () => {
	describe('categoriesFormattedForSelectInput', () => {
		it('should return category data formatted for use in a select input', () => {
			const categories = [
				{
					id: 'other',
					name: 'other',
				},
				{
					id: 'poultry',
					name: 'poultry',
				},
				{
					id: 'beef',
					name: 'beef',
				},
			];

			const expected = [
				{ value: 'other', text: 'other' },
				{ value: 'poultry', text: 'poultry' },
				{ value: 'beef', text: 'beef' },
			];

			expect(categoriesFormattedForSelectInput(categories)).toEqual(expected);
		});
	});
	describe('getUser', () => {
		it('should return the user', () => {
			const store = { user: 'user' };
			expect(getUser(store)).toEqual('user');
		});
	});
});

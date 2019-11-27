import { loadCategoriesSuccess } from './categoryActions';
import { LOAD_CATEGORIES_SUCCESS } from './actionTypes';

describe('Category Actions', () => {
	// arrange
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

	describe('loadCategoriesSuccess', () => {
		it('should create a LOAD_CATEGORIES_SUCCESS action', () => {
			// arrange
			const expectedAction = {
				type: LOAD_CATEGORIES_SUCCESS,
				categories,
			};

			// act
			const action = loadCategoriesSuccess(categories);

			// assert
			expect(action).toEqual(expectedAction);
		});
	});
});

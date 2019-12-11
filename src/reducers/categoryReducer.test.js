import categoryReducer from './categoryReducer';
import { LOAD_CATEGORIES_SUCCESS } from '../actions/actionTypes';

describe('Category Reducer', () => {
	describe('categoryReducer', () => {
		it('should return initial state when no state exists', () => {
			expect(
				categoryReducer(undefined, {
					type: 'no',
				})
			).toEqual([]);
		});

		it('should return existing state when type not found', () => {
			expect(
				categoryReducer(
					{ state: 'existingState' },
					{
						type: 'NO_TYPE_FOUND',
						nothing: 'nothing',
					}
				)
			).toEqual({ state: 'existingState' });
		});

		it('should return new state when type is LOAD_CATEGORIES_SUCCESS', () => {
			const categories = [
				{
					id: 'other',
					name: 'other',
				},
				{
					id: 'poultry',
					name: 'poultry',
				},
			];
			expect(
				categoryReducer(
					{ state: [] },
					{
						type: LOAD_CATEGORIES_SUCCESS,
						categories,
					}
				)
			).toEqual(categories);
		});
	});
});

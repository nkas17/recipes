import { createStore } from 'redux';
import rootReducer from '../../reducers/rootReducer';
import initialState from '../../reducers/initialState';
import { createRecipeSuccess } from '../../actions/recipeActions';

describe('Store', () => {
	it('should handle creating recipes', () => {
		// arrange
		const store = createStore(rootReducer, initialState);
		const recipe = {
			title: 'Delicious Meal',
		};

		// act
		const action = createRecipeSuccess(recipe);
		store.dispatch(action);

		// assert
		const actual = store.getState().recipeStore.recipes[0];
		const expected = {
			title: 'Delicious Meal',
		};
		expect(actual).toEqual(expected);
	});
});

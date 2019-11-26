import {
	// actions
	createRecipeSuccess,
	updateRecipeSuccess,
	loadRecipesSuccess,
	// thunks
	// loadRecipes,
} from './recipeActions';
import * as actionTypes from './actionTypes';

/**
 * test actions
 */

describe('Recipe Actions', () => {
	// arrange - shared data
	const recipes = [
		{
			id: 'tacos',
			title: 'tacos',
			category: 'other',
			description: 'Tasty homemade tacos - hard or soft',
			ingredients: ['cheese', 'ground beef', 'tortilla'],
		},
	];

	describe('createRecipeSuccess', () => {
		it('should create a CREATE_RECIPE_SUCCESS action', () => {
			// arrange
			const expectedAction = {
				type: actionTypes.CREATE_RECIPE_SUCCESS,
				recipe: recipes[0],
			};

			// act
			const action = createRecipeSuccess(recipes[0]);

			// assert
			expect(action).toEqual(expectedAction);
		});
	});

	describe('updateRecipeSuccess', () => {
		it('should create an UPDATE_RECIPE_SUCCESS action', () => {
			// arrange
			const expectedAction = {
				type: actionTypes.UPDATE_RECIPE_SUCCESS,
				recipe: recipes[0],
			};

			// act
			const action = updateRecipeSuccess(recipes[0]);

			// assert
			expect(action).toEqual(expectedAction);
		});
	});

	describe('loadRecipesSuccess', () => {
		it('should create a LOAD_RECIPES_SUCCESS action', () => {
			// arrange
			const expectedAction = {
				type: actionTypes.LOAD_RECIPES_SUCCESS,
				recipes,
			};

			// act
			const action = loadRecipesSuccess(recipes);

			// assert
			expect(action).toEqual(expectedAction);
		});
	});
});

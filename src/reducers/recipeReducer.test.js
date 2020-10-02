import recipes from './recipeReducer';
import {
	CREATE_RECIPE_SUCCESS,
	DELETE_RECIPE_SUCCESS,
	LOAD_RECIPES_SUCCESS,
	UPDATE_RECIPE_SUCCESS,
	LOAD_RECIPES,
} from '../actions/actionTypes';

describe('Recipe Reducer', () => {
	describe('MISSING_ACTION', () => {
		it('should return existing state', () => {
			expect(
				recipes([{ title: 'recipe' }], {
					type: 'MISSING_ACTION',
					recipe: { title: 'newRecipe' },
				})
			).toEqual([{ title: 'recipe' }]);
		});
	});
	describe('CREATE_RECIPE_SUCCESS', () => {
		it('should add a new recipe', () => {
			expect(
				recipes([{ title: 'recipe' }], {
					type: CREATE_RECIPE_SUCCESS,
					recipe: { title: 'newRecipe' },
				})
			).toEqual({ recipes: [{ title: 'recipe' }, { title: 'newRecipe' }] });
		});
	});
	describe('UPDATE_RECIPE_SUCCESS', () => {
		it('should update an existing recipe', () => {
			expect(
				recipes(
					[
						{ id: 1, title: 'recipe' },
						{ id: 2, title: 'oldRecipe' },
					],
					{
						type: UPDATE_RECIPE_SUCCESS,
						recipe: { id: 1, title: 'newRecipe' },
					}
				)
			).toEqual({
				recipes: [
					{ id: 2, title: 'oldRecipe' },
					{ id: 1, title: 'newRecipe' },
				],
			});
		});
	});
	describe('DELETE_RECIPE_SUCCESS', () => {
		it('should delete an existing recipe', () => {
			expect(
				recipes(
					[
						{ id: 1, title: 'recipe' },
						{ id: 2, title: 'oldRecipe' },
					],
					{
						type: DELETE_RECIPE_SUCCESS,
						recipe: { id: 2, title: 'oldRecipe' },
					}
				)
			).toEqual({ recipes: [{ id: 1, title: 'recipe' }] });
		});
	});
	describe('LOAD_RECIPES', () => {
		it('should start loading recipes', () => {
			expect(
				recipes(undefined, {
					type: LOAD_RECIPES,
					isLoading: true,
				})
			).toEqual({
				recipes: [],
				isLoading: true,
			});
		});
	});
	describe('LOAD_RECIPE_SUCCESS', () => {
		it('should load recipes', () => {
			expect(
				recipes(undefined, {
					type: LOAD_RECIPES_SUCCESS,
					recipes: [
						{ id: 1, title: 'recipe' },
						{ id: 2, title: 'oldRecipe' },
					],
				})
			).toEqual({
				recipes: [
					{ id: 1, title: 'recipe' },
					{ id: 2, title: 'oldRecipe' },
				],
				isLoading: false,
			});
		});
	});
});

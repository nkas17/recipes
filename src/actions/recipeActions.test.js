import {
	// actions
	createRecipeSuccess,
	deleteRecipeSuccess,
	updateRecipeSuccess,
	loadRecipesSuccess,
	// thunks
	deleteRecipe,
	loadRecipes,
	saveRecipe,
} from './recipeActions';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';
import {
	CREATE_RECIPE_SUCCESS,
	DELETE_RECIPE_SUCCESS,
	LOAD_RECIPES_SUCCESS,
	UPDATE_RECIPE_SUCCESS,
} from './actionTypes';
import RecipeApi from '../api/RecipeApi';

// arrange - shared data
const recipe = {
	id: 'tacos',
	title: 'tacos',
	category: 'other',
	description: 'Tasty homemade tacos - hard or soft',
	ingredients: ['cheese', 'ground beef', 'tortilla'],
};

beforeEach(() => {
	jest.clearAllMocks();
});

/**
 * test actions
 */

describe('Recipe Actions', () => {
	describe('createRecipeSuccess', () => {
		it('should create a CREATE_RECIPE_SUCCESS action', () => {
			expect(createRecipeSuccess(recipe)).toEqual({
				type: CREATE_RECIPE_SUCCESS,
				recipe,
			});
		});
	});

	describe('deleteRecipeSuccess', () => {
		it('should create a DELETE_RECIPE_SUCCESS action', () => {
			expect(deleteRecipeSuccess(recipe)).toEqual({
				type: DELETE_RECIPE_SUCCESS,
				recipe,
			});
		});
	});

	describe('updateRecipeSuccess', () => {
		it('should create an UPDATE_RECIPE_SUCCESS action', () => {
			expect(updateRecipeSuccess(recipe)).toEqual({
				type: UPDATE_RECIPE_SUCCESS,
				recipe,
			});
		});
	});

	describe('loadRecipesSuccess', () => {
		it('should create a LOAD_RECIPES_SUCCESS action', () => {
			expect(loadRecipesSuccess([recipe])).toEqual({
				type: LOAD_RECIPES_SUCCESS,
				recipes: [recipe],
			});
		});
	});
});

/**
 * test thunks
 */

describe('Recipe Thunks', () => {
	describe('deleteRecipe', () => {
		it('should successfully delete a recipe', () => {
			RecipeApi.deleteRecipe = jest.fn().mockResolvedValue(recipe);
			const dispatch = jest.fn();
			return deleteRecipe()(dispatch).then(() => {
				expect(RecipeApi.deleteRecipe).toHaveBeenCalled();
				expect(dispatch).toHaveBeenNthCalledWith(
					1,
					beginAjaxCall('deleteRecipe')
				);
				expect(dispatch).toHaveBeenNthCalledWith(
					2,
					deleteRecipeSuccess(recipe)
				);
				expect(dispatch).toHaveBeenCalledTimes(2);
			});
		});
		it('should fail to delete a recipe', () => {
			RecipeApi.deleteRecipe = jest.fn().mockRejectedValue(new Error('error'));
			const dispatch = jest.fn();
			return deleteRecipe(
				'id',
				'token'
			)(dispatch).catch(() => {
				expect(RecipeApi.deleteRecipe).toHaveBeenCalledWith('id', 'token');
				expect(dispatch).toHaveBeenNthCalledWith(
					1,
					beginAjaxCall('deleteRecipe')
				);
				expect(dispatch).toHaveBeenNthCalledWith(
					2,
					ajaxCallError('deleteRecipe')
				);
				expect(dispatch).toHaveBeenCalledTimes(2);
			});
		});
	});
	describe('loadRecipes', () => {
		it('should successfully load a recipes', () => {
			RecipeApi.getAllRecipes = jest.fn().mockResolvedValue(recipe);
			const dispatch = jest.fn();
			return loadRecipes()(dispatch).then(() => {
				expect(RecipeApi.getAllRecipes).toHaveBeenCalled();
				expect(dispatch).toHaveBeenNthCalledWith(
					1,
					beginAjaxCall('getAllRecipes')
				);
				expect(dispatch).toHaveBeenNthCalledWith(2, loadRecipesSuccess(recipe));
				expect(dispatch).toHaveBeenCalledTimes(2);
			});
		});
		it('should fail to load recipes', () => {
			RecipeApi.getAllRecipes = jest.fn().mockRejectedValue(new Error('error'));
			const dispatch = jest.fn();
			return loadRecipes()(dispatch).catch(() => {
				expect(RecipeApi.getAllRecipes).toHaveBeenCalled();
				expect(dispatch).toHaveBeenNthCalledWith(
					1,
					beginAjaxCall('getAllRecipes')
				);
				expect(dispatch).toHaveBeenNthCalledWith(
					2,
					ajaxCallError('getAllRecipes')
				);
				expect(dispatch).toHaveBeenCalledTimes(2);
			});
		});
	});
	describe('saveRecipe', () => {
		it('should successfully save a recipe', () => {
			const savedRecipe = {
				title: 'tacos',
				category: 'other',
				description: 'Tasty homemade tacos - hard or soft',
				ingredients: ['cheese', 'ground beef', 'tortilla'],
			};
			RecipeApi.saveRecipe = jest.fn().mockResolvedValue(savedRecipe);
			const dispatch = jest.fn();
			return saveRecipe(
				savedRecipe,
				'token'
			)(dispatch).then(() => {
				expect(RecipeApi.saveRecipe).toHaveBeenCalled();
				expect(dispatch).toHaveBeenNthCalledWith(
					1,
					beginAjaxCall('saveRecipe')
				);
				expect(dispatch).toHaveBeenNthCalledWith(
					2,
					createRecipeSuccess(savedRecipe)
				);
				expect(dispatch).toHaveBeenCalledTimes(2);
			});
		});
		it('should successfully update a recipe', () => {
			const savedRecipe = {
				id: 'tacos',
				title: 'tacos',
				category: 'other',
				description: 'Tasty homemade tacos - hard or soft',
				ingredients: ['cheese', 'ground beef', 'tortilla'],
			};
			RecipeApi.saveRecipe = jest.fn().mockResolvedValue(savedRecipe);
			const dispatch = jest.fn();
			return saveRecipe(
				savedRecipe,
				'token'
			)(dispatch).then(() => {
				expect(RecipeApi.saveRecipe).toHaveBeenCalled();
				expect(dispatch).toHaveBeenNthCalledWith(
					1,
					beginAjaxCall('saveRecipe')
				);
				expect(dispatch).toHaveBeenNthCalledWith(
					2,
					updateRecipeSuccess(savedRecipe)
				);
				expect(dispatch).toHaveBeenCalledTimes(2);
			});
		});
		it('should fail to save a recipe', () => {
			RecipeApi.saveRecipe = jest.fn().mockRejectedValue(new Error('error'));
			const dispatch = jest.fn();
			return saveRecipe(
				'recipe',
				'token'
			)(dispatch).catch(() => {
				expect(RecipeApi.saveRecipe).toHaveBeenCalledWith('recipe', 'token');
				expect(dispatch).toHaveBeenNthCalledWith(
					1,
					beginAjaxCall('saveRecipe')
				);
				expect(dispatch).toHaveBeenNthCalledWith(
					2,
					ajaxCallError('saveRecipe')
				);
				expect(dispatch).toHaveBeenCalledTimes(2);
			});
		});
	});
});

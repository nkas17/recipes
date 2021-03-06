import * as actionTypes from './actionTypes';
import RecipeApi from '../api/RecipeApi';
// import RecipeApi from '../api/mockRecipeApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

/**
 * recipe actions
 *
 */

export const loadRecipesSuccess = (recipes) => ({
	type: actionTypes.LOAD_RECIPES_SUCCESS,
	recipes,
});

export const createRecipeSuccess = (recipe) => ({
	type: actionTypes.CREATE_RECIPE_SUCCESS,
	recipe,
});

export const updateRecipeSuccess = (recipe) => ({
	type: actionTypes.UPDATE_RECIPE_SUCCESS,
	recipe,
});

export const deleteRecipeSuccess = (recipe) => ({
	type: actionTypes.DELETE_RECIPE_SUCCESS,
	recipe,
});

/**
 * thunks
 */

export const loadRecipes = () => (dispatch) => {
	dispatch(beginAjaxCall('getAllRecipes'));
	dispatch({
		type: actionTypes.LOAD_RECIPES,
	});
	return RecipeApi.getAllRecipes()
		.then((recipes) => {
			dispatch(loadRecipesSuccess(recipes));
		})
		.catch((error) => {
			dispatch(ajaxCallError('getAllRecipes'));
			throw error;
		});
};

export const saveRecipe = (recipe, token) => (dispatch) => {
	dispatch(beginAjaxCall('saveRecipe'));
	if (recipe._id) {
		return RecipeApi.updateRecipe(recipe, token)
			.then((savedRecipe) => {
				dispatch(updateRecipeSuccess(savedRecipe));
			})
			.catch((error) => {
				dispatch(ajaxCallError('saveRecipe'));
				throw error;
			});
	}
	return RecipeApi.saveRecipe(recipe, token)
		.then((savedRecipe) => {
			dispatch(createRecipeSuccess(savedRecipe));
		})
		.catch((error) => {
			dispatch(ajaxCallError('saveRecipe'));
			throw error;
		});
};

export const deleteRecipe = (recipeId, token) => (dispatch) => {
	dispatch(beginAjaxCall('deleteRecipe'));
	return RecipeApi.deleteRecipe(recipeId, token)
		.then((recipe) => {
			dispatch(deleteRecipeSuccess(recipe));
		})
		.catch((error) => {
			dispatch(ajaxCallError('deleteRecipe'));
			throw error;
		});
};

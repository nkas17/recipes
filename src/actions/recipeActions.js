import * as actionTypes from './actionTypes';
import RecipeApi from '../api/RecipeApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

/**
 * recipe actions
 *
 */

export const loadRecipesSuccess = (recipes) => ({ // eslint-disable-line
	type: actionTypes.LOAD_RECIPES_SUCCESS,
	recipes,
});

export const createRecipeSuccess = (recipe) => ({ // eslint-disable-line
	type: actionTypes.CREATE_RECIPE_SUCCESS,
	recipe,
});

export const updateRecipeSuccess = (recipe) => ({ // eslint-disable-line
	type: actionTypes.UPDATE_RECIPE_SUCCESS,
	recipe,
});

export const deleteRecipeSuccess = (recipe) => ({ // eslint-disable-line
	type: actionTypes.DELETE_RECIPE_SUCCESS,
	recipe,
});

/**
 * thunks
 */

export const loadRecipes = () => (dispatch) => {
	dispatch(beginAjaxCall());
	return RecipeApi.getAllRecipes().then((recipes) => {
		dispatch(loadRecipesSuccess(recipes));
	}).catch((error) => {
		throw (error);
	});
};

export const saveRecipe = recipe => (dispatch) => {
	dispatch(beginAjaxCall());
	return RecipeApi.saveRecipe(recipe).then((savedRecipe) => {
		// eslint-disable-next-line no-unused-expressions
		recipe.id ? dispatch(updateRecipeSuccess(savedRecipe))
			: dispatch(createRecipeSuccess(savedRecipe));
	}).catch((error) => {
		dispatch(ajaxCallError());
		throw (error);
	});
};

export const deleteRecipe = recipeId => (dispatch) => {
	dispatch(beginAjaxCall());
	return RecipeApi.deleteRecipe(recipeId).then((recipe) => {
		// deletedRecipe.id ?
		// dispatch(updateRecipeSuccess(deletedRecipe)) :
		dispatch(deleteRecipeSuccess(recipe));
	}).catch((error) => {
		dispatch(ajaxCallError());
		throw (error);
	});
};

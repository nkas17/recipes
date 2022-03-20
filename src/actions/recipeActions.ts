import * as actionTypes from './actionTypes';
import RecipeApi from '../api/RecipeApi';
// import RecipeApi from '../api/mockRecipeApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';
import { Recipe } from '../types/recipe';

/**
 * recipe actions
 *
 */

export const loadRecipesSuccess = (recipes: Recipe[]) => ({
  type: actionTypes.LOAD_RECIPES_SUCCESS,
  payload: { recipes },
});

export const createRecipeSuccess = (recipe: Recipe) => ({
  type: actionTypes.CREATE_RECIPE_SUCCESS,
  payload: { recipe },
});

export const updateRecipeSuccess = (recipe: Recipe) => ({
  type: actionTypes.UPDATE_RECIPE_SUCCESS,
  payload: { recipe },
});

export const deleteRecipeSuccess = (recipe: Recipe) => ({
  type: actionTypes.DELETE_RECIPE_SUCCESS,
  payload: { recipe },
});

/**
 * thunks
 */

export const loadRecipes = () => (dispatch: any) => {
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

export const saveRecipe = (recipe: Recipe, token: string) => (dispatch: any) => {
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

export const deleteRecipe = (recipeId: string, token: string) => (dispatch: any) => {
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

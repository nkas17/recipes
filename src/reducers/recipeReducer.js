import {
  CREATE_RECIPE_SUCCESS,
  DELETE_RECIPE_SUCCESS,
  LOAD_RECIPES_SUCCESS,
  UPDATE_RECIPE_SUCCESS,
  LOAD_RECIPES,
} from '../actions/actionTypes';
import initialState from './initialState';

/**
 * recipe reducer
 */
const recipes = (state = initialState.recipeStore, action) => {
  switch (action.type) {
    case CREATE_RECIPE_SUCCESS:
      return { recipes: [...state.recipes, action.recipe] };
    case UPDATE_RECIPE_SUCCESS:
      return {
        recipes: [
          ...state.recipes.filter((recipe) => recipe.id !== action.recipe.id),
          action.recipe,
        ],
      };
    case DELETE_RECIPE_SUCCESS:
      return {
        recipes: [
          ...state.recipes.filter((recipe) => recipe._id !== action.recipe._id),
        ],
      };
    case LOAD_RECIPES:
      return {
        ...state,
        isLoading: true,
      };
    case LOAD_RECIPES_SUCCESS:
      return {
        recipes: action.recipes,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default recipes;

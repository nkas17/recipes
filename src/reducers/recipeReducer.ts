import {
  CREATE_RECIPE_SUCCESS,
  DELETE_RECIPE_SUCCESS,
  LOAD_RECIPES_SUCCESS,
  UPDATE_RECIPE_SUCCESS,
  LOAD_RECIPES,
} from '../actions/actionTypes';
import initialState from './initialState';
import { Action } from '../types/action';
import { Recipe } from '../types/recipe';

/**
 * recipe reducer
 */
const recipes = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: { recipes: Recipe[] } = initialState.recipeStore,
  action: Action,
): { recipes: Recipe[]; isLoading?: boolean } => {
  switch (action.type) {
    case CREATE_RECIPE_SUCCESS:
      if (action?.payload?.recipe) {
        return { recipes: [...state.recipes, action?.payload?.recipe] };
      }
      return state;
    case UPDATE_RECIPE_SUCCESS:
      if (action?.payload?.recipe) {
        return {
          recipes: [
            ...state.recipes.filter((recipe: Recipe) => recipe.id !== action.payload?.recipe?.id),
            action?.payload?.recipe,
          ],
        };
      }
      return state;
    case DELETE_RECIPE_SUCCESS:
      return {
        recipes: [
          ...state.recipes.filter((recipe: Recipe) => recipe._id !== action?.payload?.recipe?._id),
        ],
      };
    case LOAD_RECIPES:
      return {
        ...state,
        isLoading: true,
      };
    case LOAD_RECIPES_SUCCESS:
      return {
        recipes: action?.payload?.recipes || [],
        isLoading: false,
      };
    default:
      return state;
  }
};

export default recipes;

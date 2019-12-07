import {
	CREATE_RECIPE_SUCCESS,
	DELETE_RECIPE_SUCCESS,
	LOAD_RECIPES_SUCCESS,
	UPDATE_RECIPE_SUCCESS,
} from '../actions/actionTypes';
import initialState from './initialState';

/**
 * recipe reducer
 */
const recipes = (state = initialState.recipes, action) => {
	switch (action.type) {
		case CREATE_RECIPE_SUCCESS:
			return [...state, action.recipe];
		case UPDATE_RECIPE_SUCCESS:
			return [
				...state.filter(recipe => recipe.id !== action.recipe.id),
				action.recipe,
			];
		case DELETE_RECIPE_SUCCESS:
			return [...state.filter(recipe => recipe.id !== action.recipe.id)];
		case LOAD_RECIPES_SUCCESS:
			return action.recipes;
		default:
			return state;
	}
};

export default recipes;

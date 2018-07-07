import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';
/**
 * recipe reducer
 */

const recipeReducer = (state = initialState.recipes, action) => {
	/* eslint-disable indent */
	switch (action.type) {
		case actionTypes.CREATE_RECIPE_SUCCESS:
			return [...state, Object.assign({}, action.recipe)];
		case actionTypes.UPDATE_RECIPE_SUCCESS:
			return [
				...state.filter(recipe => recipe.id !== action.recipe.id),
				Object.assign({}, action.recipe),
			];
		case actionTypes.DELETE_RECIPE_SUCCESS:
			return [...state.filter(recipe => recipe.id !== action.recipe.id)];
		case actionTypes.LOAD_RECIPES_SUCCESS:
			return action.recipes;
		default:
			return state;
	}
};

export default recipeReducer;
import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';
/**
 * category reducer
 */

const categoryReducer = (state = initialState.categories, action) => {
	/* eslint-disable indent */
	switch (action.type) {
		case actionTypes.LOAD_CATEGORIES_SUCCESS:
			return action.categories;
		default:
			return state;
	}
};

export default categoryReducer;

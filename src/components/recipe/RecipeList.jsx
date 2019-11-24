import React from 'react';
import PropTypes from 'prop-types';
import RecipeListRow from './RecipeListRow';

/**
 * List of recipes
 */
const RecipeList = ({ recipes, deleteRecipe, showDelete }) => (
	<table className="table">
		<tbody>
			{recipes.map(recipe => (
				<RecipeListRow
					key={recipe.id}
					recipe={recipe}
					deleteRecipe={deleteRecipe}
					showDelete={showDelete}
				/>
			))}
		</tbody>
	</table>
);

RecipeList.propTypes = {
	/**
	 * list of recipes to display
	 */
	recipes: PropTypes.arrayOf(PropTypes.object).isRequired,

	/**
	 * function to delete a recipe
	 */
	deleteRecipe: PropTypes.func.isRequired,

	/**
	 * Show delete button or not.
	 */
	showDelete: PropTypes.bool.isRequired,
};

export default RecipeList;

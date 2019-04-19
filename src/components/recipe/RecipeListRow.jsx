import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * A Row of a recipe
 */
const RecipeListRow = ({ recipe, deleteRecipe, showDelete }) => (
	<tr>
		<td>&nbsp;</td>
		<td>
			<Link to={`recipe/${recipe.id}`}>{recipe.title}</Link>
		</td>
		<td>{recipe.description}</td>
		<td>{recipe.category}</td>
		{/* <td>
			<input type="button" className="btn btn-link" value="Add to Meal List" />
		</td> */}
		{showDelete && (
			<td>
				<input
					type="button"
					value="delete"
					className="btn btn-link delete-recipe"
					onClick={() => deleteRecipe(recipe._id.$oid)}
				/>
			</td>
		)}
	</tr>
);

RecipeListRow.propTypes = {
	/**
	 * the recipe to display
	 */
	recipe: PropTypes.objectOf(PropTypes.any).isRequired,

	/**
	 * function to delete a recipe
	 */
	deleteRecipe: PropTypes.func.isRequired,

	/**
	 * whether or not we should show the delete button
	 */
	showDelete: PropTypes.bool.isRequired,
};

export default RecipeListRow;

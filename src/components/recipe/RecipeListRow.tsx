import React from 'react';
import { Link } from 'react-router-dom';
import { Recipe } from '../../types/recipe';

interface RecipeListRowProps {
  recipe: Recipe;
  deleteRecipe: (id: { $oid: string } | undefined) => void;
  showDelete: boolean;
}

/**
 * A Row of a recipe
 */
function RecipeListRow({ recipe, deleteRecipe, showDelete }: RecipeListRowProps) {
  return (
    <tr>
      <td>
        <Link to={`recipe/${recipe.id}`}>{recipe.title}</Link>
      </td>
      <td className="recipe-description">{recipe.description}</td>
      <td>{recipe.category}</td>
      {showDelete && (
        <td>
          <input
            type="button"
            value="delete"
            className="btn btn-link delete-recipe"
            onClick={() => deleteRecipe(recipe._id)}
          />
        </td>
      )}
    </tr>
  );
}

export default RecipeListRow;

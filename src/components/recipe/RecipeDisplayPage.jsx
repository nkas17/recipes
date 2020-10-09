import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { find, split } from 'lodash';
import Header from '../common/Header';

/**
 * Recipe display page
 * View recipes and edit them with a click of a button
 */
class RecipeDisplayPage extends React.PureComponent {
	render() {
		const { recipe, authenticated } = this.props;
		const ingredients = recipe.ingredients && split(recipe.ingredients, '\n');
		const directions = recipe.directions && split(recipe.directions, '\n');
		let key = 0;
		return (
			<>
				<Header />
				<article className="py-2">
					<div className="jumbotron recipe-display">
						<h2>{recipe.title}</h2>
						<p>{recipe.description}</p>
						<hr />
						{authenticated && (
							<Link to={`/recipe/${recipe.id}/edit`}>edit</Link>
						)}
					</div>
					<div className="jumbotron">
						<section className="recipe-display">
							<h3>Ingredients</h3>
							<hr />
							{(ingredients &&
								ingredients.map((ingredient) => (
									<span className="ingredient-list-item" key={key++}>
										{ingredient}
										<br />
									</span>
								))) ||
								'No Ingredients Added'}
						</section>
					</div>
					<div className="jumbotron">
						<section className="recipe-display">
							<h3>Directions</h3>
							<hr />
							{directions
								? directions.map((direction) => <p key={key++}>{direction}</p>)
								: 'No Directions Added'}
						</section>
					</div>
				</article>
			</>
		);
	}
}

RecipeDisplayPage.propTypes = {
	/**
	 * the recipe to display
	 */
	recipe: PropTypes.objectOf(PropTypes.any).isRequired,

	/**
	 * whether user is authenticated
	 */
	authenticated: PropTypes.bool.isRequired,
	// match: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state, ownProps) => {
	const recipeId = ownProps.match.params.id;

	let recipe = {
		title: '',
		description: '',
	};

	if (recipeId !== 'new') {
		recipe = find(state.recipeStore.recipes, { id: recipeId });
		if (recipe === undefined) {
			recipe = {
				title: '',
				description: '',
			};
		}
	}

	return {
		recipe,
		authenticated: state.user.authenticated,
	};
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDisplayPage);

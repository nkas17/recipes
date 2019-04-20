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

// eslint-disable-next-line react/prefer-stateless-function
class RecipeDisplayPage extends React.Component {
	render() {
		const { recipe, authenticated } = this.props;
		const ingredients = recipe.ingredients && split(recipe.ingredients, '\n');
		const directions = recipe.directions && split(recipe.directions, '\n');
		let key = 0;
		return (
			<React.Fragment>
				<Header />
				<article className="py-2">
					<div className="jumbotron">
						<h2>{recipe.title}</h2>
						<p>{recipe.description}</p>
						<hr />
						{authenticated && (
							<Link to={`/recipe/${recipe.id}/edit`}>edit</Link>
						)}
					</div>
					<div className="jumbotron">
						<div>
							<h3>Ingredients</h3>
							<hr />
							{ingredients &&
								ingredients.map(ingredient => (
									<p key={key++}>
										{ingredient}
										<br />
									</p>
								))}
						</div>
					</div>
					<div className="jumbotron">
						<div>
							<h3>Directions</h3>
							<hr />
							{directions &&
								directions.map(direction => (
									<p key={key++}>
										{direction}
										<br />
									</p>
								))}
						</div>
					</div>
				</article>
			</React.Fragment>
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
		recipe = find(state.recipes, { id: recipeId });
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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RecipeDisplayPage);

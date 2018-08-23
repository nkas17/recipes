import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

/**
 * Recipe display page
 * View recipes and edit them with a click of a button
 */

// eslint-disable-next-line react/prefer-stateless-function
class RecipeDisplayPage extends React.Component {
	render() {
		const { recipe } = this.props;
		const ingredients = _.split(recipe.ingredients, '\n');
		const directions = _.split(recipe.directions, '\n');
		let key = 0;
		return (
			<article className="py-2">
				<div className="jumbotron">
					<h2>{recipe.title}</h2>
					<p>{recipe.description}</p>
					<hr />
					<Link to={`/recipe/${recipe.id}/edit`}>edit</Link>
				</div>
				<div className="jumbotron">
					<div>
						<h3>Ingredients</h3>
						<hr />
						{ingredients.map(ingredient => (
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
						{directions.map(direction => (
							<p key={key++}>
								{direction}
								<br />
							</p>
						))}
					</div>
				</div>
			</article>
		);
	}
}

RecipeDisplayPage.propTypes = {
	/**
	 * the recipe to display
	 */
	recipe: PropTypes.objectOf(PropTypes.any).isRequired,

	// match: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state, ownProps) => {
	const recipeId = ownProps.match.params.id;

	let recipe = {
		title: '',
		description: '',
	};

	if (recipeId !== 'new') {
		recipe = _.find(state.recipes, { id: recipeId });
		if (recipe === undefined) {
			recipe = {
				title: '',
				description: '',
			};
		}
	}

	return {
		recipe,
	};
};

const mapDispatchToProps = () => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RecipeDisplayPage);

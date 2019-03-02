import React from 'react';
import PropTypes from 'prop-types';
import vanillaToast from 'vanilla-toast';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reject, sortBy } from 'lodash';
import RecipeList from './RecipeList';
import * as recipeActions from '../../actions/recipeActions';
import RecipeSearchView from './RecipeSearchView';

/**
 * Page that has all the recipe things
 */
class RecipePage extends React.Component { //eslint-disable-line
	constructor(props, context) {
		super(props, context);
		this.state = {
			searchValue: '',
		};

		this._onSearchChange = this._onSearchChange.bind(this);
		this._redirectToAddRecipePage = this._redirectToAddRecipePage.bind(this);
		this._deleteRecipe = this._deleteRecipe.bind(this);
	}

	_onSearchChange(event) {
		return this.setState({ searchValue: event.target.value });
	}

	_redirectToAddRecipePage() {
		const { history } = this.props;
		history.push('/recipe/new/edit');
	}

	_deleteRecipe(recipeId) {
		const { actions } = this.props;

		if (
			/* eslint-disable no-alert */
			// eslint-disable-next-line no-restricted-globals
			confirm(
				'Click "Ok" if you are sure you would like to delete this recipe, otherwise "Cancel".'
			)
		) {
			console.log(`deleted recipe id - ${recipeId}`); // eslint-disable-line no-console

			actions
				.deleteRecipe(recipeId)
				.then(() => vanillaToast.success('Recipe deleted'))
				.catch(error => vanillaToast.error(error));
		}
	}

	_getRecipesToDisplay() {
		const { recipes } = this.props;
		const { searchValue } = this.state;
		return reject(recipes, recipe => {
			const titleIndex = recipe.title
				.toLowerCase()
				.indexOf(searchValue.toLowerCase());
			const descriptionIndex = recipe.description
				.toLowerCase()
				.indexOf(searchValue.toLowerCase());
			const categoryIndex = recipe.category
				.toLowerCase()
				.indexOf(searchValue.toLowerCase());
			const isDisplaying =
				titleIndex === -1 && descriptionIndex === -1 && categoryIndex === -1;
			return isDisplaying;
		});
	}

	render() {
		const { searchValue } = this.state;
		return (
			<article className="py-2">
				<div className="jumbotron">
					<header className="row">
						<div className="col">
							<h2>recipes</h2>
						</div>
						<div className="col">
							<h2 className="float-right">
								<button
									type="button"
									className="btn btn-link ml-3"
									onClick={this._redirectToAddRecipePage}
								>
									add
								</button>
							</h2>
						</div>
					</header>
					<RecipeSearchView
						searchValue={searchValue}
						onChange={this._onSearchChange}
					/>
					<RecipeList
						recipes={this._getRecipesToDisplay()}
						deleteRecipe={this._deleteRecipe}
					/>
				</div>
			</article>
		);
	}
}

RecipePage.propTypes = {
	recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
	history: PropTypes.objectOf(PropTypes.any).isRequired,
	actions: PropTypes.objectOf(PropTypes.func).isRequired,
};

const mapStateToProps = state => ({
	recipes: sortBy(state.recipes, [o => o.title]),
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(recipeActions, dispatch),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RecipePage);

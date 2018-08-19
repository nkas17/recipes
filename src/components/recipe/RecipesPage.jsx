import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import RecipeList from './RecipeList';
import * as recipeActions from '../../actions/recipeActions';
import RecipeSearchContainer from './RecipeSearchContainer';

/**
 * Page that has all the recipe things
 */
class RecipePage extends React.Component { //eslint-disable-line
	constructor(props, context) {
		super(props, context);

		this._redirectToAddRecipePage = this._redirectToAddRecipePage.bind(this);
		this._deleteRecipe = this._deleteRecipe.bind(this);
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
				.then(() => toastr.success('Recipe deleted'))
				.catch(error => toastr.error(error));
		}
	}

	render() {
		const { recipes } = this.props;
		return (
			<div className="jumbotron">
				<header className="row">
					<div className="col-lg-1">
						<h2>recipes</h2>
					</div>
					<div className="col-lg-11">
						<h2>
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
				<RecipeSearchContainer />
				<RecipeList recipes={recipes} deleteRecipe={this._deleteRecipe} />
			</div>
		);
	}
}

RecipePage.propTypes = {
	recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
	history: PropTypes.objectOf(PropTypes.any).isRequired,
	actions: PropTypes.objectOf(PropTypes.func).isRequired,
};

const mapStateToProps = state => ({
	recipes: _.sortBy(state.recipes, [o => o.title]),
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(recipeActions, dispatch),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RecipePage);

import React from 'react';
import PropTypes from 'prop-types';
import vanillaToast from 'vanilla-toast';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reject, sortBy } from 'lodash';
import { deleteRecipe } from '../actions/recipeActions';
import Header from '../components/common/Header';
import RecipeListRow from '../components/recipe/RecipeListRow';

/**
 * Page that has all the recipe things
 */
class RecipePage extends React.Component {
  constructor(props) {
    super(props);
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
    const { actions, token } = this.props;

    if (
      /* eslint-disable no-alert */
      // eslint-disable-next-line no-restricted-globals
      confirm(
        'Click "Ok" if you are sure you would like to delete this recipe, otherwise "Cancel".',
      )
    ) {
      console.log(`deleted recipe id - ${recipeId}`); // eslint-disable-line no-console

      actions
        .deleteRecipe(recipeId, token)
        .then(() => vanillaToast.success('Recipe deleted'))
        .catch((error) => vanillaToast.error(error));
    }
  }

  _getRecipesToDisplay() {
    const { recipes } = this.props;
    const { searchValue } = this.state;
    return reject(recipes, (recipe) => {
      const titleIndex = recipe.title.toLowerCase().indexOf(searchValue.toLowerCase());
      const descriptionIndex = recipe.description.toLowerCase().indexOf(searchValue.toLowerCase());
      const categoryIndex = recipe.category.toLowerCase().indexOf(searchValue.toLowerCase());
      return titleIndex === -1 && descriptionIndex === -1 && categoryIndex === -1;
    });
  }

  render() {
    const { searchValue } = this.state;
    const { authenticated, isLoadingRecipes } = this.props;
    return (
      <>
        <Header />
        <article className="py-2">
          <div className="jumbotron">
            <div className="recipes-header">
              <h2>recipes</h2>
              <hr />
            </div>
            {(isLoadingRecipes && <div className="loader" />) || (
              <>
                <div className="row">
                  <div className="col-12 my-4">
                    <input
                      type="text"
                      name="searchRecipe"
                      className="form-control"
                      placeholder="Search Recipes"
                      value={searchValue}
                      onChange={this._onSearchChange}
                    />
                  </div>
                </div>
                {authenticated && (
                  <button
                    type="button"
                    className="btn btn-link ml-3"
                    onClick={this._redirectToAddRecipePage}
                  >
                    add
                  </button>
                )}
                <table className="table">
                  <tbody>
                    {this._getRecipesToDisplay().map((recipe) => (
                      <RecipeListRow
                        key={recipe.id}
                        recipe={recipe}
                        deleteRecipe={this._deleteRecipe}
                        showDelete={authenticated}
                      />
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </article>
      </>
    );
  }
}

RecipePage.defaultProps = {
  token: null,
};

RecipePage.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  isLoadingRecipes: PropTypes.bool.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  authenticated: PropTypes.bool.isRequired,
  token: PropTypes.string,
};

const mapStateToProps = (state) => ({
  isLoadingRecipes: state.recipeStore.isLoading,
  recipes: sortBy(state.recipeStore.recipes, [(o) => o.title]),
  authenticated: state.user.authenticated,
  token: state.user.token,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      deleteRecipe,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage);
export { RecipePage as RecipePageTest };

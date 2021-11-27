import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import vanillaToast from 'vanilla-toast';
import { find } from 'lodash';
import * as recipeActions from '../../actions/recipeActions';
import { categoriesFormattedForSelectInput } from '../../selectors/selectors';
import RecipeEntryView from './RecipeEntryView';
import Header from '../common/Header';

const replaceAll = (str, get, replace) =>
  str.replace(new RegExp(get, 'g'), replace);

class RecipeEntryContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: { ...props.recipe },
      errors: {},
      saving: false,
    };

    this._updateRecipeState = this._updateRecipeState.bind(this);
    this._saveRecipe = this._saveRecipe.bind(this);
    this._cancelRecipe = this._cancelRecipe.bind(this);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { recipe } = this.props;
    if (recipe.id !== nextProps.recipe.id) {
      this.setState({ recipe: { ...nextProps.recipe } });
    }
  }

  _updateRecipeState(event) {
    const { recipe } = this.state;
    const field = event.target.name;
    const tempRecipe = recipe;
    tempRecipe[field] = event.target.value;
    return this.setState({ recipe: tempRecipe });
  }

  _recipeFormIsValid() {
    let formIsValid = true;
    const errors = {};
    const { recipe } = this.state;

    if (recipe.title.length < 5) {
      errors.title = 'title must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({ errors });
    return formIsValid;
  }

  _saveRecipe(event) {
    event.preventDefault();
    const { recipe } = this.state;
    const { actions, token } = this.props;

    if (!this._recipeFormIsValid()) {
      return;
    }

    this.setState({ saving: true });
    if (recipe.id === undefined) recipe.id = replaceAll(recipe.title, ' ', '-');
    actions
      .saveRecipe(recipe, token)
      .then(() => this._redirectOnSave())
      .catch((error) => {
        vanillaToast.error(error);
        this.setState({ saving: false });
      });
  }

  _redirectOnSave() {
    const { recipe } = this.state;
    const { history } = this.props;
    this.setState({ saving: false });
    vanillaToast.success('Recipe saved');
    history.push(`/recipe/${recipe.id}`);
  }

  _cancelRecipe() {
    this._redirectOnCancel();
  }

  _redirectOnCancel() {
    const { history, recipe } = this.props;
    vanillaToast.success('Recipe cancelled');
    if (recipe.id === undefined) history.push('/recipe');
    else history.push(`/recipe/${recipe.id}`);
  }

  render() {
    const { errors, recipe, saving } = this.state;
    const { categories, match } = this.props;
    return (
      <>
        <Header />
        <article className="py-2">
          <div className="jumbotron">
            <h2>{`Manage ${match.params && match.params.id} Recipe`} </h2>
            <hr />
            <RecipeEntryView
              recipe={recipe}
              categories={categories}
              onChange={this._updateRecipeState}
              onSave={this._saveRecipe}
              onCancel={this._cancelRecipe}
              errors={errors}
              saving={saving}
            />
          </div>
        </article>
      </>
    );
  }
}

RecipeEntryContainer.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  token: PropTypes.string.isRequired,
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
    categories: categoriesFormattedForSelectInput(state.categories),
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(recipeActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecipeEntryContainer);

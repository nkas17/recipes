import React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router-dom';
import AboutPage from './about/AboutPage';
import LoginPage from './login/LoginPage';
import RecipesPage from './recipe/RecipesPage';
import GroceryListPage from './groceryList/GroceryListPage';
import MealListPage from './mealList/MealListPage';
import RecipeDisplayPage from './recipe/RecipeDisplayPage';
import RecipeEntryContainer from './recipe/RecipeEntryContainer';

/**
 * Main component that wraps everything else
 */
class App extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			theme: 'light',
		};

		this._toggleTheme = this._toggleTheme.bind(this);
	}

	_toggleTheme() {
		const { theme } = this.state;
		if (theme === 'light') {
			this.setState({ theme: 'dark' });
			const app = document.getElementById('app');
			app.className = 'dark';
		} else {
			this.setState({ theme: 'light' });
			const app = document.getElementById('app');
			app.className = 'light';
		}
	}

	render() {
		const { theme } = this.state;
		return (
			<div className="container-fluid">
				<button
					type="button"
					className="btn btn-link theme-toggle"
					onClick={this._toggleTheme}
				>
					{theme}
				</button>
				<main>
					<Switch>
						<Route exact path="/" component={RecipesPage} />
						<Route exact path="/login" component={LoginPage} />
						<Route path="/about" component={AboutPage} />
						<Route exact path="/recipe" component={RecipesPage} />
						<Route exact path="/recipe/:id" component={RecipeDisplayPage} />
						<Route path="/recipe/:id/edit" component={RecipeEntryContainer} />
						<Route exact path="/mealList" component={MealListPage} />
						<Route exact path="/groceryList" component={GroceryListPage} />
					</Switch>
				</main>
			</div>
		);
	}
}

export default hot(module)(App);

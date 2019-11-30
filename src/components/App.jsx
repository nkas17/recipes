import React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router-dom';
import ThemeToggle from './theme-toggle/ThemeToggle';
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
// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
	render() {
		return (
			<main className="container-fluid">
				<ThemeToggle />
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
		);
	}
}

export default hot(module)(App);

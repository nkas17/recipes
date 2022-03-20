import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import ThemeToggle from './components/theme-toggle/ThemeToggle';
import About from './pages/About';
import Login from './pages/Login';
import RecipeList from './pages/RecipeList';
import GroceryList from './pages/GroceryList';
import MealList from './pages/MealList';
import Recipe from './pages/Recipe';
import RecipeEdit from './pages/RecipeEdit';

/**
 * Main component that wraps everything else
 */
function App() {
  return (
    <main className="container-fluid">
      <ThemeToggle />
      <Switch>
        <Route exact path="/" component={RecipeList} />
        <Route exact path="/login" component={Login} />
        <Route path="/about" component={About} />
        <Route exact path="/recipe" component={RecipeList} />
        <Route exact path="/recipe/:id" component={Recipe} />
        <Route path="/recipe/:id/edit" component={RecipeEdit} />
        <Route exact path="/mealList" component={MealList} />
        <Route exact path="/groceryList" component={GroceryList} />
      </Switch>
    </main>
  );
}

export default App;

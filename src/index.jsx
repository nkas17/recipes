import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './App';
import { loadRecipes } from './actions/recipeActions';
import { loadCategories } from './actions/categoryActions';
import './styles/styles.css';
import 'vanilla-toast/vanilla-toast.css';
import './images/recipe-512.png';

const store = configureStore();
store.dispatch(loadRecipes());
store.dispatch(loadCategories());

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
  document.getElementById('app'),
);

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './components/App';
import { loadRecipes } from './actions/recipeActions';
import { loadCategories } from './actions/categoryActions';
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/vanilla-toast/vanilla-toast.css';
import './images/favicon.ico';

const store = configureStore();
store.dispatch(loadRecipes());
store.dispatch(loadCategories());

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById('app')
);

import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../common/Header';

const HomePage = () => (
	<>
		<Header />
		<article className="py-2">
			<div className="jumbotron">
				<h2>recipes</h2>
				<hr />
				<p>here we can manage our recipes</p>
				<Link to="recipe" className="btn btn-primary btn-lg">
					recipes
				</Link>
			</div>
			{/* <div className="jumbotron">
			<h2>meal list</h2>
			<hr />
			<p>here we can manage our meal list</p>
			<Link to="mealList" className="btn btn-primary btn-lg">
				meal list
			</Link>
		</div>
		<div className="jumbotron">
			<h2>grocery lists</h2>
			<hr />
			<p>here we can manage our grocery lists</p>
			<Link to="groceryList" className="btn btn-primary btn-lg">
				grocery lists
			</Link>
		</div> */}
		</article>
	</>
);

export default HomePage;

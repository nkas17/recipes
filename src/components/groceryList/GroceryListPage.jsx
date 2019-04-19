import React from 'react';
import Header from '../common/Header';

/**
 * List of groceries
 */
const GroceryListPage = () => (
	<React.Fragment>
		<Header />
		<article className="py-2">
			<div className="jumbotron">
				<header className="row">
					<div className="col">
						<h2>groceries</h2>
					</div>
				</header>
			</div>
		</article>
	</React.Fragment>
);

export default GroceryListPage;

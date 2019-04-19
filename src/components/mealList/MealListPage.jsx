import React from 'react';
import Header from '../common/Header';

/**
 * List of meals
 */
const MealListPage = () => (
	<React.Fragment>
		<Header />
		<article className="py-2">
			<div className="jumbotron">
				<header className="row">
					<div className="col">
						<h2>meals</h2>
					</div>
				</header>
			</div>
		</article>
	</React.Fragment>
);

export default MealListPage;

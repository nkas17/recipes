import React from 'react';

class RecipeSearchContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="row">
				<div className="col-12 my-4">
					<input
						type="text"
						className="form-control"
						placeholder="Search Recipes"
					/>
				</div>
			</div>
		);
	}
}

export default RecipeSearchContainer;

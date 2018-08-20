import React from 'react';
import PropTypes from 'prop-types';

const RecipeSearchView = ({ searchValue, onChange }) => (
	<div className="row">
		<div className="col-12 my-4">
			<input
				type="text"
				name="searchRecipe"
				className="form-control"
				placeholder="Search Recipes"
				value={searchValue}
				onChange={onChange}
			/>
		</div>
	</div>
);

RecipeSearchView.propTypes = {
	searchValue: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default RecipeSearchView;

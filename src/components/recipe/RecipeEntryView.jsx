import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';
import SelectInput from '../common/SelectInput';

const RecipeEntryView = ({
	recipe,
	categories,
	onSave,
	onChange,
	onCancel,
	saving,
	errors,
}) => (
	<form>
		<TextInput
			name="title"
			label="Title"
			value={recipe.title}
			onChange={onChange}
			error={errors.title}
		/>
		<TextInput
			name="description"
			label="Description"
			value={recipe.description}
			onChange={onChange}
			error={errors.description}
		/>
		<TextArea
			name="ingredients"
			label="Ingredient List"
			rows="10"
			value={recipe.ingredients}
			onChange={onChange}
			error={errors.ingredients}
		/>
		<TextArea
			name="directions"
			label="Directions"
			rows="10"
			value={recipe.directions}
			onChange={onChange}
			error={errors.directions}
		/>
		<SelectInput
			name="category"
			label="Category"
			value={recipe.category}
			defaultOption="select category"
			options={categories}
			onChange={onChange}
			error={errors.category}
		/>
		<button
			id="save"
			type="submit"
			disabled={saving}
			className="btn btn-primary"
			onClick={onSave}
		>
			{saving ? 'saving...' : 'save'}
		</button>
		<button
			id="cancel"
			type="button"
			disabled={saving}
			className="btn btn-link"
			onClick={onCancel}
		>
			cancel
		</button>
	</form>
);

RecipeEntryView.defaultProps = {
	saving: false,
	errors: {},
};

RecipeEntryView.propTypes = {
	recipe: PropTypes.objectOf(PropTypes.any).isRequired,
	categories: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
	onSave: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	saving: PropTypes.bool,
	errors: PropTypes.objectOf(PropTypes.any),
};

export default RecipeEntryView;

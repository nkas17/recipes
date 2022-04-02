/* eslint-disable react/require-default-props */
import React from 'react';
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';
import SelectInput from '../common/SelectInput';
import { Recipe } from '../../types/recipe';
import { Category } from '../../types/category';

interface RecipeEntryViewProps {
  recipe: Recipe;
  categories: Category[];
  onSave: () => void;
  onChange: () => void;
  onCancel: () => void;
  saving?: boolean;
  errors?: {
    title: string;
    description: string;
    ingredients: string;
    directions: string;
    category: string;
  };
}

function RecipeEntryView({
  recipe,
  categories,
  onSave,
  onChange,
  onCancel,
  saving = false,
  errors = { title: '', description: '', ingredients: '', directions: '', category: '' },
}: RecipeEntryViewProps) {
  return (
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
}

export default RecipeEntryView;

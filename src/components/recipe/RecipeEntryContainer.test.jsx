import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import RecipeEntryContainer from './RecipeEntryContainer';

const setup = id => ({
	categories: [],
	match: { params: { id } },
	recipe: {
		title: '',
		description: '',
	},
	actions: { saveRecipe: () => Promise.resolve() },
	history: {},
});

// eslint-disable-next-line react/jsx-props-no-spreading
const enzymeSetup = id => mount(<RecipeEntryContainer {...setup(id)} />);

describe('RecipeEntryContainer', () => {
	it('renders new recipe correctly', () => {
		const tree = renderer
			// eslint-disable-next-line react/jsx-props-no-spreading
			.create(<RecipeEntryContainer {...setup('new')} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('renders an undefined recipe correctly', () => {
		const tree = renderer
			// eslint-disable-next-line react/jsx-props-no-spreading
			.create(<RecipeEntryContainer {...setup('sushi')} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('sets error message when trying to save empty title', () => {
		const wrapper = enzymeSetup('new');
		const saveButton = wrapper.find('#save');
		expect(saveButton.prop('type')).toBe('submit');
		saveButton.simulate('click');
		expect(wrapper.state().errors.title).toBe(
			'title must be at least 5 characters.'
		);
	});
});

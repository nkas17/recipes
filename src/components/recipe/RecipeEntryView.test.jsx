import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import RecipeEntryView from './RecipeEntryView';

const defaultProps = {
	recipe: {},
	saving: false,
	errors: {},
	categories: [],
	onSave: () => {},
	onChange: () => {},
	onCancel: () => {},
};

describe('RecipeEntryView', () => {
	it('renders correctly', () => {
		const props = {
			...defaultProps,
		};
		const tree = shallow(<RecipeEntryView {...props} />); // eslint-disable-line react/jsx-props-no-spreading
		expect(toJSON(tree)).toMatchSnapshot();
	});

	it('renders correctly when saving', () => {
		const props = {
			...defaultProps,
			saving: true,
		};
		const tree = shallow(<RecipeEntryView {...props} />); // eslint-disable-line react/jsx-props-no-spreading
		expect(toJSON(tree)).toMatchSnapshot();
	});
});

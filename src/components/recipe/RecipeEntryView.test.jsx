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
		const tree = shallow(<RecipeEntryView props={defaultProps} />);
		expect(toJSON(tree)).toMatchSnapshot();
	});

	it('renders correctly when saving', () => {
		const props = {
			...defaultProps,
			saving: true,
		};
		const tree = shallow(<RecipeEntryView props={props} />);
		expect(toJSON(tree)).toMatchSnapshot();
	});
});

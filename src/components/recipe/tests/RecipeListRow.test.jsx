import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import RecipeListRow from '../RecipeListRow';

const recipe = {
	id: 'tacos',
	title: 'tacos',
	category: 'other',
	description: 'Tasty homemade tacos - hard or soft',
	ingredients: ['cheese', 'ground beef', 'tortilla'],
};

describe('RecipeListRow', () => {
	it('renders correctly', () => {
		const tree = shallow(
			<RecipeListRow recipe={recipe} showDelete deleteRecipe={() => {}} />
		);
		expect(toJSON(tree)).toMatchSnapshot();
	});
});

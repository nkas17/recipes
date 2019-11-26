import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { RecipePageTest } from './RecipesPage';

const recipes = [
	{
		id: 'tacos',
		title: 'tacos',
		category: 'other',
		description: 'Tasty homemade tacos - hard or soft',
		ingredients: ['cheese', 'ground beef', 'tortilla'],
	},
	{
		id: 'quiche',
		title: 'quiche',
		category: 'other',
		description: 'Delicious Spinach Quiche and Ham & Cauliflower quiche',
		ingredients: ['cheese', 'pie-crust', 'egg'],
	},
];

describe('RecipesPage', () => {
	it('renders correctly', () => {
		const tree = shallow(
			<RecipePageTest
				history={{}}
				recipes={recipes}
				authenticated
				token="tokenValue"
				actions={{}}
			/>
		);
		expect(toJSON(tree)).toMatchSnapshot();
	});
});

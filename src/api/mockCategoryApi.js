import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const categories = [
	{
		id: 'other',
		name: 'other',
	},
	{
		id: 'dessert',
		name: 'dessert',
	},
	{
		id: 'poultry',
		name: 'poultry',
	},
	{
		id: 'vegetable',
		name: 'vegetable',
	},
	{
		id: 'beef',
		name: 'beef',
	},
];

class CategoryApi {
	static getAllCategories() {
		return new Promise((resolve /* reject */) => {
			setTimeout(() => {
				resolve(Object.assign([], categories));
			}, delay);
		});
	}
}

export default CategoryApi;

export const categoriesFormattedForSelectInput = (categories) =>
	categories.map((category) => ({
		value: category.id,
		text: category.name,
	}));

export const getUser = (store) => store.user;

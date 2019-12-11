const handleResult = response => {
	if (response.status >= 200 && response.status < 300) {
		return response.json().then(data => {
			// console.log({ data }); // eslint-disable-line no-console
			return data;
		});
	}
	if (response.bodyUsed) {
		return response.json().then(data => {
			const error = new Error(`Response error for ${response.url}`);
			error.additionalData = data;
			throw error;
		});
	}
	throw new Error(`Response error for ${response.url}`);
};

const url =
	process.env.NODE_ENV === 'production'
		? `https://recipe-api-gateway.herokuapp.com/recipe`
		: 'http://localhost:3000/recipe';

class RecipeApi {
	static getAllRecipes() {
		const options = {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		};

		return fetch(`${url}s`, options).then(handleResult);
	}

	static saveRecipe(recipe, token) {
		const theRecipe = { ...recipe };
		const options = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(theRecipe),
		};

		return fetch(url, options).then(handleResult);
	}

	static deleteRecipe(recipeId, token) {
		const deleteUrl = `${url}/${recipeId}`;
		const options = {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		};

		return fetch(deleteUrl, options).then(handleResult);
	}
}

export default RecipeApi;

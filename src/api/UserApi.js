const handleResult = (response) => {
	if (response.status >= 200 && response.status < 300) {
		return response.json().then((data) => {
			// console.log({ data }); // eslint-disable-line no-console
			return { ...data, authenticated: true };
		});
	}
	if (response.status === 401) {
		return response.json().then((data) => {
			const error = new Error(`Response error for ${response.url}`);
			error.additionalData = data;
			throw error;
		});
	}
	throw new Error(`Response error for ${response.url}`);
};

const url =
	process.env.NODE_ENV === 'production'
		? `https://recipe-api-gateway.herokuapp.com/user/login`
		: 'http://localhost:3000/user/login';

export class UserApi {
	static userLogin(username, password) {
		const options = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				user: username,
				password,
			}),
		};

		return fetch(url, options).then(handleResult);
	}
}

export default UserApi;

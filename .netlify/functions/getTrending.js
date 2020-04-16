const movieDbApiRootUrl = "https://api.themoviedb.org/3";
const movieDbApiKey = process.env.API_KEY;

exports.handler = async (event, context, callback) => {
	const pass = (body) => {
		callback(null, {statusCode: 200, body: JSON.stringify(body)});
	};

	try {
		let response = await fetch(
			`${movieDbApiRootUrl}/trending/movie/week?api_key=${movieDbApiKey}`,
			{
				"content-type": "application/json",
				method: event.httpMethod,
				body: event.body,
			}
		);
		let data = await response.json();
		await pass(data);
	} catch (err) {
		let error = {
			statusCode: err.statusCode || 500,
			body: JSON.stringify({error: err.message}),
		};
		await pass(error);
	}
};

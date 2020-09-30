const request = require("request");

const wikiSearch = (term, callback) => {
	const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${encodeURIComponent(
		term
	)}&srlimit=10`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback("Something went wrong");
		} else {
			callback(undefined, {
				results: body.query.search,
			});
		}
	});
};

module.exports = wikiSearch;

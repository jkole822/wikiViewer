const path = require("path");
const express = require("express");
const wikiSearch = require("./utils/wikiSearch");

const app = express();
const port = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname, "../public");

app.use(express.static(publicDirPath));

app.get("/search/:term", (req, res) => {
	const term = req.params.term;

	wikiSearch(term, (error, results) => {
		if (error) {
			return res.send({
				error,
			});
		}

		res.send(results);
	});
});

app.listen(port, () => {
	console.log("Server is up on port " + port);
});

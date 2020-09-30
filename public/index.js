const main = document.querySelector(".main");
const searchForm = document.querySelector("form");
const search = document.querySelector("input");
let resultsList = document.querySelector(".results");
const magGlass = document.querySelector(".search");
const lens = document.querySelector(".lens");
const handle = document.querySelector(".handle");
const ex1 = document.querySelector(".ex1");
const ex2 = document.querySelector(".ex2");

searchForm.addEventListener("submit", e => {
	e.preventDefault();

	const searchTerm = search.value;

	fetch(`/search/${searchTerm}`).then(response => {
		response.json().then(({ error, results }) => {
			if (error) {
				alert(error);
			} else {
				for (let i = 0; i < results.length; i++) {
					var searchResult = document.createElement("li");
					searchResult.classList.add("listResults");
					var content = document.createElement("a");
					content.href = `https://en.wikipedia.org/?curid=${results[i].pageid}`;
					content.target = "_blank";
					var title = document.createElement("p");
					var snippet = document.createElement("p");
					title.classList.add("title");
					snippet.classList.add("snippet");
					var titleText = document.createTextNode(`${results[i].title}`);
					snippet.innerHTML = results[i].snippet;
					title.appendChild(titleText);
					content.appendChild(title);
					content.appendChild(snippet);
					searchResult.appendChild(content);
					resultsList.appendChild(searchResult);
				}
			}
		});
	});

	main.classList.add("shiftUp");
});
let toggle = false;

magGlass.addEventListener("click", e => {
	if (!toggle) {
		handle.classList.add("disappear");
		setTimeout(() => {
			lens.classList.add("expand");
		}, 250);
		setTimeout(() => {
			ex2.classList.add("appear");
		}, 500);
		setTimeout(() => {
			ex1.classList.add("appear");
		}, 600);
		setTimeout(() => {
			search.classList.add("appear");
			search.disabled = false;
			search.focus();
		}, 700);
		toggle = true;
	}
});

const shrink = () => {
	resultsList.remove();
	resultsList = document.createElement("ul");
	resultsList.classList.add("results");
	main.appendChild(resultsList);
	ex1.classList.remove("appear");
	search.classList.remove("appear");
	main.classList.remove("shiftUp");
	search.value = "";
	setTimeout(() => {
		ex2.classList.remove("appear");
	}, 100);
	setTimeout(() => {
		lens.classList.remove("expand");
	}, 250);
	setTimeout(() => {
		handle.classList.remove("disappear");
	}, 500);
	setTimeout(() => {
		toggle = false;
	}, 500);
};

ex1.addEventListener("click", e => shrink());

ex2.addEventListener("click", e => shrink());

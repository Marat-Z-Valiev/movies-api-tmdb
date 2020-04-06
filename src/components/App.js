import React, {useState} from "react";
import axios from "axios";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import InputContainer from "./InputContainer";
import Results from "./Results";
import Movie from "./Movie";
import Person from "./Person";
import Home from "./Home";
import PaginationComponent from "./PaginationComponent";
import {createGlobalStyle} from "styled-components";

const apiKey = "f8efee7e451d2ca98ae50114ad74aeeb";

const baseUrl = "https://api.themoviedb.org/3/search/movie?api_key=";

const App = () => {
	const GlobalStyle = createGlobalStyle`
	body {
	font-family: "Baloo Chettan 2", cursive;
	background-color: #0c6cb4;
	}

	.error-message{
		text-align: center;
		color: #ffffff;
		font-size: 1.3rem;
	}
	`;

	let [searchQuery, setSearchQuery] = useState("");
	let [results, setResults] = useState([]);
	let [totalResults, setTotalResults] = useState(0);
	let [isError, setIsError] = useState(false);
	let [isLoading, setIsLoading] = useState(false);
	let [isDisabled, setIsDisabled] = useState(true);
	let [selectedCategory, setSelectedCategory] = useState("movie");
	let [showPagination, setShowPagination] = useState(false);
	let [currentPage, setCurrentPage] = useState(1);
	const [resultsPerPage] = useState(10);

	// Handle onChange event on the input
	const handleChange = event => {
		const {value} = event.currentTarget;
		if (!value) {
			setIsDisabled((isDisabled = true));
			setIsLoading((isLoading = false));
		} else {
			setIsDisabled((isDisabled = false));
		}
		setSearchQuery((searchQuery = value));
	};

	const handleSelect = selectedOption => {
		setSelectedCategory((selectedCategory = selectedOption.value));
	};

	const getResults = async (searchQuery, currentPage) => {
		if (!searchQuery) {
			setIsLoading((isLoading = false));
			return;
		}
		await axios({
			url: `${baseUrl}${apiKey}&language=en-US&query=${searchQuery}&page=${currentPage}`,
			method: "get"
		})
			.then(response => {
				if (response.data.results.length) {
					setIsError((isError = false));
					setResults((results = response.data.results));
					setTotalResults((totalResults = response.data.total_results));
					setIsLoading((isLoading = false));
					setShowPagination((showPagination = true));
				} else {
					setIsError((isError = true));
					setIsLoading((isLoading = false));
					setShowPagination((showPagination = false));
				}
			})
			.catch(err => console.log(`this is error ${err}`));
	};

	const handleClick = () => {
		if (!searchQuery) {
			setIsLoading((isLoading = false));
			return;
		}
		setCurrentPage((currentPage = 1));
		getResults(searchQuery, currentPage);
		setIsLoading((isLoading = true));
	};

	const handlePageChange = pageNumber => {
		setCurrentPage((currentPage = pageNumber));
		getResults(searchQuery, pageNumber);
	};

	return (
		<>
			<GlobalStyle />
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/movieId=:id" component={Movie} />
					<Route path="/personId=:id" component={Person} />
				</Switch>
			</BrowserRouter>

			{showPagination ? (
				<PaginationComponent
					currentPage={currentPage}
					handlePageChange={handlePageChange}
					resultsPerPage={resultsPerPage}
					totalResults={totalResults}
				/>
			) : (
				""
			)}
			{isError ? (
				<p className="error-message">No Results Found</p>
			) : (
				<Results
					results={results}
					totalResults={totalResults}
					isError={isError}
				/>
			)}
			{showPagination ? (
				<PaginationComponent
					currentPage={currentPage}
					handlePageChange={handlePageChange}
					resultsPerPage={resultsPerPage}
					totalResults={totalResults}
				/>
			) : (
				""
			)}
		</>
	);
};

export default App;

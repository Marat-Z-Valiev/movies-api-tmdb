import React, {useState} from "react";
import axios from "axios";
import InputContainer from "./InputContainer";
import Results from "./Results";
import PaginationComponent from "./PaginationComponent";
import {createGlobalStyle} from "styled-components";
// import {API_KEY} from "../../config";

const baseUrl = "https://movie-database-imdb-alternative.p.rapidapi.com";

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
	let [totalResults, setTotalResults] = useState("");
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
			url: `${baseUrl}/?page=${currentPage}&r=json&type=${selectedCategory}&s=${searchQuery}`,
			method: "get",
			headers: {
				"x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
				"x-rapidapi-key": "a63832b8aamsh7a85645505609ddp1be412jsn1bc17d796591"
			}
		})
			.then(response => {
				if (response.data.Search) {
					setIsError((isError = false));
					setResults((results = response.data.Search));
					setTotalResults((totalResults = response.data.totalResults));
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
			<h1 style={{textAlign: "center", color: "#ffffff"}}>Movies API</h1>
			<InputContainer
				handleChange={handleChange}
				handleClick={handleClick}
				handleSelect={handleSelect}
				isLoading={isLoading}
				isDisabled={isDisabled}
			/>
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

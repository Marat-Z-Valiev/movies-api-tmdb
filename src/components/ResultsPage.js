import React, {useState, useEffect} from "react";
import {withRouter} from "react-router-dom";
import axios from "axios";
import Results from "./Results";
import PaginationComponent from "./PaginationComponent";

const apiKey = "f8efee7e451d2ca98ae50114ad74aeeb";

const baseUrl = "https://api.themoviedb.org/3/search/movie?api_key=";

const ResultsPage = ({match}) => {
	const queryValue = match.params.searchQuery;
	console.log(queryValue);
	let [results, setResults] = useState([]);
	let [totalResults, setTotalResults] = useState(0);
	let [isError, setIsError] = useState(false);
	let [isLoading, setIsLoading] = useState(false);
	let [isDisabled, setIsDisabled] = useState(true);
	let [showPagination, setShowPagination] = useState(false);
	let [currentPage, setCurrentPage] = useState(1);
	const [resultsPerPage] = useState(10);

	const getResults = async currentPage => {
		await axios
			.get(
				`${baseUrl}${apiKey}&language=en-US&query=${queryValue}&page=${currentPage}`
			)
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

	useEffect(() => {
		getResults();
	}, [queryValue]);

	return (
		<>
			<h2>Results page</h2>
			{/* {showPagination ? (
				<PaginationComponent
					currentPage={currentPage}
					handlePageChange={handlePageChange}
					resultsPerPage={resultsPerPage}
					totalResults={totalResults}
				/>
			) : (
				""
			)} */}
			{isError ? (
				<p className="error-message">No Results Found</p>
			) : (
				<Results
					results={results}
					totalResults={totalResults}
					isError={isError}
				/>
			)}
			{/* {showPagination ? (
				<PaginationComponent
					currentPage={currentPage}
					handlePageChange={handlePageChange}
					resultsPerPage={resultsPerPage}
					totalResults={totalResults}
				/>
			) : (
				""
			)} */}
		</>
	);
};

export default withRouter(ResultsPage);

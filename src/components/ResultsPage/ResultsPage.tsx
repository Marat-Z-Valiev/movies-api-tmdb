import React, {useState, useEffect} from "react";
import {withRouter, RouteComponentProps} from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import Results from "../Results/Results";
import PaginationComponent from "../Pagination/PaginationComponent";

const apiKey = process.env.API_KEY;

const baseUrl = "https://api.themoviedb.org/3/search/movie?api_key=";

interface ResultsPageProps {
	match: any;
}

const ResultsPage: React.FC<ResultsPageProps & RouteComponentProps> = ({
	match,
}) => {
	const queryValue = match.params.searchQuery;
	let [results, setResults] = useState([]);
	let [totalResults, setTotalResults] = useState(0);
	let [isError, setIsError] = useState(false);
	let [showPagination, setShowPagination] = useState(false);
	let [currentPage, setCurrentPage] = useState(1);
	const [resultsPerPage] = useState(10);

	const getResults = async (queryValue: string, currentPage: number) => {
		await axios
			.get(
				`${baseUrl}${apiKey}&language=en-US&query=${queryValue}&page=${currentPage}`
			)
			.then((response) => {
				if (response.data.results.length) {
					setIsError((isError = false));
					setResults((results = response.data.results));
					setTotalResults((totalResults = response.data.total_results));
					setShowPagination((showPagination = true));
				} else {
					setIsError((isError = true));
					setShowPagination((showPagination = false));
				}
			})
			.catch((err) => console.log(`this is error ${err}`));
	};

	useEffect(() => {
		getResults(queryValue, currentPage);
	}, [queryValue]);

	const handlePageChange = (pageNumber: number): void => {
		setCurrentPage((currentPage = pageNumber));
		getResults(queryValue, pageNumber);
	};

	return (
		<>
			<h2 style={{textAlign: "center", color: "#ffffff"}}>Results page</h2>
			<h2 style={{textAlign: "center"}}>
				{`Showing results for "${queryValue}"`}
			</h2>
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

ResultsPage.propTypes = {
	match: PropTypes.object.isRequired,
};

export default withRouter(ResultsPage);
